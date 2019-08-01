import React from "react"
import {View, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator} from "react-native"
import {insertIntoWaitingList} from "../API/WalletAPI"
import EStyleSheet from "react-native-extended-stylesheet"
import translate from "../utils/language.utils"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"



class WaitingListInsertion extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: translate("NAVIGATION_waitinglist")
    });

    constructor(props){
        super(props);

        this.customerNumber="";
        this.reason="";

        this.state = {
            isLoading: false
        }
    }

    _customerNumberInputChanged(text){
        this.customerNumber = text
    }

    _reasonInputChanged(text){
        this.reason = text
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


    insert(){
        this.setState({isLoading: true});
        const {goBack} = this.props.navigation;
        insertIntoWaitingList(this.props.navigation.getParam("storeId"), this.customerNumber, this.reason)
            .then((response) => {
                this.setState({isLoading: false});
                if(response.message != null){
                    Alert.alert("Succès", response.message,
                        [
                            // {text: "OK", onPress: () => goBack()}
                            {text: "OK", onPress: () => this.props.navigation.navigate("StoresList", {town : this.props.navigation.getParam("town")})}
                        ]);
                }
                else if (response.error != null){
                    Alert.alert("Echec", response.error,
                        [
                            {text: "Retour", style : "cancel"}
                        ]);
                }
                else {
                    Alert.alert("Erreur", "Une erreur est survenue. Veuillez réessayer.",
                        [
                            {text: "Retour", style : "cancel"}
                        ]);
                }
            })
            .catch((error) => console.log(error))
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
                    <Text style={styles.text}>{translate("FORM_reason")}</Text>
                    <TextInput placeholder={translate("PLACEHOLDER_reason")}
                               onChangeText={(text) =>this._reasonInputChanged(text)}
                               multiline={true} numberOfLines={15}
                               style={styles.input}/>
                </View>
                <View style={styles.button_container}>
                    <TouchableOpacity onPress={() => {this.insert()}}
                                      style={styles.button}>
                        <Text style={styles.button_text}>{translate("valider")}</Text>
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

export default WaitingListInsertion