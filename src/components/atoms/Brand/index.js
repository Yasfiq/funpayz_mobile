import { StyleSheet, Text } from "react-native"
import globalCss from "../../../assets/styles/globalCss"

const Brand = ({white, className}) => {
    return <>
        <Text style={white ? [globalCss.brandWhite, className] : [globalCss.brand, className]}>Funpayz</Text>
    </>
}

export default Brand