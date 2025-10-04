import { Product } from "model/Product";
import React from "react";
import { modifyProductDifference, modifyProductQuantity } from "db/commads";

export function useDisplayHandler()
{
    const [data,setData] = React.useState<Product[]>([]);
    const [tempData,setTempData] = React.useState<Product[]>([]);
    const [select,setSelected] = React.useState(null);


    React.useEffect(()=>{
       if (data.length && !tempData.length) setTempData(data);
    },[data]);


    const handleSelect = (id: string) => {
        setSelected(prev => prev === id ?  null : id);
        console.log(id);
    };


     const handleBoxChange = React.useCallback((id: string, newValue: string,type:string) => {
    if (/^-?\d*$/.test(newValue)) {
        setData(prev =>
        prev.map(item =>
        item.id.toString() === id
                ? type === "count"
                ? { ...item, quantity: newValue }
                : type === "view"
                ? { ...item, difference: newValue }
                : item
            : item
        ));}
        console.log(newValue);
        console.log(type);
     },[]);

    const handleOnQuantity = async (id: string) => {
    const item = data.find(item => item.id.toString() === id);
    if (!item) return;

    const newValue = item.quantity || '';
    const parsedNum = Number(newValue);
    if (isNaN(parsedNum)) return;

    // Only update if the value actually changed
    if (parsedNum === item.quantity) return;

    setData(prev =>
        prev.map(item =>
        item.id.toString() === id ? { ...item, quantity: parsedNum } : item
        )
    );

    try{
            await modifyProductQuantity(Number(id), parsedNum);
    }catch(error)
    {
        console.log(`Error At Updating quanity`);
    }
    };
    const handleOnDifference = async (id: string) => {
    const item = data.find(item => item.id.toString() === id);
    if (!item) return;

    const newValue = item.difference || '';
    const parsedNum = Number(newValue);
    if (isNaN(parsedNum)) return;

    // Only update if the value actually changed
    if (parsedNum === item.difference) return;

    setData(prev =>
        prev.map(item =>
        item.id.toString() === id ? { ...item, difference: parsedNum } : item
        )
    );

    try{
            await modifyProductDifference(Number(id), parsedNum);
    }catch(error)
    {
        console.log(`Error At Updating Difference`);
    }
    };

   const handleSearch = React.useCallback((text: string) => {
    const formattedQuery = text.toLowerCase();
    if (!text) {
        setData(tempData);
        return;
    }
    setData(tempData.filter(item => item.name.toLowerCase().includes(formattedQuery)));
}, [tempData]);

    return {data,setData,handleSelect,select,setSelected,handleBoxChange,handleSearch,handleOnQuantity,handleOnDifference};
}