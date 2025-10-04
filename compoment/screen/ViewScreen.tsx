import { FlatList, KeyboardAvoidingView, SafeAreaView, StyleSheet,  TextInput,  View } from 'react-native'
import React from 'react'
import { tempTable } from 'db/init'
import { useProducts } from 'hooks/ProductsHooks'
import { router, useFocusEffect } from 'expo-router'
import SCButtons from 'compoment/SCButtons'
import { Product } from 'model/Product'
import RenderProductItem from 'compoment/RenderProductItem'
import { useDisplayHandler } from 'hooks/useDisplayHandler'

const viewscreen = () => {
  
  const {products,SaveData,refresh} = useProducts(tempTable);

  const{data,setData,handleSelect,select,handleBoxChange,handleSearch,handleOnQuantity,handleOnDifference} = useDisplayHandler();

  useFocusEffect(
    React.useCallback(() => {
      refresh(); 
    }, [])
  );

    React.useEffect(() => {
      setData(products);
    },[select,products]);

    const renderItem = ({ item }: { item: Product }) => (
    <RenderProductItem
      type={`view`}
      item={item}
      setSelectedProduct={handleSelect}
      onBoxChange={handleBoxChange}
      selected={select === item.id.toString()}
      onCount={() => handleOnQuantity(item.id.toString()).then(() => refresh())}
      onSave={()=> handleOnDifference(item.id.toString()).then(()=> refresh())}
    />
  );

  return (
   <SafeAreaView style={styles.container}>
      <View style={styles.item}>
                <View>
                      <TextInput
                      style={styles.searchBar}
                      placeholder="Search..."
                      onChangeText={handleSearch}
                      autoCorrect={false}
                      clearButtonMode="while-editing"
                      />
                    </View>
                  <View >
                    
                      <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        extraData={select}
                      />
                    </View>
            </View>
      <View style={styles.buttonContainer}>
        <SCButtons title="Save" onPress={SaveData}/>
        <SCButtons title="Back" onPress={() => router.back()}/>
      </View>
   </SafeAreaView>
  )
}

export default viewscreen

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#ffffffff',
  },
  item: {
    flex: 9.2,
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
  searchBar:{
    height:40,
    backgroundColor:'#fff',
    borderColor:'#000',
    borderWidth:1,
    borderRadius:5,
    paddingHorizontal:10,
    marginBottom:10,
  },
  buttonContainer: {
    flex:0.8,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b0b2ffff',
    gap: 5,
  },
})