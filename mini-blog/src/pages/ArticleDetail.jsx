import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/articles/${id}`)
      .then(setArticle)
      .catch(() => setError('Article introuvable.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet article ?')) return;
    try {
      await api.delete(`/articles/${id}`);
      navigate('/');
    } catch {
      setError('Erreur lors de la suppression.');
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="page"><div className="error-msg">{error}</div><Link to="/">← Retour</Link></div>;
  if (!article) return null;

  const authorId = article.author?._id || article.author?.id || article.author;
  const userId = user?._id || user?.id;
  const isAuthor = user && String(authorId) === String(userId);

  return (
    <div className="page article-detail">
      <Link to="/" className="back-link">← Tous les articles</Link>
      <h1>{article.title}</h1>
      <p className="article-meta">
        Par <strong>{article.author?.email || 'Inconnu'}</strong> —{' '}
        {new Date(article.createdAt).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <div className="article-content">{article.content}</div>
      {isAuthor && (
        <div className="article-actions">
          <Link to={`/edit/${id}`} className="btn-secondary">
            Modifier
          </Link>
          <button onClick={handleDelete} className="btn-danger">
            Supprimer
          </button>
        </div>
      )}
    </div>
  );
}
