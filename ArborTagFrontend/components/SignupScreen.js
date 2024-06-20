import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import tw from "twrnc";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";

export const SignupScreen = ({ navigation }) => {

  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [id, setId] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSignUp = async () => {
    if (!data.email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (!agreeToTerms) {
      Alert.alert(
        "Terms and Conditions",
        "Please agree to the terms and conditions."
      );
      return;
    }
    if (
      data.email === "" ||
      data.phoneNumber === "" ||
      data.password === "" ||
      confirmPassword === ""
    ) {
      Alert.alert("Error", "Please fill all the details.");
      return;
    }
    if (data.password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }


    try {
      await fetch("http://192.168.0.165:3000/api/v1/auth/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            
            setId(data.user._id);
            Alert.alert(
              data.message,
              "OTP Sent",
              "A verification OTP has been sent to your email address."
              [{ text: "OK", onPress: setOtpSent(true) }]
            );

          } else {
            Alert.alert("Error1", data.errors[0]["undefined"]);
          }

        });
    } catch (error) {
      console.log(error);
    }


   
  
    
  };

  const verifyOtp = async ()  => {
    if (otp.length !== 4) {
      Alert.alert("Error", "Please enter a 4-digit OTP.");
      return;
    }
    console.log("1");
    try{
      console.log("2")
      await fetch(`http://192.168.0.165:3000/api/v1/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: id, otp }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            setOtpVerified(true);
            Alert.alert(
              "Success",
              "OTP verified successfully. You are now signed up, Please Login!",
              [{ text: "OK", onPress: () => navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              }) }]
            );
          } else {
            Alert.alert("Error", data.error);
          }
        });
    }
    catch(e){
      console.log(e);
      
    }
    
    
   
    
};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={tw`flex-1 justify-center px-8 bg-white`}>
        <Text style={tw`text-2xl font-bold text-center mb-2`}>
          Create Account
        </Text>
        {!otpSent && (
          <>
            <Text style={tw`text-center mb-4`}>Connect with us today!</Text>
            <TextInput
              value={data.name}
              style={styles.input}
              placeholder="Enter your Name"
              onChangeText={(name) => setData({ ...data, name })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              onChangeText={(email) => setData({ ...data, email })}
              value={data.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              onChangeText={(phoneNumber) => setData({ ...data, phoneNumber })}
              value={data.phoneNumber}
              keyboardType="phone-pad"
            />
            <View style={tw`relative border mb-3 border-gray-300 rounded-lg`}>
              <TextInput
                style={tw`w-full p-3 rounded-lg`}
                placeholder="Enter your password"
                onChangeText={(password) => setData({ ...data, password })}
                value={data.password}
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity
                style={tw`absolute inset-y-0 right-3 justify-center`}
                onPress={togglePasswordVisibility}
              >
                <Ionicons
                  name={passwordVisible ? "eye" : "eye-off"}
                  size={24}
                  color="grey"
                />
              </TouchableOpacity>
            </View>
            <View style={tw`relative border mb-3 border-gray-300 rounded-lg`}>
              <TextInput
                style={tw`w-full p-3 rounded-lg`}
                placeholder="Re-enter your password"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                secureTextEntry={!confirmPasswordVisible}
              />
              <TouchableOpacity
                style={tw`absolute inset-y-0 right-3 justify-center`}
                onPress={toggleConfirmPasswordVisibility}
              >
                <Ionicons
                  name={confirmPasswordVisible ? "eye" : "eye-off"}
                  size={24}
                  color="grey"
                />
              </TouchableOpacity>
            </View>
            <View style={tw`flex-row my-4 items-center mb-8`}>
              <Checkbox
                value={agreeToTerms}
                onValueChange={setAgreeToTerms}
                color={agreeToTerms ? "#4630EB" : undefined}
              />
              <Text style={tw`ml-2`}>I agree to the terms and conditions</Text>
            </View>
            <TouchableOpacity
              style={tw`bg-green-500 py-3 rounded-lg`}
              onPress={handleSignUp}
            >
              <Text style={tw`text-lg text-white font-semibold text-center`}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </>
        )}
        {otpSent  && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              keyboardType="numeric"
              onChangeText={setOtp}
              value={otp}
              maxLength={4}
            />
            <TouchableOpacity
              style={tw`bg-blue-500 py-3 rounded-lg`}
              onPress={verifyOtp}
            >
              <Text style={tw`text-lg text-white font-semibold text-center`}>
                Verify OTP
              </Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`absolute top-10 right-5`}
        >
          <Text style={tw`text-sm text-gray-600`}>Close</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  input: {
    ...tw`w-full p-3 mb-3 border border-gray-300 rounded-lg`,
  },
});
