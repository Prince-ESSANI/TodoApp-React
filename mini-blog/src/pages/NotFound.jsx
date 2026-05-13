import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Cette page n&apos;existe pas.</p>
      <Link to="/" className="btn-primary">
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
