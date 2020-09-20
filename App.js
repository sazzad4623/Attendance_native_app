import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { tokenValidate } from "./utils/config";
import StackN from "./components/Stack";
import RootStackScreen from "./screens/RootStackScreen";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flag: null,
    };
  }
  async componentDidMount() {
    const token = await tokenValidate();
    const tokenParse = token.data;
    if (tokenParse === undefined) {
      this.setState({ flag: false });
    } else {
      this.setState({ flag: tokenParse });
    }
    console.log("token from backend", tokenParse);
    console.log("flag==>", this.state.flag);
  }
  render() {
    return (
      <View>
        <Text> </Text>
        {this.state.flag === true ? (
          <StackN></StackN>
        ) : this.state.flag === false ? (
          <RootStackScreen />
        ) : null}
      </View>
    );
  }
}

export default App;
