import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Developed By:</Text>
      <Text>Publish Date:</Text>
      
      
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
