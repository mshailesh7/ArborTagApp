import React, { useState } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import tw from 'twrnc';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please enter both email and password to log in.');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    
    // Simulate a successful login attempt
    console.log('Logged in with:', { email, password, rememberMe });
    setEmail('');
    setPassword('');
    setRememberMe(false);

    // Navigate to next screen or reset navigation stack
    navigation.reset({
      index: 0,
      routes: [{ name: 'Menu' }],
    });
  };

  const handleForgotPassword = () => {
    console.log('Forgot password button clicked');
    navigation.navigate('ForgotPasswordScreen');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={tw`flex-1 justify-center px-8 bg-white`}>
        <Text style={tw`text-2xl font-bold text-center mb-2`}>Login</Text>
        <Text style={tw`text-center mb-4`}>Welcome back!</Text>
        <TextInput
          style={tw`w-full p-3 mb-3 border border-gray-300 rounded-lg`}
          placeholder="Enter your email address"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
        />
        <View style={tw`relative border border-gray-300 rounded-lg`}>
          <TextInput
            style={tw`w-full p-3 rounded-lg`}
            placeholder="Enter your password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            style={tw`absolute inset-y-0 right-3 justify-center`}
            onPress={togglePasswordVisibility}
          >
            <Ionicons name={passwordVisible ? 'eye' : 'eye-off'} size={24} color="grey" />
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row items-center mt-4 justify-between mb-4`}>
          <View style={tw`flex-row items-center`}>
            <Checkbox
              value={rememberMe}
              onValueChange={setRememberMe}
              color={rememberMe ? '#4630EB' : undefined}
            />
            <Text style={tw`ml-2`}>Remember Me</Text>
          </View>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={tw`text-blue-500`}>Forget Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={tw`bg-green-500 py-3 rounded-lg`}
          onPress={handleLogin}
        >
          <Text style={tw`text-lg text-white font-semibold text-center`}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`absolute top-10 right-5`}>
          <Text style={tw`text-sm text-gray-600`}>Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
