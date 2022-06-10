import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentDataListByStaffAndBatch, getProjectReviewList } from '../../../redux/reducers/project';
import * as Routes from '../../../navigation/routes';
import { getStudentProjectReviewList, setSelectedReview } from '../../../redux/reducers/studentProject';
import { Button } from 'react-native-elements';
const StudentReviewList = (props) => {
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


    useEffect(() => {
        getProjectReviewListFun();
    }, [])
    const getProjectReviewListFun = () => {
        console.log("in", selectedProjectData.uuid)
        dispatch(getStudentProjectReviewList(selectedProjectData.uuid));
    }
    return (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
            <Text style={{ color: "black", fontWeight: "bold", marginLeft: 20, fontSize: 24, marginTop: 20 }}>{selectedProjectData.title}</Text>
            <FlatList
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
            />
            <Button
                buttonStyle={{ backgroundColor: "#56121D" }}
                title="UPLOAD PROJECT"
                containerStyle={{ backgroundColor: "#56121D", width: "80%", marginTop: 25, alignSelf: "center", marginBottom: 25 }}
                onPress={async () => {
                    // submit()
                    // await dispatch(logout());
                    // Toast.show("Logout successfully");
                    props.navigation.replace(Routes.STUDENT_PROJECT_UPLOAD);

                }}
            />

        </View>
    );
}
export default StudentReviewList;