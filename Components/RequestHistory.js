import React from "react"
import {View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator} from "react-native"
import translate from "../utils/language.utils";
import {addComment, getHistory} from "../API/WalletAPI"
import EStyleSheet from "react-native-extended-stylesheet"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"

class RequestHistory extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: translate("NAVIGATION_history")
    });

    constructor(props){
        super(props);

        this.customerNumber="";
        this.secret="";
        this.state = {
            isLoading: false
        }
    }

    _customerNumberInputChanged(text){
        this.customerNumber = text
    }

    _secretInputChanged(text){
        this.secret = text
    }

    _displayLoading(){
        if(this.state.isLoading){
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large"/>
                </View>
            )
        }
    }

    getHistory(){
        this.setState({isLoading: true});
        getHistory(this.customerNumber, this.secret)
            .then(response => {
                this.setState({isLoading: false});
                if (response.error != null){
                    Alert.alert("Echec", response.error,
                        [
                            {text: "Retour", style : "cancel"}
                        ]);
                }
                else {
                    this.props.navigation.navigate("History", {operations : response})
                }

            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
                                     contentContainerStyle={styles.main_container}
                                     enableOnAndroid={false}>
                {this._displayLoading()}
                <View style={styles.input_container}>
                    <Text style={styles.text}>{translate("FORM_phone")}</Text>
                    <TextInput style={styles.input} placeholder={translate("PLACEHOLDER_phone")}
                               onChangeText={(text) => this._customerNumberInputChanged(text)}
                               keyboardType="numeric"/>
                </View>
                <View style={styles.input_container}>
                    <Text style={styles.text}>{translate("FORM_secret")}</Text>
                    <TextInput style={styles.input} placeholder={translate("PLACEHOLDER_secret")}
                               onChangeText={(text) => this._secretInputChanged(text)}
                               secureTextEntry={true}
                               keyboardType="numeric"/>
                </View>
                <View style={styles.button_container}>
                    <TouchableOpacity onPress={() => {this.getHistory()}}
                                      style={styles.button}>
                        <Text style={styles.button_text}>{translate("valider")} </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = EStyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: "#ededed",
        flexDirection: "column",
        padding : "$heightie"
    },
    loadingContainer : {
        position: "absolute",
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    input_container: {
        flex: 2,
        marginBottom: "$heightie*3",
        paddingTop: "$heightie*2",
        paddingBottom: "$heightie*2"
    },
    text: {
        fontSize: "2.2rem",
        color: "#000000",
        fontWeight: "bold",
        paddingBottom: "$heightie*2"
    },
    input: {
        borderRadius: 5,
        borderColor: "#000000",
        borderStyle: "solid",
        borderWidth: 0.5,
        paddingLeft: "$heightie",
        flex: 1
    },
    button_container: {
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        flexDirection: "row",
        paddingBottom: "$heightie"
    },
    button: {
        backgroundColor: "#FF0000",
        borderRadius: 10,
        height: 50,
        width: "$width/1.5",
        justifyContent: "center"
    },
    button_text: {
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: "2.3rem"
    },
});

export default RequestHistory