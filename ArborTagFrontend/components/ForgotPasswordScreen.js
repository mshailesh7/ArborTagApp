import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import tw from 'twrnc';

export const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  
  const handleSendOtp = async () => {
    console.log(email);
    if (!email.includes('@')) {

      Alert.alert('Input Error', 'Please enter a valid email address.');
      return;
    }
    try{
      await fetch("http://192.168.1.11:3000/api/v1/auth/forgot-password",{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email
        })
      }).then((response) => response.json())
        
        .then((data) => {
          console.log(data);
          if(data.success){
            Alert.alert('Success', 'Password reset OTP is sent to your email.');
            setOtpSent(true);
            navigation.navigate('ResetPasswordScreen' , {email: email, id: data.id});
         
          }
          else{
            Alert.alert('Error', data.error);
          }
          
          });
    } catch(err) {  
      console.error(err);
      Alert.alert('Error', err);
      setOtpSent(false);

      }
      
    }
  

    
  


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tw`flex-1 justify-center px-8 bg-white`}
    >
      <Text style={tw`text-2xl font-bold text-center mb-2`}>Reset Password</Text>
      <Text style={tw`text-center mb-4`}>Please enter your email address to receive a reset link.</Text>
      <TextInput
        style={tw`w-full p-3 mb-4 border border-gray-300 rounded-lg`}
        placeholder="Email Address"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      <TouchableOpacity
        style={tw`bg-blue-500 py-3 rounded-lg mb-4`}
        onPress={handleSendOtp}
        disabled={timer > 0}
      >
        <Text style={tw`text-lg text-white font-semibold text-center`}>
          {timer > 0 ? `Resend in ${timer}s` : 'Send OTP'}
        </Text>
      </TouchableOpacity>
     
      <TouchableOpacity onPress={() => navigation.goBack()} style={tw`absolute top-10 right-5`}>
        <Text style={tw`text-sm text-gray-600`}>Back</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
