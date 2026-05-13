import { Link } from 'react-router-dom';

export default function ArticleCard({ article }) {
  const id = article._id || article.id;
  const author = article.author?.email || article.author || 'Inconnu';
  const excerpt = article.content?.substring(0, 150);

  return (
    <div className="article-card">
      <h2>
        <Link to={`/article/${id}`}>{article.title}</Link>
      </h2>
      <p className="article-meta">
        Par <strong>{author}</strong> —{' '}
        {new Date(article.createdAt).toLocaleDateString('fr-FR')}
      </p>
      <p className="article-excerpt">
        {excerpt}{article.content?.length > 150 ? '...' : ''}
      </p>
      <Link to={`/article/${id}`} className="btn-read">
        Lire la suite →
      </Link>
    </div>
  );
}
