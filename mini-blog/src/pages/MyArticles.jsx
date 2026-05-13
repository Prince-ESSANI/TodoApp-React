import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import ArticleCard from '../components/ArticleCard';

export default function MyArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/articles/my')
      .then(setArticles)
      .catch(() => setError('Erreur lors du chargement de vos articles.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Chargement...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Mes articles</h1>
        <Link to="/create" className="btn-primary">
          + Nouvel article
        </Link>
      </div>
      {error && <div className="error-msg">{error}</div>}
      {articles.length === 0 ? (
        <div className="empty-state">
          <p>Vous n&apos;avez pas encore d&apos;articles.</p>
          <Link to="/create" className="btn-primary">
            Créer votre premier article
          </Link>
        </div>
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
