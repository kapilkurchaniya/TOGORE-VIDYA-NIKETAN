// MongoDB setup script - Run this to create indexes for better performance
// Execute with: node scripts/setup-mongodb.js

const { MongoClient } = require("mongodb");

async function setupDatabase() {
  const uri = process.env.tagore_vidya_niketan_MONGODB_URI;
  
  if (!uri) {
    console.error("MongoDB URI not found in environment variables");
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("tagore_vidya_niketan");
    const admissionsCollection = db.collection("admissions_inquiries");

    // Create indexes for better query performance
    await admissionsCollection.createIndex({ email: 1 });
    await admissionsCollection.createIndex({ phone: 1 });
    await admissionsCollection.createIndex({ createdAt: -1 });
    await admissionsCollection.createIndex({ status: 1, createdAt: -1 });

    console.log("Indexes created successfully");

    // Log collection stats
    const stats = await admissionsCollection.countDocuments();
    console.log(`Total documents in admissions_inquiries: ${stats}`);

  } catch (error) {
    console.error("Error setting up database:", error);
    process.exit(1);
  } finally {
    await client.close();
    console.log("Database connection closed");
  }
}

setupDatabase();
