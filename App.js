import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Router } from "./src/routes/Router";

export default function App() {
    return (
      <SafeAreaView style={{flex:1}}>
        <StatusBar />
        <NavigationContainer>
          <Router/>
        </NavigationContainer>
      </SafeAreaView>
    );
}