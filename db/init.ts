
import data from '../assets/defaultProducts.json'
import * as SQLite from 'expo-sqlite';
import { DB, TEMP_TABLE } from '@env';

export const tempTable = TEMP_TABLE;
export const dbName = DB;

export let db:SQLite.SQLiteDatabase = null;


export const init = async ():Promise<SQLite.SQLiteDatabase>=>{
    if(db === null){
        db = await SQLite.openDatabaseAsync(`${dbName}.db`);
    }
    return db;
}

export const closeDB = async () => {
    if(db===null) return;
  try {
    await db.closeAsync();
    console.log("DB closed");
    db = null;
  } catch (e) {
    console.log("Failed to close DB:", e);
  }
};


export const setup = async () => {
    if(!db){db=await init();}
    if(!db){console.error(`Database could not initialized`)}
    try{
        console.log(`Check if table Products exist...`);
        if(await checkIfTableExist(tempTable))
            if(!(await checkIfTableHasData(tempTable)))
                await insertDefaultProducts(tempTable);
            else
            {
                console.log(`Table Exist`);
                
                return;
            }

        console.log(`Creating table ${tempTable}`);
        await db.runAsync(`CREATE TABLE IF NOT EXISTS ${tempTable}(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            quantity REAL DEFAULT 0,
            difference REAL DEFAULT 0,
            deleted BOOLEAN DEFAULT FALSE
            );`);
        console.log("done");
    }catch(error){
        console.error(`error ${error}`);
    }finally
    {
        
    }
}

export const getAllTable = async()=>
{
    
    if(db === null ) db = await init();
    try{
        const result = await db.getAllAsync(`SELECT name FROM sqlite_master WHERE type = "table";`);
        const jsonResult = JSON.stringify(result,null,2)
        console.log(jsonResult)
    }catch(error)
    {
        console.log(`Error at getting database tables ${error}`)
    }finally
    {
        
    }
}

export const getTableData=async(tableName:string)=>
{
    if(db===null) db = await init();
    try{
        const result = await db.getAllAsync<{id:string,name:string}>(`SELECT id,name FROM ${tableName}`);
        
        return result ? result.map((item: any) => ({
            id: item.id,
            name: item.name,
        })) : [];
    }catch(error)
    {
        console.log(`Error at getting table data`)
    }finally
    {
        
    }
}

export const deleteTable = async(tableName:string = tempTable)=>{
    if(db===null) db = await init();
    try{
    await db.execAsync(`DROP TABLE IF EXISTS ${tableName};`);
    }catch(error){
        console.log(`Error at deleting table ${tableName} : ${error}`);
    }finally
    {
        
    }
}

export const checkIfTableExist = async (tableName: string):Promise<Boolean> => {
    if(db === null) db = await init();
    try{
        const result = await db.getAllAsync(`SELECT name FROM sqlite_master WHERE type="table" AND name=?;`,
        [tableName]);
        
        return result.length > 0;
    }catch(error){
        console.log(`Error at getting table if exist ${error}`);
    }finally{
        
    }
};

const checkIfTableHasData = async(tableName:string):Promise<Boolean>=>{
    if(db === null) await init();
    try {
        const result = await db.getAllAsync(`SELECT * FROM ${tableName};`);
        
        return result.length > 0;
    } catch (error) {
        console.log(`Error at getting if table has data ${error}`);
    }finally{
        
    }
}

const insertDefaultProducts = async(tableName:string)=>{
    const stmt = await db.prepareAsync(`INSERT INTO ${tableName} (name,quantity) VALUES (?,?);`);
    try{
        for(const d of data){
        await stmt.executeAsync([d.name,d.box])
        }
        console.log(`Succes inserting all the data`);
    }catch(error){
        console.error(`Error at inserting all the data ${error}`);
    }finally{
        stmt.finalizeAsync();
        
    }
}

import * as FileSystem from 'expo-file-system';

export const DeleteDatabase = async()=>{
    await closeDB();
    await FileSystem.deleteAsync(`${FileSystem.documentDirectory}SQLite/${dbName}.db`,{ idempotent: true });
}