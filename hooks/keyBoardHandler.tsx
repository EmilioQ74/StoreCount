import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Keyboard, FlatList, Platform } from 'react-native';

export function KeyboardHandler () {

 const [keyboardHeight, setKeyboardHeight] = useState(0);
 const [isKeyboardVisble,setKeyBoardVisible] = useState(false);

useEffect(() => {
  const showListener = Keyboard.addListener(
    Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
    (e) => {
      setKeyboardHeight(e.endCoordinates.height);
      setKeyBoardVisible(true);
    }
  );

  const hideListener = Keyboard.addListener(
    Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
    () => {
      setKeyboardHeight(0);
      setKeyBoardVisible(false);
    }
  );

  return () => {
    showListener.remove();
    hideListener.remove();
  };
}, []);



  return {keyboardHeight,isKeyboardVisble};

   
};



