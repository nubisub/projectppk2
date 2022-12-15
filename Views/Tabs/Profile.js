import {useState} from "react";
import {SafeAreaView, StyleSheet, TextInput, View} from "react-native";
import {Avatar, Button, Overlay, Text} from "@rneui/themed";
import * as React from "react";

function ProfileTab({navigation}) {
    const [text, onChangeText] = useState("");
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [username, setUsername] = useState("");
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");

    const onChangeNama = (text) => {
        setNama(text);
    }
    const onChangeEmail = (text) => {
        setEmail(text);
    }

    const toggleOverlay = () => {
        setVisible(!visible);
    };
    const toggleOverlay2 = () => {
        setVisible2(!visible2);
    };
    const logOut = () => {
        setVisible2(!visible2);
    };
    const confirmLogOut = () => {
        setVisible2(!visible2);
        navigation.navigate("Login");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.avatarContainer}>
                <Avatar
                    size="xlarge"
                    rounded
                    source={{
                        uri:
                            'https://i.pravatar.cc/300',
                    }}
                />
            </View>

            <View style={styles.inside2}>
                {/*label*/}
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    placeholder="Username"
                    editable={false}
                />
                <Text style={styles.label}>Nama</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNama}
                    value={nama}
                    placeholder="Nama Lengkap"
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    value={email}
                    placeholder="Email"
                />
                <Button radius="md" size="lg" style={styles.button} onPress={toggleOverlay}>
                    Update Data
                </Button>
                <Button radius="md"  buttonStyle={{
                    backgroundColor: '#ffffff',
                    borderWidth: 1.5,
                    borderColor: 'rgba(199, 43, 98, 1)',
                    marginTop: 10,
                }} color="error" type={"outline"} size="lg"  onPress={logOut}>
                    <Text style={{color: 'rgba(199, 43, 98, 1)', fontWeight: 'bold',  fontSize: 15}}>Log Out</Text>
                </Button>
                <Overlay isVisible={visible}  onBackdropPress={toggleOverlay}>
                    <SafeAreaView >
                        <View style={styles.overlay} >
                            <Text style={styles.titleoverlay} >
                                Update Data ?
                            </Text>
                            <View style={styles.buttonoverlay}>
                                <Button radius="md" buttonStyle={{
                                    marginHorizontal: 20,
                                }} type="clear" size="sm" style={styles.buttonoverlay2} onPress={toggleOverlay}>
                                    Cancel
                                </Button>
                                <Button radius="md" type="clear" size="sm" style={styles.buttonoverlay1} onPress={toggleOverlay}>
                                    Update
                                </Button>
                            </View>
                        </View>

                    </SafeAreaView>

                </Overlay>
                <Overlay isVisible={visible2}  onBackdropPress={toggleOverlay2}>
                    <SafeAreaView >
                        <View style={styles.overlay} >
                            <Text style={styles.titleoverlay} >
                                Apakah anda yakin ingin keluar ?
                            </Text>
                            <View style={styles.buttonoverlay}>
                                <Button radius="md" buttonStyle={{
                                    marginHorizontal: 20,
                                }} type="clear" size="sm" style={styles.buttonoverlay2} onPress={toggleOverlay2}>
                                    Cancel
                                </Button>
                                <Button  radius="md" type="clear" size="sm" style={styles.buttonoverlay1} onPress={confirmLogOut}>
                                    Yes
                                </Button>
                            </View>
                        </View>

                    </SafeAreaView>

                </Overlay>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    label: {
        marginBottom: 5,
        color: "#4d4d4d",
    },
    avatarContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: 150,
    },
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
    tinyLogo: {
        aspectRatio: 3,
        resizeMode: "contain",
        marginBottom: 5,
        marginLeft: 15,
    },
    inside3: {
        flex: 1,
        justifyContent: "flex-end",
    },
    inside2: {
        padding: 25,
    },
    inside1: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
    },

});
export default ProfileTab;