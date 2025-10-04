import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import { Product } from 'model/Product';
import { useDisplayHandler } from 'hooks/useDisplayHandler';
import { useProducts } from 'hooks/ProductsHooks';
import RenderProductItem from 'compoment/RenderProductItem';


const saveView = () => {

    const {name} = useLocalSearchParams();
    const {products,refresh,error,loading} = useProducts(name as string);
    const{data,setData,handleSelect,select,handleBoxChange,handleSearch,handleOnQuantity} = useDisplayHandler();
  
    useFocusEffect(
    React.useCallback(() => {
        refresh(); 
    }, [])
    );

  React.useEffect(()=>{
    console.log(data);
     setData(products)
  },[products])

   

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;


    const renderItem = ({ item }: { item: Product }) => (
    <RenderProductItem
      type='view'
      item={item}
      setSelectedProduct={handleSelect}
      onBoxChange={handleBoxChange}
      selected={select === item.id.toString()}
      onCount={() => handleOnQuantity(item.id.toString()).then(() => refresh())}
      onSave={()=>console.log('hello')}
    />
  );


  return (
    <SafeAreaView>
        <View>
                <TextInput
                style={styles.searchBar}
                placeholder="Search..."
                onChangeText={handleSearch}
                autoCorrect={false}
                clearButtonMode="while-editing"
                />
              </View>
        <FlatList
          data={data}
        renderItem={renderItem}
        keyExtractor={(item)=>item.id.toString()}
        extraData={select}
      />
    </SafeAreaView>
  )
}

export default saveView

const styles = StyleSheet.create({
    searchBar:{
    height:40,
    backgroundColor:'#fff',
    borderColor:'#000',
    borderWidth:1,
    borderRadius:5,
    paddingHorizontal:10,
    marginBottom:10,
  }
})