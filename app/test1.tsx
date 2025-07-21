import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import * as test from '../db/commads';
import { setupDB } from '../db/setupDB';
import SCButtons from '../compoment/SCButtons';


export default function App() {
  useEffect(() => {
    (async () => {
      try {
        await setupDB();
        console.log('✅ Database setup completed successfully');
        Alert.alert('Success', 'Database setup completed successfully');
      } catch (error) {
        console.error('Error initializing database:', error);
        Alert.alert('Error', 'Failed to initialize database.');
      }
    })();
  })
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>SQLite + Expo Test</Text>
      <SCButtons
        title="Test Database"
        onPress={()=>test.insertProduct(80, "Test Product", 10)}
        unPressedColor="#000"
        pressedColor="#fff"
      />
      <SCButtons
        title="Show Products"
        onPress={()=>test.showTable()}
        unPressedColor="#000"
        pressedColor="#fff"
      />
      <SCButtons
        title="Drop Table"
        onPress={()=>test.dropTable()}
        unPressedColor="#000"
        pressedColor="#fff"
      />
    </View>
  );
}
