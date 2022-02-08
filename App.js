import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from './colors';
import { FontAwesome5 } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

const STORAGE_KEY = '@toDos';
const STORAGE_TRACK_KEY = '@work';

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');
  const [editText, setEditText] = useState('');
  const [toDos, setToDos] = useState({});

  const tracking = async (trackWorking) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_TRACK_KEY,
        JSON.stringify(trackWorking)
      );
    } catch (err) {
      console.warn(err);
    }
  };
  const travel = () => {
    setWorking(false);
    tracking(false);
  };
  const work = () => {
    setWorking(true);
    tracking(true);
  };
  const onChangeText = (payload) => setText(payload);
  const onEditText = (payload) => setEditText(payload);
  const saveToDos = async (toSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (err) {
      console.warn(err);
    }
  };
  const getToDos = async () => {
    try {
      const getToDos = await AsyncStorage.getItem(STORAGE_KEY);
      const getTrack = await AsyncStorage.getItem(STORAGE_TRACK_KEY);
      setToDos(getToDos != null ? JSON.parse(getToDos) : {});
      setWorking(getTrack != null ? JSON.parse(getTrack) : true);
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(async () => {
    await getToDos();
  }, []);

  const addToDo = async () => {
    if (text === '') {
      return;
    }
    // save to do
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working, isComplete: false, edit: false },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText('');
  };
  const removeToDo = async (key) => {
    if (Platform.OS === 'web') {
      const ok = confirm('Are you sure to delete "' + toDos[key].text + '?"');
      if (ok) {
        const newToDos = { ...toDos };
        delete newToDos[key];
        setToDos(newToDos);
        saveToDos(newToDos);
      }
    } else {
      Alert.alert(
        'Remove ToDo',
        'Are you sure to delete "' + toDos[key].text + '?"',
        [
          {
            text: 'Cancel',
          },
          {
            text: 'OK',
            style: 'destructive',
            onPress: async () => {
              const newToDos = { ...toDos };
              delete newToDos[key];
              setToDos(newToDos);
              await saveToDos(newToDos);
            },
          },
        ]
      );
    }
  };
  const completeToDo = async (toDoKey) => {
    const editToDos = { ...toDos };
    Object.keys(editToDos).forEach((key) => {
      if (key === toDoKey) {
        editToDos[toDoKey].isComplete = !editToDos[toDoKey].isComplete;
      }
    });
    setToDos(editToDos);
    await saveToDos(editToDos);
  };
  const onEdit = (toDoKey) => {
    const editToDos = { ...toDos };
    Object.keys(editToDos).forEach((key) => {
      if (key === toDoKey) {
        if (!editToDos[toDoKey].edit) {
          setEditText('');
        }
        editToDos[toDoKey].edit = !editToDos[toDoKey].edit;
      }
    });
    setToDos(editToDos);
  };
  const editToDos = async (toDoKey) => {
    const editToDos = { ...toDos };
    Object.keys(editToDos).forEach((key) => {
      if (key === toDoKey) {
        editToDos[toDoKey].text = editText;
        editToDos[toDoKey].edit = false;
      }
    });
    setToDos(editToDos);
    await saveToDos(editToDos);
    setEditText('');
  };
  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: '600',
              color: working ? 'white' : theme.grey,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: '600',
              color: working ? theme.grey : 'white',
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          placeholder={working ? 'Add a To Do' : 'Where do you want to go?'}
          onChangeText={onChangeText}
          value={text}
          onSubmitEditing={addToDo}
          returnKeyType='done'
          style={styles.input}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        {Object.keys(toDos).map((key) =>
          toDos[key].working === working ? (
            <View key={key} style={styles.toDo}>
              <Checkbox
                style={styles.checkbox}
                value={toDos[key].isComplete}
                onValueChange={() => completeToDo(key)}
                color={theme.grey}
              />
              {toDos[key].edit ? (
                <TextInput
                  placeholder={toDos[key].text}
                  onChangeText={onEditText}
                  value={editText}
                  onSubmitEditing={() => editToDos(key)}
                  returnKeyType='done'
                  style={styles.editInput}
                />
              ) : (
                <TouchableWithoutFeedback onPress={() => completeToDo(key)}>
                  <Text
                    style={{
                      ...styles.toDoText,
                      fontSize: 16,
                      fontWeight: '500',
                      width: 'calc(100% - 24px - 48px - 46px)',
                      paddingVertical: 8,
                      paddingHorizontal: 8,
                      textDecorationLine: toDos[key].isComplete
                        ? 'line-through'
                        : 'none',
                      textDecorationStyle: 'solid',
                      color: toDos[key].isComplete ? theme.grey : 'white',
                    }}
                  >
                    {toDos[key].text}
                  </Text>
                </TouchableWithoutFeedback>
              )}
              <TouchableOpacity
                onPress={() => onEdit(key)}
                style={styles.btn}
                disabled={toDos[key].isComplete}
              >
                <FontAwesome5
                  name='pencil-alt'
                  size={16}
                  color={toDos[key].isComplete ? 'transparent' : theme.grey}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => removeToDo(key)}
                style={styles.btn}
              >
                <FontAwesome5 name='trash-alt' size={16} color={theme.grey} />
              </TouchableOpacity>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  btnText: {},
  input: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginTop: 20,
    fontSize: 18,
  },
  scrollView: {
    marginVertical: 15,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkbox: {
    marginRight: 8,
  },
  editInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 16,
    fontWeight: '500',
    width: 'calc(100% - 24px - 48px - 46px)',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  toDoText: {
    color: 'white',
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
