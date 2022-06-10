import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentDataListByStaffAndBatch, getProjectReviewList } from '../../../redux/reducers/project';
import * as Routes from '../../../navigation/routes';
import { getStudentProjectReviewList, setSelectedReview, emptyProjectUploadStatus, insertStudentProjectData } from '../../../redux/reducers/studentProject';
import { Button } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-simple-toast';
import uuid from 'react-native-uuid';
const data = [
    { label: 'Text', value: 'Text' },
    { label: 'Image/Url', value: 'Image/Url' },
    { label: 'Url', value: 'Url' },
];
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
        projectReviewList,
        projectUploadStatus
    } = studentStore;
    useEffect(() => {
        if (projectUploadStatus == "success") {
            dispatch(emptyProjectUploadStatus());
            Toast.show("Uploaded successfully!");
            props.navigation.goBack();
        } else if (projectUploadStatus == "failed") {
            dispatch(emptyProjectUploadStatus());
            Toast.show("Project already upload");
        }
    }, [projectUploadStatus])
    const [projectTitle, setProjectTitle] = useState("");
    const [domain, setDomain] = useState("");
    const [projectAdracts, setProjectAdracts] = useState("");
    const [topicDataList, setTopicDataList] = useState([]);


    // useEffect(() => {
    //     getProjectReviewListFun();
    // }, [])
    // const getProjectReviewListFun = () => {
    //     console.log("in", selectedProjectData.uuid)
    //     dispatch(getStudentProjectReviewList(selectedProjectData.uuid));
    // }
    const addTopic = () => {
        let obj = {
            data: "",
            type: "Text",
            title: "",
            option: "Heading"
        }
        setTopicDataList([...topicDataList, obj]);
    }
    const addSubTopic = () => {
        let obj = {
            data: "",
            type: "Text",
            title: "",
            option: "SubHeading"
        }
        setTopicDataList([...topicDataList, obj]);
    }
    const emptyFieldCheck = () => {
        if (projectAdracts && projectAdracts && projectTitle) {
            for (let obj of topicDataList) {
                if (obj.data && obj.title) {

                } else {
                    return false;
                }
            }
            return true;
        } else {
            return false
        }

    }
    const submit = () => {
        console.log("in")
        if (emptyFieldCheck()) {
            let projectArray = [];
            let i = 1;
            for (let obj of topicDataList) {
                let innerObj = {
                    uuid: uuid.v1(),
                    studentid: studentData.uuid,
                    projectid: selectedProjectData.uuid,
                    orderno: i++,
                    type: obj.type,
                    valuedata: obj.data,
                    option: obj.option,
                    title: obj.title
                }
                projectArray.push(innerObj);

            }

            let body = {
                arrayOfProjectInfo: projectArray,
                uuid: uuid.v1(),
                studentid: studentData.uuid,
                projectid: selectedProjectData.uuid,
                title: projectTitle,
                domain: domain,
                abstract: projectAdracts,
                year: new Date().getFullYear()
            }
            console.log(body);
            dispatch(insertStudentProjectData(body));
        } else {
            Toast.show("Empty Field found!")
        }
    }

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
                        <FlatList
                            data={topicDataList}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ marginTop: 35, justifyContent: "flex-end" }}>


                                        <TextInput
                                            value={item.title}
                                            autoCapitalize
                                            placeholder="Enter title"
                                            placeholderTextColor="gray"
                                            onChangeText={(text) => {
                                                let topicArray = [...topicDataList];
                                                topicArray[index].title = text;
                                                setTopicDataList(topicArray);
                                            }}
                                            multiline={true}
                                            style={{
                                                borderWidth: 1, borderColor: "transparent", borderRadius: 10, borderBottomColor: "#A9A9A9", color: "#000", width: "85%", marginTop: -15, marginLeft: 10,
                                                fontWeight: item.option == "Heading" ? "bold" : "500",
                                                alignSelf: item.option == "Heading" ? "flex-start" : "flex-end"
                                            }}
                                        />


                                        <Dropdown
                                            selectedTextStyle={{ color: "#fff", fontSize: 15 }}
                                            value={""}


                                            data={data}
                                            style={{
                                                width: item.option == "Heading" ? "100%" : "85%", height: 40, backgroundColor: "gray",
                                                paddingLeft: 10, marginTop: 10,
                                                alignSelf: item.option == "Heading" ? "flex-start" : "flex-end",

                                            }}
                                            onChange={(e) => {
                                                console.log(e.label)
                                                let objArr = [...topicDataList];
                                                objArr[index].type = e.value;
                                                setTopicDataList(objArr);
                                            }}
                                            renderItem={(item) => {
                                                return (
                                                    <View>
                                                        <Text style={{ color: "#000", paddingTop: 10, marginLeft: 20, paddingBottom: 10 }}>{item.value}</Text>
                                                    </View>
                                                );
                                            }}

                                        />
                                        <TextInput
                                            value={item.data}
                                            autoCapitalize
                                            placeholder="Enter description"
                                            placeholderTextColor="gray"
                                            onChangeText={(text) => {
                                                let topicArray = [...topicDataList];
                                                topicArray[index].data = text;
                                                setTopicDataList(topicArray);
                                            }}
                                            multiline={true}
                                            style={{
                                                borderWidth: 1, borderColor: "transparent", borderRadius: 10, borderBottomColor: "#A9A9A9",
                                                color: "#000", width: item.option == "Heading" ? "98%" : "85%", marginTop: 5, marginLeft: 10,
                                                alignSelf: item.option == "Heading" ? "flex-start" : "flex-end"
                                            }}
                                        />
                                        {item.type == "Image/Url" && <Image
                                            resizeMode="contain"
                                            source={{ uri: item.data.length ? item.data : "https://www.pngfind.com/pngs/m/391-3916684_upload-logo-hd-png-download.png" }}
                                            style={{
                                                width: item.option == "Heading" ? 300 : 250, height: item.option == "Heading" ? 300 : 250,
                                                alignSelf: item.option == "Heading" ? "flex-start" : "flex-end"
                                            }}


                                        />}
                                        <Text
                                            onPress={() => {
                                                console.log(index);
                                                let objArr = [...topicDataList];
                                                objArr.splice(index, 1);
                                                setTopicDataList(objArr)
                                            }}
                                            style={{ color: "gray", alignSelf: "center", marginTop: 5 }}>Remove</Text>
                                    </View>
                                );
                            }}
                        />
                        <Button
                            buttonStyle={{ backgroundColor: "#fff", borderColor: "#56121D", borderWidth: 1 }}
                            title="+ ADD TITLE"
                            containerStyle={{ width: "60%", marginTop: 25, alignSelf: "center", marginBottom: 10, backgroundColor: "#fff" }}
                            onPress={async () => {
                                addTopic()
                            }}
                            titleStyle={{ fontWeight: "bold", color: "#56121D" }}
                        />
                        <Button
                            buttonStyle={{ backgroundColor: "#fff", borderColor: "#56121D", borderWidth: 1 }}
                            title="+ ADD SUB-TITLE"
                            containerStyle={{ width: "60%", alignSelf: "center", marginBottom: 25, backgroundColor: "#fff" }}
                            onPress={async () => {
                                addSubTopic();
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
                title="SUBMIT"
                containerStyle={{ backgroundColor: "#56121D", width: "80%", marginTop: 25, alignSelf: "center", marginBottom: 25 }}
                onPress={async () => {
                    submit()
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