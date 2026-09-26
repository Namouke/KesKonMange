import { useEffect, useState } from "react";
import "./ShoppingList.css";
import ShoppingHistory from "../features/shopping-history/components/ShoppingHistory";
import ShoppingPeriod from "./ShoppingPeriod";
import { formatDateKey } from "../utiles/dateUtils";

function ShoppingList() {
  const todayKey = formatDateKey(new Date());
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

  function handleStartDateChange(event) {
    const newStartDate = event.target.value;

    setStartDate(newStartDate);

    if (endDate && endDate < newStartDate) {
      setEndDate("");
    }
  }

  const [shoppingHistory, setShoppingHistory] = useState(() => {
    const savedHistory = localStorage.getItem("shoppingHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
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

  function handleArchiveList() {
    if ((startDate && !endDate) || (!startDate && endDate)) {
      window.alert(
        "Sélectionne les deux dates pour créer une période complète.",
      );
      return;
    }

    const archivedList = {
      id: Date.now(),
      createdAt: todayKey,
      startDate: startDate,
      endDate: endDate,
      items: items.map((item, index) => ({
        name: item,
        completed: completedItems.includes(index),
      })),
    };

    setShoppingHistory([...shoppingHistory, archivedList]);

    setItems([]);
    setCompletedItems([]);
    setStartDate("");
    setEndDate("");
  }

  function handleDuplicateList(list) {
    if (items.length > 0) {
      const shouldReplace = window.confirm(
        "La liste actuelle contient déjà des articles. Voulez-vous la remplacer ?",
      );

      if (!shouldReplace) {
        return;
      }
    }

    const duplicatedItems = list.items.map((item) => item.name);

    setItems(duplicatedItems);
    setCompletedItems([]);
    setStartDate("");
    setEndDate("");
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

  useEffect(() => {
    localStorage.setItem("shoppingHistory", JSON.stringify(shoppingHistory));
  }, [shoppingHistory]);

  const completedCount = completedItems.length;

  return (
    <section className="shopping-list">
      <h2>Liste de courses</h2>
      <ShoppingPeriod
        startDate={startDate}
        endDate={endDate}
        todayKey={todayKey}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={setEndDate}
      />
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
        <button type="button" onClick={handleArchiveList}>
          Terminer et archiver la liste
        </button>
      )}
      <ShoppingHistory
        shoppingHistory={shoppingHistory}
        onDuplicateList={handleDuplicateList}
      />
    </section>
  );
}

export default ShoppingList;
