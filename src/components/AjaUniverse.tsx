// src/components/AjaUniverse.tsx

import React, { useState } from 'react';
import './AjaUniverse.css';
//import Timeline from './Timeline';
import compliBearIcon from '../assets/complibear.png'; 
import vittoraIcon from '../assets/vittora.png'; 
import isAuditIcon from '../assets/isaudit.png'; 
import dataVizIcon from '../assets/dataviz.png'; 

// --- TypeScript Interfaces ---
// ADDED a 'color' property to define the background for each icon
interface UniverseItem {
  id: string;
  title: string;
  side: 'product' | 'service';
  top: string;
  left: string;
  iconUrl: string;
  description: string;
  color: string; // <-- NEW PROPERTY
}

// --- Data for Universe Items ---
// UPDATED positions for atomic orbital arrangement with larger intersecting ellipses
const universeItems: UniverseItem[] = [
  // Products Universe - Left Side (Expanded atomic orbital pattern around center at 25%, 50%)
  { id: 'tickBack', side: 'product', title: 'TickBack', top: '30%', left: '40%', iconUrl: 'https://cdn-icons-png.flaticon.com/512/8832/8832119.png', description: 'Unravel Gross to Net Process to identify all revenue leakages using Pre-trained and setup ML Models. Tickback transforms the process of managing Gross to Net into a continuous loop of analysing, reporting, learning, and optimizing to combat revenue leakage and improve margins.', color: '#e53935' },
  { id: 'vittora1', side: 'product', title: 'Vittora', top: '30%', left: '10%', iconUrl: vittoraIcon, description: 'A dynamic playground where 3 billion datapoints are crunched every hour, transforming data into actionable insights - fuelling smarter, faster financial decisions.', color: '#1e4d5aff' },
  { id: 'oats', side: 'product', title: 'OATS', top: '50%', left: '25%', iconUrl: 'https://cdn-icons-png.flaticon.com/512/2885/2885417.png', description: 'Open Audit Tracking System to automate reporting and exception closure post audit observations and single stop solution for all review documentation', color: '#7eae71ff' },
  { id: 'compliBear', side: 'product', title: 'CompliBear', top: '15%', left: '25%', iconUrl: compliBearIcon, description: 'Audit co-pilot designed to transform insights into innovations. It operates on a CoSaaS model, enabling customised solutions and orchestration tailored to each business\'s unique operations and systems. CompliBear helps businesses analyse large volumes of unstructured data, also known as data lake analytics, to extract valuable insights.', color: '#6A1B9A' },
  { id: 'sentinelAI', side: 'product', title: 'Sentinel AI', top: '70%', left: '40%', iconUrl: 'https://cdn-icons-png.flaticon.com/512/2491/2491935.png', description: 'An AI-driven platform that supports auditors across the full lifecycle—planning, execution, and reporting. Trained on 350,000+ risks and controls and continuously enriched with a real-time global risk database, it adapts dynamically to macroeconomic and microeconomic trends. The tool also features an interactive chatbot, enabling auditors to instantly query risks, controls, and audit procedures for smarter, faster decision-making.', color: '#3770c6ff' },
  { id: 'lawRence', side: 'product', title: 'LawRence', top: '70%', left: '10%', iconUrl: 'https://cdn-icons-png.flaticon.com/512/1041/1041285.png', description: 'Powered by a sophisticated Gen AI model, Lawrence possesses the unique ability to decipher and analyze complex legal language with unparalleled precision. Lawrence is linked to a vast database of laws, precedents, and legal documents, meticulously organized and stored as dense vectors.', color: '#c2850c' },
  { id: 'forensCity', side: 'product', title: 'ForensCity', top: '85%', left: '25%', iconUrl: 'https://cdn-icons-png.flaticon.com/512/2942/2942978.png', description: 'Take your pick of the lot from this host of applications that are built using Digital Forensic Standards to analyse any form of data.', color: '#00838F' },
  //{ id: 'ehs', side: 'product', title: 'EHS', top: '50%', left: '8%', iconUrl: 'https://cdn-icons-png.flaticon.com/512/3013/3013234.png', description: 'Using more than 20 Statistical Models and over 50 rule based ratios, prepare a detailed Entity Health Score just based on your trial balance', color: '#556b2f' },

  // Service Universe - Right Side (Expanded atomic orbital pattern around center at 75%, 50%)
  { id: 'genAI', side: 'service', title: 'Gen AI Solutions', top: '50%', left: '75%', iconUrl: 'https://cdn-icons-png.flaticon.com/512/8637/8637099.png', description: 'Generative AI automates repetitive workflows, creates intelligent summaries, and generates insights from large volumes of data. It enables faster analysis, scenario simulation, and natural language interaction with complex datasets. This helps teams focus on strategic decisions while improving efficiency and accuracy.\n\nHow We Help:\nWe design and implement custom Gen AI solutions tailored to your business needs—ranging from chatbots and virtual assistants to intelligent document processing and predictive analytics. Our team ensures seamless integration, data security, and measurable ROI from AI adoption.', color: '#E64A19' },
  { id: 'fullStackDS', side: 'service', title: 'Full Stack Datascience', top: '30%', left: '60%', iconUrl: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png', description: 'Full stack data science in finance delivers end-to-end solutions from data preparation to predictive modeling and visualization. It helps uncover patterns in transactions, forecast revenues, detect risks, and ensure regulatory compliance. This holistic approach empowers financial teams to make strategic, data-driven decisions that drive growth and resilience.\n\nHow We Help:\nWe provide end-to-end data science solutions, from building data pipelines and performing advanced analytics to developing machine learning models and deploying them into production. Our team ensures scalability, performance, and ongoing model monitoring to deliver continuous business value.', color: '#FBC02D' },
  { id: 'bpa', side: 'service', title: 'Business Process Analysis', top: '30%', left: '90%', iconUrl: 'https://cdn-icons-png.flaticon.com/512/3281/3281289.png', description: 'Business process analysis identifies inefficiencies, bottlenecks, and risks within operations. It provides actionable insights to streamline workflows, improve compliance, and reduce costs. By optimizing processes, it enhances overall efficiency and supports better decision-making.\n\nHow We Help:\nWe work closely with your team to map current processes, identify gaps, and design optimized workflows. Our experts implement process improvements, introduce automation where feasible, and ensure compliance with industry standards to drive measurable business outcomes.', color: '#1565C0' },
  { id: 'secondment', side: 'service', title: 'Secondment Services', top: '70%', left: '60%', iconUrl: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png', description: 'Secondment services provide skilled professionals to address short-term talent gaps and deliver critical projects seamlessly. They bring specialized expertise, ensuring business continuity and knowledge transfer. This flexible approach helps organizations stay agile and meet objectives efficiently.\n\nHow We Help:\nWe offer experienced professionals across finance, technology, risk, and operations who seamlessly integrate with your team. Our secondment model is flexible, ensuring the right expertise at the right time to meet deadlines, maintain compliance, and achieve business goals efficiently.', color: '#26d0dcff' },
  { id: 'dataEngineering', side: 'service', title: 'Data Engineering', top: '70%', left: '90%', iconUrl: 'https://cdn-icons-png.flaticon.com/512/2103/2103658.png', description: 'Data engineering plays a key role in finance by enabling seamless collection, integration, and transformation of large volumes of financial data. It builds reliable pipelines that ensure data accuracy and real-time availability for reporting, forecasting, and compliance. By providing a solid data foundation, data engineering empowers finance teams to make faster, data-driven decisions and uncover actionable insights.\n\nHow We Help:\nWe build end-to-end data infrastructure tailored to your business needs—covering data ingestion, ETL/ELT pipelines, cloud data warehousing, and real-time data processing. Our solutions ensure data quality, governance, and scalability, empowering your teams to make faster, data-driven decisions.', color: '#0277BD' },
  //{ id: 'genAITs', side: 'service', title: 'Gen AITs', top: '15%', left: '75%', iconUrl: 'https://cdn-icons-png.flaticon.com/512/4341/4341139.png', description: 'Gen AI tools streamline data processing, automate repetitive tasks, and generate actionable insights from vast datasets. They enhance productivity by enabling natural language interaction, quick report creation, and intelligent recommendations. This empowers teams to work smarter, make faster decisions, and focus on innovation.\n\nHow We Help:\nWe identify and implement the right Gen AI tools for your business use cases—whether for content creation, chatbots, data summarization, or process automation. Our team ensures seamless integration, security, and measurable outcomes so you can maximize value from AI adoption.', color: '#5E35B1' },
  { id: 'dataViz', side: 'service', title: 'Data Visualization', top: '85%', left: '75%', iconUrl: dataVizIcon, description: 'Data visualization transforms complex financial data into clear, interactive dashboards and charts. It helps reveal patterns, trends, and anomalies quickly, enabling faster decision-making. By making insights easy to understand, it drives collaboration and supports strategic planning.\n\nHow We Help:\nWe design intuitive dashboards and interactive reports using modern BI tools like Power BI, Tableau, and Looker. Our solutions focus on clarity, usability, and storytelling—helping your teams monitor performance, identify opportunities, and act with confidence.', color: '#AD1457' },
  { id: 'isAudit', side: 'service', title: 'IS Audit', top: '15%', left: '75%', iconUrl: isAuditIcon, description: 'Information Systems Audit provides comprehensive evaluation of IT controls, security frameworks, and compliance requirements. It identifies vulnerabilities, ensures regulatory adherence, and strengthens cybersecurity posture. This systematic approach helps organizations mitigate risks and maintain operational integrity.\n\nHow We Help:\nWe conduct thorough IS audits covering infrastructure security, data governance, access controls, and compliance frameworks. Our certified auditors provide detailed assessments, remediation roadmaps, and ongoing monitoring to ensure your IT environment meets industry standards and regulatory requirements.', color: '#FF5722' },
];

// --- Component Props Interface ---
interface AjaUniverseProps {
  onGoBack?: () => void;
}

// --- The Main Component ---
const AjaUniverse: React.FC<AjaUniverseProps> = ({ onGoBack }) => {
  const [selectedItem, setSelectedItem] = useState<UniverseItem | null>(null);
  //const [isTimelineVisible, setTimelineVisible] = useState(false);

  const handleItemClick = (item: UniverseItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="universe-container">
      <div className="stars"></div>
      <div className="comets"></div>
      
      {/* Back Button */}
      {onGoBack && (
        <button className="back-button" onClick={onGoBack}>
          ← Back
        </button>
      )}

      <h1 className="main-title"></h1>

      <div className="universe-labels">
        <h2 className="products-universe-label">Products </h2>
        <h2 className="service-universe-label">Value Partners</h2>
      </div>

      <div className="items-wrapper">
        {universeItems.map(item => (
          <div
            key={item.id}
            className={`universe-item ${item.side}`}
            style={{ top: item.top, left: item.left }}
            onClick={() => handleItemClick(item)}
          >
            {/* APPLIED the item's color as an inline style */}
            <div className="icon-container" style={{ backgroundColor: item.color }}>
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
              <h3 className="modal-title">{selectedItem.title}</h3>
              <button className="close-button" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              {selectedItem.description.includes('How We Help:') ? (
                <>
                  <p>{selectedItem.description.split('\n\nHow We Help:')[0]}</p>
                  <h4 style={{ 
                    color: '#00e5ff', 
                    marginTop: '20px', 
                    marginBottom: '10px',
                    fontSize: '1.2rem',
                    fontWeight: '600'
                  }}>How We Help:</h4>
                  <div style={{ whiteSpace: 'pre-line' }}>
                    {selectedItem.description.split('\n\nHow We Help:')[1]}
                  </div>
                </>
              ) : (
                <p style={{ whiteSpace: 'pre-line' }}>{selectedItem.description}</p>
              )}
            </div>
              <div className="modal-footer">
                {selectedItem.id === 'vittora1' && (
                  <a
                    className="click-tools-button"
                    href="https://www.altex.dev/vittora"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Access Sandbox
                  </a>
                )}
                {selectedItem.id === 'compliBear' && (
                  <a
                    className="click-tools-button"
                    href="https://www.altex.dev/complibear"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                   Access Sandbox
                  </a>
                )}
              </div>
          </div>
        </div>
      )}
      {/* {isTimelineVisible && <Timeline onClose={() => setTimelineVisible(false)} />} */} 
    </div>
  );
};

export default AjaUniverse;