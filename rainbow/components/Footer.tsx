import { rainbow } from "rainbow-colors-array-ts";
import { View, StyleSheet } from "react-native"
import Letter from "./Letter";

interface FooterProps {
    text: string,
    colors: string[]
}

const Footer = ({text, colors} : FooterProps) => {
    const rainbowText = text.slice(0, 10);

    return (
        <View style={styles.footer}>
            {
                rainbowText.split("").map((letter, index) => (
                    <Letter key={index} color={colors[index]} letter={letter}/>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        height: 100,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "black",
        borderWidth: 1,
    }
});

export default Footer;