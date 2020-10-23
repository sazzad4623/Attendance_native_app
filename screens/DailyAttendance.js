import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import DatePicker from "react-native-datepicker";
import { getDailyAttendance } from "../components/api/api";
import AsyncStorage from "@react-native-community/async-storage";
import { parsingServerDate } from "../utils/config";
import { DataTable } from "react-native-paper";
export default class DailyAttendanceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`,
      dt: null,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <DatePicker
          style={{ width: 200 }}
          date={this.state.date}
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
            this.setState({ date: date });
            console.log(date);
            let id = await AsyncStorage.getItem("device_location_id");
            console.log(id);
            getDailyAttendance(id, date).then((value) => {
              console.log("dt", value);

              this.setState({ dt: value });
            });
          }}
        />
        <View style={styles.container2}>
          <DataTable>
            {this.state.dt == null ? null : (
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
              </DataTable.Header>
            )}
            {this.state.dt == null
              ? null
              : this.state.dt.map((users, i) => (
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
    width: 320,
  },
  container3: {
    alignItems: "center",
    justifyContent: "center",
  },
});
