import MongoDB from 'mongodb';

export default class MongoDBStrategy {
  #instance;

  constructor(connectionString) {
    // path name is the last parameter after the /
    const { pathname: dbName } = new URL(connectionString);
    this.connectionString = connectionString.replace(dbName, '');

    // remover tudo que não for letras
    this.db = dbName.replace(/\W/, '');

    this.collection = 'warriors';
  }

  async connect() {
    const client = new MongoDB.MongoClient(this.connectionString, {
      useUnifiedTopology: true
    });
    await client.connect();
    const db = client.db(this.db).collection(this.collection);
    this.#instance = db;
  }

  async create(item) {
    return this.#instance.insertOne(item);
  }

  async read(item) {
    return this.#instance.find(item).toArray();
  }
}