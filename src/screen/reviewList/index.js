import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentDataListByStaffAndBatch, getProjectReviewList, setSelectedReview } from '../../redux/reducers/project';
import * as Routes from '../../navigation/routes';
const ReviewList = (props) => {
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
        selectedStundent
    } = projectStore;

    const {
        staffData
    } = authStore;


    useEffect(() => {
        getProjectReviewListFun();
    }, [])
    const getProjectReviewListFun = () => {
        console.log("in", selectedProject.uuid)
        dispatch(getProjectReviewList(selectedProject.uuid));
    }
    return (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
            <Text style={{ color: "black", fontWeight: "bold", marginLeft: 20, fontSize: 24, marginTop: 20 }}>{selectedStundent.username}</Text>
            <FlatList
                data={reviewList}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={async () => {
                                await dispatch(setSelectedReview(item));
                                props.navigation.navigate(Routes.TOPIC_LIST)
                            }}
                            style={{ width: "85%", alignSelf: "center", paddingBottom: 15, paddingTop: 15, borderBottomColor: "#DCDCDC", borderBottomWidth: 1, marginTop: 20 }}>
                            <Text style={{ color: "black", fontSize: 15 }}>{item.reviewname}</Text>
                        </TouchableOpacity>
                    )
                }}
            />

        </View>
    );
}
export default ReviewList;