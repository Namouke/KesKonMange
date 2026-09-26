import { useState } from "react";

function useShoppingHistory() {
  const [shoppingHistory] = useState(() => {
    const savedHistory = localStorage.getItem("shoppingHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  function duplicateShoppingList(list) {
  const savedItems = localStorage.getItem("shoppingItems");
  const currentItems = savedItems ? JSON.parse(savedItems) : [];

  if (currentItems.length > 0) {
    const shouldReplace = window.confirm(
      "La liste actuelle contient déjà des articles. Voulez-vous la remplacer ?",
    );

    if (!shouldReplace) {
      return false;
    }
  }

  const duplicatedItems = list.items.map((item) => item.name);

  localStorage.setItem("shoppingItems", JSON.stringify(duplicatedItems));
  localStorage.setItem("completedShoppingItems", JSON.stringify([]));
  localStorage.setItem("shoppingStartDate", "");
  localStorage.setItem("shoppingEndDate", "");

  return true;
}

  return { shoppingHistory, duplicateShoppingList };
}



export default useShoppingHistory;