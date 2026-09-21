import WeeklyMenu from "../components/WeeklyMenu";
import ShoppingList from "../components/ShoppingList";
import { useState } from "react";

function Home({ onLogout }) {
  const [weekOffset, setWeekOffset] = useState(0);
  return (
    <main>
      <h1>KesKonMange</h1>
      <p>Bienvenue dans ton espace de partage de menus.</p>
      <WeeklyMenu weekOffset={weekOffset} setWeekOffset={setWeekOffset} />
      <ShoppingList />
      <button type="button" onClick={onLogout}>
        Se déconnecter
      </button>
    </main>
  );
}

export default Home;
