import { Link } from "react-router";
import useShoppingHistory from "../features/shopping-history/hooks/useShoppingHistory";
import ShoppingHistory from "../components/ShoppingHistory";

function ShoppingHistoryPage() {
  const { shoppingHistory } = useShoppingHistory();
  return (
    <main>
      <h1>Historique des courses</h1>
      <p>Retrouvez ici vos anciennes listes de courses.</p>
      <ShoppingHistory shoppingHistory={shoppingHistory} />
      <Link to="/">Retour à l’accueil</Link>
    </main>
  );
}

export default ShoppingHistoryPage;
