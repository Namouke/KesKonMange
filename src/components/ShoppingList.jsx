import { useEffect, useState } from "react";

function ShoppingList() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("shoppingItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  function handleAddItem() {
    if (newItem.trim() === "") {
      return;
    }

    setItems([...items, newItem]);
    setNewItem("");
  }

  useEffect(() => {
    localStorage.setItem("shoppingItems", JSON.stringify(items));
  }, [items]);

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
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default ShoppingList;
