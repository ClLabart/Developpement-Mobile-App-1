import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Router } from "./src/routes/Router";

export default function App() {
    return (
      <SafeAreaView style={{flex:1}}>
        <NavigationContainer>
          <Router/>
        </NavigationContainer>
      </SafeAreaView>
    );
}