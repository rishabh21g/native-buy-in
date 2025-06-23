import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login.js";
import Register from "../screens/Register.js";
import Home from "../screens/Home.js";
import Profile from "../screens/Profile.js";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import Cart from "../screens/Cart.js";

const StackNav = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function TabNav() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            animation: "fade",
            tabBarLabel: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialIcons name="home" color="#f53d3d" size={24} />
              ) : (
                <AntDesign name="home" size={24} color="#f53d3d" />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            animation: "fade",
            tabBarLabel: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome name="user" size={24} color="#f53d3d" />
              ) : (
                <FontAwesome name="user-o" size={24} color="#f53d3d" />
              ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            animation: "fade",
            tabBarLabel: "Cart",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="cart" size={24} color="#f53d3d" />
              ) : (
                <Ionicons name="cart-outline" size={24} color="#f53d3d" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="Main"
          component={TabNav}
          options={{
            headerShown: false,
            animation: "slide_from_bottom",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;
