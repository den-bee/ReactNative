import * as React from "react";
import {View, StyleSheet, TextInput, Button} from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Rainbow from "../components/Rainbow";
import Constants from 'expo-constants';
import { useState } from "react";
import { rainbow } from "rainbow-colors-array-ts";

export default function App() {
  const [text, setText] = useState("rainbow");
  const [pastel, setPastel] = useState(false);
  const [rainbowOrder, setRainbowOrder] = useState([0,1,2,3,4,5]);

  const colors = rainbow(6, "hex", pastel).map(color => color.hex);
  const rainbowColors = rainbowOrder.map((i) => colors[i]);

  const randomize = () => {
    setRainbowOrder([...rainbowOrder].sort(() => Math.random() - 0.5));
  }

  return (
    <View style={styles.container}>
       <Header colors={rainbowColors}/>
       <TextInput style={{borderWidth: 1, padding: 5}} onChangeText={(text) => setText(text)} value={text}/>
       <Button title="SET PASTEL" onPress={() => setPastel(pastel => !pastel)}/>
       <Button title="RANDOMIZE COLORS" onPress={randomize}/>
       <View style={styles.main}>
        <View style={styles.mainLeft}>
          <Rainbow colors={rainbowColors} containerStyle={{flex: 1, flexDirection: "row", justifyContent: "space-around"}} lineStyle={{width: 10}}/>
        </View>
        <View style={styles.mainRight}>
          <Rainbow colors={rainbowColors} containerStyle={{flex: 1, justifyContent: "space-around", alignItems: "center"}} lineStyle={{width: 50, height: 50}}/>
        </View>
       </View>
       <Footer colors={rainbowColors} text={text}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    paddingTop: Constants.statusBarHeight
  },
  main: {
    flex: 1,
    flexDirection: "row",
  },
  mainLeft: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1
  },
  mainRight: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1
  }
});