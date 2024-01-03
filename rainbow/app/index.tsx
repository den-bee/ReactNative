import * as React from "react";
import {View, StyleSheet, TextInput, Button} from "react-native";
import Constants from 'expo-constants';
import { Link } from "expo-router";


export default function Home() {
  
  return (
    <View style={styles.container}>
      <Link href="/rainbows" asChild>
        <Button title="Go to rainbow list"/>
      </Link>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight
  },
});