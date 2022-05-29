import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { projectListByStaff, setSelectedProject } from '../../redux/reducers/project';
import * as Routes from '../../navigation/routes';
import { Button } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { logout } from '../../redux/reducers/auth';
const Home = (props) => {
    const dispatch = useDispatch();
    const projectStore = useSelector(state => state.project);
    const authStore = useSelector(state => state.auth);
    const {
        projectLoader,
        projectList
    } = projectStore;

    const {
        staffData
    } = authStore;
    useEffect(() => {
        getProjectList();
    }, []);
    const getProjectList = () => {
        console.log("in", staffData)
        dispatch(projectListByStaff(staffData.uuid));
    }
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Text style={{ color: "black", fontWeight: "bold", marginLeft: 20, fontSize: 24, marginTop: 20 }}>PROJECT</Text>
            <FlatList
                style={{ marginTop: 20 }}
                data={projectList}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={async () => {
                                await dispatch(setSelectedProject(item));
                                props.navigation.navigate(Routes.STUDENT_LIST)
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
                    await dispatch(logout());
                    Toast.show("Logout successfully");
                    props.navigation.replace(Routes.LOGIN);

                }}
            />
        </View >
    );
}

export default Home; 