import { Button, Text } from "react-native";
import { useEffect, useState } from 'react';

export function Counter({navigation}) {
    const [Counter, setCounter] = useState(0);

    const Increment = () => {
        setCounter(Counter + 1);
    }

    const Decrement = () => {
        setCounter(Counter - 1);
    }

    return (
        <>
            <Text>{Counter}</Text>
            <Button title="+" onPress={Increment}/>
            <Button title="-" onPress={Decrement}/>
            <Button title="test" onPress={() => {navigation.navigate('Test')}}/>
        </>
    );
}
