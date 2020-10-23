import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Developed By: IoT Team</Text>
  <Text>Publish Date: {`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`}</Text>
      
      
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
