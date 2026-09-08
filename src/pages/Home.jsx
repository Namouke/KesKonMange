function Home({ onLogout }) {
  return (
    <main>
      <h1>KesKonMange</h1>
      <p>Bienvenue dans ton espace de partage de menus.</p>
      <button type="button" onClick={onLogout}>
        Se déconnecter
      </button>
    </main>
  );
}

export default Home;
