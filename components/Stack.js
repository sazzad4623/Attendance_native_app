import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainTabScreens from "../screens/MainTabScreen";
import Icon from "react-native-vector-icons/Ionicons";
import DrawerContent from "../screens/DrawerContent";
import SupportScreen from "../screens/SupportScreen";
import SettingsScreen from "../screens/SettingsScreen";
import BookmarkScreen from "../screens/BookmarkScreen";

const Drawer = createDrawerNavigator();

const StackN = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={MainTabScreens} />
        {/* <Drawer.Screen name="Details" component={DetailsStackScreen} /> */}
        <Drawer.Screen name="SupportScreen" component={SupportScreen} />
        <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
        <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default StackN;
