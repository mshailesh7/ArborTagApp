import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import tw from 'twrnc';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


const { width, height } = Dimensions.get('window');

const HomeScreen = () => {


  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`flex-1 mx-4 justify-between`}>
    {/* ArborTag Text Section */}
    <View style={[tw`py-2 rounded-full`, {backgroundColor: '#14594a'}]}>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
            <Text style={tw`text-3xl text-white font-bold text-center`}>
              ArborTag
            </Text>
            <Text style={tw`text-lg text-white font-semibold text-center`}>
              By NatureMarkSystems
            </Text>
          </TouchableOpacity>
          </View>

    {/* Logo Section */}
    <View style={tw`items-center justify-center flex-grow`}>
      <Animatable.Image
        style={styles.logo}
        source={require('../assets/LogoGears.gif')}
        animation='bounceIn'
        duration={1500}
      />
    </View>

    {/* Login and Signup Buttons */}
    <View style={tw`w-full px-4 pb-8`}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}
                        style={tw`py-3 bg-blue-500 rounded-lg mb-2`}>
        <Text style={tw`text-lg text-white font-semibold text-center`}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}
                        style={tw`py-3 bg-green-500 rounded-lg`}>
        <Text style={tw`text-lg text-white font-semibold text-center`}>Sign Up</Text>
      </TouchableOpacity>
    </View>      
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
logo: {
  width: width * 0.9,
  height: height * 0.4,
  resizeMode: 'contain',
},
});

export default HomeScreen;
