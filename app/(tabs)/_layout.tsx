import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue',tabBarStyle: {        
      paddingBottom: 5,    
      paddingTop: 5,
    },}}>
      <Tabs.Screen
        name="count"
        options={{
          title: 'Count Page',
        }}
      />
      <Tabs.Screen
        name="view"
        options={{
          title: 'View Products',
        }}
      />
    </Tabs>
  );
}
