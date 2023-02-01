import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function ProfilePicture() {
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [camera, setCamera] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    // if (!permission) ...

    // if (!permission.granted) ...

    function toggleCameraType() {
        setType((current) =>
            current === CameraType.back ? CameraType.front : CameraType.back
        );
    }

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === "granted");
        })();
    }, []);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync();
            await AsyncStorage.setItem('profilePic', JSON.stringify(data));
        } else {
            console.log('no camera');
        }
    };

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={(r) => {setCamera(r);}}>
                <View style={styles.buttonContainer}>
                    <View style={styles.containerCenter}>
                        <TouchableOpacity
                            style={styles.buttonPhoto}
                            onPress={() => takePicture()}
                        >
                            <Text>O</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleCameraType}
                    >
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    camera: {
        height: "auto",
        aspectRatio: 2/3,
    },
    buttonContainer: {
        flex: 1,
        alignItems: "center",
    },
    button: {
        position: "absolute",
        bottom: 20,
        backgroundColor: "white",
        borderColor: "gray",
        borderWidth: 4,
        padding: 5,
        borderRadius: 50,
    },
    containerCenter: {
        position: "absolute",
        bottom: 70,
    },
    buttonPhoto: {
        width: 70,
        height: 70,
        backgroundColor: "white",
        borderColor: "gray",
        borderWidth: 4,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
});
