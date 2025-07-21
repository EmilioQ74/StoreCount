import { initDB } from '../db/setupDB'
import * as SQLite from 'expo-sqlite';
import {Product} from '../model/product'


let db: SQLite.SQLiteDatabase | null = null;


export const showTable = async () => {
  if (!db) db = await initDB();
  if (!db) {
    console.error('Database initialization failed');
    return;
  }
  try {
    const getAll = await db.getAllAsync<{ id: number; name: string; box: number }>('SELECT * FROM products;');
    if (getAll.length === 0) {
      console.warn('No products found in the database.');
      return [];
    }
    for await (const product of getAll) {
      console.log(`Product ID: ${product.id}, Name: ${product.name}, Box: ${product.box}`);
    }
    return getAll;
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
};

export const getData = async () => {
  const data = await showTable();
  if (data === null || data.length === 0) {
    console.warn('No data found');
    return [];
  }
  return data.map((p) => ({
    id: p.id.toString(),
    name: p.name,
    box: p.box.toString(),
  }));
};

export const insertProduct = async (id: number, name: string, box: number) => {
  if (!db) db = await initDB();
  if (!db) {
    console.error('Database initialization failed');
    return;
  }

  try {
    const insertStatement = await db.prepareAsync('INSERT INTO products (id, name, box) VALUES (?, ?, ?);');
    await insertStatement.executeAsync([id, name, box]);
    console.log(`Inserted product: id=${id}, name=${name}, box=${box}`);
  } catch (error) {
    console.error('Error inserting product:', error);
  }
};

export const dropTable = async () => {
  if (!db) db = await initDB();
  if (!db) {
    console.error('Database initialization failed');
    return;
  }

  try {
    await db.execAsync('DROP TABLE IF EXISTS products;');
    console.log('Table "products" dropped successfully.');
  } catch (error) {
    console.error('Error dropping table:', error);
  }
};

export const saveTempData = async (data: Product[]) => {
  if (!db) db = await initDB();

  try {
    const stm = await db.prepareAsync('UPDATE products SET box = ? WHERE id = ?;');
    for await (const p of data) {
      await stm.executeAsync([p.box, p.id]);
    }
    alert('Saved successfully');
  } catch {
    console.error('Failed to save');
    return;
  }
};

export const ClearAllBox = async (data: Product[]) => {
  if (!db) db = await initDB();

  try {
    const stm = await db.prepareAsync('UPDATE products SET box = 0 WHERE id = ?;');
    for await (const p of data) {
      await stm.executeAsync([p.id]);
    }
    alert('Cleared');
  } catch {
    console.error('Failed to clear');
    return;
  }
};
export const updateProductBox = async (data:Product) => {
  if (!db) db = await initDB();

  try {
    const stmt = await db.prepareAsync('UPDATE products SET box = ? WHERE id = ?;');
    await stmt.executeAsync([data.box,data.id]);

    console.log(`Product ${data.id} box updated to ${data.box}`);
  } catch (error) {
    console.error('Update failed:', error);
    alert('Update failed');
  }
};
