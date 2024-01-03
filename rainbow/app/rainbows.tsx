import { rainbow } from "rainbow-colors-array-ts";
import { View, FlatList, StyleSheet } from "react-native";

interface RainbowLineProps {
    color: string
}

const RainbowLine = ({color} : RainbowLineProps) => {
    return (
        <View style={{backgroundColor: color, height: 100}}/>
    )
}

const Rainbows = () => {
    const colors = rainbow(100, "hex", false);

    return (
        <View>
            <FlatList 
                data={colors}
                renderItem={({item}) => <RainbowLine color={item.hex}/>}
                keyExtractor={item => item.hex}
            />
        </View>
    )
}

export default Rainbows;