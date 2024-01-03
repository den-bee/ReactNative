import { View, StyleSheet } from "react-native";
import Rainbow from "./Rainbow";

interface HeaderProps {
    colors: string[]
}

const Header = ({colors} : HeaderProps) => {
    return (
        <View style={styles.header}>
            <Rainbow colors={colors} containerStyle={{}} lineStyle={{height: 10}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        borderColor: "black",
        borderWidth: 1,
    }
});

export default Header;