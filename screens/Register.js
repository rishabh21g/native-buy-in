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
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const handleRegistration = async () => {
    setloading(true);
    const user = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        "http://192.168.117.43:4000/api/user/register",
        user
      );
      // console.log(response);
      Alert.alert("Registration Done");
      setname("");
      setemail("");
      setpassword("");
      navigation.replace("Home")
    } catch (err) {
      Alert.alert("Registration error");
      console.log(err);
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
            Make your new account here
          </Text>
        </View>

        {/* Full Name */}
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
          <FontAwesome name="user" size={22} color="#f53d3d" />
          <TextInput
            placeholder="Enter your full name"
            onChangeText={(text) => setname(text)}
            value={name}
            style={{
              flex: 1,
              marginLeft: 10,
              fontSize: 14,
              color: "#333",
            }}
          />
        </View>

        {/* Email */}
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

        {/* Password */}
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

        {/* SignUp Button */}
        <Pressable
          style={{
            backgroundColor: "#f53d3d",
            height: 50,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleRegistration}
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
              Sign Up
            </Text>
          )}
        </Pressable>

        {/* Login Link */}
        <Pressable
          style={{ marginTop: 20 }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text
            style={{
              fontSize: 13,
              textAlign: "center",
              color: "#888",
              fontWeight: "500",
            }}
          >
            Already have an account?{" "}
            <Text style={{ color: "#f53d3d", fontWeight: "600" }}>Login</Text>
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
