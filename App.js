import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { tokenValidate } from "./utils/config";
import StackN from "./components/Stack";
import RootStackScreen from "./screens/RootStackScreen";

class App extends Component {
  render() {
    return <StackN />;
  }
}

export default App;
