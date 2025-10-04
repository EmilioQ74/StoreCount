import * as SQLite from 'expo-sqlite'
import * as init  from './init';
import { Product } from '../model/Product';

let db = init.db;

export const getAllProducts = async (tableName:string = init.tempTable):Promise<Product[]>=>{
    if(db===null) db = await init.init();
    
    try{
        let result:any[];
        if(tableName==='')return;
        if(tableName === init.tempTable){
            result = await db.getAllAsync(`SELECT * FROM ${tableName} WHERE deleted = 0;`);
        }else{
            result = await db.getAllAsync(`SELECT * FROM ${tableName}`);
        }
        return result ? result.map((item: any) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            difference: item.difference ?? null
        })) : [];
    }catch(error){
        console.error(`Unable to get all products ${error}`);
    }finally{
        
    }
}

export const insertProduct = async(name:string,tableName:string = init.tempTable)=>{
   if(db===null) db = await init.init();
    const stmt = await db.prepareAsync(`INSERT INTO ${tableName} (name,quantity,difference) VALUES (?,0,0);`);
    try{
        await stmt.executeAsync([name]);
    }catch(error)
    {
        console.error(error);
    }finally{
        await stmt.finalizeAsync();
        
    }
}

export const modifyProduct = async(id:number,name:string,tableName:string = init.tempTable)=>{
   if(db===null) db = await init.init();
   let stmt;
   console.log('here')
   if(tableName===init.tempTable)
   {
    stmt = await db.prepareAsync(`UPDATE ${tableName} SET name = ?, deleted = 0 WHERE id = ?;`);
   }else{
    stmt = await db.prepareAsync(`UPDATE ${tableName} SET name = ? WHERE id = ?;`);
   }
    try{
        await stmt.executeAsync([name,id]);
    }catch(error)
    {
        console.error(error);
    }finally{
        await stmt.finalizeAsync();
        
    }
}

export const modifyProductQuantity = async(id:number,quantity:number,tableName:string = init.tempTable)=>{
   if(db===null) db = await init.init();
    const stmt = await db.prepareAsync(`UPDATE ${tableName} SET quantity = ? WHERE id = ?;`);
    try{
        await stmt.executeAsync([quantity,id]);
    }catch(error)
    {
        console.error('Unable to Modify product Quantity')
    }finally{
        await stmt.finalizeAsync();
        
    }
}
export const modifyProductDifference = async(id:number,quantity:number,tableName:string = init.tempTable)=>{
   if(db===null) db = await init.init();
    const stmt = await db.prepareAsync(`UPDATE ${tableName} SET difference = ? WHERE id = ?;`);
    try{
        await stmt.executeAsync([quantity,id]);
    }catch(error)
    {
        console.error('Unable to Modify product Difference')
    }finally{
        await stmt.finalizeAsync();
        
    }
}

export const deleteProductById = async(id:number,tableName:string = init.tempTable)=>{
   if(db===null) db = await init.init();
    let stmt;
   if (tableName === init.tempTable) {
        stmt = await db.prepareAsync(`UPDATE ${init.tempTable} SET name = 'test' , quantity = 0 ,deleted = 1 
                                         WHERE id = ?;`);
   } else {
        stmt = await db.prepareAsync(`DELETE FROM ${tableName} WHERE id = ${id};`);
   }
    try{
        await stmt.executeAsync([id]);
    }catch(error)
    {
        console.error(error);
    }finally{
        await stmt.finalizeAsync();
        
    }
}


export const getFirstDeletedProduct= async():Promise<number|null>=>{
   if(db===null) db = await init.init();
    try {
        const result = await db.getFirstAsync(`SELECT id FROM ${init.tempTable} WHERE deleted = 1 ORDER BY id ASC;`) as {id:number};
        return result ? Number(result.id) : null;
    } catch (error) {
        console.error(error);
    }finally{
        
    }
}

export const checkIfProductExist = async(name:string,tableName:string = init.tempTable):Promise<Boolean>=>{
   if(db===null) db = await init.init();
    try{
        let result;
        if(tableName === init.tempTable)
        {
            result = await db.getFirstAsync(`SELECT name FROM ${init.tempTable} WHERE name = ? AND deleted = 0 COLLATE NOCASE;`,[name]);
        }else{
            result = await db.getFirstAsync(`SELECT name FROM ${init.tempTable} WHERE name = ? COLLATE NOCASE;`,[name]);
        }
       
        return result ? true : false;
    }catch(error){
        console.error(`Unable to get if name exist ${error}`);
        return null;
    }finally{
        
    }
}


export const getProductById = async(id:number,tableName:string = init.tempTable):Promise<Product|null>=>{
   if(db===null) db = await init.init();
    try{
        console.log(`Fetching product with ID: ${id}`);
        const result:Product = await db.getFirstAsync(`SELECT * FROM ${tableName} WHERE id = ?;`,[id]);
        console.log(result);
        return result ? {
            id: result.id,
            name: result.name,
            quantity: result.quantity,
            difference: result.difference ?? null
        } : null;
    }catch(error){
        console.error(`Unable to get product by id ${error}`);
        return null;
    }finally{
        
    }
}

export const getTableNameById = async(id:number,tableName:string):Promise<any>=>{
    if(db === null) db = await init.init();
    try{
        const result = await db.getFirstAsync<{name:string}>(`SELECT name FROM ${tableName} WHERE id = ? ;`,[id]);
        return result?{
            name:result.name,
        }: null;
    }catch(error)
    {
        console.error(`Unable to get the name from table ${tableName}: ${error}`);
    }
}

export const createTable = async(tableName:string):Promise<Boolean>=>
{
   if(db===null) db = await init.init();

    try{
        if(await init.checkIfTableExist(tableName))
        {
            console.log(`${tableName} table exist`);
            return true;
        }
        const result = await db.runAsync(`CREATE TABLE IF NOT EXISTS ${tableName}(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                quantity REAL NOT NULL,
                difference REAL NOT NULL
                );`);
        
        return result ? true : false;
    }catch(error)
    {
        console.log(`Error at creating a table ${error}`)
        return null;
    }finally{
        
    }
}


export const saveRecord = async(tableName:string)=>{
   if(db===null) db = await init.init();
    
    try{
    if(!(await init.checkIfTableExist(`record`)))
    {
        await db.runAsync(`CREATE TABLE IF NOT EXISTS record(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL);`);
    }
       await db.execAsync(`INSERT INTO record (name) VALUES ('${tableName}')`);
    }catch(error)
    {
        console.log(`Error at saving record ${error}`);
    }finally{
        
    }
}

export const saveTable = async(tableName:string,data:Product[])=>{
   if(db===null) db = await init.init();
    try{
        if(!(await createTable(tableName)))
        {
            console.log(`Unable to Save table!`);
            return;
        }
        const stmt = await db.prepareAsync(`INSERT INTO ${tableName} (name,quantity,difference) VALUES (?,?,?);`)
        for(const p of data)
        {
            await stmt.executeAsync([p.name,p.quantity,p.difference]);
        }
        await stmt.finalizeAsync();
        await saveRecord(tableName);
        
    }catch(error)
    {
        console.log(`Error at saving the table:${error}`);
    }finally{
        
    }
}
