import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AlertModalProvider } from 'modal/SCAlert'
import SaveViewScreen from 'compoment/screen/SaveViewScreen'

const saveView = () => {
  return (
    <SafeAreaView>
        <SaveViewScreen/>
    </SafeAreaView>
  )
}

export default saveView

const styles = StyleSheet.create({})