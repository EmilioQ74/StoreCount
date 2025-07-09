import React, { useImperativeHandle, forwardRef, useState, useRef, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, TextInput, TouchableOpacity, FlatList, TextInput as TextInputType, Keyboard, LayoutRectangle, findNodeHandle, UIManager } from 'react-native';
import { PRODUCTDATA } from '../model/product';

// Interface representing each product's data structure
interface Product {
  id: string;                      // Unique identifier for the product
  name: string;                    // Product name
  box: number;            // Quantity 
  onBoxChange?: (id: string, newValue: string) => void; // Optional callback for changing box value
}

// Props for the SCDisplayProduct component
interface SCDisplayProductProps {
  product: Product;                                  // Product object
  onPress: (id: string) => void;                     // Handler when product is pressed
  isSelected: boolean;                               // Whether this product is currently selected
  setInputFocus: (id: string, ref: TextInputType | null) => void;  // Save TextInput refs for focus management
}

// Single product display component with selectable and editable box count
const SCDisplayProduct: React.FC<SCDisplayProductProps> = ({
  product,
  onPress,
  isSelected,
  setInputFocus,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(product.id)}  // Trigger selection on press
      style={[{ backgroundColor: isSelected ? '#3674B5' : 'lightgray' }, styles.container]} // Change bg color if selected
    >
      <Text style={styles.text}>{product.name}</Text>
      <TextInput
        keyboardType="numeric"
        ref={(ref) => setInputFocus(product.id, ref)}  // Save ref for later focus control
        style={styles.input}
        value={String(product.box) || ''}                    // Controlled input from product.box
        onChangeText={(text) =>
          product.onBoxChange && product.onBoxChange(product.id, text) // Notify parent of changes
        }
      />
    </TouchableOpacity>
  );
};

// ProductListScreen displays and edits the list of products
interface ProductListScreenProps {
  onSave?: (products: Product[]) => void;
}

// Interface for the ref handle exposed by ProductListScreen
interface ProductListScreenHandle {
  saveProducts: () => void;
}

const ProductListScreen = forwardRef<ProductListScreenHandle, ProductListScreenProps>(({ onSave }, ref) => {
  // State for products, cloned from imported data, so we can modify locally
  const [products, setProducts] = useState<Product[]>(PRODUCTDATA.map((p) => ({ ...p })));

  // State for the currently selected product ID (or null if none selected)
  const [selectID, setSelectID] = useState<string | null>(null);

  // Ref storing references to each product's TextInput by product ID
  const focusToInput = useRef<Record<string, TextInputType | null>>({});
  const flatListRef = useRef<FlatList>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // Store TextInput refs for focusing later
  const setInputFocus = useCallback((id: string, ref: TextInputType | null) => {
    if (ref) {
      focusToInput.current[id] = ref; // Save the ref for the given product id
    }
  }, []);

  // Update product box value on change
  const handleBoxChange = useCallback((id: string, newValue: string) => {
    const parsedValue = Number(newValue); // Convert input string to number
    setProducts((current) =>
      current.map((product) =>
        product.id === id ? { ...product, box: parsedValue } : product // Update only the changed product
      )
    );
  }, []);

  // Listen for keyboard events to track keyboard height
  React.useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height); // Set keyboard height when shown
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0); // Reset keyboard height when hidden
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Handle product selection: set selected ID and focus the TextInput for that product
  const handleSelected = useCallback((id: string) => {
    setSelectID(id); // Set the selected product id
    setTimeout(() => {
      focusToInput.current[id]?.focus?.(); // Focus the TextInput for the selected product

      // Find index of selected item
      const index = products.findIndex((p) => p.id === id);
      if (flatListRef.current && index !== -1) {
        flatListRef.current.scrollToIndex({ index, animated: true }); // Scroll to the selected item
      }
    }, 0);
    console.log('Selected ID:', id);
  }, [products]);

  // Save products to AsyncStorage and notify parent if needed
  const saveProducts = useCallback(async () => {
    try {
      await AsyncStorage.setItem('products', JSON.stringify(products));
      if (onSave) onSave(products);
      alert('Saved!');
    } catch (e) {
      alert('Save failed');
    }
  }, [products, onSave]);

  // Expose saveProducts to parent via ref
  useImperativeHandle(ref, () => ({
    saveProducts,
  }));

  // Load products from storage on mount
  React.useEffect(() => {
    const loadProducts = async () => {
      const data = await AsyncStorage.getItem('products');
      if (data) {
        setProducts(JSON.parse(data));
      }
    };
    loadProducts();
  }, []);

  // Save products to storage whenever they change
  React.useEffect(() => {
    AsyncStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // Render each product, injecting the onBoxChange callback dynamically
  const renderProduct = useCallback(
    ({ item }: { item: Product }) => (
      <SCDisplayProduct
        product={{ ...item, onBoxChange: handleBoxChange }} // Pass product data and change handler
        onPress={handleSelected} // Pass selection handler
        isSelected={item.id === selectID} // Highlight if selected
        setInputFocus={setInputFocus} // Pass ref setter for focus management
      />
    ),
    [handleSelected, selectID, setInputFocus, handleBoxChange]
  );

  return (
    <FlatList
      ref={flatListRef}
      data={products}                         // Use mutable state products here to reflect edits
      renderItem={renderProduct}              // Render each item via SCDisplayProduct
      keyExtractor={(item) => item.id}        // Use product id as key (string)
      extraData={selectID}                    // Re-render when selection changes
      contentContainerStyle={{ alignItems: 'center' }}  // Center list items horizontally
      keyboardShouldPersistTaps="handled"
    />
  );
});

export default ProductListScreen;

// Styles for the components
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
  input: {
    backgroundColor: '#fff',
    width: '15%',
    borderRadius: 5,
    paddingHorizontal: 5,
    textAlign: 'center',
  },
});
