import { useState } from "react";

function useShoppingHistory() {
  const [shoppingHistory] = useState(() => {
    const savedHistory = localStorage.getItem("shoppingHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  return { shoppingHistory };
}

export default useShoppingHistory;