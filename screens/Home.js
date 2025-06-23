import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Home = () => {
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Search Amazon.in"
          placeholderTextColor="gray"
        />
        <MaterialIcons name="mic" size={20} color="gray" />
      </View>
      <ScrollView></ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeView: {
    paddingTop: Platform.OS === "android" ? 40 : 0,
    flex: 1,
    backgroundColor: "white",
  },
   searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    margin: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "#f53d3d",
    borderRadius: 8,
    height: 40,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: "black",
  },
});
