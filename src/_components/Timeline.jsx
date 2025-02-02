"use client";
import React, { useEffect, useState } from "react";
import { db } from "../config/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react"; // Import Clerk's useUser hook for authentication
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaHeart, FaHandshake } from "react-icons/fa"; // Love and Friendship Icons

const Timeline = () => {
  const [moments, setMoments] = useState([]);
  const { user } = useUser(); // Get logged-in user from Clerk

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          // Query Firestore to get the moments where the email matches the logged-in user's email
          const q = query(
            collection(db, "moments"),
            where("email", "==", user.primaryEmailAddress?.emailAddress)
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            // Map through the documents and extract data for each moment
            const momentsData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setMoments(
              momentsData.sort(
                (a, b) => b.timestamp.seconds - a.timestamp.seconds
              )
            ); // Sort by timestamp (newest first)
          } else {
            console.log("No moments found for the logged-in user.");
            setMoments([]); // Ensure moments are set to an empty array if none are found
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      } else {
        console.log("No user is logged in.");
      }
    };

    fetchUserData(); // Call the function to fetch user data
  }, [user]); // Dependency on `user` ensures it re-runs when the user logs in

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center text-pink-600">
        Timeline
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
        <VerticalTimeline>
          {moments.map((moment) => (
            <VerticalTimelineElement
              key={moment.id}
              className="vertical-timeline-element--work"
              contentStyle={{
                background: "rgba(255, 182, 193, 0.7)", // Soft pink background
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                color: "#fff",
              }}
              contentArrowStyle={{
                borderRight: "7px solid rgba(255, 182, 193, 0.7)",
              }}
              iconStyle={{ background: "#FF69B4", color: "#fff" }} // Love/friendship pink color
              icon={moment.type === "love" ? <FaHeart /> : <FaHandshake />} // Conditional icon based on type
            >
              <h3 className="vertical-timeline-element-title font-bold text-white">
                {moment.friend}
              </h3>
              <small>
                {new Date(moment.timestamp.seconds * 1000).toLocaleString()}
              </small>
              <p className="text-white">{moment.text}</p>
            </VerticalTimelineElement>
          ))}
          <VerticalTimelineElement
            iconStyle={{ background: "#FF69B4", color: "#fff" }}
            icon={<FaHeart />} // Default love icon for the end element
          />
        </VerticalTimeline>
      )}
    </div>
  );
};

export default Timeline;
