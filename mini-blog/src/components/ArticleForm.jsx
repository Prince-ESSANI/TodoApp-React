import { useState } from 'react';

export default function ArticleForm({ initialData = {}, onSubmit, loading }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  return (
    <form onSubmit={handleSubmit} className="article-form">
      <div className="form-group">
        <label htmlFor="title">Titre</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Titre de l'article"
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Contenu</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="Rédigez votre article..."
          rows={12}
        />
      </div>
      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Enregistrement...' : 'Enregistrer'}
      </button>
    </form>
  );
}
