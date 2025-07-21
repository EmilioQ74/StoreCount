import { Modal, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import SCButtons from './SCButtons'
import { insertProduct } from '../db/commads'

const SCModal = ({modalVisible}) => {
    const[show,setShow] = React.useState(modalVisible)
    const[text,setText] = React.useState(modalVisible)
  return (
    <SafeAreaView style={styles.container}>
      <Modal
      animationType='slide'
      
      visible = {show}
      onRequestClose={()=>setShow(!show)}
      >
        <View style={styles.topContainer}>
            <Text style={styles.text}>Product Name</Text>
            <TextInput style={styles.input}
            onChange={setText}
            value={text}/>
        </View>
        <View style={styles.bottomContainer}>
            <SCButtons title={"Save"} onPress={()=>insertProduct(36,text,0)} unPressedColor="#000" pressedColor="#fff"/>
            <SCButtons title={"Back"} onPress={()=>setShow(!show)} unPressedColor="#000" pressedColor="#fff"/>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default SCModal

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    topContainer:{
        flexDirection:'row',
    },
    bottomContainer:{
        flexDirection:'row'
    },
    text:{
        fontSize:16
    },
    input:{
        fontSize:16,
        width:20
    }

})