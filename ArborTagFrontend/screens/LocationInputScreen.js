import { View, Text, TextInput, StyleSheet, Dimensions,Keyboard,TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from 'twrnc';
import { DateTime } from 'luxon';

const { width, height } = Dimensions.get('window');

const LocationInputScreen = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(DateTime.now().toFormat('dd-LL-yyyy'));
  const [time, setTime] = useState(DateTime.now().toFormat('HH:mm'));

  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <SafeAreaView style={tw`mx-5`}>
      <View style={[styles.buttonContainer, { marginBottom: height * 0.125 }]}>
        <Text style={tw`text-3xl text-white font-bold text-center`}>
          New Location
        </Text>
      </View>      
      <View style={[tw`p-5 items-center rounded-lg bg-[#14594a]`, { marginTop: height * 0.02 }]}>              
        <TextInput
          style={[tw`text-xl border-2 text-white text-center`, styles.textInput, { marginTop: height * 0.01 }]}
          placeholder="Enter your Location"
          placeholderTextColor="#fff"
          value={location}
          onChangeText={setLocation}
        />
        <Text style={[tw`text-3xl text-white font-bold text-center`, { marginTop: height * 0.01 }]}>
         {location}
        </Text>
        <View style={[tw`items-center`, { marginTop: height * 0.05 }]}>              
          <Text style={tw`text-3xl text-white font-bold`}>
            Date: {date}
          </Text>
          <Text style={tw`text-3xl text-white font-bold`}>
            Time: {time}
          </Text>
        </View>
        <View style={{ marginTop: height * 0.05 }}>
          <TouchableOpacity
            style={tw`items-center border-2 bg-green-600 shadow-lg`}
            onPress={() => navigation.navigate('Camera')}           
          >
            <Text style={tw`text-4xl p-4 font-bold text-gray-100 `}>
              Start Tagging
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 18,
    borderRadius: 50,
    backgroundColor: '#14594a',
  },
  textInput: {
    width: '100%',
    padding: 20,
    fontSize: width < 360 ? 16 : 20, 
  },
});

export default LocationInputScreen;
