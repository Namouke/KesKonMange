import { useEffect, useState } from "react";

function ShoppingList() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("shoppingItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [completedItems, setCompletedItems] = useState(() => {
    const savedCompletedItems = localStorage.getItem("completedShoppingItems");
    return savedCompletedItems ? JSON.parse(savedCompletedItems) : [];
  });

  function handleAddItem() {
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

  function handleClearList() {
    const shouldClear = window.confirm(
      "Voulez-vous vraiment vider toute la liste de courses ?",
    );

    if (shouldClear) {
      setItems([]);
      setCompletedItems([]);
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

  return (
    <section>
      <h2>Liste de courses</h2>
      <input
        type="text"
        placeholder="Ajouter un article"
        value={newItem}
        onChange={(event) => setNewItem(event.target.value)}
      />
      <button type="button" onClick={handleAddItem}>
        Ajouter
      </button>
      <ul>
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>
            <label>
              <input
                type="checkbox"
                checked={completedItems.includes(index)}
                onChange={() => handleToggleItem(index)}
              />
              <span
                style={{
                  textDecoration: completedItems.includes(index)
                    ? "line-through"
                    : "none",
                }}
              >
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <button type="button" onClick={handleClearList}>
        Vider la liste
      </button>
    </section>
  );
}

export default ShoppingList;
