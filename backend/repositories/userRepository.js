async function findUserByEmail(database, email) {
  const usersCollection = database.collection("users");

  return usersCollection.findOne({
    email: email.toLowerCase().trim(),
  });
}

async function createUser(database, userDocument) {
  const usersCollection = database.collection("users");

  return usersCollection.insertOne(userDocument);
}

export { findUserByEmail };
export default createUser;
