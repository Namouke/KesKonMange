import { useEffect, useState } from "react";
import "./WeeklyMenu.css";

function WeeklyMenu({ weekOffset, setWeekOffset }) {
  const days = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  const [menus, setMenus] = useState(() => {
    const savedMenus = localStorage.getItem("menus");
    return savedMenus ? JSON.parse(savedMenus) : {};
  });

  function getDayDateObject(index) {
    const today = new Date();
    const currentDay = today.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

    const date = new Date(today);
    date.setDate(today.getDate() + mondayOffset + index + weekOffset * 7);

    return date;
  }

  function getMenuKey(day) {
    const dayIndex = days.indexOf(day);
    const date = getDayDateObject(dayIndex);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const dayNumber = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${dayNumber}`;
  }

  function getMenuValue(day, meal) {
    const menuKey = getMenuKey(day);

    return (
      menus[menuKey]?.[meal] ??
      (weekOffset === 0 ? menus[day]?.[meal] : "") ??
      ""
    );
  }

  function handleMenuChange(day, meal, value) {
    const menuKey = getMenuKey(day);

    setMenus({
      ...menus,
      [menuKey]: {
        ...menus[menuKey],
        [meal]: value,
      },
    });
  }

  useEffect(() => {
    localStorage.setItem("menus", JSON.stringify(menus));
  }, [menus]);

  function handleClearMenus() {
    const shouldClear = window.confirm(
      "Voulez-vous vraiment effacer les menus de cette semaine ?",
    );

    if (shouldClear) {
      const updatedMenus = { ...menus };

      days.forEach((day) => {
        delete updatedMenus[getMenuKey(day)];

        if (weekOffset === 0) {
          delete updatedMenus[day];
        }
      });

      setMenus(updatedMenus);
    }
  }

  const currentDay = new Date().getDay();
  const currentDayIndex = currentDay === 0 ? 6 : currentDay - 1;

  function getDayDate(index) {
    return getDayDateObject(index).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
    });
  }

  const hasMenus = days.some((day) => {
    const menuKey = getMenuKey(day);
    const dayMenus =
      menus[menuKey] ?? (weekOffset === 0 ? menus[day] : undefined);

    return dayMenus?.midi?.trim() || dayMenus?.soir?.trim();
  });

  function handlePreviousWeek() {
    setWeekOffset(weekOffset - 1);
  }

  function handleNextWeek() {
    setWeekOffset(weekOffset + 1);
  }

  function handleCurrentWeek() {
    setWeekOffset(0);
  }

  const weekStart = getDayDateObject(0).toLocaleDateString("fr-FR");
  const weekEnd = getDayDateObject(6).toLocaleDateString("fr-FR");

  return (
    <section className="weekly-menu">
      <h2>Menus de la semaine</h2>
      <div className="week-navigation">
        <button type="button" onClick={handlePreviousWeek}>
          Semaine précédente
        </button>
        <button type="button" onClick={handleCurrentWeek}>
          Semaine actuelle
        </button>
        <button type="button" onClick={handleNextWeek}>
          Semaine suivante
        </button>
      </div>
      <p>
        Semaine du {weekStart} au {weekEnd}
      </p>
      {days.map((day, index) => (
        <article
          key={day}
          className={
            weekOffset === 0 && index === currentDayIndex ? "current-day" : ""
          }
        >
          <h3>
            {day} — {getDayDate(index)}
          </h3>
          <label>
            Midi :
            <input
              type="text"
              placeholder="Ajouter un menu"
              value={getMenuValue(day, "midi")}
              onChange={(event) =>
                handleMenuChange(day, "midi", event.target.value)
              }
            />
          </label>
          <label>
            Soir :
            <input
              type="text"
              placeholder="Ajouter un menu"
              value={getMenuValue(day, "soir")}
              onChange={(event) =>
                handleMenuChange(day, "soir", event.target.value)
              }
            />
          </label>
        </article>
      ))}
      {hasMenus && (
        <button type="button" onClick={handleClearMenus}>
          Effacer les menus de cette semaine
        </button>
      )}
    </section>
  );
}

export default WeeklyMenu;
