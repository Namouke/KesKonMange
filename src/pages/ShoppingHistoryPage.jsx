import { Link, useNavigate } from "react-router";
import useShoppingHistory from "../features/shopping-history/hooks/useShoppingHistory";
import ShoppingHistory from "../features/shopping-history/components/ShoppingHistory";

function ShoppingHistoryPage() {
  const navigate = useNavigate();
  const { shoppingHistory, duplicateShoppingList } = useShoppingHistory();

  function handleDuplicateList(list) {
    const wasDuplicated = duplicateShoppingList(list);

    if (wasDuplicated) {
      navigate("/");
    }
  }

  return (
    <main>
      <h1>Historique des courses</h1>
      <p>Retrouvez ici vos anciennes listes de courses.</p>
      <ShoppingHistory
        shoppingHistory={shoppingHistory}
        onDuplicateList={handleDuplicateList}
      />
      <Link to="/">Retour à l’accueil</Link>
    </main>
  );
}

export default ShoppingHistoryPage;
