import {SafeAreaView, Text, TextInput, View} from "react-native";
import ProfileTab from "./Profile";
import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import { StyleSheet, StatusBar } from 'react-native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import {createRef, useCallback, useEffect, useState} from "react";
import {Button, Overlay} from "@rneui/themed";
import isEmail from "validator/lib/isEmail";
import httpClient from "../../httpClient";
import {useFocusEffect} from "@react-navigation/native";

function Create({}) {

    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: {
                    fontWeight: "bold",
                },
                gestureDirection: "horizontal",
                gestureEnabled: true,
                headerShown: true,
                animation: "slide_from_right",
                // time speed of animation
                animationTypeForReplace: "pop",
                animationDuration: 10,

            }}
        >
            <Stack.Screen name="Create Content" component={CreateDetails} />
        </Stack.Navigator>
    );
}

function CreateDetails (navigation) {
    const _editor = createRef();

    const [title, setTitle] = useState('');
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState('');

    const onChangeTitle = (text) => {
        setTitle(text);
    }
    const clearContent = () => {
        setValue('');
        setTitle('');
        _editor.current?.setContents([
            { insert: '' }
        ]);
    }
    useFocusEffect(
        useCallback(() => {
            clearContent();
        }, [])
    )

    const toggleOverlay = () => {
        _editor.current?.getHtml().then((html) => {
            setValue(html);
        });
        if (title === '') {
            alert("Please fill all fields");
            return;
        }
        setVisible(!visible);
    };
    const confirmUpload = () => {
        let data = {
            title: title,
            content: value
        }
        httpClient.createKonten(data).then((res) => {
            setVisible(!visible);
            alert("Success");
            //delete _editor.current;
            setTitle('');
            setValue('');

        })
        _editor.current?.setContents([
            { insert: '' }
        ]);
    }
    return(
        <SafeAreaView style={styles.root}>
            <SafeAreaView style={styles.inputContainer}>
                <Text style={styles.label}>Judul Konten</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={onChangeTitle}
                    placeholder="Title"
                />
            </SafeAreaView>

            <StatusBar style="auto" />
            <Text style={styles.label1}>Isi Konten</Text>
            <QuillEditor
                style={styles.editor}
                ref={_editor}
                value={value}
                onChange={setValue}
                placeholder="Write something..."
                theme="snow"
            />
            <QuillToolbar editor={_editor} options="full" theme="light" />

            <Button  size="md" style={styles.button} onPress={toggleOverlay}>
                Upload Konten
            </Button>
            <Overlay isVisible={visible}  onBackdropPress={toggleOverlay}>
                <SafeAreaView >
                    <View style={styles.overlay} >
                        <Text style={styles.titleoverlay} >
                            Upload Konten ?
                        </Text>
                        <View style={styles.buttonoverlay}>
                            <Button radius="md" buttonStyle={{
                                marginHorizontal: 20,
                            }} type="clear" size="sm" style={styles.buttonoverlay2} onPress={toggleOverlay}>
                                Cancel
                            </Button>
                            <Button radius="md" type="clear" size="sm" style={styles.buttonoverlay1}  onPress={confirmUpload}>
                                Upload
                            </Button>
                        </View>
                    </View>
                </SafeAreaView>
            </Overlay>
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    buttonoverlay:{
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "100%",
    },
    buttonoverlay1:{
        width: 100,
    },
    buttonoverlay2:{
        width: 100,
    },
    modalButton: {
        marginTop: 10,
        marginBottom: 10,
        width: 10,
    },
    titleoverlay: {
        fontSize: 15,
        marginBottom: 20,
    },
    overlay: {
        width: 300,
        padding: 15,

    },
    container: {
        flex: 1,
        justifyContent: "center",
    },
    input: {
        height: 50,
        borderWidth: 1,
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: "#f8f8f8",
        borderColor: "#d3d3d3",
        width: "100%",
    },
    button: {
        width: "100%",
    },
    label: {
        marginBottom: 5,
        color: "#4d4d4d",
    },
    label1: {
        marginBottom: 5,
        color: "#4d4d4d",
        marginLeft: 25,
    },
    inputContainer: {
        padding: 25,
        paddingBottom: 5,
    },
    title: {
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 10,
    },
    root: {
        flex: 1,
        backgroundColor: '#eaeaea',
    },
    editor: {
        flex: 1,
        padding: 0,
        borderColor: "#d3d3d3",
        borderRadius: 5,
        borderWidth: 1,
        marginHorizontal: 25,
        marginVertical: 5,
        backgroundColor: 'white',
    },
});
export default Create;