import { Link } from "react-router";

function ShoppingHistoryPage() {
  return (
    <main>
      <h1>Historique des courses</h1>
      <p>Retrouvez ici vos anciennes listes de courses.</p>
      <Link to="/">Retour à l’accueil</Link>
    </main>
  );
}

export default ShoppingHistoryPage;
