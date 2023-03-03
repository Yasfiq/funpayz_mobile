import { Text, View, StyleSheet } from "react-native"
import Brand from "../Brand"

const SplashScreen = () => {
    return <>
        <View style={styles.bgSplash}>
            <Brand white='true' className={{fontSize: 40}} />
        </View>
    </>
}

const styles = StyleSheet.create({
    bgSplash: {
        width: '100%',
        height: '100%',
        backgroundColor: '#537FE7',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default SplashScreen