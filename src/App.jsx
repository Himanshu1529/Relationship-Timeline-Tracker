import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddMoment from "./_components/AddMoment";
import Timeline from "./_components/Timeline";
import Header from "./_components/Header";
import "./index.css";
import Snowfall from "react-snowfall";

const Main = () => (
  <div>
    <div className="flex items-center justify-center h-screen flex-col">
      <h1 className="text-center text-2xl text-white glow-text">
        Welcome to Relationship Timeline
      </h1>
      <a href="./add-moment">
        <button className="mt-4 px-6 py-2 text-white outline rounded-md hover:bg-pink-700 hover:outline-pink-700">
          Get Started
        </button>
      </a>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Snowfall color="#FF69B4" /> {/* Snowflakes will be pink */}
      <Header />
      <Routes>
        <Route path="/" element={<Main />} /> {/* Corrected Main component */}
        <Route path="/add-moment" element={<AddMoment />} />
        <Route path="/relationship-timeline" element={<Timeline />} />
      </Routes>
    </Router>
  );
};

export default App;
