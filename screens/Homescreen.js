import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { headerConfig } from "../utils/config";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
  const Base_url = "http://139.162.14.41:5000/"; // stage server
  const [allUser, setAllUser] = useState();
  const url = Base_url + `getallRfidUsersByDeviceLocation`;

  useEffect(() => {
    console.log("use effect");
    const getData = async () => {
      await headerConfig().then((result) => {
        axios.get(url, result).then((data) => {
          setAllUser(data.data.count);
          console.log("all user ", allUser);
        });
      });
    };
    getData();
  }, [allUser]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      {/* <Button
        title="Go to details page"
        onPress={() => navigation.navigate("Details")}
      /> */}
    </View>
  );
};

export default HomeScreen;
