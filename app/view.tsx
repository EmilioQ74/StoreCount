import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewProductsScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await AsyncStorage.getItem('products');
      if (data) {
        setProducts(JSON.parse(data));
      }
    };
    loadProducts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Saved Products</Text>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.box}>Count: {item.box}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No saved products.</Text>}
      />
    </SafeAreaView>
  );
};

export default ViewProductsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee' },
  name: { fontSize: 16 },
  box: { fontSize: 16, fontWeight: 'bold' },
  empty: { textAlign: 'center', color: '#888', marginTop: 40 }
});