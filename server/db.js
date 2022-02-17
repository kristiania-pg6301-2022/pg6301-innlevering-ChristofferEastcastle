import { MongoClient, ObjectId } from "mongodb";

async function getConnection() {
  try {
    const client = new MongoClient(process.env.DB_URI);
    await client.connect();
    return client.db("react-express-heroku");
  } catch (e) {
    console.error(e);
  }
}

export async function tryAuthorize(user) {
  const db = await getConnection();
  const table = db.collection("users");
  if (user.hasOwnProperty("username") && user.hasOwnProperty("password")) {
    const found = await table.findOne(user);
    if (found) return found;
  } else
      return null;
}

export async function isAuthorized(cookies) {
  if (!cookies.id) return false;

  const db = await getConnection();
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(cookies.id) });
  return !!user;

}