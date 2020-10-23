import React, { Component } from "react";
import { View, Text, Button, StyleSheet, Alert, Picker } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {
  getRfidUsersByDeviceLocation,
  getSelectedUserAttendance,
} from "../components/api/api";
import DatePicker from "react-native-datepicker";
import { DatePipe } from "../utils/global";
import { DataTable } from "react-native-paper";
export default class SelectedAttendanceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`,
      end_date: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`,
      data: null,
      users: null,
      id: null,
      device_id: null,
    };
  }
  async componentDidMount() {
    let id = await AsyncStorage.getItem("device_location_id");
    let names = await getRfidUsersByDeviceLocation(id);
    console.log("name error hdfhsdf", names);
    if (names.sql) {
      this.setState({ users: null });
      this.setState({ device_id: id });
    } else {
      this.setState({ users: names });
      this.setState({ device_id: id });
    }
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

        {this.state.users == null || this.state.users == undefined ? null : (
          <Picker
            selectedValue={this.state.id}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => {
              console.log("ok");
              this.setState({ id: itemValue });
            }}
          >
            <Picker.Item label="Select User" value="" />
            {this.state.users.map((user, i) => (
              <Picker.Item label={user.rfid_user_name} value={user.id} />
            ))}
          </Picker>
        )}

        <Button
          title="Search"
          onPress={async () => {
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
          }}
        ></Button>
        <View style={styles.container2}>
          <DataTable>
            {this.state.data == null ? null : (
              <DataTable.Header>
                <DataTable.Title style={styles.container3}>
                  Name
                </DataTable.Title>
                <DataTable.Title style={styles.container3}>
                  User No
                </DataTable.Title>
                <DataTable.Title style={styles.container3}>
                  Status
                </DataTable.Title>
                <DataTable.Title style={styles.container3}>
                  Enter Time
                </DataTable.Title>
                <DataTable.Title style={styles.container3}>
                  Date
                </DataTable.Title>
              </DataTable.Header>
            )}
            {this.state.data == null
              ? null
              : this.state.data.map((users, i) => (
                  <View key={i}>
                    <DataTable.Row>
                      <DataTable.Cell style={styles.container3}>
                        {users.rfid_user_name}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.container3}>
                        {users.user__id}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.container3}>
                        {users.created_at == null ? "absent" : "present"}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.container3}>
                        {users.inTime}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.container3}>
                        {DatePipe(users.created_at)}
                      </DataTable.Cell>
                    </DataTable.Row>
                  </View>
                ))}
          </DataTable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  container2: {
    width: 400,
  },
  container3: {
    alignItems: "center",
    justifyContent: "center",
  },
});
