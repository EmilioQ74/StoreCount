
import React, { createContext, useContext, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface AlertModalContextValue {
  alertUser: ( type: `alert` | `prompt` ,
    title: string, message: string, msgOK:string,msgCancel:string) => Promise<string | null>;
}

const AlertModalContext = createContext<AlertModalContextValue | undefined>(undefined);

export const useAlertModal = (): AlertModalContextValue => {
  const context = useContext(AlertModalContext);
  if (!context) throw new Error('useAlertModal must be used within PromptModalProvider');
  return context;
};

export const AlertModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [type, setType] = useState<'alert' | 'prompt'>('alert');
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [input, setInput] = useState('');
  const [msgOK,setOk] = useState('');
  const [msgCancel,setCancel] = useState('');
  const [getText, setText] = useState<(value: string | null) => void>(() => {});

  const alertUser = (tp:string,t: string, m: string, msgOK:string = `Confirm` ,msgCancel:string = `Cancel`): Promise<string | null> => {
    return new Promise((resolve) => {
      setType(tp as 'alert' | 'prompt');
      setTitle(t);
      setMessage(m);
      setInput('');
      setOk(msgOK);
      setCancel(msgCancel);
      setText(() => resolve);
      setVisible(true);
    });
  };


  const handleCancel = () => {
    setVisible(false);
    getText(null);
  };

  const handleOK = () => {
    setVisible(false);
    if( type === 'alert') {
      getText('OK');
      return;
    }
    getText(input.trim());
  };

  return (
    <AlertModalContext.Provider value={{ alertUser }}>
      {children}

      <Modal visible={visible} transparent animationType="fade" onRequestClose={handleCancel}>
        <View style={styles.backdrop}>
          <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            {type === `prompt` ? (<TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Enter value"
              autoFocus
              autoComplete='off'
            />) : null}
            
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={handleOK} style={[styles.button, styles.ok]}>
                <Text style={styles.buttonText}>{msgOK}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancel]}>
                <Text style={styles.buttonText}>{msgCancel}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </AlertModalContext.Provider>
  );
};


const styles = StyleSheet.create({
  backdrop: {
    flex:1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems:`center`,
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    marginBottom: 12,
  },
  input: {
    width:`80%`,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent:`space-between`,
    gap:10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 10,
  },
  cancel: {
    backgroundColor: '#aaa',
  },
  ok: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
