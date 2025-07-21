import * as SQLite from 'expo-sqlite';
import product from '../assets/defaultProducts.json';

let db: SQLite.SQLiteDatabase | null = null;


// Function to initialize the database
export const initDB = async () =>{
    db = await SQLite.openDatabaseAsync('StoreCount.db');
    if (!db) {
        console.error('Failed to open database');
        return null;
    }
    return db;
}



export const setupDB = async () => {
    db = await initDB();
    if (!db) {
      console.error('Database initialization failed');
      return;
    }
    try {
      console.log('Checking if "products" table exists...');
      const resultTable = await db.getAllAsync('SELECT name FROM sqlite_master WHERE type="table" AND name="products"');
      if (resultTable.length === 0) {
        console.log('Table "products" does not exist, creating it...');
        await db.execAsync(`CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          box REAL NOT NULL
        );`);
        console.log('✅ Table "products" created successfully');
      }

      // Insert default products if the table is empty
      const resultProducts = await db.getAllAsync('SELECT 1 FROM products LIMIT 1');
      if(resultProducts.length > 0) 
      {
        console.log("Table 'products' already has data, skipping default insertions.");
      }else {
        console.log('Inserting default products...');
        const insertStatement = await db.prepareAsync('INSERT INTO products (id, name, box) VALUES (?, ?, ?);');
        for (const productItem of product) {
          await insertStatement.executeAsync([productItem.id, productItem.name, productItem.box]);
          console.log(`Inserted product: ${productItem.name}`);
        }
        console.log('✅ Default products inserted successfully');
      }
    } catch (error) {
      console.error('Error during database setup:', error);
    }
  }