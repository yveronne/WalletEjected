import {createStackNavigator, createAppContainer} from "react-navigation"
import Home from "../Components/Home"
import Menu from "../Components/Menu"
import TownList from "../Components/TownList"
import StoresList from "../Components/StoresList"
import WaitingListInsertion from "../Components/WaitingListInsertion"
import Comment from "../Components/Comment"
import OperationInitiation from "../Components/OperationInitiation"
import Mappie from "../Components/Mappie"
import QrCode from "../Components/QrCode"
import ValidateWithdrawal from "../Components/ValidateWithdrawal"
import History from "../Components/History"
import OperationDetails from "../Components/OperationDetails"
import RequestHistory from "../Components/RequestHistory"


const stackie = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({navigation}) => ({
            header: null,
        })
    },
    Menu: {
        screen: Menu,
        navigationOptions: ({navigation}) =>({
            headerStyle: {
                backgroundColor: "#FF0000"
            },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: {
                color: "#FFFFFF",
                fontSize: 15,
                marginLeft : 0
            },
        })
    },
    TownList: {
        screen: TownList,
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: "#FF0000"
            },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: {
                color: "#FFFFFF",
                fontSize: 15,
                marginLeft : 0
            },
        })
    },
    StoresList: {
        screen: StoresList,
        navigationOptions: ({navigation}) =>({
            headerStyle: {
                backgroundColor: "#FF0000",
            },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: {
                color: "#FFFFFF",
                fontSize: 13.5,
                marginLeft : 0
            },
        })
    },
    WaitingList: {
        screen: WaitingListInsertion,
        navigationOptions: ({navigation}) =>({
            headerStyle: {
                backgroundColor: "#FF0000"
            },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: {
                color: "#FFFFFF",
                fontSize: 13.5,
                marginLeft : 0
            },
        })
    },
    Comment: {
        screen: Comment,
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: "#FF0000"
            },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: {
                color: "#FFFFFF",
                fontSize: 13.5,
                marginLeft : 0
            },
        })
    },
    OperationInitiation: {
        screen: OperationInitiation,
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: "#FF0000"
            },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: {
                color: "#FFFFFF",
                fontSize: 13.5,
                marginLeft : 0
            }
        })
    },
    Map: {
        screen: Mappie,
        navigationOptions: () => ({
            headerStyle: {
                backgroundColor: "#FF0000"
            },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: {
                color: "#FFFFFF",
                fontSize: 13.5,
                marginLeft : 0
            }
        })
    },
    QrCode: {
        screen: QrCode,
        navigationOptions: () => ({
            headerStyle: {
                backgroundColor: "#FF0000"
            },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: {
                color: "#FFFFFF",
                fontSize: 13.5,
                marginLeft : 0
            }
        })
    },
    ValidateWithdrawal: {
        screen: ValidateWithdrawal,
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: "#FF0000"
            },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: {
                color: "#FFFFFF",
                fontSize: 13.5,
                marginLeft : 0
            }
        })
    },
    RequestHistory: {
        screen: RequestHistory,
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: "#FF0000"
            },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: {
                color: "#FFFFFF",
                fontSize: 13.5,
                marginLeft : 0
            }
        })
    },
    History: {
        screen: History,
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: "#FF0000"
            },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: {
                color: "#FFFFFF",
                fontSize: 13.5,
                marginLeft : 0
            }
        })
    },
    OperationDetails: {
        screen: OperationDetails,
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: "#FF0000"
            },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: {
                color: "#FFFFFF",
                fontSize: 13.5,
                marginLeft : 0
            }
        })
    },

});

export default createAppContainer(stackie)