import React from "react"
import {View, Text, TextInput, TouchableOpacity, Alert, Picker} from "react-native"
import translate from "../utils/language.utils"
import {initiateOperation} from "../API/WalletAPI"
import EStyleSheet from "react-native-extended-stylesheet"
import DatePicker from "react-native-datepicker"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"

class OperationInitiation extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: "Initiation de l'opération"
    });

    constructor(props){
        super(props);

        this.amount = 0 ;
        this.customerNumber = "";
        this.beneficiaryNumber = "";
        this.secret = "";

        this.state = {
            date: "",
            type: "Depot"
        }
    }

    _amountInputChanged(text){
        this.amount = parseFloat(text.replace(/ /g, ''))
    }

    _customerNumberInputChanged(text){
        this.customerNumber = text
    }

    _beneficiaryNumberInputChanged(text){
        this.beneficiaryNumber = text
    }

    _secretInputChanged(text){
        this.secret = text
    }

    _displayInput(field){
        if((this.state.type === "Depot") && (field === "beneficiaryNumber")){
            return (
                <View style={styles.item_container}>
                    <Text style={styles.text}>Numéro de téléphone du bénéficiaire</Text>
                    <TextInput placeholder="Numéro de téléphone du bénéficiaire"
                               onChangeText={(text) => this._beneficiaryNumberInputChanged(text)}
                               style={styles.input}
                               keyboardType="numeric"/>
                </View>
            )
        }
        else if ((this.state.type !== "Depot") && (field === "secret")){
            return (
                <View style={styles.item_container}>
                    <Text style={styles.text}>Code secret</Text>
                    <TextInput placeholder="Code secret"
                               onChangeText={(text) => this._secretInputChanged(text)}
                               style={styles.input}
                               secureTextEntry={true}
                               keyboardType="numeric"/>
                </View>
            )
        }
    }

    _validate(){
        var operation = {
            "type" : this.state.type,
            "amount" : this.amount,
            "merchantPointID" : this.props.navigation.getParam("storeId"),
            "expectedValidationDate" : this.state.date,
            "customerNumber" : this.customerNumber,
            "beneficiaryNumber" : this.beneficiaryNumber,
            "secret" : this.secret
        };

        initiateOperation(operation)
            .then((response) => {
                if(response.message != null){
                    Alert.alert("Succès", response.message,
                        [
                            {text: "Retour", style : "cancel"}
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
            .catch(error =>console.log(error))

    }

    render() {
        return (
            <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
                                     contentContainerStyle={styles.main_container}
                                     enableOnAndroid={false}>
                <View style={styles.item_container}>
                    <Text style={styles.text}>Type d'opération</Text>
                    <Picker
                        selectedValue={this.state.type}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({type : itemValue});
                            console.log(itemValue) }
                        }>
                        <Picker.Item label="Dépôt" value="Depot" />
                        <Picker.Item label="Retrait" value="Retrait" />
                        <Picker.Item label="Paiement" value="Paiement" />
                    </Picker>
                </View>
                <View style={styles.item_container}>
                    <Text style={styles.text}>Mon numéro de téléphone</Text>
                    <TextInput placeholder="Numéro de téléphone"
                               onChangeText={(text) => this._customerNumberInputChanged(text)}
                               style={styles.input}
                               keyboardType="numeric"/>
                </View>
                <View style={styles.item_container}>
                    <Text style={styles.text}>Montant</Text>
                    <TextInput placeholder="Montant"
                               onChangeText={(text) => this._amountInputChanged(text)}
                               style={styles.input}
                               keyboardType="numeric"/>
                </View>
                {this._displayInput("beneficiaryNumber")}
                <View style={styles.item_container}>
                    <Text style={styles.text}>Date de validation de l'opération</Text>
                    <View style={styles.datePickerContainer}>
                        <DatePicker
                            style={styles.datepicker}
                            date={this.state.date}
                            mode="datetime"
                            placeholder="Choisir une date"
                            format="YYYY-MM-DD HH:mm:ss"
                            confirmBtnText="Confirmer"
                            cancelBtnText="Annuler"
                            onDateChange={(date) => {this.setState({date: date})}
                            }
                        />
                    </View>
                </View>
                {this._displayInput("secret")}
                <View style={styles.button_container}>
                    <TouchableOpacity onPress={() => this._validate()}
                                      style={styles.button}>
                        <Text style={styles.button_text}>Valider </Text>
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
        padding : "$heightie/2"
    },
    item_container: {
        flex: 1,
        marginBottom: "$heightie/4",
        paddingTop: "$heightie",
        paddingBottom: "$heightie/4"
    },
    button_container: {
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        flexDirection: "row",
        paddingBottom: "$heightie/8"
    },
    text: {
        fontSize: "1.8rem",
        color: "#000000",
        fontWeight: "bold",
        paddingBottom: "$heightie/4"
    },
    datePickerContainer: {
        flexDirection: "row"
    },
    datepicker: {
        flex: 1
    },
    input: {
        borderRadius: 5,
        borderColor: "#000000",
        borderStyle: "solid",
        borderWidth: 0.5,
        paddingLeft: "$heightie/2",
        flex: 1
    },
    button: {
        backgroundColor: "#FF0000",
        borderRadius: 10,
        height: "$height/15",
        width: "$width/1.5",
        justifyContent: "center"
    },
    button_text: {
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: "2.3rem"
    },
});

export default OperationInitiation