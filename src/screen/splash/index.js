import React from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
const Splash = () => {
    const authStore = useSelector(state => state.auth);
    const {
        dummy
    } = authStore;
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Text style={{ color: "black" }}>{dummy}</Text>

        </View>
    );
}

export default Splash; 