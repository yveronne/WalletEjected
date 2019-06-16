import React from "react"
import moment from "moment"
import {View, FlatList, ActivityIndicator} from "react-native"
import {SearchBar, ListItem} from "react-native-elements"
import translate from "../utils/language.utils"
import EStyleSheet from "react-native-extended-stylesheet"


class History extends React.Component {

    static navigationOptions = () => ({
        title: translate("NAVIGATION_history")
    });
    _renderSeparator = () => {
        return (
            <View style={styles.mySeparator}>
            </View>
        )
    };
    _renderHeader = () =>{
        return (
            <SearchBar
                placeholder={translate("history_search")}
                lightTheme
                round
                onChangeText={text => this._searchFilterFunction(text)}
                autoCorrect={false}
                value={this.state.value}
            />
        );
    };

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            list: this.props.navigation.getParam("operations")
        };
        this.array = this.state.list;
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

    _searchFilterFunction (text) {
        this.setState({
            value: text
        });

        const newData = this.array.filter(item => {
            const itemData = item.type.toUpperCase();
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({ list: newData });
    };

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                <FlatList
                    data={this.state.list}
                    renderItem={ ({item}) =>
                        <ListItem
                            key={item.id.toString()}
                            title={moment(item.date).format("DD/MM/YYYY, HH:mm")}
                            subtitle={translate(item.type) + " - " +item.amount+" F CFA"}
                            onPress={() => {this.props.navigation.navigate("OperationDetails", {operation: item})}}
                        />
                    }
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={this._renderSeparator}
                    ListHeaderComponent={this._renderHeader}
                />
            </View>
        )
    }
}

const styles = EStyleSheet.create({
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

export default History