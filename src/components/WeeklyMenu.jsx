import { useEffect, useState } from "react";
import "./WeeklyMenu.css";

function WeeklyMenu() {
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

  function handleMenuChange(day, meal, value) {
    setMenus({
      ...menus,
      [day]: {
        ...menus[day],
        [meal]: value,
      },
    });
  }

  useEffect(() => {
    localStorage.setItem("menus", JSON.stringify(menus));
  }, [menus]);

  function handleClearMenus() {
    const shouldClear = window.confirm(
      "Voulez-vous vraiment effacer tous les menus ?",
    );

    if (shouldClear) {
      setMenus({});
    }
  }

  const currentDate = new Date().toLocaleDateString("fr-FR");

  function getDayDate(index) {
    const today = new Date();
    const currentDay = today.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

    const date = new Date(today);
    date.setDate(today.getDate() + mondayOffset + index);

    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
    });
  }

  return (
    <section className="weekly-menu">
      <h2>Menus de la semaine</h2>
      <p>Aujourd’hui : {currentDate}</p>
      {days.map((day, index) => (
        <article key={day}>
          <h3>
            {day} — {getDayDate(index)}
          </h3>
          <label>
            Midi :
            <input
              type="text"
              placeholder="Ajouter un menu"
              value={menus[day]?.midi || ""}
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
              value={menus[day]?.soir || ""}
              onChange={(event) =>
                handleMenuChange(day, "soir", event.target.value)
              }
            />
          </label>
        </article>
      ))}
      <button type="button" onClick={handleClearMenus}>
        Effacer tous les menus
      </button>
    </section>
  );
}

export default WeeklyMenu;
