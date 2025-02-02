import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react"; // Import Clerk authentication hook
import { db, collection, addDoc } from "../config/FirebaseConfig"; // Firebase config

const AddMoment = ({ onMomentAdded }) => {
  const { user } = useUser(); // Get Clerk logged-in user
  const [momentText, setMomentText] = useState("");
  const [friendName, setFriendName] = useState("");
  const [date, setDate] = useState("");
  const [relationship, setRelationship] = useState(""); // Track the selected relationship
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!momentText || !friendName || !date || !relationship) {
      alert("Please fill all fields!");
      return;
    }

    if (!user) {
      alert("User not logged in! Please sign in.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "moments"), {
        text: momentText,
        friend: friendName,
        date,
        relationship, // Save the relationship in the database
        email: user.primaryEmailAddress?.emailAddress, // Save email to filter in timeline
        timestamp: new Date(),
        userId: user.id, // Optionally, store the userId to filter moments by user
      });

      setMomentText("");
      setFriendName("");
      setDate("");
      setRelationship(""); // Reset the relationship field
      setLoading(false);

      if (onMomentAdded) onMomentAdded();
    } catch (error) {
      console.error("Error adding moment: ", error);
      alert("Failed to save moment!");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 px-4 my-10 mx-20 xs:mx-10 border rounded bg-transparent"
    >
      <label className="block text-white mb-2" htmlFor="friendName">
        Friend's Name
      </label>
      <input
        type="text"
        id="friendName"
        placeholder="Friend's Name"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
        className="block w-full p-2 mb-4 border text-white glow-text"
        required
      />

      <label className="block text-white mb-2" htmlFor="relationship">
        Relationship
      </label>
      <select
        id="relationship"
        value={relationship}
        onChange={(e) => setRelationship(e.target.value)}
        className="block w-full p-2 mb-4 border text-white glow-text custom-select"
        required
      >
        <option value="">Select Relationship</option>
        <option value="Lover">Lover</option>
        <option value="Bf/Gf">BF/GF</option>
        <option value="Friends">Friends</option>
        <option value="Best-friends">Best-Friends</option>
        <option value="Siblings">Siblings</option>
        <option value="Family">Family</option>
        <option value="Coworkers">Coworkers</option>
        <option value="Classmates">Classmates</option>
        <option value="Acquaintances">Acquaintances</option>
        <option value="Mentor">Mentor</option>
        <option value="Crush">Crush</option>
      </select>

      <label className="block text-white mb-2" htmlFor="date">
        Date of Moment
      </label>
      <input
        type="date"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="block w-full p-2 mb-4 border text-white glow-text"
        required
      />

      <label className="block text-white mb-2" htmlFor="momentText">
        Describe Your Moment
      </label>
      <textarea
        id="momentText"
        placeholder="Describe your moment..."
        value={momentText}
        onChange={(e) => setMomentText(e.target.value)}
        className="block w-full p-2 mb-4 border text-white glow-text"
        required
      />

      <button
        type="submit"
        className={`p-2 text-white rounded ${
          loading ? "bg-gray-400" : "bg-blue-500"
        }`}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Moment"}
      </button>
    </form>
  );
};

export default AddMoment;
