import React, { useEffect, useState } from "react";
import { db } from "../config/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react"; // Import Clerk's useUser hook for authentication
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaHeart, FaHandshake, FaShareAlt } from "react-icons/fa"; // Love, Friendship & Share Icons

const Timeline = () => {
  const [moments, setMoments] = useState([]);
  const { user } = useUser(); // Get logged-in user from Clerk

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.primaryEmailAddress?.emailAddress) {
        try {
          const q = query(
            collection(db, "moments"),
            where("email", "==", user.primaryEmailAddress.emailAddress)
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const momentsData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setMoments(
              momentsData.sort(
                (a, b) =>
                  (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0)
              )
            );
          } else {
            setMoments([]);
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  // Function to share the entire timeline
  // Function to share the entire timeline with a website link
  const handleShareAll = () => {
    if (moments.length === 0) {
      alert("No moments to share!");
      return;
    }

    // Your website link
    const websiteLink = "https://relationship-timeline-tracker.vercel.app"; // Replace with your actual website link

    // Format all moments as a single shareable message
    const shareText =
      "🌟 My Special Moments 🌟\n\n" +
      moments
        .map(
          (moment, index) =>
            `#${index + 1} - ${moment.friend}\n📅 ${new Date(
              moment.timestamp?.seconds * 1000
            ).toLocaleString()}\n💬 "${moment.text}"\n`
        )
        .join("\n") +
      `\n\n✨ View more on my timeline: ${websiteLink} ❤️`;

    // WhatsApp share link
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

    // Snapchat share link
    const snapchatLink = `https://www.snapchat.com/share?text=${encodeURIComponent(
      shareText
    )}`;

    // Open WhatsApp
    window.open(whatsappLink, "_blank");

    // Open Snapchat
    window.open(snapchatLink, "_blank");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center text-pink-600">
        Favourite Moment Timeline
      </h2>

      {moments.length === 0 ? (
        <div className="text-center">
          <p className="text-lg mb-4">You have no moments yet. Add one!</p>
          <a href="/add-moment">
            <button className="px-4 py-2 bg-pink-600 text-white rounded-md">
              Add Moment
            </button>
          </a>
        </div>
      ) : (
        <>
          {/* Share All Button */}
          <div className="text-center mb-4">
            <button
              onClick={handleShareAll}
              className="px-4 py-2 bg-pink-500 text-white rounded-md flex items-center mx-auto space-x-2"
            >
              <FaShareAlt /> <span>Share All Moments</span>
            </button>
          </div>

          <VerticalTimeline>
            {moments.map((moment) => (
              <VerticalTimelineElement
                key={moment.id}
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "rgba(255, 182, 193, 0.7)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                  color: "#fff",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid rgba(255, 182, 193, 0.7)",
                }}
                iconStyle={{ background: "#FF69B4", color: "#fff" }}
                icon={moment.type === "love" ? <FaHeart /> : <FaHandshake />}
              >
                <h3 className="vertical-timeline-element-title font-bold text-white">
                  {moment.friend}
                </h3>
                <small>
                  {moment.timestamp?.seconds
                    ? new Date(moment.timestamp.seconds * 1000).toLocaleString()
                    : "Unknown Date"}
                </small>
                <p className="text-white">{moment.text}</p>
              </VerticalTimelineElement>
            ))}
            <VerticalTimelineElement
              iconStyle={{ background: "#FF69B4", color: "#fff" }}
              icon={<FaHeart />}
            />
          </VerticalTimeline>
        </>
      )}
    </div>
  );
};

export default Timeline;
