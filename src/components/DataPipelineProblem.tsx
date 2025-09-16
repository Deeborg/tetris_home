import React, { useState, useEffect } from "react";
import "./DataPipelineProblem.css";

interface DataPipelineProblemProps {
  onNavigateToAboutAja: () => void;
  onNavigateToUniverse: () => void;
  onGoBack?: () => void;
}

interface NewsItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  impact: string;
  category: 'breakthrough' | 'product' | 'research' | 'industry';
}

interface StatCard {
  title: string;
  value: string;
  description: string;
  icon: string;
  color: string;
}

const DataPipelineProblem: React.FC<DataPipelineProblemProps> = ({ 
  onNavigateToAboutAja, 
  onNavigateToUniverse, 
  onGoBack 
}) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'news' | 'timeline' | 'stats'>('overview');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock AI news data (in production, you'd fetch from RSS or news API)
  const mockNewsData: NewsItem[] = [
    {
      title: "OpenAI Launches GPT-4 Turbo with Enhanced Business Capabilities",
      description: "New model offers improved reasoning for enterprise applications, reducing operational costs by up to 40%",
      link: "#",
      pubDate: "2024-01-15",
      source: "TechCrunch"
    },
    {
      title: "Microsoft Copilot Integration Saves Companies $2.9M Annually",
      description: "Enterprise study shows significant productivity gains across finance and operations departments",
      link: "#",
      pubDate: "2024-01-12",
      source: "Forbes"
    },
    {
      title: "AI-Powered Fraud Detection Prevents $50B in Financial Losses",
      description: "Machine learning algorithms now detect 95% of fraudulent transactions in real-time",
      link: "#",
      pubDate: "2024-01-10",
      source: "Financial Times"
    },
    {
      title: "Automated Data Processing Reduces Manual Work by 80%",
      description: "Companies implementing AI data pipelines see dramatic efficiency improvements",
      link: "#",
      pubDate: "2024-01-08",
      source: "Harvard Business Review"
    }
  ];

  // Enhanced AI Timeline Events
  const timelineEvents: TimelineEvent[] = [
    {
      year: "1950",
      title: "Alan Turing's Test",
      description: "Turing proposes the famous test for machine intelligence, laying the foundation for AI evaluation.",
      impact: "Established the philosophical framework for AI",
      category: "research"
    },
    {
      year: "1956",
      title: "Dartmouth Conference",
      description: "The term 'Artificial Intelligence' is coined, marking the birth of AI as a field.",
      impact: "Birth of AI as an academic discipline",
      category: "research"
    },
    {
      year: "1997",
      title: "Deep Blue Defeats Kasparov",
      description: "IBM's Deep Blue becomes the first computer to defeat a world chess champion.",
      impact: "Proved AI could outperform humans in complex games",
      category: "breakthrough"
    },
    {
      year: "2011",
      title: "IBM Watson Wins Jeopardy!",
      description: "Watson demonstrates natural language processing capabilities on national television.",
      impact: "Showcased AI's potential in understanding human language",
      category: "breakthrough"
    },
    {
      year: "2012",
      title: "Deep Learning Revolution",
      description: "AlexNet wins ImageNet competition, sparking the deep learning boom.",
      impact: "Revolutionized computer vision and neural networks",
      category: "breakthrough"
    },
    {
      year: "2016",
      title: "AlphaGo Defeats Go Champion",
      description: "Google's AlphaGo beats world Go champion Lee Sedol, mastering the most complex board game.",
      impact: "Demonstrated AI's ability to handle intuitive, creative tasks",
      category: "breakthrough"
    },
    {
      year: "2018",
      title: "BERT Transforms NLP",
      description: "Google's BERT model revolutionizes natural language understanding.",
      impact: "Enabled more sophisticated language AI applications",
      category: "research"
    },
    {
      year: "2020",
      title: "GPT-3 Launch",
      description: "OpenAI releases GPT-3, demonstrating unprecedented language generation capabilities.",
      impact: "Sparked the generative AI revolution",
      category: "product"
    },
    {
      year: "2022",
      title: "ChatGPT Goes Viral",
      description: "ChatGPT reaches 100 million users in 2 months, bringing AI to the masses.",
      impact: "Democratized AI access for consumers and businesses",
      category: "product"
    },
    {
      year: "2023",
      title: "Enterprise AI Adoption Surge",
      description: "70% of Fortune 500 companies integrate AI into core business processes.",
      impact: "AI becomes essential for business competitiveness",
      category: "industry"
    },
    {
      year: "2024",
      title: "AI Agents & Automation",
      description: "Autonomous AI agents begin handling complex business workflows end-to-end.",
      impact: "Transforming how businesses operate and make decisions",
      category: "industry"
    }
  ];

  // Statistics Cards
  const statsCards: StatCard[] = [
    {
      title: "Operational Efficiency",
      value: "65%",
      description: "Average increase in operational efficiency through AI automation",
      icon: "⚡",
      color: "#4CAF50"
    },
    {
      title: "Fraud Prevention",
      value: "$2.9M",
      description: "Average annual savings from AI-powered fraud detection systems",
      icon: "🛡️",
      color: "#FF5722"
    },
    {
      title: "Risk Reduction",
      value: "78%",
      description: "Reduction in compliance risks through automated monitoring",
      icon: "📊",
      color: "#2196F3"
    },
    {
      title: "Revenue Growth",
      value: "23%",
      description: "Average revenue increase from AI-driven opportunity identification",
      icon: "💰",
      color: "#FF9800"
    },
    {
      title: "Processing Speed",
      value: "10x",
      description: "Faster data processing compared to traditional methods",
      icon: "🚀",
      color: "#9C27B0"
    },
    {
      title: "Cost Savings",
      value: "45%",
      description: "Reduction in operational costs through intelligent automation",
      icon: "💡",
      color: "#00BCD4"
    }
  ];

  useEffect(() => {
    // Simulate loading news data
    if (activeSection === 'news') {
      setLoading(true);
      setTimeout(() => {
        setNewsItems(mockNewsData);
        setLoading(false);
      }, 1000);
    }
  }, [activeSection]);

  const renderOverview = () => (
    <div className="overview-section">
      <div className="pipeline-flow">
        <h2 className="flow-title">Data Pipeline Flow</h2>
        <div className="flow-diagram">
          <div className="flow-stage">
            <span className="stage-name">Data Collection</span>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-stage">
            <span className="stage-name">Processing</span>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-stage">
            <span className="stage-name">Analysis</span>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-stage">
            <span className="stage-name">Decision</span>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-stage">
            <span className="stage-name">Outcome</span>
          </div>
        </div>
        <p className="flow-description">
          At each stage, clutter or inefficiency can creep in.
        </p>
      </div>
      
      <div className="intro-description">
        <p>
          The business landscape is changing rapidly. Data is growing faster than ever, and with the rise of cloud platforms, AI, and real-time decision-making, companies are under pressure to do more with what they collect. But the reality is different — cluttered, inconsistent, and siloed data is slowing down analytics, leading to delays, wrong insights, compliance risks, and even missed revenue opportunities. As AI becomes central to business strategy, especially with the arrival of generative AI, the quality of data will decide whether companies gain an edge or fall behind. Our focus is simple: cut out the clutter before it clogs the system.
        </p>
      </div>
    </div>
  );

  const renderNews = () => (
    <div className="news-section">
      <h2 className="section-title">
        <span className="title-icon">📰</span>
        Latest AI Business News
      </h2>
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading latest AI news...</p>
        </div>
      ) : (
        <div className="news-grid">
          {newsItems.map((item, index) => (
            <div key={index} className="news-card">
              <div className="news-header">
                <span className="news-source">{item.source}</span>
                <span className="news-date">{new Date(item.pubDate).toLocaleDateString()}</span>
              </div>
              <h3 className="news-title">{item.title}</h3>
              <p className="news-description">{item.description}</p>
              <a href={item.link} className="news-link">Read More →</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderTimeline = () => (
    <div className="timeline-section">
      <h2 className="section-title">
        <span className="title-icon">🕒</span>
        AI Evolution Timeline
      </h2>
      <div className="timeline-container">
        {timelineEvents.map((event, index) => (
          <div key={index} className={`timeline-event ${event.category}`}>
            <div className="timeline-year">{event.year}</div>
            <div className="timeline-content">
              <h3 className="timeline-title">{event.title}</h3>
              <p className="timeline-description">{event.description}</p>
              <div className="timeline-impact">
                <strong>Impact:</strong> {event.impact}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="stats-section">
      <h2 className="section-title">
        <span className="title-icon">📈</span>
        AI & Automation Impact Statistics
      </h2>
      <div className="stats-grid">
        {statsCards.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderColor: stat.color }}>
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-value" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <h3 className="stat-title">{stat.title}</h3>
            <p className="stat-description">{stat.description}</p>
          </div>
        ))}
      </div>
      <div className="stats-summary">
        <h3>Why These Numbers Matter</h3>
        <p>
          Organizations implementing comprehensive AI and automation solutions see transformative results across all business functions. 
          From preventing fraud and reducing risks to capturing new opportunities and streamlining operations, the ROI is clear and measurable. 
          Our solutions help you achieve these industry-leading results while maintaining compliance and security standards.
        </p>
      </div>
    </div>
  );

  return (
    <div className="data-pipeline-container">
      <div className="stars"></div>
      <div className="comets"></div>

      {/* Back Button */}
      {onGoBack && (
        <button className="data-pipeline-back-button" onClick={onGoBack}>
          ← Back
        </button>
      )}

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <button className="nav-button" onClick={onNavigateToAboutAja}>
          About AJA Labs
        </button>
        <button className="nav-button" onClick={onNavigateToUniverse}>
          AJA Universe
        </button>
      </div>

      <div className="content-wrapper">
        <h1 className="main-title">Data Pipeline Problem</h1>
        
        {/* Section Navigation */}
        <div className="section-nav">
          <button 
            className={`section-nav-btn ${activeSection === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveSection('overview')}
          >
            Overview
          </button>
          <button 
            className={`section-nav-btn ${activeSection === 'news' ? 'active' : ''}`}
            onClick={() => setActiveSection('news')}
          >
            AI News
          </button>
          <button 
            className={`section-nav-btn ${activeSection === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveSection('timeline')}
          >
            Timeline
          </button>
          <button 
            className={`section-nav-btn ${activeSection === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveSection('stats')}
          >
            Statistics
          </button>
        </div>

        {/* Dynamic Content */}
        <div className="section-content">
          {activeSection === 'overview' && renderOverview()}
          {activeSection === 'news' && renderNews()}
          {activeSection === 'timeline' && renderTimeline()}
          {activeSection === 'stats' && renderStats()}
        </div>
      </div>
    </div>
  );
};

export default DataPipelineProblem;
