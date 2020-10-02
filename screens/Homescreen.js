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
import {getpresent} from "../components/api/api"

const HomeScreen = ({ navigation }) => {
  const Base_url = "http://139.162.14.41:5000/"; // stage server
  const [allUser, setAllUser] = useState();
  const url = Base_url + `getallRfidUsersByDeviceLocation`;
  
  const [presentUser, setPresentUser] = useState();
  const present_url = Base_url + `getPresentRfidUsersByDeviceLocation`;

  const [chart, setChart] = useState();
  const chart_url = Base_url + `presentMonthRatioByDeviceLocation`;
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
  }, []);


  useEffect(() => {
    console.log("use effect present");
    const getData = async () => {
      await headerConfig().then((result) => {
        axios.get(present_url, result).then((data) => {
          setPresentUser(data.data.result);
          console.log("all present user ", presentUser);
        });
      });
    };
    getData();
  }, []);

  useEffect(() => {
    console.log("use effect chart");
    const getData = async () => {
      await headerConfig().then((result) => {
        axios.get(chart_url, result).then((data) => {
          setChart(data.data);
          console.log("all chart user ", chart);
        });
      });
    };
    getData();
  }, []);

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
