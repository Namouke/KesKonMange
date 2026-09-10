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

  return (
    <section>
      <h2>Menus de la semaine</h2>

      {days.map((day) => (
        <article key={day}>
          <h3>{day}</h3>
          <label>
            Midi :
            <input type="text" placeholder="Ajouter un menu" />
          </label>
          <label>
            Soir :
            <input type="text" placeholder="Ajouter un menu" />
          </label>
        </article>
      ))}
    </section>
  );
}

export default WeeklyMenu;
