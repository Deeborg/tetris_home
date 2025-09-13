// src/components/Timeline.tsx

import React from "react";
import "./Timeline.css";

// --- Type definitions ---
interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  iconUrl: string;
  color: string;
  alignment: "left" | "right"; // 'left' means ICON is on the left
}

// --- Data for the timeline ---
const timelineData: TimelineEvent[] = [
  {
    year: 2012,
    title: "CoE setup of AJA Labs",
    description: "",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3524/3524636.png", // Gear icon
    color: "#00bcd4", // Cyan
    alignment: "right", // Icon on the right
  },
  {
    year: 2018,
    title: "Ancillary Services",
    description: "Advanced analytics and ACM",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2921/2921990.png", // Document icon
    color: "#e91e63", // Pink/Red
    alignment: "left", // Icon on the left
  },
  {
    year: 2020,
    title: "CompliiBear",
    description: "",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1312/1312676.png", // Chart icon
    color: "#8bc34a", // Light Green
    alignment: "right", // Icon on the right
  },
  {
    year: 2022,
    title: "ForenCity, ToS, Tickback,",
    description: "Concur Analytics",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1535/1535030.png", // People icon
    color: "#673ab7", // Deep Purple
    alignment: "left", // Icon on the left
  },
  {
    year: 2024,
    title: "Vittora",
    description: "",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/4243/4243303.png", // List icon
    color: "#ff9800", // Orange
    alignment: "right", // Icon on the right
  },
];

// --- Component props ---
interface TimelineProps {
  onClose: () => void;
}

const Timeline: React.FC<TimelineProps> = ({ onClose }) => {
  return (
    <div className="timeline-overlay">
      <button className="timeline-close-button" onClick={onClose}>
        ×
      </button>
      <div className="timeline-container">
        <div className="timeline-line"></div>
        {timelineData.map((event, index) => (
          <div
            key={event.year}
            className="timeline-item"
            style={
              {
                "--timeline-color": event.color,
                animationDelay: `${index * 0.2}s`,
              } as React.CSSProperties
            }
          >
            {/* Left side of the line */}
            <div className="timeline-side timeline-side-left">
              {event.alignment === "left" ? (
                <div className="timeline-icon-wrapper">
                  <div className="timeline-icon">
                    <img src={event.iconUrl} alt="" />
                  </div>
                </div>
              ) : (
                <div className="timeline-content">
                  <span className="timeline-year">{event.year}</span>
                  <h3 className="timeline-title">{event.title}</h3>
                  <p className="timeline-description">{event.description}</p>
                </div>
              )}
            </div>

            {/* Center Node on the line */}
            <div className="timeline-middle"></div>

            {/* Right side of the line */}
            <div className="timeline-side timeline-side-right">
              {event.alignment === "right" ? (
                <div className="timeline-icon-wrapper">
                  <div className="timeline-icon">
                    <img src={event.iconUrl} alt="" />
                  </div>
                </div>
              ) : (
                <div className="timeline-content">
                  <span className="timeline-year">{event.year}</span>
                  <h3 className="timeline-title">{event.title}</h3>
                  <p className="timeline-description">{event.description}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
