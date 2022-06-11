import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, TextInput, FlatList, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import IMAGES from '../../assest/images';
import * as Routes from '../../navigation/routes';
import { SearchBar } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-simple-toast';
import uuid from 'react-native-uuid';
import ImageView from "react-native-image-viewing";
import { getProjectFeedList, getProjectDetailsFeed } from '../../redux/reducers/project';
const data = [
    { label: 'Title', value: 'Title' },
    { label: 'Domain', value: 'Domain' },
    { label: 'Year', value: 'Year' }
];
const ProjectDetails = (props) => {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState("");
    const [selectedSearchType, setSelectedSearchType] = useState({ label: 'Text', value: 'Text' });
    const [visible, setIsVisible] = useState(false);
    const [zoomImage, setZoomImage] = useState([]);
    const projectStore = useSelector(state => state.project);

    const {
        projectListForFeed,
        selectedProjectForFeedMore,
        feedProjectDetailsList
    } = projectStore;
    useEffect(() => {
        getProjectDetailsFeedFunc();
    }, []);
    const handleClick = (url) => {
        Linking
            .openURL(`${url}`)
            .catch(err => console.error('Error', err));
    }
    const getProjectDetailsFeedFunc = () => {
        dispatch(getProjectDetailsFeed({ projectid: selectedProjectForFeedMore.projectid, studentid: selectedProjectForFeedMore.studentid }));
    }
    const renderHeadingText = (item) => {
        return (
            <View style={{ marginTop: 20 }}>
                <Text style={{ color: "#000", fontWeight: "bold", fontSize: 18 }}>{item.title}</Text>
                <Text style={{ color: "gray", fontSize: 13, marginTop: 10, lineHeight: 24, textAlign: "justify" }}>{item.valuedata}</Text>
            </View>
        )
    }
    const renderHeadingImages = (item) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setZoomImage([
                        {
                            uri: item.valuedata
                        }
                    ]);
                    setIsVisible(true)
                }}
                style={{ marginTop: 20 }}>
                <Image
                    source={{ uri: item.valuedata }}
                    resizeMode="contain"
                    style={{ width: "100%", height: 250, alignSelf: "center", }}
                />
                <Text style={{ color: "#000", fontSize: 12, alignSelf: "center", textAlign: "justify" }}>{item.title}</Text>
            </TouchableOpacity>
        )
    }
    const renderHeadingURL = (item) => {
        return (
            <View style={{ marginTop: 10 }}>

                <Text
                    onPress={() => {
                        handleClick(item.valuedata)
                    }}
                    style={{ color: "#0000EE", fontSize: 15, lineHeight: 24, textAlign: "justify" }}>{item.valuedata}</Text>
            </View>
        )
    }
    const renderSubHeadingImages = (item) => {
        return (
            <View style={{ marginTop: 20 }}>
                <Image
                    source={{ uri: item.valuedata }}
                    resizeMode="contain"
                    style={{ width: 200, height: 200, alignSelf: "center" }}
                />
            </View>
        )
    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 24 }}>

            <Text style={{ color: "#000", paddingTop: 10, fontWeight: "bold", fontSize: 18, marginTop: 20 }}>{selectedProjectForFeedMore.title}</Text>
            <Text style={{ color: "#E0E0E0", fontSize: 11 }}>{selectedProjectForFeedMore.adddate}</Text>
            <Text style={{ color: "gray", fontSize: 11 }}>{selectedProjectForFeedMore.domain}</Text>
            <Text style={{ color: "#000", paddingTop: 10, fontWeight: "bold", fontSize: 18 }}>Abstract</Text>
            <Text style={{ color: "gray", fontSize: 13, marginTop: 10, lineHeight: 24, textAlign: "justify" }} >{selectedProjectForFeedMore.abstract}</Text>

            <FlatList
                style={{ flex: 1, width: "100%" }}
                data={feedProjectDetailsList}
                renderItem={({ item, index }) => {
                    if (item.option == "Heading") {
                        switch (item.type) {
                            case "Text":
                                return (<View style={{ width: "100%" }}>
                                    {renderHeadingText(item)}
                                </View>);
                                break;
                            case "Image/Url":
                                return (<View style={{ width: "100%", alignSelf: "center" }}>
                                    {renderHeadingImages(item)}
                                </View>);
                            case "Url":
                                return (<View style={{ width: "100%" }}>
                                    {renderHeadingURL(item)}
                                </View>);
                        }
                    } else {
                        switch (item.type) {
                            case "Text":
                                return (<View style={{ width: "100%", paddingLeft: 24 }}>
                                    {renderHeadingText(item)}
                                </View>);
                                break;
                            case "Image/Url":
                                return (<View style={{ width: "100%", paddingLeft: 24 }}>
                                    {renderHeadingImages(item)}
                                </View>);
                            case "Url":
                                return (<View style={{ width: "100%", paddingLeft: 24 }}>
                                    {renderHeadingURL(item)}
                                </View>);
                        }
                    }
                    return (<View></View>)

                }}
            />
            <View style={{ width: "100%", height: 50 }}></View>
            <ImageView
                images={zoomImage}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            />
        </ScrollView>
    );
}

export default ProjectDetails; 