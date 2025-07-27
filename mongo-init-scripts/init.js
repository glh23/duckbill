db = db.getSiblingDB('duckbill');

// Create the database if it doesn't exist
db.createUser({
  user: "AdminUser",
  pwd: "BC^!KRRrZY+DT-$H-0Y3U!2G07jGzBf9",
  roles: [{ role: "readWrite", db: "duckbill" }]
});

db.myCollection.insertOne({ initialized: true });
