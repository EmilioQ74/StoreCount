import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Stack } from 'expo-router' 

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={
        {
          headerShown: true,
          headerTitle: 'Home Page',
          headerStyle: {
            backgroundColor: '#3674B5',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerBackVisible: false
        }
      } />
      <Stack.Screen name="count" options={
        {
          headerShown: true,
          headerTitle: 'Count Product',
          headerStyle: {
            backgroundColor: '#3674B5',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerBackVisible: false
        }
      }/>
      </Stack>
  )
}