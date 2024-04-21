import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you've installed @expo/vector-icons
import tw from 'twrnc';

export const ResetPasswordScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleResetPassword = () => {
    // Check for non-empty password fields
    if (!newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Password fields cannot be empty.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    // More password validation can be added here if needed
    // Implement the actual password reset logic here
    Alert.alert('Success', 'Your password has been reset successfully.');
    navigation.navigate('Login'); // Navigate to login screen or dashboard as required
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tw`flex-1 justify-center px-8 bg-white`}
    >
      <Text style={tw`text-2xl font-bold text-center mb-2`}>Reset Your Password</Text>
      <View style={tw`relative mb-4`}>
        <TextInput
          style={tw`w-full p-3 border border-gray-300 rounded-lg`}
          placeholder="New Password"
          secureTextEntry={!newPasswordVisible}
          onChangeText={setNewPassword}
          value={newPassword}
        />
        <TouchableOpacity
          style={tw`absolute inset-y-0 right-3 justify-center`}
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
