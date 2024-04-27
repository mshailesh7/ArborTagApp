import { Text, View , StyleSheet,TouchableOpacity} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavOptions from '../components/NavOptions';
import { StatusBar } from 'expo-status-bar';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MenuScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('Token')
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch(e) {
      console.log(e)
    }
  }
  return (
    <>
    <StatusBar style="dark" />
    <SafeAreaView style={tw`mx-5 flex-1`}>
      <Animatable.View
        animation="bounceIn"
        duration={2000}
        style={tw`flex-row items-center p-3 rounded-full bg-[#14594a] justify-between `}
      >
        {/* Wrapper View to center the title irrespective of the logout icon */}
        <View style={tw`flex-1 justify-center `}>
          <Text style={[tw`text-3xl text-white font-bold`, styles.centerText]}>
            ArborTag
          </Text>
        </View>
        <TouchableOpacity style={tw`p-2`}
        onPress={handleLogout}>
          
          <Ionicons name="log-out-outline" size={24} color="white" />
        </TouchableOpacity>
      </Animatable.View>
      <NavOptions />
    </SafeAreaView>
  </>
);
};

export default MenuScreen;

const styles = StyleSheet.create({
  centerText: {
    textAlign: 'center',
  },
});
