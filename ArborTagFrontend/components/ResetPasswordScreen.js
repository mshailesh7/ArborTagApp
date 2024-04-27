import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you've installed @expo/vector-icons
import tw from 'twrnc';

export const ResetPasswordScreen = ({route, navigation }) => {
  const { id} = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  console.log(route.params, "reset password params");
  

  const handleResetPassword = async () => {
    
    if(!otp){
    
      Alert.alert('Error', 'Please enter the OTP');
    }
    // Check for non-empty password fields
    if (!newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Password fields cannot be empty.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    
    try{
      console.log('-1')
  await fetch("http://192.168.1.11:3000/api/user/reset-password",{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({otp:otp, newPassword:newPassword,id:id})
  }
).then((response) =>{
  console.log(response.json())
  return response.json()
})
  .then((data)=>{
    console.log(data,"1");
    if(data.success){
      Alert.alert('Success', 'Password reset successful');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }else{
      Alert.alert('Error', data.error);
    }
  })
   .catch((error)=> {
     console.error(error);
     Alert.alert('Error', error);
   });
    }
    catch(err){
      console.error(err);
      Alert.alert('Error', err);
    }
  

    // More password validation can be added here if needed
    // Implement the actual password reset logic here
    // Navigate to login screen or dashboard as required
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tw`flex-1 justify-center px-8 bg-white`}
    >
      <Text style={tw`text-2xl font-bold text-center mb-2`}>Reset Your Password</Text>
      <View style={tw`relative mb-4`}>

      <TextInput
            style={tw`w-full p-3 mb-4 border border-gray-300 rounded-lg`}
            placeholder="Enter your OTP"
            keyboardType="numeric"
            maxLength={4}
            onChangeText={setOtp}
            value={otp}
          />
          
        <TextInput
          style={tw`w-full p-3 border border-gray-300 rounded-lg`}
          placeholder="New Password"
          secureTextEntry={!newPasswordVisible}
          onChangeText={setNewPassword}
          value={newPassword}
        />
        <TouchableOpacity
          style={tw`absolute inset-y-0 right-2 top-15 justify-center`}
          onPress={() => setNewPasswordVisible(!newPasswordVisible)}
        >
          <Ionicons name={newPasswordVisible ? 'eye' : 'eye-off'} size={24} color="grey" />
        </TouchableOpacity>
      </View>
      <View style={tw`relative mb-4`}>
        <TextInput
          style={tw`w-full p-3 border border-gray-300 rounded-lg`}
          placeholder="Confirm New Password"
          secureTextEntry={!confirmPasswordVisible}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
        <TouchableOpacity
          style={tw`absolute inset-y-0 right-3 justify-center`}
          onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
        >
          <Ionicons name={confirmPasswordVisible ? 'eye' : 'eye-off'} size={24} color="grey" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={tw`bg-blue-500 py-3 rounded-lg`}
        onPress={handleResetPassword}
      >
        <Text style={tw`text-lg text-white font-semibold text-center`}>Reset Password</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
