import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { rainbow } from "rainbow-colors-array-ts";

interface RainbowProps {
    containerStyle: StyleProp<ViewStyle>,
    lineStyle: StyleProp<ViewStyle>,
    colors: string[];
}

const Rainbow = ({containerStyle, lineStyle, colors} : RainbowProps) => {

    return (
        <View style={containerStyle}>
            {colors.map(color => <View key={color} style={[{backgroundColor: color}, lineStyle]}></View>)}
        </View>
    )
}

export default Rainbow;