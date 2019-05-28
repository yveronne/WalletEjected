import React from "react"
import {View, TextInput, Text, TouchableOpacity, Alert} from "react-native"
import {insertIntoWaitingList} from "../API/WalletAPI"
import EStyleSheet from "react-native-extended-stylesheet"
import translate from "../utils/language.utils";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"



class WaitingListInsertion extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: translate("NAVIGATION_waitinglist")
    });

    constructor(props){
        super(props);

        this.customerNumber="";
        this.secret="";
    }

    _customerNumberInputChanged(text){
        this.customerNumber = text
    }

    _secretInputChanged(text){
        this.secret = text
    }


    insert(number, secret, storeId){
        const {goBack} = this.props.navigation;
        insertIntoWaitingList(storeId, number, secret)
            .then((response) => {
                if(response.message != null){
                    Alert.alert("Succès", response.message,
                        [
                            {text: "OK", onPress: () => goBack()}
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
                    <TouchableOpacity onPress={() => {this.insert(this.customerNumber, this.secret, this.props.navigation.getParam("storeId"))}}
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