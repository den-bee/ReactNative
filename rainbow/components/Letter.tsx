import { View, Text } from "react-native"

interface LetterProps {
    letter: string,
    color: string
}

const Letter = ({letter, color} : LetterProps) => {
    return (
        <Text style={{color: color, fontSize: 24}}>
            {letter}
        </Text>
    )
}

export default Letter;