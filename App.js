import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Counter } from "./src/components/Counter";
import { Test } from "./src/components/Test";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

  const Stack = createNativeStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Counter" component={Counter} />
          <Stack.Screen name="Test" component={Test} options={{headerTitle: 'tr'}}/>
        </Stack.Navigator>
      </NavigationContainer>
      // <SafeAreaView style={styles.container}>
      //   <View>
      //       <Text style={styles.text}>UE</Text>
      //       <TouchableHighlight
      //           activeOpacity={0.4}
      //           underlayColor="pink"
      //           onPress={() => alert("Pressed !")}
      //       >
      //           <Text style={styles.text}>test !</Text>
      //       </TouchableHighlight>
      //       <Counter />
      //       <StatusBar style="auto" />
      //   </View>
      // </SafeAreaView>
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
