import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentDataListByStaffAndBatch, getProjectReviewList } from '../../../redux/reducers/project';
import * as Routes from '../../../navigation/routes';
import { getStudentProjectReviewList, setSelectedReview } from '../../../redux/reducers/studentProject';
import { Button } from 'react-native-elements';
const UploadProject = (props) => {
    const dispatch = useDispatch();
    const studentStore = useSelector(state => state.student);
    const authStore = useSelector(state => state.auth);


    const {
        studentData
    } = authStore;
    const {
        studentProjectList,
        selectedProjectData,
        projectReviewList
    } = studentStore;
    const [projectTitle, setProjectTitle] = useState("");
    const [domain, setDomain] = useState("");
    const [projectAdracts, setProjectAdracts] = useState("");


    // useEffect(() => {
    //     getProjectReviewListFun();
    // }, [])
    // const getProjectReviewListFun = () => {
    //     console.log("in", selectedProjectData.uuid)
    //     dispatch(getStudentProjectReviewList(selectedProjectData.uuid));
    // }
    return (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
            <Text style={{ color: "black", fontWeight: "bold", marginLeft: 20, fontSize: 24, marginTop: 20 }}>UPLOAD PROJECT</Text>
            <ScrollView style={{ flex: 1 }}>
                <KeyboardAvoidingView>
                    <View style={{ width: "85%", alignSelf: "center" }}>
                        <Text style={{ color: "black", fontWeight: "bold", fontSize: 18, marginTop: 20 }}>Title</Text>
                        <TextInput
                            value={projectTitle}
                            placeholder="Project title"
                            placeholderTextColor="gray"
                            multiline={true}
                            autoCapitalize
                            onChangeText={(text) => {
                                setProjectTitle(text)
                            }}
                            style={{ borderWidth: 1, borderColor: "transparent", borderRadius: 10, borderBottomColor: "#A9A9A9", marginTop: 12, color: "#000" }}
                        />

                        <Text style={{ color: "black", fontWeight: "bold", fontSize: 18, marginTop: 20 }}>Domain</Text>
                        <TextInput
                            value={domain}
                            placeholder="Project domain"
                            placeholderTextColor="gray"
                            onChangeText={(text) => {
                                setDomain(text)
                            }}
                            style={{ borderWidth: 1, borderColor: "transparent", borderRadius: 10, borderBottomColor: "#A9A9A9", marginTop: 12, color: "#000" }}
                        />
                        <Text style={{ color: "black", fontWeight: "bold", fontSize: 18, marginTop: 20 }}>Abstract</Text>
                        <TextInput
                            value={projectAdracts}
                            autoCapitalize
                            placeholder="Project adstract"
                            placeholderTextColor="gray"
                            onChangeText={(text) => {
                                setProjectAdracts(text)
                            }}
                            multiline={true}
                            style={{ borderWidth: 1, borderColor: "transparent", borderRadius: 10, borderBottomColor: "#A9A9A9", marginTop: 12, color: "#000" }}
                        />
                        <Button
                            buttonStyle={{ backgroundColor: "#fff", borderColor: "#56121D", borderWidth: 1 }}
                            title="+ TITLE"
                            containerStyle={{ width: "60%", marginTop: 25, alignSelf: "center", marginBottom: 10, backgroundColor: "#fff" }}
                            onPress={async () => {

                            }}
                            titleStyle={{ fontWeight: "bold", color: "#56121D" }}
                        />
                        <Button
                            buttonStyle={{ backgroundColor: "#fff", borderColor: "#56121D", borderWidth: 1 }}
                            title="+ SUB-TITLE"
                            containerStyle={{ width: "60%", alignSelf: "center", marginBottom: 25, backgroundColor: "#fff" }}
                            onPress={async () => {
                            }}
                            titleStyle={{ fontWeight: "bold", color: "#56121D" }}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
            {/* <FlatList
                data={projectReviewList}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={async () => {
                                await dispatch(setSelectedReview(item));
                                props.navigation.navigate(Routes.STUDENT_PROJECT_REVIEW_MARK)
                            }}
                            style={{ width: "85%", alignSelf: "center", paddingBottom: 15, paddingTop: 15, borderBottomColor: "#DCDCDC", borderBottomWidth: 1, marginTop: 20 }}>
                            <Text style={{ color: "black", fontSize: 15 }}>{item.reviewname}</Text>
                        </TouchableOpacity>
                    )
                }}
            /> */}
            <Button
                buttonStyle={{ backgroundColor: "#56121D" }}
                title="UPLOAD PROJECT"
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
export default UploadProject;