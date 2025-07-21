import { FlatList, StyleSheet, Text, TextInput, TextInputComponent, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { getData, updateProductBox } from '../db/commads'
import { Product } from '../model/product';



interface ShowProductItemProps {
  item: Product;
  onPress: () => void;
  selected?: boolean;
  onBoxChange?: (id: string, newValue: string) => void;
  onBlur?:(id:string)=>void;
}


const ShowProductItem = ({ item, onPress, selected,onBoxChange,onBlur}: ShowProductItemProps) => {
  return (
    <TouchableOpacity
      style={[styles.itemContainer, selected && { backgroundColor: '#10d3ecff' }]}
      onPress={onPress}
    >
      <Text style={styles.itemText}>{item.name}</Text>
      <TextInput
      style = {styles.itemInput}
      onFocus={onPress}
      value={item.box.toString()}
      placeholder={item.box.toString()}
      onChangeText={text => onBoxChange(item.id.toString(), text)}
      onBlur={()=>onBlur(item.id.toString())}
      keyboardType="numeric"
        />
    </TouchableOpacity>
  )
}

const SCDisplayProduct = () => {

  const [selectedProduct, setSelectedProduct] = React.useState<string | null>(null);

  const [data,setData] = React.useState<Product[]>([]);

  React.useEffect (()=>{
     const fetchData = async ()=>{
      try{
        const tempData = await getData();
        setData(tempData);
      }catch{
        console.error("Data not Received");
      };
    }
    fetchData();
  },[]
);

  
  const handleProductSelect = (id: string) => {
    setSelectedProduct(prev => prev === id ? null : id);
  };

 const handleBoxChange = (id: string, newValue: string) => {
  // Allow empty or numeric only
  if (/^\d*$/.test(newValue)) {
    setData(prev =>
      prev.map(item =>
        item.id === id ? { ...item, box: newValue } : item
      )
    );
  }
};

 const handleOnBlur = (id: string) => {
  // Find the new value for this id in tempData array
  const item = data.find(item => item.id.toString() === id);
  if (!item) return;

  const newValue = item.box || '';

  const parseNum = Number(newValue);
  if(isNaN(parseNum))return;
  
  // Update state with new box value
  setData(prev =>
    prev.map(item =>
      item.id.toString() === id ? { ...item, box: parseNum } : item
    )
  );

  // Call updateProductBox with { id, box }
  updateProductBox(data[Number(id)-1]);
  console.log(id);
};


  const renderItem = ({ item }: { item: Product }) => (
    <ShowProductItem 
      item={item}
      onPress={() => handleProductSelect(item.id.toString())}
      onBoxChange={handleBoxChange}
      selected={selectedProduct === item.id.toString()}
      onBlur={()=>handleOnBlur(item.id.toString())}
    />
  );
  return (
    <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          extraData={selectedProduct}
        />
    </View>
  )
}

export default SCDisplayProduct

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    backgroundColor: '#474afdff',
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
  itemInput: {
    width: 60,
    borderWidth: 1,
    padding: 5,
    marginTop: 5,
    borderRadius: 5,
    color: '#000',
  },
})