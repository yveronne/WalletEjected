import React from "react"
import {StyleSheet, View} from "react-native"
import MapView, {Marker} from "react-native-maps"
import translate from "../utils/language.utils";

class Mappie extends React.Component {

    static navigationOptions = () => ({
        title: translate("NAVIGATION_map")
    });

    constructor(props){

        super(props);
        this.state = {
            store : this.props.navigation.getParam("store")
        }
    }

    _getCoordinates(position, isRegion){
        let coordinates = ((position.split("(")[1]).split(")")[0]).split(" ");
        if(isRegion) {
            return {
                latitude: parseFloat(coordinates[1]),
                longitude: parseFloat(coordinates[0]),
                latitudeDelta: 0.0,
                longitudeDelta: 0.0
            };
        }
        else {
            return {
                latitude: parseFloat(coordinates[1]),
                longitude: parseFloat(coordinates[0]),
            };
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                style={styles.map}
                initialRegion={
                    this._getCoordinates(this.state.store.position, true)
                }>
                    {this.props.navigation.getParam("stores").map(marker => (
                        <Marker
                            key={marker.id.toString()}
                            coordinate={this._getCoordinates(marker.position, false)}
                            title={marker.name}
                            description={marker.district.name + " , " + marker.area}
                        />
                    ))}
                </MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    map: {
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
    },
});

export default Mappie