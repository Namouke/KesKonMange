import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      window.alert("Les mots de passe ne correspondent pas.");
      return;
    }

    window.alert("Les mots de passe correspondent.");
  }

  return (
    <main>
      <h1>Inscription</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Nom d'utilisateur</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <label htmlFor="email">Adresse e-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />

        <button type="submit">Créer mon compte</button>
      </form>
    </main>
  );
}

export default Register;
