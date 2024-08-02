import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the test challenges!</Text>
      <Text style={styles.itemText}>
        In the tabs below you can go to each section you need to see and in the
        README an in-depth explanation of the logic
      </Text>
      <Text style={styles.itemText}>
        And in the README an in-depth explanation of the logic
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "medium",
  },
});

export default WelcomeScreen;
