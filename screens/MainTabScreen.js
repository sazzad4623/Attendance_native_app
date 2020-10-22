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
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./Homescreen";
import DailyAttendanceScreen from "./DailyAttendance";
import Icon from "react-native-vector-icons/Ionicons";
import AboutScreen from "./AboutScreen";
import SelectedAttendanceScreen from "./SelectedAttendance";

const HomeStack = createStackNavigator();
const DailyAttendanceStack = createStackNavigator();
const SelectedAttendanceStack = createStackNavigator();
const AboutStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreens = () => (
  <Tab.Navigator initialRouteName="Home" activeColor="#fff">
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: "Home",
        tabBarColor: "#009387",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="DailyAttendance"
      component={DailyAttendanceStackScreen}
      options={{
        tabBarLabel: "Daily Attendance",
        tabBarColor: "#1f65ff",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-notifications" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="SelectedAttendance"
      component={SelectedAttendanceStackScreen}
      options={{
        tabBarLabel: "Selected",
        tabBarColor: "#694fad",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="About"
      component={AboutStackScreen}
      options={{
        tabBarLabel: "About",
        tabBarColor: "#d02860",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-aperture" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);
export default MainTabScreens;

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#009387",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: "Home",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#009387"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </HomeStack.Navigator>
);

const DailyAttendanceStackScreen = ({ navigation }) => (
  <DailyAttendanceStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#1f65ff",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <DailyAttendanceStack.Screen
      name="Daily Attendance"
      component={DailyAttendanceScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#1f65ff"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </DailyAttendanceStack.Navigator>
);

const SelectedAttendanceStackScreen = ({ navigation }) => (
  <SelectedAttendanceStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#694fad",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <SelectedAttendanceStack.Screen
      name="Selected Attendance"
      component={SelectedAttendanceScreen}
      options={{
        title: "Selected Attendance",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#694fad"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </SelectedAttendanceStack.Navigator>
);

const AboutStackScreen = ({ navigation }) => (
  <AboutStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#d02860",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <AboutStack.Screen
      name="About"
      component={AboutScreen}
      options={{
        title: "About",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#d02860"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </AboutStack.Navigator>
);
