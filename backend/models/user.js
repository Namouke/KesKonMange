function createUserDocument({ email, passwordHash, username }) {
  return {
    email: email.toLowerCase().trim(),
    passwordHash,
    username: username.trim(),
    createdAt: new Date(),
  };
}

export default createUserDocument;
