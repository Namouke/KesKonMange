import bcrypt from "bcryptjs";

async function hashPassword(password) {
  const saltRounds = 12;

  return bcrypt.hash(password, saltRounds);
}

async function comparePassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash);
}

export { comparePassword };
export default hashPassword;
