import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentDataListByStaffAndBatch, setSelectedStundent } from '../../redux/reducers/project';
import * as Routes from '../../navigation/routes';
import { Button } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { logout } from '../../redux/reducers/auth';
import { getStudentProject, setSelectedProjectData } from '../../redux/reducers/studentProject';
const StudentProject = (props) => {
    const dispatch = useDispatch();
    const studentStore = useSelector(state => state.student);
    const authStore = useSelector(state => state.auth);

    const {
        studentData
    } = authStore;
    const {
        studentProjectList
    } = studentStore;
    useEffect(() => {
        dispatch(getStudentProject(studentData.uuid))
    }, [])

    return (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
            <Text style={{ color: "black", fontWeight: "bold", marginLeft: 20, fontSize: 24, marginTop: 20 }}>PROJECT</Text>
            <FlatList
                style={{ marginTop: 20 }}
                data={studentProjectList}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={async () => {
                                await dispatch(setSelectedProjectData(item));
                                props.navigation.navigate(Routes.STUDENT_PROJECT_REVIEW)
                            }}
                            style={{ width: "85%", alignSelf: "center", paddingBottom: 15, paddingTop: 15, borderBottomColor: "#DCDCDC", borderBottomWidth: 1, marginTop: 20 }}>
                            <Text style={{ color: "black", fontSize: 15 }}>{item.title}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
            <Button
                buttonStyle={{ backgroundColor: "#56121D" }}
                title="LOGOUT"
                containerStyle={{ backgroundColor: "#56121D", width: "80%", marginTop: 25, alignSelf: "center", marginBottom: 25 }}
                onPress={async () => {
                    // submit()
                    // await dispatch(logout());
                    // Toast.show("Logout successfully");
                    // props.navigation.replace(Routes.LOGIN);

                }}
            />
        </View>
    );
}
export default StudentProject;