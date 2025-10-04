import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet,  TextInput,  View } from 'react-native'
import React from 'react'
import SCButtons from '../SCButtons'
import { router, useFocusEffect } from 'expo-router'
import { useProducts } from 'hooks/ProductsHooks'
import { tempTable } from 'db/init'
import { Product } from 'model/Product'
import RenderProductItem from 'compoment/RenderProductItem'
import { useDisplayHandler } from 'hooks/useDisplayHandler'
import { KeyboardHandler } from 'hooks/keyBoardHandler'

const count = () => {
  
  const {products,addProduct, deleteProduct,UpdateProductName,refresh} = useProducts(tempTable);
 
  const{data,setData,handleSelect,select,handleBoxChange,handleSearch,handleOnQuantity,handleOnDifference} = useDisplayHandler();

  

  const {keyboardHeight,isKeyboardVisble} = KeyboardHandler();

  const flatListRef = React.useRef<FlatList>(null);
  const [indexToScroll,setIndexToScroll] = React.useState<number>();

  useFocusEffect(
    React.useCallback(() => {
      refresh(); 
    }, [])
  );


  React.useEffect(() => {
    setData(products);
    setIndexToScroll(select)
    if(isKeyboardVisble)
    {
      
      flatListRef.current?.scrollToIndex(
        {
          index:select,
          animated:true,
          viewPosition:0.2,
        }
      );
      
    }
    console.log(isKeyboardVisble)
  },[select,products,indexToScroll,keyboardHeight]);



  const renderItem = ({ item }: { item: Product }) => (
    <RenderProductItem
      type={`count`}
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
      <View style={[
    styles.item,
    isKeyboardVisble ? { flex:1.3 } : { flex: 9.2 }
  ]}>
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
                    ref={flatListRef}
                    initialScrollIndex={indexToScroll}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item)=>item.id.toString()}
                    extraData={select}
                />
              </View>
      </View>
      <View style={styles.buttonContainer}>
        <SCButtons title="Add" onPress={()=>addProduct()}/>
        <SCButtons title="Delete" onPress={()=>deleteProduct(select)}/>
        <SCButtons title="Modify" onPress={()=>UpdateProductName(select)}/>
        <SCButtons title="Back" onPress={() => router.back()}/>
      </View>
   </SafeAreaView>
  )

}

export default count

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