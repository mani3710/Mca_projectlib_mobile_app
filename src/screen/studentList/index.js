import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentDataListByStaffAndBatch, setSelectedStundent } from '../../redux/reducers/project';
import * as Routes from '../../navigation/routes';
const StudentList = (props) => {
    const dispatch = useDispatch();
    const projectStore = useSelector(state => state.project);
    const authStore = useSelector(state => state.auth);
    const {
        projectLoader,
        projectList,
        selectedBatchStudentList,
        selectedBatchData,
        selectedProject
    } = projectStore;

    const {
        staffData
    } = authStore;
    const [filteredStundet, setFilteredStundet] = useState(selectedBatchStudentList);
    const [studentSearchText, setStudentSearchText] = useState("");
    const handleFilter = (text) => {
        let newStudentList = [];
        for (let student of selectedBatchStudentList) {
            let rollno = student.rollno;
            let n = rollno.search(text);
            if (n >= 0) {
                newStudentList.push(student);
            }
        }
        setFilteredStundet(newStudentList);
    }
    useEffect(() => {
        getStudentDataListByStaffAndBatchFunc();
        // setTimeout(() => {
        //     setFilteredStundet(selectedBatchStudentList);
        // }, 1000)
    }, [])
    const getStudentDataListByStaffAndBatchFunc = () => {
        dispatch(getStudentDataListByStaffAndBatch({ projectid: selectedProject.uuid, staffid: staffData.uuid }));
    }
    return (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
            <Text style={{ color: "black", fontWeight: "bold", marginLeft: 20, fontSize: 24, marginTop: 20 }}>{selectedBatchData.title}</Text>
            <TextInput
                value={studentSearchText}
                placeholder="Search student roll number"
                placeholderTextColor="gray"
                onChangeText={(text) => {
                    setStudentSearchText(text);
                    handleFilter(text);
                }}
                style={{
                    borderWidth: 1,
                    borderColor: "transparent",
                    borderRadius: 10,
                    borderBottomColor: "#A9A9A9",
                    marginTop: 12,
                    color: "#000",
                    textAlign: "center",
                    width: "85%",
                    alignSelf: "center"
                }}
            />
            <FlatList
                data={filteredStundet}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={async () => {
                                await dispatch(setSelectedStundent(item));
                                props.navigation.navigate(Routes.REVIEW_LIST)
                            }}
                            style={{ width: "85%", alignSelf: "center", paddingBottom: 15, paddingTop: 15, borderBottomColor: "#DCDCDC", borderBottomWidth: 1, marginTop: 20 }}>
                            <Text style={{ color: "black", fontSize: 15 }}>{item.username}, {item.rollno}</Text>
                            <Text style={{ color: "#808080", fontSize: 13 }}>{item.email}</Text>
                        </TouchableOpacity>
                    )
                }}
            />

        </View>
    );
}
export default StudentList;