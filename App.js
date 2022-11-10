import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Counter } from "assets"

export default function App() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>UE</Text>
            <TouchableHighlight
                activeOpacity={0.4}
                underlayColor="pink"
                onPress={() => alert("Pressed !")}
            >
                <Text style={styles.text}>test !</Text>
            </TouchableHighlight>
            <Counter />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "blue",
        fontSize: 50,
    },
});
