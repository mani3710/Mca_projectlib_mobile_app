import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentDataListByStaffAndBatch, getProjectReviewList, setSelectedReview } from '../../../redux/reducers/project';
import * as Routes from '../../../navigation/routes';
import { getStudentProjectReviewList, getStudentProjectReviewMark } from '../../../redux/reducers/studentProject';
const ReviewMark = (props) => {
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
        selectedReview,
        reviewMark
    } = studentStore;


    useEffect(() => {
        getStudentProjectReviewMarkFun();
    }, [])
    const getStudentProjectReviewMarkFun = () => {
        console.log("in", selectedProjectData.uuid)
        dispatch(getStudentProjectReviewMark({ studentid: studentData.uuid, reviewid: selectedReview.uuid }));
    }
    const getMarkData = (item) => {
        for (let obj of reviewMark.markArray) {
            if (obj.topicid == item.uuid) {
                return obj.mark
            }
        }
    }
    const getTotalMark = (item) => {
        let total = 0;
        for (let obj of reviewMark.markArray) {
            total += parseInt(obj.mark)
        }
        return total;
    }
    return (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
            <Text style={{ color: "black", fontWeight: "bold", marginLeft: 20, fontSize: 24, marginTop: 20 }}>{selectedReview.reviewname}</Text>
            {reviewMark.markArray.length ?
                <FlatList
                    data={reviewMark.topicArray}
                    ListFooterComponent={() => {
                        return (
                            <View

                                style={{ width: "85%", alignSelf: "center", paddingBottom: 15, paddingTop: 15, borderBottomColor: "#DCDCDC", borderBottomWidth: 1, marginTop: 20 }}>
                                <Text style={{ color: "black", fontSize: 15 }}>Total</Text>
                                <Text style={{ color: "black", fontSize: 15, fontWeight: "bold", marginTop: 10 }}>{getTotalMark()}</Text>
                            </View>
                        )
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <View

                                style={{ width: "85%", alignSelf: "center", paddingBottom: 15, paddingTop: 15, borderBottomColor: "#DCDCDC", borderBottomWidth: 1, marginTop: 20 }}>
                                <Text style={{ color: "black", fontSize: 15 }}>{item.title}</Text>
                                <Text style={{ color: "black", fontSize: 15, fontWeight: "bold", marginTop: 10 }}>{parseFloat(getMarkData(item)).toFixed(2)}</Text>
                            </View>
                        )
                    }}
                />
                :
                <Text style={{ color: "black", fontSize: 15, alignSelf: "center", marginTop: 20 }}>No review marks</Text>
            }

        </View>
    );
}
export default ReviewMark;       