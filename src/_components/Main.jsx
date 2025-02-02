import React from "react";
import Snowfall from "react-snowfall";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css"; // Ensure to import the timeline styles
import { FaBriefcase } from "react-icons/fa"; // Example icon for the timeline
import { FaHeart } from "react-icons/fa";
import { GiLovers } from "react-icons/gi";

function Main() {
  return (
    <div>
      {/* Snowfall effect */}
      <Snowfall />
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto lg:text-center">
            <h2 className="font-semibold text-2xl text-white">Deploy Faster</h2>
            <VerticalTimeline>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.38)", // Semi-transparent white
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", // Soft shadow
                  backdropFilter: "blur(10px)", // Glassmorphism blur effect
                  border: "1px solid rgba(255, 255, 255, 0.38)", // Subtle border
                  color: "#000", // Text color
                }}
                contentArrowStyle={{
                  borderRight: "7px solid rgba(255, 255, 255, 0.2)",
                }}
                date="2011 - Present"
                iconStyle={{
                  background: "red",
                  color: "#fff",
                }}
                icon={<FaHeart />}
              >
                <h3 className="vertical-timeline-element-title">
                  Creative Director
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  Miami, FL
                </h4>
                <p>
                  Creative Direction, User Experience, Visual Design, Project
                  Management, Team Leading
                </p>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.38)",
                  color: "#000",
                }}
                date="2010 - 2011"
                iconStyle={{ background: "rgb(17, 237, 7)", color: "#fff" }}
                icon={<GiLovers />}
              >
                <h3 className="vertical-timeline-element-title">
                  Art Director
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  San Francisco, CA
                </h4>
                <p>
                  Creative Direction, User Experience, Visual Design, SEO,
                  Online Marketing
                </p>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.38)",
                  color: "#000",
                }}
                date="2008 - 2010"
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                icon={<FaBriefcase />}
              >
                <h3 className="vertical-timeline-element-title">
                  Graphic Designer
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  Los Angeles, CA
                </h4>
                <p>User Experience, Visual Design, Branding, Print Design</p>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
