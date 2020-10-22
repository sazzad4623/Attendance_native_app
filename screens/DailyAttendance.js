import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import DatePicker from "react-native-datepicker";
import { getDailyAttendance } from "../components/api/api";
import AsyncStorage from "@react-native-community/async-storage";
import { parsingServerDate } from "../utils/config";
export default class DailyAttendanceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { date: "2020-05-15", dt: null };
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
        <View>
          {this.state.dt == null
            ? null
            : this.state.dt.map((users, i) => (
                <View key={i}>
                  <Text>name :{users.rfid_user_name}</Text>
                  <Text>{users.created_at == null ? "absent" : "present"}</Text>
                  <Text>user no: {users.user__id}</Text>
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
