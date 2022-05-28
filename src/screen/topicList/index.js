import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentDataListByStaffAndBatch, getProjectReviewList, getReviewTopicList, updateReviewMark } from '../../redux/reducers/project';
import * as Routes from '../../navigation/routes';
import { Button } from 'react-native-elements';
const TopicList = (props) => {
    const dispatch = useDispatch();
    const projectStore = useSelector(state => state.project);
    const authStore = useSelector(state => state.auth);
    const {
        projectLoader,
        projectList,
        selectedBatchStudentList,
        selectedBatchData,
        selectedProject,
        reviewList,
        selectedStundent,
        topicList,
        selectedReview
    } = projectStore;

    const {
        staffData
    } = authStore;


    useEffect(() => {
        getReviewTopicListFun();
    }, [])
    const getReviewTopicListFun = () => {
        console.log("selectedReview", selectedReview);
        dispatch(getReviewTopicList(selectedReview.uuid));
    }
    return (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
            <Text style={{ color: "black", fontWeight: "bold", marginLeft: 20, fontSize: 24, marginTop: 20 }}>{selectedStundent.username}</Text>
            <Text style={{ color: "#808080", fontSize: 13, marginLeft: 20, }}>{selectedStundent.rollno}</Text>
            <FlatList
                data={topicList}
                renderItem={({ item, index }) => {
                    return (
                        <View
                            onPress={async () => {
                                // await dispatch(setSelectedReview(item));
                                //props.navigation.navigate(Routes.STUDENT_LIST)
                            }}
                            style={{ width: "85%", alignSelf: "center", paddingBottom: 15, paddingTop: 15, marginTop: 20 }}>
                            <Text style={{ color: "black", fontSize: 15 }}>{item.title} ({item.maxmark})</Text>
                            <TextInput
                                value={item.mark}
                                keyboardType="numeric"
                                placeholder={`Please enter ${item.title} mark`}
                                placeholderTextColor="gray"
                                onChangeText={(text) => {
                                    //  setStaffID(text) 
                                    if (parseInt(text) <= parseInt(item.maxmark)) {
                                        dispatch(updateReviewMark({ index: index, mark: text }));
                                    }
                                }}
                                style={{ borderWidth: 1, borderColor: "transparent", borderRadius: 10, borderBottomColor: "#A9A9A9", marginTop: 12, color: "#000" }}
                            />
                        </View>
                    )
                }}
            />
            <Button
                buttonStyle={{ backgroundColor: "#56121D" }}
                title="UPDATE MARK"
                containerStyle={{ backgroundColor: "#56121D", width: "80%", marginTop: 25, alignSelf: "center", marginBottom: 25 }}
                onPress={() => {
                    //  staffSignFunc()
                }}
            />

        </View>
    );
}
export default TopicList;