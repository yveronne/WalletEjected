import React from "react"
import {TouchableOpacity, Image, Text} from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"


class MenuItem extends React.Component {

    _showNextView(title){
        if(title === "stores"){
            this.props.navigation.navigate("TownList");
        }
        else if (title === "prices"){
        }
        else if(title === "help"){
        }
    }
    render() {
        return (
            <TouchableOpacity style={styles.item_touchable} onPress={() => {this._showNextView(this.props.type)}}>
                <Image style={styles.icon}
                       source={this.props.image}
                resizeMode="contain"/>
                <Text style={styles.text}> {this.props.text} </Text>
            </TouchableOpacity>
        )
    }
}

const styles = EStyleSheet.create({
    item_touchable: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        width: "$width/2",
        height: "$height/4",
        borderRadius: 10,
        borderColor: "#000000",
        borderStyle: "solid",
        borderWidth: 1
    },
    icon: {

    },
    text: {
        textAlign: "center",
        paddingTop: 7
    }
});

export default MenuItem