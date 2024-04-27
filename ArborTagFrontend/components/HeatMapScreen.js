import React, { useState } from 'react';
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, View,TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';


const { width, height } = Dimensions.get('window');

const HeatMapScreen = () => {
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
          HeatMap and Carbon Sequestration
        </Text>
        <Text style={tw`text-lg text-center font-semibold text-gray-700 px-4`}>
        This image is a geo-coordinate map that depicts a heatmap shows the level of carbon sequestered by each tree. As the scale above shows, the lower the ability of the tree to sequester carbon the closer it is to yellow which is the lower range. The more efficient the tree is at sequestering carbon the closer it is to dark green. The tree which the highest carbon sequestering portential and the lowest is both depected         </Text>
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


export default HeatMapScreen;
const styles = StyleSheet.create({
    buttonContainer: {
      paddingVertical: 18,
      borderRadius: 50,
      backgroundColor: '#14594a',
    },
  });
  