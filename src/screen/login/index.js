import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import IMAGES from '../../assest/images';
import * as Routes from '../../navigation/routes';

const Login = () => {
    const [staffID, setStaffID] = useState("");
    const [password, setPassword] = useState("");
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ backgroundColor: "white", alignItems: "center" }}>

                <Image
                    resizeMode="contain"
                    style={{ width: 150, height: 150, marginTop: 100 }}
                    source={{ uri: "https://seeklogo.com/images/A/anna-university-logo-DFAA543EDF-seeklogo.com.png" }} />
                <Text style={{ fontWeight: "bold", fontSize: 30, color: "#000" }}>ANN UNIVERSITY</Text>
                <Text style={{ opacity: 0.6, fontSize: 10, color: "#000" }}>Guindy, chennai</Text>
                <Text style={{ fontWeight: "bold", fontSize: 30, color: "#000", marginTop: 40 }}>LOGIN</Text>
                <View
                    style={{ width: "80%", marginTop: 20 }}
                >
                    <Text style={{ opacity: 0.6, fontSize: 12, color: "#000" }}>Staff ID</Text>
                    <TextInput
                        value={staffID}
                        placeholder="Please enter staff id"
                        placeholderTextColor="gray"
                        style={{ borderWidth: 1, borderColor: "transparent", borderRadius: 10, borderBottomColor: "#A9A9A9", marginTop: 12 }}
                    />
                    <Text style={{ opacity: 0.6, fontSize: 12, color: "#000", marginTop: 20 }}>Password</Text>
                    <TextInput
                        value={staffID}
                        placeholder="Please enter password"
                        placeholderTextColor="gray"
                        style={{ borderWidth: 1, borderColor: "transparent", borderRadius: 10, borderBottomColor: "#A9A9A9", marginTop: 12 }}
                    />
                </View>
            </View>

        </ScrollView>
    );
}

export default Login;