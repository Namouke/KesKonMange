import bcrypt from "bcryptjs";

async function hashPassword(password) {
  const saltRounds = 12;

  return bcrypt.hash(password, saltRounds);
}

export default hashPassword;
