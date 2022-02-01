# React Native Todo App

## Button Style

### TouchableOpacity

- A wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, dimming it.

- Props

  - style

  - activeOpacity: Determines what the opacity of the wrapped view should be when touch is active. Defaults to 0.2.

- ```jsx
  <TouchableOpacity>
    <Text style={styles.btnText}>Work</Text>
  </TouchableOpacity>
  ```

### TouchableHighlight

- A wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, which allows the underlay color to show through, darkening or tinting the view.

- ```jsx
  <TouchableHighlight
    onPress={() => console.log('pressed')}
    underlayColor='red'
    activeOpacity={0.5}
  >
    <Text style={styles.btnText}>Travel</Text>
  </TouchableHighlight>
  ```

### TouchableWithoutFeedback

- Do not use unless you have a very good reason. All elements that respond to press should have a visual feedback when touched.

- TouchableWithoutFeedback supports only one child. If you wish to have several child components, wrap them in a View. Importantly, TouchableWithoutFeedback works by cloning its child and applying responder props to it. It is therefore required that any intermediary components pass through those props to the underlying React Native component.

- ```jsx
  <TouchableWithoutFeedback>
    <Text style={styles.btnText}>Work</Text>
  </TouchableWithoutFeedback>
  ```

### Pressable

- If you're looking for a more extensive and future-proof way to handle touch-based input, check out the Pressable API.

- Pressable is a Core Component wrapper that can detect various stages of press interactions on any of its defined children.

- Props

  - hitSlop: Sets additional distance outside of element in which a press can be detected.

- ```jsx
  <Pressable onPress={onPressFunction}>
    <Text>I'm pressable!</Text>
  </Pressable>
  ```

### Active and Inactive Style

- Create `colors.js`

  - ```js
    export const theme = {
      bg: 'black',
      grey: '#3a3d40',
    };
    ```

- On `App.js`

  - ```jsx
    import { StatusBar } from 'expo-status-bar';
    import React, { useState } from 'react';
    import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
    import { theme } from './colors';

    export default function App() {
      const [working, setWorking] = useState(true);
      const travel = () => setWorking(false);
      const work = () => setWorking(true);
      return (
        <View style={styles.container}>
          <StatusBar style='auto' />
          <View style={styles.header}>
            <TouchableOpacity onPress={work}>
              <Text
                style={{
                  ...styles.btnText,
                  color: working ? 'white' : theme.grey,
                }}
              >
                Work
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={travel}>
              <Text
                style={{
                  ...styles.btnText,
                  color: working ? theme.grey : 'white',
                }}
              >
                Travel
              </Text>
            </TouchableOpacity>
          </View>
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
    });
    ```

## TextInput

- A foundational component for inputting text into the app via a keyboard. Props provide configurability for several features, such as auto-correction, auto-capitalization, placeholder text, and different keyboard types, such as a numeric keypad.

- The most basic use case is to plop down a TextInput and subscribe to the onChangeText events to read the user input. There are also other events, such as onSubmitEditing and onFocus that can be subscribed to.

- `placeholder`: The string that will be rendered before text input has been entered.

- `placeholderTextColor`: The text color of the placeholder string.

- `keyboardType`: The following values work across platforms: `default`, `number-pad`, `decimal-pad`, `numeric`, `email-address`, `phone-pad`

- `returnKeyType`: Determines how the return key should look. On Android you can also use `returnKeyLabel`.

  - The following values work across platforms: `done`, `go`, `next`, `search`, `send`

- `secureTextEntry`: If `true`, the text input obscures the text entered so that sensitive text like passwords stay secure. The default value is `false`. Does not work with `multiline={true}`.

- `multiline`: If `true`, the text input can be multiple lines. The default value is `false`. It is important to note that this aligns the text to the top on iOS, and centers it on Android. Use with `textAlignVertical` set to `top` for the same behavior in both platforms.

- `onChangeText`: Callback that is called when the text input's text changes. Changed text is passed as a single string argument to the callback handler.

- `autoCorrect`: If `false`, disables auto-correct. The default value is `true`.

- `autoCapitalize`: Tells TextInput to automatically capitalize certain characters. This property is not supported by some keyboard types such as name-phone-pad.

  - `characters`: all characters.

  - `words`: first letter of each word.

  - `sentences`: first letter of each sentence (default).

  - `none`: don't auto capitalize anything.

- ```jsx
  import { ..., TextInput } from 'react-native';
  ...

  export default function App() {
    ...
    const [text, setText] = useState('');
    const onChangeText = (payload) => setText(payload);
    return (
      <View style={styles.container}>
        ...
        <View>
          <TextInput
            placeholder={working ? 'Add a To Do' : 'Where do you want to go?'}
            onChangeText={onChangeText}
            value={text}
            style={styles.input}
          />
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    ...
    input: {
      backgroundColor: 'white',
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 25,
      marginTop: 20,
      fontSize: 18,
    },
  });
  ```
