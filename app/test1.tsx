import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import SCButtons from '../compoment/SCButtons';
import { DeleteDatabase, deleteTable, getAllTable, getTableData, setup, tempTable} from 'db/init';
import * as test from '../db/commads';


export default function App() {
  useEffect(() => {
    (async () => {
      try {
        await setup();
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
        onPress={()=>test.insertProduct(`Test Product ${Math.floor(Math.random() * 100)}`)}
      />
      <SCButtons
        title="Show Products"
        onPress={async ()=>console.log(JSON.stringify(await test.getAllProducts(),null,2))}
      />
      <SCButtons
        title="Show Tables"
        onPress={()=> getAllTable()}
      />
      <SCButtons
        title="Drop Table"
        onPress={()=>deleteTable(`Malaka`)}
      /><SCButtons
        title="Delete Database"
        onPress={()=>DeleteDatabase}
      />
    </View>
  );
}
