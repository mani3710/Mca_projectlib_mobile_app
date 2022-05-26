import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import IMAGES from '../../assest/images';
import * as Routes from '../../navigation/routes';
const Splash = (props) => {

    const authStore = useSelector(state => state.auth);
    const {
        isLoggedIn
    } = authStore;

    useEffect(() => {
        setTimeout(() => {
            if (isLoggedIn) {
                props.navigation.navigate(Routes.HOME)
            } else {
                props.navigation.navigate(Routes.LOGIN)
            }
        }, 1000)
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>

            <Image
                resizeMode="contain"
                style={{ width: "100%", height: 400 }}
                source={IMAGES.splashImage} />
            <Image
                resizeMode="contain"
                style={{ width: 150, height: 150 }}
                source={{ uri: "https://seeklogo.com/images/A/anna-university-logo-DFAA543EDF-seeklogo.com.png" }} />
            <Text style={{ fontWeight: "bold", fontSize: 30, color: "#000" }}>ANN UNIVERSITY</Text>
            <Text style={{ opacity: 0.6, fontSize: 10, color: "#000" }}>Guindy, chennai</Text>
            <ActivityIndicator
                style={{ width: 100, height: 100, marginTop: 20 }}
                size={50}
            />

        </View>
    );
}

export default Splash; 