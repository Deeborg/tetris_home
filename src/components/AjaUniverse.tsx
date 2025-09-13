// src/components/AjaUniverse.tsx

import React, { useState } from "react";
import "./AjaUniverse.css";
import Timeline from "./Timeline";

// --- TypeScript Interfaces ---
// This defines the shape of our data for each clickable item.
interface UniverseItem {
  id: string;
  title: string;
  side: "product" | "service";
  top: string;
  left: string;
  iconUrl: string; // We'll use URLs for icons for better quality
  description: string;
  secondaryDescription: string;
}

// --- Data for Universe Items ---
// Using an array makes the code clean and easy to manage.
const universeItems: UniverseItem[] = [
  // Products Universe
  {
    id: "compliBear",
    side: "product",
    title: "CompliBear",
    top: "40%",
    left: "15%",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2823/2823616.png",
    description: "Comprehensive compliance analysis for modern enterprises.",
    secondaryDescription:
      "Integrate our team to bolster your compliance efforts.",
  },
  {
    id: "vittora1",
    side: "product",
    title: "Vittora",
    top: "20%",
    left: "25%",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3439/3439130.png",
    description: "Advanced analytics platform for data-driven growth.",
    secondaryDescription:
      "Get expert assistance to maximize your Vittora insights.",
  },
  {
    id: "eywa",
    side: "product",
    title: "EYWA Vault",
    top: "45%",
    left: "30%",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1055/1055653.png",
    description: "A secure, decentralized data vault for sensitive assets.",
    secondaryDescription:
      "Consult with our security experts for seamless integration.",
  },
  {
    id: "vittora2",
    side: "product",
    title: "Vittora",
    top: "75%",
    left: "25%",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2921/2921990.png",
    description: "Custom reporting and workflow automation tool.",
    secondaryDescription:
      "Tailor Vittora to your exact business process needs with our team.",
  },

  // Service Universe
  {
    id: "dataEngineering",
    side: "service",
    title: "Data Engineering",
    top: "30%",
    left: "70%",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/8704/8704207.png",
    description:
      "We help organizations identify and mitigate risks in their data pipelines, governance, and compliance processes.",
    secondaryDescription:
      "We offer skilled data engineers experienced in building ETL pipelines, data lakes, and cloud architectures (AWS, Azure, GCP).",
  },
  {
    id: "genAI",
    side: "service",
    title: "Gen AI Solutions",
    top: "40%",
    left: "85%",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/10702/10702279.png",
    description:
      "We help organizations assess and mitigate risks in adopting Generative AI, covering data privacy, bias, and compliance.",
    secondaryDescription:
      "We provide skilled AI engineers and prompt engineers to accelerate your Generative AI projects.",
  },
  {
    id: "dataViz",
    side: "service",
    title: "Data Visualization",
    top: "55%",
    left: "78%",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3025/3025735.png",
    description:
      "We assess reporting frameworks to ensure accurate, consistent, and compliant data visualization practices.",
    secondaryDescription:
      "We provide skilled data visualization specialists proficient in Power BI, Tableau, and advanced dashboard design.",
  },
  {
    id: "secondment",
    side: "service",
    title: "Secondment Services",
    top: "75%",
    left: "65%",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/912/912214.png",
    description:
      "We evaluate workforce risks related to skill gaps, project dependencies, and resource planning.",
    secondaryDescription:
      "We provide qualified professionals who seamlessly integrate into your team for short- or long-term needs.",
  },
  {
    id: "bpa",
    side: "service",
    title: "Business Process Analysis",
    top: "68%",
    left: "88%",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/10900/10900010.png",
    description:
      "We identify risks, inefficiencies, and compliance gaps across critical business processes.",
    secondaryDescription:
      "We provide skilled business analysts to map, document, and improve end-to-end processes.",
  },
  {
    id: "genAITs",
    side: "service",
    title: "Gen AITs",
    top: "90%",
    left: "75%",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/4243/4243303.png",
    description:
      "We assess risks in using Generative AI tools, focusing on data security, bias, and regulatory compliance.",
    secondaryDescription:
      "We offer skilled professionals experienced in LLMs, prompt engineering, and Gen AI integration.",
  },
  {
    id: "fullStackDS",
    side: "service",
    title: "Full Stack Datascience",
    top: "15%",
    left: "80%",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/8099/8099381.png",
    description:
      "Our experts address issues like data bias, model drift, and compliance to ensure trustworthy insights.",
    secondaryDescription:
      "We provide skilled data scientists and ML engineers proficient in end-to-end solutions — from data pipelines to production ML.",
  },
];

// --- The Main Component ---
interface AjaUniverseProps {
  onNavigateToLanding?: () => void;
}

const AjaUniverse: React.FC<AjaUniverseProps> = ({ onNavigateToLanding }) => {
  const [selectedItem, setSelectedItem] = useState<UniverseItem | null>(null);
  const [isTimelineVisible, setTimelineVisible] = useState(false); // <-- 2. ADD NEW STATE

  const handleItemClick = (item: UniverseItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="universe-container">
      <div className="stars"></div>
      {/* <div className="nebula"></div> */}
      <div className="comets"></div>

      {/* Back to Landing Button */}
      {onNavigateToLanding && (
        <button className="timeline-button" onClick={onNavigateToLanding}>
          ← Back to Home
        </button>
      )}

      {/* --- 3. ADD THE TIMELINE BUTTON --- */}
      {/* <button
        className="timeline-button"
        onClick={() => setTimelineVisible(true)}
      >
        Timeline
      </button> */}

      <h1 className="main-title">AJA Universe</h1>

      <div className="universe-labels">
        <h2 className="products-universe-label">Products Galaxy</h2>
        <h2 className="service-universe-label">Service Galaxy</h2>
      </div>

      <div className="items-wrapper">
        {universeItems.map((item) => (
          <div
            key={item.id}
            className={`universe-item ${item.side}`}
            style={{ top: item.top, left: item.left }}
            onClick={() => handleItemClick(item)}
          >
            <div className="icon-container">
              <img src={item.iconUrl} alt={item.title} className="item-icon" />
            </div>
            <span className="item-label">{item.title}</span>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="hamburger-icon">☰</div>
              <h3 className="modal-title">{selectedItem.title}</h3>
              <button className="close-button" onClick={closeModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <h4>Risk Consulting</h4>
              <p>{selectedItem.description}</p>
              <h4>Secondment Services</h4>
              <p>{selectedItem.secondaryDescription}</p>
            </div>
            <div className="modal-footer">
              <button className="modal-action-button">Click tools</button>
            </div>
          </div>
        </div>
      )}
      {/* Timeline Component*/}
      {isTimelineVisible && (
        <Timeline onClose={() => setTimelineVisible(false)} />
      )}
    </div>
  );
};

export default AjaUniverse;
