import RenderSaveList from "compoment/RenderSaveList";
import SCButtons from "compoment/SCButtons";
import { getTableNameById } from "db/commads";
import { getTableData } from "db/init";
import { useRouter } from "expo-router";
import { useDisplayHandler } from "hooks/useDisplayHandler";
import React from "react";
import { SafeAreaView, View, FlatList,StyleSheet} from "react-native";

  
const SaveList=()=>{

  const{handleSelect,select} = useDisplayHandler();
  
  const [data,setData] = React.useState([]);


  const router = useRouter();

  const getData = async()=>{
      const tempData = await getTableData(`record`);
      if (tempData) {
        setData(tempData);
      }
  }
    
  const handleOpenSave=async()=>{
    if(select === null) return;
    const name = await getTableNameById(select,`record`);
    router.push({
      pathname:"saveView",
      params:{
      name:name[0]
    }})
  }


    React.useEffect(()=>{
        getData();
    },[select])


    const renderList = ({item})=>{
        return(
        <RenderSaveList
         id = {item.id}
         name = {item.name}
         setSelected={handleSelect}
         selected = {select===item.id}
        />
        )
    }
  return (
    <SafeAreaView style={{flex:9}}>
        <FlatList
            data={data}
            renderItem={renderList}
            keyExtractor={(item) => item.id}
        />
        <View style={styles.buttonContainer}>
          <SCButtons title={"Open"} onPress={handleOpenSave}/>
        </View>
    </SafeAreaView>
  )
}

export default SaveList

const styles = StyleSheet.create({
    buttonContainer: {
    flex:0.2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
})