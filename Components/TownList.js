import React from "react"
import {View, ActivityIndicator, StyleSheet, FlatList} from "react-native"
import {getTowns} from "../API/WalletAPI"
import {SearchBar, ListItem} from "react-native-elements"
import translate from "../utils/language.utils"

class TownList extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: translate("NAVIGATION_stores")
    });

    constructor(props){
        super(props);
        this.state = {
            isLoading : false,
            towns : []
        };
        this.array = []
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

    _showStoresList = (town) =>{
        this.props.navigation.navigate("StoresList", {town : town})
    };

    _listTowns(){
        this.setState({isLoading : true});
        getTowns()
            .then(data =>{
                this.setState({
                    towns : data,
                    isLoading: false
                });
                this.array = this.state.towns;
            })
            .catch(error => {
                this.setState({isLoading: false})
            })
    }

    componentDidMount(){
        this._listTowns();
    }

    _searchFilterFunction (text) {
        this.setState({
            value: text
        });

        const newData = this.array.filter(item => {
            const itemData = item.name.toUpperCase();
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({ towns: newData });
    };


    _renderHeader = () =>{
        return (
            <SearchBar
                placeholder={translate("TOWNLIST_search")}
                lightTheme
                round
                onChangeText={text => this._searchFilterFunction(text)}
                autoCorrect={false}
                value={this.state.value}
            />
        );
    };

    render() {
        return(
            <View style={styles.main_container}>
                {this._displayLoading()}
                <FlatList
                    data={this.state.towns}
                    renderItem={ ({item}) =>
                        <ListItem
                            key={item.name}
                            title={item.name}
                            onPress={() => {this._showStoresList(item.name)}}
                            chevron={true}
                            bottomDivider={true}
                        />
                    }
                    keyExtractor={item => item.name}
                    ListHeaderComponent={this._renderHeader}
                />
            </View>
        )

    }
}

const styles = StyleSheet.create({
    loadingContainer : {
        position: "absolute",
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    mySeparator : {
        height: 1,
        backgroundColor : "#000000",
    },
    main_container: {
        flex: 1,
        backgroundColor: "#ededed"
    }
});

export default TownList