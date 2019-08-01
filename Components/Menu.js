import React from "react"
import {View, StyleSheet} from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import MenuItem from "./MenuItem"
import translate from "../utils/language.utils"


class Menu extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: translate("NAVIGATION_menu")
    });

    render() {
        return (
            <View style={styles.main_container}>
                <MenuItem styles={styles.item}
                          image={require("../Images/ic_localisation.png")}
                          text={translate("MENU_openStores")}
                          type={"stores"}
                          navigation={this.props.navigation}/>
                <MenuItem styles={styles.item}
                          image={require("../Images/ic_proximity.png")}
                          text={translate("MENU_proximity")}
                          type={"proximity"}/>
                <MenuItem styles={styles.item}
                          image={require("../Images/ic_help.png")}
                          text={translate("MENU_help")}
                          type={"help"}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#ededed"
    },
    item: {
        flex : 1
    }
});

export default Menu