import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import ArticleForm from '../components/ArticleForm';

export default function CreateArticle() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      const article = await api.post('/articles', data);
      navigate(`/article/${article._id || article.id}`);
    } catch (err) {
      setError(err.message || "Erreur lors de la création de l'article.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">Nouvel article</h1>
      {error && <div className="error-msg">{error}</div>}
      <ArticleForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
