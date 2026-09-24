import { formatDisplayDate } from "../utiles/dateUtils";

function ShoppingPeriod({
  startDate,
  endDate,
  todayKey,
  onStartDateChange,
  onEndDateChange,
}) {
  return (
    <>
      <label className="shopping-date">
        Du :
        <input
          type="date"
          value={startDate}
          min={todayKey}
          onChange={onStartDateChange}
        />
      </label>

      <label className="shopping-date">
        Au :
        <input
          type="date"
          value={endDate}
          min={startDate}
          disabled={!startDate}
          onChange={(event) => onEndDateChange(event.target.value)}
        />
      </label>

      {startDate && endDate && (
        <p>
          Courses prévues du {formatDisplayDate(startDate)} au{" "}
          {formatDisplayDate(endDate)}
        </p>
      )}
    </>
  );
}

export default ShoppingPeriod;
