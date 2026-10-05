import "./ShoppingList.css";
import ShoppingPeriod from "./ShoppingPeriod";
import { formatDateKey } from "../utils/dateUtils";
import useShoppingHistory from "../features/shopping-history/hooks/useShoppingHistory";
import useShoppingItems from "../features/shopping-list/hooks/useShoppingItems";
import useShoppingPeriod from "../features/shopping-list/hooks/useShoppingPeriod";

function ShoppingList() {
  const todayKey = formatDateKey(new Date());
  const { archiveShoppingList } = useShoppingHistory();

  const {
    newItem,
    setNewItem,
    items,
    completedItems,
    handleAddItem,
    handleToggleItem,
    completedCount,
    resetShoppingItems,
  } = useShoppingItems();

  const {
    startDate,
    endDate,
    setEndDate,
    handleStartDateChange,
    resetShoppingPeriod,
  } = useShoppingPeriod();

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

    archiveShoppingList(archivedList);

    resetShoppingItems();
    resetShoppingPeriod();
  }

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
          Terminer les courses
        </button>
      )}
    </section>
  );
}

export default ShoppingList;
