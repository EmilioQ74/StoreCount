import { checkIfProductExist, deleteProductById, getAllProducts, getFirstDeletedProduct, getProductById, insertProduct, modifyProduct, modifyProductQuantity, saveTable } from "db/commads";
import { tempTable } from "db/init";
import { useAlertModal } from "modal/SCAlert";
import { Product } from "model/Product";
import React  from "react";

export function useProducts(tableName:string = tempTable) {

    const [products,setProducts] = React.useState<Product[]>([]);
    const [loading,setLoading] = React.useState(true);
    const [error,setError] = React.useState<Error | null>(null);
    const{alertUser} = useAlertModal();

     const fetchProducts = async () => {
        if(!tableName) return;
      setLoading(true); // start loading
      try {
        console.log(tableName)
        const data = await getAllProducts(tableName); // await SQLite query
        setProducts(data);
      } catch (err: any) {
        setError(err);
      } finally {
       setLoading(false);
      }
    };

    const addProduct = React.useCallback(async()=>{
    try{
        const input = await alertUser(`prompt`,`Add Product`,`Enter The Product`,`Confirm`,`Cancel`);
        console.log(`User Input: ${input}`);
        if(await checkIfProductExist(input as string)){
            alertUser(`alert`,`Product Exist`,`The product "${input}" already exists.`,`OK`,`Cancel`);
            console.log(`Product exist`);
            return;
        }
        if(!input){console.error(`User Input Invalid`);return;}
        if(tableName!== tempTable){
            await insertProduct(input,tableName);
            return;
        }
        const availableID = await getFirstDeletedProduct();
        console.log(availableID);
        if(availableID === null){
            await insertProduct(input);
            console.log(`Product: ${input} added`);
            await fetchProducts();
            return;
        }
        modifyProduct(availableID,input);
        console.log(`Product: ${input} add at ID: ${availableID}`);
    }catch(error){
        console.error(`Unable to Add Product ${error}`);
    }finally{
        await fetchProducts();
    }
    },[fetchProducts]);


    const deleteProduct = React.useCallback(async(id:number)=>{
    try{
        if(id === null || id === undefined){
            console.log(`No Product Selected to delete`);
            return;
        }
        const product = await getProductById(Number(id),tableName);
        if(!product){
            console.log(`Product not found`);
            return;
        }
        const input = await alertUser(`alert`,`Delete Product`,`Are you sure to delete ${product.name}`,`Yes`,`No`);
        if(input=== null){
            console.log(`Product not Deleted`);
            return;
        }else{
            await deleteProductById(product.id as number,tableName);
            console.log(`Product Deleted`);
        }
        }catch(error){
            console.error(`Unable to Delete Product ${error}`);
        }finally{
             await fetchProducts();
        }
    },[fetchProducts]);


    const UpdateProductName = React.useCallback(async(id:number|string)=>{
        try{
            const product = await getProductById(Number(id),tableName);
            if(!product){
                console.log(`Product not found`);
                return;
            }
            const input = await alertUser(`prompt`,`Modify Product`,`Enter The New Product Name from ${product.name}`,`Confirm`,`Cancel`);
            if(input === `` || input === null){
                console.log(`User Input Invalid`);
                return;
            }
            await modifyProduct(Number(id),input,tableName);
            console.log(`Product: ${product.name} modified to ${input}`);
        }catch(error){
            console.error(`Unable to Modify Product ${error}`);
        }finally{
             await fetchProducts();
        }
    },[fetchProducts]);


    const updateProductQuantity = React.useCallback(async(id:number,number:number)=>{
        try{
            await modifyProductQuantity(id,number,tableName);
        }catch(error)
        {
            console.log(error);
        }
        finally{
             await fetchProducts();
        }
    },[fetchProducts]);


    const SaveData = async()=>{
        try{
            const input = await alertUser(`prompt`,`Save Products Count`,`Enter The name of the table`,`Save`,`Exit`);
            if(!input)
            {
                await alertUser(`alert`,`Unable To Save Table`,`The table was not saved`,`Confirm`,`Cancel`);
                return;
            }
            await saveTable(input,products);
        }catch(error)
        {
            console.log(`Error at saving the data to the table:${error}`);
        }
    }




    React.useEffect(()=>{
        fetchProducts();
    },[tableName]);

    return {products,setProducts,addProduct ,deleteProduct,UpdateProductName,SaveData,fetchProducts,updateProductQuantity, error,loading,refresh: fetchProducts};
}
