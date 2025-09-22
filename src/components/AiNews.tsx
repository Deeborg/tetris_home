import React, { useState, useEffect } from 'react';

interface NewsItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
}

const ITEMS_PER_PAGE = 6;

const News: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
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
        const processedArticles = data.items.map((item: any) => ({
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
  
  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(newsItems.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = newsItems.slice(indexOfFirstItem, indexOfLastItem);
  
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  
  // --- NEW LOGIC: Calculate which page numbers to display ---
  const getPageNumbers = () => {
    if (totalPages <= 2) {
      // If there are only 1 or 2 pages, show all of them
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    if (currentPage === totalPages) {
      // If on the last page, show the last two pages (e.g., [3, 4])
      return [totalPages - 1, totalPages];
    }
    
    // Otherwise, show the current page and the next one (e.g., [1, 2] or [2, 3])
    return [currentPage, currentPage + 1];
  };

  const pageNumbersToDisplay = getPageNumbers();

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

  return (
    <>
      <div className="news-grid">
        {currentItems.map((item, index) => (
          <div key={index} className="news-card">
            <h3 className="news-title">{item.title}</h3>
            <p className="news-description">{item.description}</p>
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="read-more-link">
              Read More →
            </a>
          </div>
        ))}
      </div>

      {/* --- PAGINATION CONTROLS (Using the new dynamic page numbers) --- */}
      <div className="pagination-controls">
        <button 
          onClick={handlePrevPage} 
          className="page-btn" 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        {/* We now map over the limited set of page numbers */}
        {pageNumbersToDisplay.map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`page-btn ${currentPage === pageNumber ? 'active' : ''}`}
          >
            {pageNumber}
          </button>
        ))}

        <button 
          onClick={handleNextPage} 
          className="page-btn" 
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default News;