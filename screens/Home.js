import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import React from "react";

const Home = () => {
  return <SafeAreaView style={styles.safeView}></SafeAreaView>;
};

export default Home;

const styles = StyleSheet.create({
  safeView: {
    paddingTop: Platform.OS === "android" ? 40 : 0,
    flex:1
  },
});
