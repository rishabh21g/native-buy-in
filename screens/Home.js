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
import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { listItems, deals } from "../data/data";
import ImageSlider from "../components/ImageSlider.js";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState();
  const fetchproducts = () => {
    const result = axios.get(
      `https://fakestoreapi.in/api/products?limit=3`
    );
    console.log(result);
    setProducts(result?.data?.products);
  };
  useEffect(() => {
    fetchproducts();
  }, []);
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
        {/* Banner of images */}
        <ImageSlider />
        {/* Banner done */}
        {/* Trending deals start */}
        <Text style={{ fontSize: 20, fontWeight: "500", padding: 10 }}>
          {" "}
          Trending deals of the week!
        </Text>
        <View style={styles.trends}>
          {deals.map((deal, idx) => {
            return (
              <Pressable
                key={idx}
                style={{
                  flexDirection: "column",
                  columnGap: 4,
                  alignItems: "center",
                  backgroundColor: "#FAFAFA",
                  borderRadius: 5,
                  padding: 8,
                }}
              >
                <Image source={{ uri: deal.img }} style={styles.dealImg} />
                <Text style={styles.text}>{deal.title}</Text>
                <Text style={styles.text}>Old Price: ₹{deal.oldPrice}</Text>
                <Text style={styles.text}>
                  Discounted Price: ₹{deal.discountedPrice}
                </Text>
                <Text style={styles.text}>Size: {deal.size}</Text>
              </Pressable>
            );
          })}
        </View>
        {/* Trends done */}
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
  dealImg: {
    width: 150,
    resizeMode: "contain",
    height: 180,
    borderRadius: 10,
  },
  trends: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  text: {
    fontWeight: "500",
  },
});
