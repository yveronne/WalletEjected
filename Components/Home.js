import React from "react"
import {View, Image, Text, TouchableOpacity} from "react-native"
import translate from "../utils/language.utils"
import {setLocale , getCurrentLocale} from "../utils/language.utils"
import EStyleSheet from "react-native-extended-stylesheet"

class Home extends React.Component {

    _showMenu(){
        this.props.navigation.navigate("Menu")
    }

    _changeLanguage(){
        if(getCurrentLocale() === "fr"){
            setLocale("en")
        }
        else {
            setLocale("fr")
        }
        this.forceUpdate()
    }

    _displayFlag(){
        if(getCurrentLocale() === "fr"){
            return (
                <Image source={require("../Images/ic_flag_England.png")}
                       style={styles.flag}
                       resizeMode="contain"/>
            )
        }
        else {
            return (
                <Image source={require("../Images/flag-france.jpg")}
                       style={styles.flag}
                       resizeMode="contain"/>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Image style={styles.logo}
                       source={require("../Images/afrilandcmr.jpg")}
                        resizeMode="contain"/>
                <View style={styles.welcome_text_container}>
                    <Text style={styles.home_text}> {translate("HOME_welcomeText")} </Text>
                </View>
                <View style={styles.button_container}>
                    <TouchableOpacity onPress={() => {this._showMenu()}}
                                      style={styles.button}>
                        <Text style={styles.button_text}> {translate("HOME_startButton")} </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.language}>
                    <TouchableOpacity style={styles.language_touchable} onPress={() => {this._changeLanguage()}}>
                        {this._displayFlag()}
                        <Text style={styles.flag_text}> {translate("HOME_language")} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = EStyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#ededed"
    },
    logo:{
        flex: 1,
        height: undefined,
        width: "$width",
    },
    welcome_text_container:{
        flex: 1,
        justifyContent: "center",
    },
    home_text:{
        fontSize: "4.3rem",
        textAlign: "center"
    },
    button_container: {
        flex: 1,
        justifyContent: "center",
        textAlign: "center"
    },
    button: {
        backgroundColor: "#FF0000",
        borderRadius: 10,
        height: "$height/10",
        width: "$width/1.5",
        justifyContent: "center",
        textAlign: "center"
    },
    button_text: {
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: "2.3rem"
    },
    language:{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    language_touchable: {
        alignItems: "center"
    },
    flag:{
        height: 50,
    },
    flag_text:{
        textDecorationLine: "underline"
    }
});

export default Home