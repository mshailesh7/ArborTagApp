import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import tw from 'twrnc';

export const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 && otpSent) {
      // Timer expires
      setOtpSent(false);  // Reset the OTP sent status after the timer
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = () => {
    if (!email.includes('@')) {
      Alert.alert('Input Error', 'Please enter a valid email address.');
      return;
    }

    // Proceed to send an OTP
    Alert.alert('Verify OTP', 'A 4-digit OTP has been sent to your email.');
    setOtpSent(true);
    setTimer(30); // Set a 30-second timer for resend
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 4) {
      Alert.alert('OTP Error', 'Please enter a 4-digit OTP.');
      return;
    }
    // If OTP is correct
    Alert.alert('Success', 'OTP verified successfully.');
    setOtp('');
    navigation.navigate('ResetPasswordScreen'); // Navigate to Reset Password screen
  };

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
      {otpSent && (
        <>
          <TextInput
            style={tw`w-full p-3 mb-4 border border-gray-300 rounded-lg`}
            placeholder="Enter your OTP"
            keyboardType="numeric"
            maxLength={4}
            onChangeText={setOtp}
            value={otp}
          />
          <TouchableOpacity
            style={tw`bg-green-500 py-3 rounded-lg`}
            onPress={handleVerifyOtp}
          >
            <Text style={tw`text-lg text-white font-semibold text-center`}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity onPress={() => navigation.goBack()} style={tw`absolute top-10 right-5`}>
        <Text style={tw`text-sm text-gray-600`}>Back</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
