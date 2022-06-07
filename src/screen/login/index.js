import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import IMAGES from '../../assest/images';
import * as Routes from '../../navigation/routes';
import { Button } from 'react-native-elements';
import { staffSign, emptySignInResult } from '../../redux/reducers/auth';

const Login = (props) => {
    const dispatch = useDispatch();
    const authStore = useSelector(state => state.auth);
    const {
        isLoggedIn,
        staffData,
        staffSignInStatus
    } = authStore;
    const [staffID, setStaffID] = useState("");
    const [password, setPassword] = useState("");
    const [signError, setSignError] = useState("");

    const [rollno, setRollno] = useState("");
    const [studentPassword, setStudentPassword] = useState("");
    const [studentSignError, setStudentSignError] = useState("");

    const [selectedStudent, setSelectedStudent] = useState(false);
    useEffect(() => {
        if (staffSignInStatus == "success") {
            dispatch(emptySignInResult())
            setSignError("Success");
            props.navigation.replace(Routes.MAIN_BOTTOM_NAV);
        } else if (staffSignInStatus == "failed") {
            dispatch(emptySignInResult())
            setSignError("Staff id/password is incorrect");
        }
    }, [staffSignInStatus])
    const staffSignFunc = () => {
        if (staffID && password) {
            setSignError("")
            dispatch(staffSign({ staffid: staffID, password: password }));
        } else {
            setSignError("Empty field found")
        }
    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ backgroundColor: "white", alignItems: "center" }}>

                <Image
                    resizeMode="contain"
                    style={{ width: 150, height: 150, marginTop: 50 }}
                    source={{ uri: "https://seeklogo.com/images/A/anna-university-logo-DFAA543EDF-seeklogo.com.png" }} />
                <Text style={{ fontWeight: "bold", fontSize: 30, color: "#000" }}>ANN UNIVERSITY</Text>
                <Text style={{ opacity: 0.6, fontSize: 10, color: "#000" }}>Guindy, chennai</Text>
                <Text style={{ fontWeight: "bold", fontSize: 30, color: "#000", marginTop: 40 }}>LOGIN</Text>
                <View style={{ width: "86%", flexDirection: "row", justifyContent: "space-between" }}>
                    <Button
                        buttonStyle={{ backgroundColor: selectedStudent ? "#fff" : "#56121D", borderWidth: 1, borderColor: "#56121D" }}
                        title="STAFF"
                        titleStyle={{ color: selectedStudent ? "#56121D" : "#fff" }}
                        containerStyle={{ backgroundColor: "#56121D", width: "45%", marginTop: 25 }}
                        onPress={() => {
                            setSelectedStudent(false);
                        }}
                    />
                    <Button
                        buttonStyle={{ backgroundColor: selectedStudent ? "#56121D" : "#fff", borderWidth: 1, borderColor: "#56121D" }}
                        title="STUDENT"
                        titleStyle={{ color: selectedStudent ? "#fff" : "#56121D" }}
                        containerStyle={{ backgroundColor: "#56121D", width: "45%", marginTop: 25 }}
                        onPress={() => {
                            setSelectedStudent(true);
                        }}
                    />
                </View>
                {!selectedStudent ? <View
                    style={{ width: "80%", marginTop: 20 }}
                >
                    <Text style={{ opacity: 0.6, fontSize: 12, color: "#000" }}>Staff ID</Text>
                    <TextInput
                        value={staffID}
                        placeholder="Please enter staff id"
                        placeholderTextColor="gray"
                        onChangeText={(text) => {
                            setStaffID(text)
                        }}
                        style={{ borderWidth: 1, borderColor: "transparent", borderRadius: 10, borderBottomColor: "#A9A9A9", marginTop: 12, color: "#000" }}
                    />
                    <Text style={{ opacity: 0.6, fontSize: 12, color: "#000", marginTop: 20 }}>Password</Text>
                    <TextInput
                        value={password}
                        placeholder="Please enter password"
                        placeholderTextColor="gray"
                        onChangeText={(text) => {
                            setPassword(text)
                        }}
                        style={{ borderWidth: 1, borderColor: "transparent", borderRadius: 10, borderBottomColor: "#A9A9A9", marginTop: 12, color: "#000" }}
                    />
                </View>
                    :
                    <View
                        style={{ width: "80%", marginTop: 20 }}
                    >
                        <Text style={{ opacity: 0.6, fontSize: 12, color: "#000" }}>Roll no</Text>
                        <TextInput
                            value={rollno}
                            placeholder="Please enter roll number"
                            placeholderTextColor="gray"
                            onChangeText={(text) => {
                                setRollno(text)
                            }}
                            style={{ borderWidth: 1, borderColor: "transparent", borderRadius: 10, borderBottomColor: "#A9A9A9", marginTop: 12, color: "#000" }}
                        />
                        <Text style={{ opacity: 0.6, fontSize: 12, color: "#000", marginTop: 20 }}>Password</Text>
                        <TextInput
                            value={studentPassword}
                            placeholder="Please enter password"
                            placeholderTextColor="gray"
                            onChangeText={(text) => {
                                setStudentPassword(text)
                            }}
                            style={{ borderWidth: 1, borderColor: "transparent", borderRadius: 10, borderBottomColor: "#A9A9A9", marginTop: 12, color: "#000" }}
                        />
                    </View>}
                <Text style={{ color: "red" }}>{signError}</Text>
                <Button
                    buttonStyle={{ backgroundColor: "#56121D" }}
                    title="LOGIN"
                    containerStyle={{ backgroundColor: "#56121D", width: "80%", marginTop: 25 }}
                    onPress={() => {
                        staffSignFunc()
                    }}
                />
                <View style={{ height: 50 }} />
            </View>

        </ScrollView>
    );
}

export default Login;