import React from "react";
import "./DataPipelineProblem.css";

interface DataPipelineProblemProps {
  onNavigateToAboutAja: () => void;
  onNavigateToUniverse: () => void;
  onGoBack?: () => void;
}

const DataPipelineProblem: React.FC<DataPipelineProblemProps> = ({ 
  onNavigateToAboutAja, 
  onNavigateToUniverse, 
  onGoBack 
}) => {
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
        
        <div className="timeline-section">
          <h1 className="timeline-title">AI Evolution Timeline (2010 → 2025+)</h1>
          
          <div className="timeline-container">
            <div className="timeline-period">
              <h2 className="period-title">
                <span className="period-icon">🧠</span>
                2010–2014: Deep Learning Breakthroughs
              </h2>
            </div>

            <div className="timeline-period">
              <h2 className="period-title">
                <span className="period-icon">☁️</span>
                2015–2018: NLP & Cloud Era
              </h2>
            </div>

            <div className="timeline-period">
              <h2 className="period-title">
                <span className="period-icon">🚀</span>
                2019–2021: AI Democratization & Industry Adoption
              </h2>
            </div>

            <div className="timeline-period">
              <h2 className="period-title">
                <span className="period-icon">🤖</span>
                2022–Now: Generative & Applied AI
              </h2>
            </div>

            <div className="timeline-period future">
              <h2 className="period-title">
                <span className="period-icon">🔮</span>
                2025 and Beyond: Trustworthy & Real-Time AI
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPipelineProblem;
