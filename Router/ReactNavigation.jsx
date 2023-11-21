import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Search,Cart,Menu} from "../screens";
import {icons} from "../constants";
import { Image, View, StyleSheet ,Text} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from "react-native-responsive-screen";
import HomeNavigator from "./HomeNavigator";
import UserNavigator from "./UserNavigator";

const Tab=createBottomTabNavigator();

const ReactNavigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={styles.MainStack}>
                <Tab.Screen name="MainHome" component={HomeNavigator} 
                options={{
                    tabBarIcon:({focused})=>(
                        <View style={focused ? styles.ComponentView :styles.MainStack.ComponentView}>
                            <Image source={focused ? icons.whome : icons.home} resizeMode="contain" style={ focused ? styles.ComponentView.forImage : styles.MainStack.ComponentView.forImage}/>
                        </View>
                    )
                }}/>
                <Tab.Screen name="you" component={UserNavigator}
                options={{
                    tabBarIcon:({focused})=>(
                        <View style={focused ? styles.ComponentView: styles.MainStack.ComponentView}>
                            <Image source={focused ? icons.wuser:icons.user}  resizeMode="contain" style={focused ? styles.ComponentView.forImage: styles.MainStack.ComponentView.forImage}/>
                        </View>
                    )
                }}/>
                <Tab.Screen name="Search" component={Search}
                options={{
                    tabBarIcon:({focused})=>(
                        <View style={focused ? styles.ComponentView:  styles.MainStack.ComponentView}>
                            <Image source={focused ? icons.wsearch:icons.add} resizeMode="contain" style={focused ? styles.ComponentView.forImage: styles.MainStack.ComponentView.forImage}/>
                        </View>
                    )
                }}/>
                <Tab.Screen name="cart" component={Cart}
                options={{
                    tabBarIcon:({focused})=>(
                        <View style={focused ? styles.ComponentView: styles.MainStack.ComponentView}>
                            <Image source={focused ? icons.wcart: icons.cart} resizeMode="contain" style={focused ? styles.ComponentView.forImage: styles.MainStack.ComponentView.forImage}/>
                        </View>
                    )
                }}/>
                <Tab.Screen name="menu" component={Menu}
                options={{
                    tabBarIcon:({focused})=>(
                        <View style={focused ? styles.ComponentView: styles.MainStack.ComponentView}>
                            <Image source={focused ? icons.wmenu: icons.menu} resizeMode="contain" style={focused ? styles.ComponentView.forImage: styles.MainStack.ComponentView.forImage}/>
                        </View>
                    )
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}
const styles = StyleSheet.create({
    MainStack:{
        headerShown:false,
        tabBarShowLabel:false,
        tabBarHideOnKeyboard: true,
        tabBarStyle:{
            position:"absolute",
            paddingTop:vh(0.5),
            height:vh(7),
            borderTopLeftRadius:30,
            borderTopRightRadius:30,
            backgroundColor:'#f0f2f1',
        },
        ComponentView:{
            alignItems:"center",
            justifyContent:"center",
            forImage:{
                width:25,
                height:25
            },
            
        }
    },

    ComponentView:{
        alignItems:"center",
        justifyContent:"center",
        padding: 14,
        backgroundColor:'#00658d',
        borderRadius:50,
        forImage:{
            width:28,
            height:28,
        },
    }
})

export default ReactNavigation;
