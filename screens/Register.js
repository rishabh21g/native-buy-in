import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Pressable,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
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
      console.log(response);
      Alert.alert("Registration Done");
      setname("");
      setemail("");
      setpassword("");
      setloading(false);
    } catch (err) {
      Alert.alert("Registration error");
      console.log(err);
      setloading(false);
    } finally {
      setloading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 40,
      }}
    >
      <View
        style={{
          margin: 20,
        }}
      >
        <Image
          style={{ width: 80, height: 80 }}
          source={require("../assets/market.jpg")}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignContent: "center", alignItems: "center" }}>
          <Text
            style={{
              margin: 10,
              fontWeight: 500,
              fontSize: 18,
              color: "black",
            }}
          >
            Make your new account here
          </Text>
        </View>
        <View
          style={{
            marginTop: 70,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
              gap: 10,
              backgroundColor: "#F8F8F8",
              padding: 5,
              borderRadius: 5,
              width: 350,
              margin: 10,
              //   borderWidth: 0.5,
              elevation: 2,
            }}
          >
            <FontAwesome name="user" size={24} color="#f53d3d" />
            <TextInput
              placeholder="Enter your fullname"
              onChangeText={(text) => setname(text)}
              value={name}
              style={{
                width: 300,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
              gap: 10,
              backgroundColor: "#F8F8F8",
              padding: 5,
              borderRadius: 5,
              width: 350,
              margin: 10,
              //   borderWidth: 0.5,
              elevation: 2,
            }}
          >
            <MaterialIcons name="email" size={24} color="#f53d3d" />
            <TextInput
              placeholder="Enter your email"
              onChangeText={(text) => setemail(text.trim())}
              value={email}
              style={{
                width: 300,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
              gap: 10,
              backgroundColor: "#F8F8F8",
              padding: 5,
              borderRadius: 5,
              width: 350,
              margin: 10,
              //   borderWidth: 0.5,
              elevation: 2,
            }}
          >
            <MaterialIcons name="password" size={24} color="#f53d3d" />
            <TextInput
              secureTextEntry={!showPassword}
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => setpassword(text)}
              style={{
                width: 300,
              }}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialIcons
                name={!showPassword ? "visibility-off" : "visibility"}
                size={24}
                color="f53d3d"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: 350,
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 6,
          }}
        >
          <Text style={{ fontStyle: "italic" }}>Keep me Logged In</Text>
          <Text style={{ fontStyle: "italic", color: "#33adff" }}>
            Forget Password!
          </Text>
        </View>
        <View
          style={{
            marginTop: 50,
            alignContent: "center",
            alignItems: "center",
            width: 350,
          }}
        >
          <Pressable
            style={{
              width: 350,
              alignItems: "center",
              backgroundColor: "#f53d3d",
              height: 50,
              borderRadius: 5,
            }}
            onPress={handleRegistration}
          >
            {loading ? (
              <ActivityIndicator size="large" color="f53d3d" />
            ) : (
              <Text
                style={{
                  textAlign: "center",
                  padding: 15,
                  fontSize: 15,
                  fontWeight: 600,
                  color: "white",
                }}
              >
                SignUp
              </Text>
            )}
          </Pressable>
        </View>
        <Pressable
          style={{ marginTop: 20 }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text
            style={{
              fontWeight: 600,
              textAlign: "center",
              color: "gray",
              fontSize: 12,
            }}
          >
            You have an account Login
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
