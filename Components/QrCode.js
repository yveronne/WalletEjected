import React from "react"
import {View, Dimensions} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet"
import QRCode from "react-native-qrcode";


class QrCode extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: "QR Code"
    });

    constructor(props){
        super(props);

        this.state = {
            code : this.props.navigation.getParam("code"),
            amount: this.props.navigation.getParam("amount"),
            isLoading: true
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                <QRCode
                    value={this.state.code+":"+this.state.amount}
                    size={(Dimensions.get("window").width)*0.9}
                    bgColor="#000000"
                    fgColor="#FFFFFF"
                />
            </View>
        )
    }
}

const styles = EStyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: "#ededed",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 10
    },
});

export default QrCode