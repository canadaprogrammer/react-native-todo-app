import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { theme } from './colors';

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');
  const [toDos, setToDos] = useState({});
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const addTodo = () => {
    if (text === '') {
      return;
    }
    // save to do
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, work: working },
    };
    setToDos(newToDos);
    setText('');
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
          onSubmitEditing={addTodo}
          returnKeyType='done'
          style={styles.input}
          autoFocus
        />
      </View>
      <ScrollView style={styles.scrollView}>
        {Object.keys(toDos).map((key) => (
          <View key={key} style={styles.toDo}>
            <Text style={styles.toDoText}>{toDos[key].text}</Text>
          </View>
        ))}
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
  },
  toDoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
