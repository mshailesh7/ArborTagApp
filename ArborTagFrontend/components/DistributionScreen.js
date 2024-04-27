import React, { useState } from 'react';
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, View,TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';


const { width, height } = Dimensions.get('window');

const DistributionScreen = () => {
  const [pickedFileName, setPickedFileName] = useState(null);

  const pickCsvFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'text/csv',
        copyToCacheDirectory: true,
      });

      console.log('Document Picker Result:', result); // Debugging line

      if (result.type !== 'cancel') {
        // alert(`Picked file: ${result.name}`);
        setPickedFileName(result.name);
      }
    } catch (error) {
      console.error('Error picking file:', error);
      alert('An error occurred while picking the file.');
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 mx-4`}>
    <View style={tw`flex-1 justify-around`}>
      <View>
        <Text style={tw`text-3xl text-center font-bold my-6 text-green-600`}>
          Distribution Among Species
        </Text>
        <Text style={tw`text-lg text-center font-semibold text-gray-700 px-4`}>
        This is a piechart that depicts a detailed breakdown of all the species in the dataset and their total percentage. Each colour in the chart represents its corresponding species in the figure legend. The percentage values show how much of the total that specific species takes up on the pie. The most abundant and the least abundant species are also depicted.        </Text>
        <TouchableOpacity onPress={pickCsvFile} accessibilityLabel="select-csv-file" style={tw`mt-8 py-2 px-4 self-center bg-blue-500 rounded-full`}>
          <Text style={tw`text-lg text-white font-bold`}>
            Select CSV File
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => {/* Submit action here */}} style={tw`py-3 bg-green-600 rounded-md mx-4 mb-6`}>
        <Text style={tw`text-xl font-bold text-center text-white`}>
          Submit Data
        </Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);
};


export default DistributionScreen;
const styles = StyleSheet.create({
    buttonContainer: {
      paddingVertical: 18,
      borderRadius: 50,
      backgroundColor: '#14594a',
    },
  });
  