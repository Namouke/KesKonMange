async function createUser(database, userDocument) {
  const usersCollection = database.collection("users");

  return usersCollection.insertOne(userDocument);
}

export default createUser;
