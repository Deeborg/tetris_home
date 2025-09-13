import React, { useEffect, useState } from "react";
import "./AboutAjaLabs.css";

// --- SVG Icons --- //
const VisionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="stats-icon"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const CountriesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="stats-icon"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M5 6h14M5 10h14M5 14h14M5 18h14"
    />
  </svg>
);

const BrainsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="stats-icon"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13a1 1 0 011-1h12a1 1 0 110 2H6a1 1 0 01-1-1zM5 9a1 1 0 011-1h12a1 1 0 110 2H6a1 1 0 01-1-1z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM5.472 13.528A4.995 4.995 0 015 12a5 5 0 015-5c1.455 0 2.79.64 3.736 1.623m4.306 1.755A4.995 4.995 0 0119 12a5 5 0 01-5 5c-1.455 0-2.79-.64-3.736-1.623m-4.306-1.755A4.98 4.98 0 008.01 16.5a4.98 4.98 0 004.98-4.98c0-.62-.113-1.21-.32-1.76M12 6a6 6 0 100 12 6 6 0 000-12z"
    />
  </svg>
);

const ExperienceIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="stats-icon"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const SolutionsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="stats-icon"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.636-6.364l.707.707M19.071 19.071l-.707-.707M12 21v-1m-6.364-1.636l.707-.707"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 18a6 6 0 100-12 6 6 0 000 12z"
    />
  </svg>
);

const ClientsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="stats-icon"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"
    />
  </svg>
);

const PartnersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="stats-icon"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

// Timeline data
const timelineData = [
  {
    year: 2012,
    title: "CoE setup of AJA Labs",
    description: "",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3524/3524636.png",
    color: "#00bcd4",
    alignment: "right",
  },
  {
    year: 2018,
    title: "Ancillary Services",
    description: "Advanced analytics and ACM",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2921/2921990.png",
    color: "#e91e63",
    alignment: "left",
  },
  {
    year: 2020,
    title: "CompliiBear",
    description: "",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1312/1312676.png",
    color: "#8bc34a",
    alignment: "right",
  },
  {
    year: 2022,
    title: "ForenCity, ToS, Tickback,",
    description: "Concur Analytics",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1535/1535030.png",
    color: "#673ab7",
    alignment: "left",
  },
  {
    year: 2024,
    title: "Vittora",
    description: "",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/4243/4243303.png",
    color: "#ff9800",
    alignment: "right",
  },
];

interface AboutAjaLabsProps {
  onNavigateToUniverse?: () => void;
}

const AboutAjaLabs: React.FC<AboutAjaLabsProps> = ({
  onNavigateToUniverse,
}) => {
  const [showTimeline, setShowTimeline] = useState(false);

  const statsData = [
    { icon: <VisionIcon />, value: "1", label: "Vision", size: "tall" },
    { icon: <CountriesIcon />, value: "4", label: "Countries", size: "normal" },
    {
      icon: <BrainsIcon />,
      value: "70+",
      label: "Intelligent Brains",
      size: "normal",
    },
    {
      icon: <ExperienceIcon />,
      value: "730+",
      label: "Man-Years of Experience",
      size: "tall",
    },
    {
      icon: <SolutionsIcon />,
      value: "50+",
      label: "AI & ML based Solutions",
      size: "wide",
    },
    {
      icon: <ClientsIcon />,
      value: "80+",
      label: "Clients Served",
      size: "normal",
    },
    {
      icon: <PartnersIcon />,
      value: "10+",
      label: "Partners",
      size: "normal",
    },
  ];

  return (
    <div className="about-aja-labs">
      <div className="labs-background">
        <div className="matrix-rain"></div>
      </div>

      <div className="labs-content">
        <div className="labs-header">
          <h1 className="labs-title">About AJA Labs</h1>
          <p className="labs-subtitle">
            Cut out the clutter before it clogs your entire system
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-container">
          {statsData.map((stat, index) => (
            <div key={index} className={`stats-card ${stat.size}`}>
              <div className="stats-icon">{stat.icon}</div>
              <div className="stats-value">{stat.value}</div>
              <div className="stats-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* AJA Universe Button */}
        {onNavigateToUniverse && (
          <div className="universe-button-container">
            <button className="universe-button" onClick={onNavigateToUniverse}>
              <span className="button-text">AJA Universe</span>
              <span className="button-icon">→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutAjaLabs;
