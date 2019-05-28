import React from 'react';
import Navigation from "./Navigation/Navigation"
import EStyleSheet from "react-native-extended-stylesheet"
import {Dimensions} from "react-native"
import {MenuProvider} from "react-native-popup-menu"


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

EStyleSheet.build({
    $rem : width/40,
    $heightie : height/40,
    $height: height,
    $width: width
});



export default class App extends React.Component {
    render() {
        return (
            <MenuProvider>
                <Navigation/>
            </MenuProvider>
        );
    }
}

