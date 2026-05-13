import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import ArticleForm from '../components/ArticleForm';

export default function EditArticle() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/articles/${id}`)
      .then((data) => {
        const authorId = data.author?._id || data.author?.id || data.author;
        const userId = user?._id || user?.id;
        if (String(authorId) !== String(userId)) {
          navigate('/');
          return;
        }
        setArticle(data);
      })
      .catch(() => setError('Article introuvable.'))
      .finally(() => setLoading(false));
  }, [id, user, navigate]);

  const handleSubmit = async (data) => {
    setSaving(true);
    setError('');
    try {
      await api.put(`/articles/${id}`, data);
      navigate(`/article/${id}`);
    } catch (err) {
      setError(err.message || 'Erreur lors de la modification.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error)
    return (
      <div className="page">
        <div className="error-msg">{error}</div>
        <Link to="/">← Retour</Link>
      </div>
    );
  if (!article) return null;

  return (
    <div className="page">
      <h1 className="page-title">Modifier l&apos;article</h1>
      {error && <div className="error-msg">{error}</div>}
      <ArticleForm initialData={article} onSubmit={handleSubmit} loading={saving} />
    </div>
  );
}
