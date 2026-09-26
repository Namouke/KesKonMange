import { formatDisplayDate } from "../../../utiles/dateUtils";

function ShoppingHistory({ shoppingHistory, onDuplicateList }) {
  if (shoppingHistory.length === 0) {
    return null;
  }

  return (
    <div>
      <h3>Historique des courses</h3>

      {shoppingHistory.map((list) => (
        <article key={list.id}>
          <details>
            <summary>
              {list.startDate && list.endDate
                ? `Du ${formatDisplayDate(list.startDate)} au ${formatDisplayDate(
                    list.endDate,
                  )}`
                : `Liste rapide du ${formatDisplayDate(list.createdAt)}`}
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

            {onDuplicateList && (
              <button type="button" onClick={() => onDuplicateList(list)}>
                Dupliquer cette liste
              </button>
            )}
          </details>
        </article>
      ))}
    </div>
  );
}

export default ShoppingHistory;
