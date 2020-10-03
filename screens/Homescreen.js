import React, { useState, useEffect } from "react";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";
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
import { getpresent } from "../components/api/api";

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

  const absentUser = allUser - presentUser;

  return (
    <View>
      <Card style={styles.card1}>
        <Card.Content>
          <Title>All Users</Title>
          <Paragraph>{allUser}</Paragraph>
          <Paragraph>Number of All Users</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card2}>
        <Card.Content>
          <Title>Present Users</Title>
          <Paragraph>{presentUser}</Paragraph>
          <Paragraph>Number of Present Users</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card3}>
        <Card.Content>
          <Title>Absent Users</Title>
          <Paragraph>{absentUser}</Paragraph>
          <Paragraph>Number of Absent Users</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  card1: {
    marginBottom: 15,
    marginTop: 100,
    marginLeft: 100,
    width: 210,
    borderBottomColor: "blue",
    borderBottomWidth: 4,
  },

  card2: {
    marginTop: 15,
    marginLeft: 100,
    width: 210,
    borderBottomColor: "green",
    borderBottomWidth: 4,
  },

  card3: {
    marginTop: 15,
    marginLeft: 100,
    width: 210,
    borderBottomColor: "red",
    borderBottomWidth: 4,
  },
});
