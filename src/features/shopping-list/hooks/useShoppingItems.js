import { useEffect, useState } from "react";

function useShoppingItems() {
  const [newItem, setNewItem] = useState("");

  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("shoppingItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [completedItems, setCompletedItems] = useState(() => {
    const savedCompletedItems = localStorage.getItem("completedShoppingItems");

    return savedCompletedItems ? JSON.parse(savedCompletedItems) : [];
  });

  function handleAddItem(event) {
    event.preventDefault();

    if (newItem.trim() === "") {
      return;
    }

    setItems([...items, newItem]);
    setNewItem("");
  }

  function handleToggleItem(index) {
    if (completedItems.includes(index)) {
      setCompletedItems(
        completedItems.filter((completedIndex) => completedIndex !== index),
      );
    } else {
      setCompletedItems([...completedItems, index]);
    }
  }

  useEffect(() => {
    localStorage.setItem("shoppingItems", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(
      "completedShoppingItems",
      JSON.stringify(completedItems),
    );
  }, [completedItems]);

  const completedCount = completedItems.length;

  return {
    newItem,
    setNewItem,
    items,
    setItems,
    completedItems,
    setCompletedItems,
    handleAddItem,
    handleToggleItem,
    completedCount,
  };
}

export default useShoppingItems;
