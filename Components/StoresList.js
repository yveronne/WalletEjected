import React from "react"
import {View, ActivityIndicator, FlatList} from "react-native"
import {SearchBar, ListItem} from "react-native-elements"
import translate from "../utils/language.utils"
import {getStoresOfTown} from "../API/WalletAPI"
import {Menu, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu"
import EStyleSheet from "react-native-extended-stylesheet"


class StoresList extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: translate("NAVIGATION_stores") + "-" +navigation.state.params.town
    });

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            stores: []
        };
        this.array = [];
        this.selectedStoreId = null
    }

    _showAddCommentPage(storeID){
        this.props.navigation.navigate("Comment", {storeId: storeID })
    }

    _showWaitingListInsertionPage(storeID){
        this.props.navigation.navigate("WaitingList", {storeId: storeID })
    }

    _showOperationInitiationPage(storeID){
        this.props.navigation.navigate("OperationInitiation", {storeId: storeID})
    }

    componentDidMount(){
        this.setState({isLoading : true});
        getStoresOfTown(this.props.navigation.getParam("town"))
            .then(data => {
                this.setState({
                    isLoading: false,
                    stores: data
                });
                this.array = this.state.stores;
            })
            .catch(error => {
                this.setState({isLoading: false})
            })
    }

    openMenu = () => {
        this.menu.open();
    };

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
            const itemData = item.district.name.toUpperCase() + item.area.toUpperCase() + item.name.toUpperCase();
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({ stores: newData });
    };

    _renderSeparator = () => {
        return (
            <View style={styles.mySeparator}>
            </View>
        )
    };

    _renderHeader = () =>{
        return (
            <SearchBar
                placeholder={translate("STORESLIST_search")}
                lightTheme
                round
                onChangeText={text => this._searchFilterFunction(text)}
                autoCorrect={false}
                value={this.state.value}
            />
        );
    };


    render() {
        return (
                <View style={styles.main_container}>
                    {this._displayLoading()}
                    <FlatList
                        data={this.state.stores}
                        renderItem={ ({item}) =>
                            <ListItem
                                key={item.id.toString()}
                                title={item.name.toUpperCase()}
                                subtitle={item.district.name + " , " + item.area}
                                onLongPress={() => {this.selectedStoreId = item.id;
                                                    this.openMenu()}}
                                onPress={() => this.props.navigation.navigate("Map", {stores : this.state.stores, store : item})}
                                badge={{ value: item.waitingListSize, textStyle: styles.badgeText, badgeStyle: styles.badge }}
                            />

                        }
                        keyExtractor={item => item.id.toString()}
                        ItemSeparatorComponent={this._renderSeparator}
                        ListHeaderComponent={this._renderHeader}
                    />
                    <Menu ref={c => (this.menu = c)}>
                        <MenuTrigger text=""/>
                        <MenuOptions>
                            <MenuOption onSelect={() => this._showWaitingListInsertionPage(this.selectedStoreId) } text={translate("NAVIGATION_waitinglist")} />
                            <MenuOption onSelect={() => this._showOperationInitiationPage(this.selectedStoreId)} text="Initier une opération" />
                            <MenuOption onSelect={() => this._showAddCommentPage(this.selectedStoreId) } text={translate("NAVIGATION_comment")} />
                        </MenuOptions>
                    </Menu>
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
    },
    badgeText: {
        color: "#000000",
        fontSize: "2rem",
        fontWeight: "bold"
    },
    badge: {
        backgroundColor: "#FF0000",
        alignContent: "center",
        height: "$heightie*3",
        width: "$heightie*3",
        borderRadius: "$heightie*3"
    }
});

export default StoresList

