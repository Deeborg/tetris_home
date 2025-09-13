import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './AboutAjaLabs.css';

// --- Fully functional SVG Icons --- //
const GearIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const DocumentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const BarChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const PeopleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const ListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>;
const VisionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const CountriesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M5 6h14M5 10h14M5 14h14M5 18h14" /></svg>;
const BrainsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13a1 1 0 011-1h12a1 1 0 110 2H6a1 1 0 01-1-1zM5 9a1 1 0 011-1h12a1 1 0 110 2H6a1 1 0 01-1-1z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM5.472 13.528A4.995 4.995 0 015 12a5 5 0 015-5c1.455 0 2.79.64 3.736 1.623m4.306 1.755A4.995 4.995 0 0119 12a5 5 0 01-5 5c-1.455 0-2.79-.64-3.736-1.623m-4.306-1.755A4.98 4.98 0 008.01 16.5a4.98 4.98 0 004.98-4.98c0-.62-.113-1.21-.32-1.76M12 6a6 6 0 100 12 6 6 0 000-12z" /></svg>;
const ExperienceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const SolutionsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.636-6.364l.707.707M19.071 19.071l-.707-.707M12 21v-1m-6.364-1.636l.707-.707" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18a6 6 0 100-12 6 6 0 000 12z" /></svg>;
const ClientsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" /></svg>;
const PartnersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;

const AboutAjaLabs = () => {
  useEffect(() => {
    // Add class to body to allow scrolling on about page
    document.body.classList.add('about-page');
    return () => {
      document.body.classList.remove('about-page');
    };
  }, []);

  // const timelineData = [
  //   { year: 2016, event: "CoE setup of AJA Labs", icon: <GearIcon /> },
  //   { year: 2018, event: "First Major Project Delivered", icon: <DocumentIcon /> },
  //   { year: 2020, event: "Expansion into New Markets", icon: <BarChartIcon /> },
  //   { year: 2022, event: "Team Growth Milestone", icon: <PeopleIcon /> },
  //   { year: 2024, event: "Launch of New Product Suite", icon: <ListIcon /> },
  // ];

  const statsData = [
    { icon: <VisionIcon />, value: "1", label: "Vision", size: "large" },
    { icon: <CountriesIcon />, value: "4", label: "Countries", size: "medium" },
    { icon: <BrainsIcon />, value: "70+", label: "Intelligent Brains", size: "medium" },
    { icon: <ExperienceIcon />, value: "730+", label: "Man-Years of Experience", size: "large" },
    { icon: <SolutionsIcon />, value: "50+", label: "AI & ML based Solutions", size: "medium" },
    { icon: <ClientsIcon />, value: "80+", label: "Clients Served", size: "horizontal" },
    { icon: <PartnersIcon />, value: "10+", label: "Partners", size: "horizontal" },
  ];

  return (
    <div className="about-section">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        About AJA Labs
      </motion.h1>
      
      {/* Add a subtitle */}
      {/* <motion.p
        className="text-center text-xl text-gray-300 mb-16 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        Pioneering the future of AI and Machine Learning solutions across the globe
      </motion.p> */}

      {/* --- Interactive Timeline --- */}
      {/* <div className="timeline-container">
        <div className="timeline-line"></div>
        {timelineData.map((item, index) => (
          <motion.div
            key={item.year}
            className="timeline-item"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, delay: index * 0.3 },
              },
            }}
          >
            <motion.div
              className="timeline-content"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(0, 255, 255, 0.1)",
              }}
            >
              <h3 className="text-2xl font-bold mb-2">{item.year}</h3>
              <p className="text-gray-300 leading-relaxed">{item.event}</p>
            </motion.div>
            <motion.div
              className="timeline-dot"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {item.icon}
            </motion.div>
          </motion.div>
        ))}
      </div> */}

      {/* --- Interactive Stats Blocks --- */}
      {/* <motion.h2
        className="text-center text-3xl font-bold mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          background: 'linear-gradient(135deg, #00ffff 0%, #0080ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        Our Impact in Numbers
      </motion.h2> */}
      <div className="stats-container">
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            className={`stats-card ${stat.size}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: index * 0.1 },
              },
            }}
          >
            <div className="icon">{stat.icon}</div>
            <div className="value">{stat.value}</div>
            <div className="label">{stat.label}</div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default AboutAjaLabs;
