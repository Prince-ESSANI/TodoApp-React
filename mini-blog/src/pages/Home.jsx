import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import ArticleCard from '../components/ArticleCard';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/articles')
      .then(setArticles)
      .catch(() => setError('Erreur lors du chargement des articles.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Chargement...</div>;

  return (
    <div className="page">
      <h1 className="page-title">Tous les articles</h1>
      {error && <div className="error-msg">{error}</div>}
      {articles.length === 0 ? (
        <p className="empty-state">Aucun article pour le moment.</p>
      ) : (
        <div className="articles-grid">
          {articles.map((article) => (
            <ArticleCard key={article._id || article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
