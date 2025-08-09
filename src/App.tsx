import { useState, useEffect } from 'react';
import './App.css';

// NewsAPIから返ってくる記事の型を定義
interface Article {
  title: string;
  url: string;
  source: {
    name: string;
  };
}

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // APIキーを環境変数から読み込む
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    if (!API_KEY) {
      setError("APIキーが設定されていません。");
      setLoading(false);
      return;
    }

    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=トランプ&language=jp&apiKey=${API_KEY}`
      );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [API_KEY]);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return <div>エラー: {error}</div>;
  }

  return (
    <div>
      <h1>トランプ氏に関する日本のニュース</h1>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
            <span> ({article.source.name})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;