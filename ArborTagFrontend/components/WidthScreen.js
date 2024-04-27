import React, { useState } from 'react';
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, View,TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';


const { width, height } = Dimensions.get('window');

const WidthScreen = () => {
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
          Average Width
        </Text>
        <Text style={tw`text-lg text-center font-semibold text-gray-700 px-4`}>
        This graph depicts the average width of the trees for each of the species. The total width of the tree for each of the species is taken and divided by the total number of trees for that specific species to determine an average width estimate. It also shows the thickest and slimest tree.
        </Text>
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


export default WidthScreen;
const styles = StyleSheet.create({
    buttonContainer: {
      paddingVertical: 18,
      borderRadius: 50,
      backgroundColor: '#14594a',
    },
  });
  