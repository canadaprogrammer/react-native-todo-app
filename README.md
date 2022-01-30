# React Native Todo App

## TouchableOpacity

- A wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, dimming it.

- Props

  - style

  - activeOpacity: Determines what the opacity of the wrapped view should be when touch is active. Defaults to 0.2.

- ```jsx
  <TouchableOpacity>
    <Text style={styles.btnText}>Work</Text>
  </TouchableOpacity>
  ```

## TouchableHighlight

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

## TouchableWithoutFeedback

- Do not use unless you have a very good reason. All elements that respond to press should have a visual feedback when touched.

- TouchableWithoutFeedback supports only one child. If you wish to have several child components, wrap them in a View. Importantly, TouchableWithoutFeedback works by cloning its child and applying responder props to it. It is therefore required that any intermediary components pass through those props to the underlying React Native component.

- ```jsx
  <TouchableWithoutFeedback>
    <Text style={styles.btnText}>Work</Text>
  </TouchableWithoutFeedback>
  ```

## Pressable

- If you're looking for a more extensive and future-proof way to handle touch-based input, check out the Pressable API.

- Pressable is a Core Component wrapper that can detect various stages of press interactions on any of its defined children.

- Props

  - hitSlop: Sets additional distance outside of element in which a press can be detected.

- ```jsx
  <Pressable onPress={onPressFunction}>
    <Text>I'm pressable!</Text>
  </Pressable>
  ```
