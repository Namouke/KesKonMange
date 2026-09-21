import { useEffect, useState } from "react";
import "./ShoppingList.css";

function ShoppingList() {
  const [newItem, setNewItem] = useState("");
  const [startDate, setStartDate] = useState(
    () => localStorage.getItem("shoppingStartDate") || "",
  );

  const [endDate, setEndDate] = useState(
    () => localStorage.getItem("shoppingEndDate") || "",
  );
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

  function handleClearList() {
    const shouldClear = window.confirm(
      "Voulez-vous vraiment vider toute la liste de courses ?",
    );

    if (shouldClear) {
      setItems([]);
      setCompletedItems([]);
      setStartDate("");
      setEndDate("");
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

  useEffect(() => {
    localStorage.setItem("shoppingStartDate", startDate);
    localStorage.setItem("shoppingEndDate", endDate);
  }, [startDate, endDate]);

  const completedCount = completedItems.length;

  return (
    <section className="shopping-list">
      <h2>Liste de courses</h2>
      <label>
        Du :
        <input
          type="date"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
        />
      </label>
      <label>
        Au :
        <input
          type="date"
          value={endDate}
          min={startDate}
          onChange={(event) => setEndDate(event.target.value)}
        />
      </label>
      <p>
        {completedCount} article{completedCount > 1 ? "s" : ""} acheté
        {completedCount > 1 ? "s" : ""} sur {items.length}
      </p>
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Ajouter un article"
          value={newItem}
          onChange={(event) => setNewItem(event.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>
      {items.length === 0 && <p>La liste de courses est vide.</p>}
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
                className={completedItems.includes(index) ? "completed" : ""}
              >
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>
      {items.length > 0 && (
        <button type="button" onClick={handleClearList}>
          Vider la liste
        </button>
      )}
    </section>
  );
}

export default ShoppingList;
