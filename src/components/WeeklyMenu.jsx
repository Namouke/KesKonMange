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

  return (
    <section className="weekly-menu">
      <h2>Menus de la semaine</h2>

      {days.map((day) => (
        <article key={day}>
          <h3>{day}</h3>
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
