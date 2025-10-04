import {Platform, StyleSheet, Text, TextInput, TouchableOpacity,} from 'react-native'
import React from 'react'
import  {Product} from '../model/Product';


interface RenderProductItemProps {
  item: Product;
  type: `count` | `view`; 
  setSelectedProduct?:(id:string)=>void;
  selected?: boolean;
  onBoxChange?: (id: string, newValue: string,type:string) => void;
  onCount?:(id:string)=>void;
  onSave?:(id:string)=>void;
}


const RenderProductItem = ({ item,
  type,setSelectedProduct, selected,onBoxChange,onCount,onSave}: RenderProductItemProps) => {
  return (
    <TouchableOpacity
      style={[styles.itemContainer, selected && { backgroundColor: '#10d3ecff' }]}
      onPress={()=>setSelectedProduct(item.id.toString())}
    >
      <Text style={styles.itemText}>{item.name}</Text>
      {type === 'count' ? (<TextInput
      style = {styles.itemInput}
      onFocus={()=>setSelectedProduct(item.id.toString())}
      value={item.quantity.toString()}
      placeholder={item.quantity.toString()}
      onChangeText={text => onBoxChange(item.id.toString(), text,type)}
      onBlur={()=>onCount(item.id.toString())}
      keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "numeric"}
        />) : type === 'view' ?(<><Text style={styles.itemQuantityText}>{item.quantity}</Text><TextInput
          style={styles.itemInput}
          onFocus={() => setSelectedProduct(item.id.toString())}
          value={item.difference.toString()}
          placeholder={item.difference.toString()}
          onChangeText={text => onBoxChange(item.id.toString(), text,type)}
          onBlur={() => onSave(item.id.toString())}
          keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "numeric"}/></>
        ) : null}
    </TouchableOpacity>
  )
}

export default RenderProductItem

const styles = StyleSheet.create({

  itemContainer: {
    flexDirection: 'row',
    borderWidth:1,
    padding: 6,
    marginVertical: 5,
    borderColor: '#000',
    borderRadius: 5,
    backgroundColor: '#b0b2ffff',
  },
  itemText: {
    flex:1,
    paddingTop: 8,
    fontSize: 16,
    color: '#000',
  },
  itemQuantityText:{
    paddingRight:30,
    paddingTop: 8,
    fontSize: 16,
    color: '#000',
  },
  itemInput: {
    width:60,
    fontSize: 16,
    borderWidth: 1,
    padding: 5,
    marginTop: 5,
    borderRadius: 5,
    color: '#000',
  },
})