import { useEffect, useState } from "react";
import "./ShoppingList.css";
import { formatDateKey } from "../utiles/weekUtils";

function formatDisplayDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

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
    if (!startDate || !endDate) {
      window.alert("Sélectionne une date de début et une date de fin.");
      return;
    }

    const archivedList = {
      id: Date.now(),
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
      <label className="shopping-date">
        Du :
        <input
          type="date"
          value={startDate}
          min={todayKey}
          onChange={handleStartDateChange}
        />
      </label>
      <label className="shopping-date">
        Au :
        <input
          type="date"
          value={endDate}
          min={startDate}
          disabled={!startDate}
          onChange={(event) => setEndDate(event.target.value)}
        />
      </label>
      {startDate && endDate && (
        <p>
          Courses prévues du {formatDisplayDate(startDate)} au{" "}
          {formatDisplayDate(endDate)}
        </p>
      )}
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
      {shoppingHistory.length > 0 && (
        <div>
          <h3>Historique des courses</h3>

          {shoppingHistory.map((list) => (
            <article key={list.id}>
              <details>
                <summary>
                  Du {formatDisplayDate(list.startDate)} au{" "}
                  {formatDisplayDate(list.endDate)}
                </summary>

                <ul>
                  {list.items.map((item, index) => (
                    <li key={`${list.id}-${index}`}>
                      <span className={item.completed ? "completed" : ""}>
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ShoppingList;
