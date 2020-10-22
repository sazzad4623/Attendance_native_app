import React, { Component } from "react";
import { View, Text, Button, StyleSheet, Alert, Picker } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {
  getRfidUsersByDeviceLocation,
  getSelectedUserAttendance,
} from "../components/api/api";
import DatePicker from "react-native-datepicker";
import { DatePipe } from "../utils/global";
export default class SelectedAttendanceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: "2020-05-15",
      end_date: "2020-05-15",
      data: null,
      users: null,
      id: null,
      device_id: null
    };
  }
  async componentDidMount() {
    let id = await AsyncStorage.getItem("device_location_id");
    let names = await getRfidUsersByDeviceLocation(id);
    this.setState({ users: names });
    this.setState({device_id: id})
  }

  render() {
    console.log("final data", this.state.data);
    return (
      <View style={styles.container}>
        <Text> start_date</Text>
        <DatePicker
          style={{ width: 200 }}
          date={this.state.start_date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="1980-05-01"
          maxDate="2200-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={async (date) => {
            this.setState({ start_date: date });
          }}
        />
        <Text> end_date</Text>

        <DatePicker
          style={{ width: 200 }}
          date={this.state.end_date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="1980-05-01"
          maxDate="2200-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={async (date) => {
            this.setState({ end_date: date });
          }}
        />

        {this.state.users == null ? null : (
          <Picker
            selectedValue={this.state.id}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => {
              console.log("ok");
              this.setState({ id: itemValue });
            }}
          >
            <Picker.Item label="Select" value="" />
            {this.state.users.map((user, i) => (
              <Picker.Item label={user.rfid_user_name} value={user.id} />
            ))}
          </Picker>
        )}

        {/* <Text
          onPress={async () => {
            if (this.state.id == null) {
              Alert.alert("Invalid User!", "Select an User", [
                { text: "Okay" },
              ]);
              return;
            } else {
              let searched_data = await getSelectedAttendance(
                this.state.id,
                this.state.start_date,
                this.state.end_date
              );
              this.setState({ data: searched_data });
            }
          }}
        >
          Search
        </Text> */}

      <Button  title="Press Me"    onPress={async () => {
            if (this.state.id == null) {
              Alert.alert("Invalid User!", "Select an User", [
                { text: "Okay" },
              ]);
              return;
            } else {
              let searched_data = await getSelectedUserAttendance(
                this.state.device_id,
                this.state.id,
                this.state.start_date,
                this.state.end_date
              );
              this.setState({ data: searched_data });
            }
          }}></Button>
        <View>
          {this.state.data == null
            ? null
            : this.state.data.map((users, i) => (
                <View key={i}>
                  <Text>name :{users.rfid_user_name}</Text>
                  <Text>{users.created_at == null ? "Status: absent" : "Status: present"}</Text>
                  <Text>user no: {users.user__id}</Text>
                  <Text>Enter time:{users.inTime}</Text>
                  <Text>Date: {DatePipe(users.created_at)}</Text>
                  {users.created_at ? (
                    <Text>Status: Present</Text>
                  ) : (
                    <Text>Status: Absent</Text>
                  )}
                </View>
              ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
