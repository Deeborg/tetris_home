import React, { useState, useEffect } from 'react';

interface NewsItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
}

const News: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRSSFeed = async () => {
    setLoading(true);
    setError(null);
    
    const RSS_FEED_URL = 'https://aibusiness.com/rss.xml';
    const PROXY_URL = 'https://api.rss2json.com/v1/api.json?rss_url=';
    
    try {
      const response = await fetch(`${PROXY_URL}${encodeURIComponent(RSS_FEED_URL)}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      
      if (data.status === 'ok') {
        const processedArticles = data.items.slice(0, 6).map((item: any) => ({
          title: item.title,
          description: item.description?.replace(/<[^>]*>/g, '').substring(0, 150) + '...' || 'No description available.',
          link: item.link,
          pubDate: new Date(item.pubDate).toLocaleDateString(),
          source: data.feed.title || 'AI News'
        }));
        
        setNewsItems(processedArticles);
      } else {
        throw new Error('Failed to fetch RSS feed data.');
      }
    } catch (err: any) {
      setError('Failed to load AI news. Please try again later.');
      console.error('RSS fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRSSFeed();
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading latest AI news...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={fetchRSSFeed} className="cta-button">Try Again</button>
      </div>
    );
  }

  // KEY CHANGE IS HERE:
  return (
    <div className="news-grid">
      {newsItems.map((item, index) => (
        // 1. This is now a simple <div>, so the card is not clickable.
        <div key={index} className="news-card">
          <h3 className="news-title">{item.title}</h3>
          <p className="news-description">{item.description}</p>
          
          {/* 2. This is the new button. ONLY this part is a link. */}
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="read-more-link">
            Read More →
          </a>
        </div>
      ))}
    </div>
  );
};

export default News;