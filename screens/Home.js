import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { listItems } from "../data/data";

const Home = () => {
  return (
    <SafeAreaView style={styles.safeView}>
      <ScrollView>
        {/* Search bar view */}
        <View style={{ backgroundColor: "#f53d3d", paddingHorizontal: 5 }}>
          <Pressable>
            <View style={styles.searchContainer}>
              <FontAwesome name="search" size={24} color="black" />
              <TextInput
                style={styles.input}
                placeholder="Search Buy.in"
                placeholderTextColor="gray"
              />
              <FontAwesome name="microphone" size={24} color="black" />
            </View>
          </Pressable>
        </View>
        {/* Search bar container ends */}
        {/* Location View */}
        <View style={styles.locationView}>
          <FontAwesome6 name="location-dot" size={24} color="black" />
          <Pressable>
            <Text style={{ fontWeight: "500", fontSize: 12 }}>
              Delivered to Rishabh Gupta , Saket, New Delhi 110030
            </Text>
          </Pressable>
          <MaterialCommunityIcons name="menu-down" size={24} color="black" />
        </View>
        {/* Location view ends */}
        {/* Scroll category items start horizontal scroll */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {listItems.map((item, idx) => {
            return (
              <Pressable key={item.id} style={styles.listItemContainer}>
                <Image source={{ uri: item.img }} style={styles.image} />
                <Text style={{ fontWeight: "600" }}>{item.name}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </ScrollView>
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
    backgroundColor: "#F5F5F5",
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    height: 40,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: "black",
  },
  locationView: {
    backgroundColor: "#ffcccc",
    height: 45,
    color: "#808080",
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    gap: 5,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "cover",
    borderRadius: 8,
  },
  listItemContainer: {
    flexDirection: "column",
    gap: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
});
