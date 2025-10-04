import React from 'react'
import {Stack } from 'expo-router' 
import { AlertModalProvider } from 'modal/SCAlert'

export default function RootLayout() {
  return (
     <AlertModalProvider>
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
      <Stack.Screen name="(tabs)" options={
        {
          headerShown: false,
          headerStyle: {
            backgroundColor: '#3674B5',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerBackVisible: false
        }
      }/>
      <Stack.Screen name="test1" options={
        {
          headerShown: true,
          headerTitle: 'Test DB',
          headerStyle: {
            backgroundColor: '#3674B5',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerBackVisible: false
        }
      }/>
      <Stack.Screen name="saveList" options={
        {
          headerShown: true,
          headerTitle: 'Save List',
          headerStyle: {
            backgroundColor: '#3674B5',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerBackVisible: false
        }
      }/>
      <Stack.Screen name="saveView" options={
        {
          headerShown: true,
          headerTitle: 'Save View',
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
    </AlertModalProvider>
  )
}