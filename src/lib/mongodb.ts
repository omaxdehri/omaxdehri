import { MongoClient, Db } from "mongodb";

const uri =
  process.env.MONGODB_DIRECT_URI ||
  process.env.MONGODB_URI ||
  "mongodb+srv://bibhuranjan621_db_user:iziHDJikCwiUrqSE@cluster0.1bilvu7.mongodb.net/orthomax_hospital?appName=Cluster0";
const dbName = process.env.MONGODB_DB || "orthomax_hospital";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName);
}

export default clientPromise;
