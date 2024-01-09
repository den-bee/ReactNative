import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Switch, TextInput, View } from 'react-native';

export default function App() {
  const [colorOne, setColorOne] = useState("white");
  const [colorTwo, setColorTwo] = useState("black");
  const [isEnabled, setIsEnabled] = useState(false);
  
  return (
    <View style={{
      flex: 1, 
      backgroundColor: isEnabled ? colorOne : colorTwo,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
        <TextInput style={styles.input}
          onChangeText={colorOne => setColorOne(colorOne.toLowerCase())}
          value={colorOne}
        ></TextInput>
        <TextInput style={styles.input}
          onChangeText={colorTwo => setColorTwo(colorTwo.toLowerCase())}
          value={colorTwo}
        ></TextInput>
      <Switch
          onValueChange={() => setIsEnabled(previousState => !previousState)}
          value={isEnabled}
        ></Switch>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 200,
    backgroundColor: "white",
    padding: 5,
    margin: 5,
    borderColor: "gray",
    borderWidth: 1,
  }
});
