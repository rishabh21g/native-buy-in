import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Pressable,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const handleLogin = async () => {
    setloading(true);
    const user = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        "http://192.168.117.43:4000/api/user/login",
        user
      );
      console.log(response);
      await AsyncStorage.setItem("authToken", response.data.token);

      if (response.data.token) {
        Alert.alert("Login Successfully");
        navigation.replace("Main");
      }
      setemail("");
      setpassword("");
    } catch (err) {
      Alert.alert("Login failed");
      console.log("Error while loggin in" + err.message);
    } finally {
      setloading(false);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 24,
        justifyContent: "center",
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={50}
        style={{ flex: 1, justifyContent: "center" }}
      >
        {/* Logo */}
        <View style={{ alignItems: "center", marginBottom: 40 }}>
          <Image
            style={{ width: 100, height: 100, borderRadius: 12 }}
            source={require("../assets/market.jpg")}
          />
          <Text
            style={{
              marginTop: 20,
              fontSize: 20,
              fontWeight: "600",
              color: "#333",
            }}
          >
            Login to your account
          </Text>
        </View>

        {/* Email Input */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F0F0F0",
            borderRadius: 10,
            paddingHorizontal: 12,
            marginBottom: 20,
            height: 50,
            elevation: 1,
          }}
        >
          <MaterialIcons name="email" size={22} color="#f53d3d" />
          <TextInput
            placeholder="Enter your email"
            onChangeText={(text) => setemail(text.trim())}
            value={email}
            keyboardType="email-address"
            style={{
              flex: 1,
              marginLeft: 10,
              fontSize: 14,
              color: "#333",
            }}
          />
        </View>

        {/* Password Input */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F0F0F0",
            borderRadius: 10,
            paddingHorizontal: 12,
            marginBottom: 10,
            height: 50,
            elevation: 1,
          }}
        >
          <MaterialIcons name="lock" size={22} color="#f53d3d" />
          <TextInput
            secureTextEntry={!showPassword}
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => setpassword(text)}
            style={{
              flex: 1,
              marginLeft: 10,
              fontSize: 14,
              color: "#333",
            }}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialIcons
              name={!showPassword ? "visibility-off" : "visibility"}
              size={22}
              color="#f53d3d"
            />
          </TouchableOpacity>
        </View>

        {/* Forget / Keep me Logged in */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
            paddingHorizontal: 2,
          }}
        >
          <Text style={{ fontSize: 12, fontStyle: "italic", color: "#555" }}>
            Keep me logged in
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontStyle: "italic",
              color: "#33adff",
              fontWeight: "500",
            }}
          >
            Forgot Password?
          </Text>
        </View>

        {/* Login Button */}
        <Pressable
          style={{
            backgroundColor: "#f53d3d",
            height: 50,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleLogin}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#fff",
              }}
            >
              Login
            </Text>
          )}
        </Pressable>

        {/* Sign up */}
        <Pressable
          style={{ marginTop: 20 }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text
            style={{
              fontSize: 13,
              textAlign: "center",
              color: "#888",
              fontWeight: "500",
            }}
          >
            Don't have an account?{" "}
            <Text style={{ color: "#f53d3d", fontWeight: "600" }}>Sign up</Text>
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
