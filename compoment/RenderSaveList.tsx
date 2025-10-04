import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface RenderSaveListProps {
  id:string,
  name:string,
  setSelected?:(id:string)=>void;
  selected?: boolean;
}


const RenderSaveList = ({id,name,selected,setSelected}:RenderSaveListProps) => {
  return (
    <TouchableOpacity style={[styles.container, selected && { backgroundColor: '#10d3ecff' }]}
                      onPress={()=>setSelected(id)}>
        <Text style={styles.text}>
        {name}
        </Text>
    </TouchableOpacity>
  )
}

export default RenderSaveList

const styles = StyleSheet.create({
    container: {
    alignContent:'center',
    justifyContent: 'center',
    padding: 6,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    backgroundColor: '#b0b2ffff',
  },
    text: {
    paddingTop: 8,
    fontSize: 16,
    color: '#000',
  }
})