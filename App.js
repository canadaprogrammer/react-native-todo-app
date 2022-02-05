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
      [Date.now()]: { text, working, isComplete: false },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText('');
  };
  const removeToDo = async (key) => {
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
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? 'white' : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{ ...styles.btnText, color: working ? theme.grey : 'white' }}
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
              />
              <Text
                style={{
                  ...styles.toDoText,
                  textDecorationLine: toDos[key].isComplete
                    ? 'line-through'
                    : 'none',
                  textDecorationStyle: 'solid',
                }}
              >
                {toDos[key].text}
              </Text>
              <TouchableOpacity
                onPress={() => removeToDo(key)}
                style={styles.delBtn}
              >
                <FontAwesome5 name='trash-alt' size={16} color={theme.gray} />
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
    marginTop: 100,
  },
  btnText: {
    fontSize: 40,
    fontWeight: '600',
  },
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
  toDoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    width: '70%',
  },
  delBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
