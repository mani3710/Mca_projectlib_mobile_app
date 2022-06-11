import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, TextInput, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import IMAGES from '../../assest/images';
import * as Routes from '../../navigation/routes';
import { SearchBar } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-simple-toast';
import uuid from 'react-native-uuid';
import { getProjectFeedList, setSelectedProjectForFeedMore } from '../../redux/reducers/project';
const data = [
    { label: 'Title', value: 'Title' },
    { label: 'Domain', value: 'Domain' },
    { label: 'Year', value: 'Year' }
];
const ProjectList = (props) => {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState("");
    const [selectedSearchType, setSelectedSearchType] = useState({ label: 'Text', value: 'Text' });
    const projectStore = useSelector(state => state.project);

    const {
        projectListForFeed
    } = projectStore;
    useEffect(() => {
        getProjectFeedListFunc();
    }, [])
    const getProjectFeedListFunc = () => {
        dispatch(getProjectFeedList());
    }
    return (
        <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>

            <TextInput
                value={searchText}
                placeholder="Search the project"
                placeholderTextColor="gray"
                multiline={true}
                autoCapitalize
                onChangeText={(text) => {
                    setSearchText(text)
                }}
                style={{
                    borderWidth: 1,
                    borderColor: "transparent",
                    borderRadius: 10,
                    borderBottomColor: "#A9A9A9",
                    marginTop: 12, color: "#000",
                    width: "90%",
                    textAlign: "center"
                }}
            />
            <Dropdown
                selectedTextStyle={{ color: "red", fontSize: 15, fontWeight: "bold" }}
                value={selectedSearchType}
                data={data}
                style={{
                    width: "90%", height: 40, backgroundColor: "gray",
                    paddingLeft: 10, marginTop: 10,


                }}
                onChange={e => {
                    console.log(e.label)
                    setSelectedSearchType(e.value);
                }}
                renderItem={(item) => {
                    return (
                        <View>
                            <Text style={{ color: "#000", paddingTop: 10, marginLeft: 20, paddingBottom: 10 }}>{item.value}</Text>
                        </View>
                    );
                }}

            />
            <FlatList
                style={{ flex: 1, width: "90%" }}
                data={projectListForFeed}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ width: "100%", borderBottomColor: "#E0E0E0", borderBottomWidth: 1, paddingLeft: 10, marginTop: 20 }}>
                            <Text style={{ color: "#000", paddingTop: 10, fontWeight: "bold", fontSize: 15, lineHeight: 24, textAlign: "justify" }}>{item.title}</Text>
                            <Text style={{ color: "#E0E0E0", fontSize: 11 }}>{item.adddate}</Text>
                            <Text style={{ color: "gray", fontSize: 11 }}>{item.domain}</Text>
                            <Text style={{ color: "gray", fontSize: 13, marginTop: 10, lineHeight: 24, textAlign: "justify" }} numberOfLines={3}>{item.abstract}</Text>
                            <Text
                                onPress={() => {
                                    dispatch(setSelectedProjectForFeedMore(item));
                                    props.navigation.navigate(Routes.STUDENT_PROJECT_DETAILS)
                                }}
                                style={{ color: "#56121D", padding: 10, fontSize: 13, alignSelf: "flex-end" }} >Read More...</Text>
                        </View>
                    );
                }}
            />
        </View>
    );
}

export default ProjectList; 