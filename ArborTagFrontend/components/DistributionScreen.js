import React, { useState } from 'react';
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, View,TouchableOpacity, Dimensions, StyleSheet, Image, Linking } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';


const { width, height } = Dimensions.get('window');

const DistributionScreen = () => {
  const [pickedFileName, setPickedFileName] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);


  const pickCsvFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        // type: 'text/csv',
        copyToCacheDirectory: true,
      });

      console.log('Document Picker Result:', result); // Debugging line

      if (result.type !== 'cancel') {
        // alert(`Picked file: ${result.name}`);
        setPickedFileName(result);
      }
    } catch (error) {
      console.error('Error picking file:', error);
      alert('An error occurred while picking the file.');
    }
  };
  const submitData = async () => {
    if(!pickedFileName) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file',{
      uri: pickedFileName.assets[0].uri,
      name: pickedFileName.assets[0].name,
      type: pickedFileName.assets[0].mimeType,
    });

    try{
      const response = await fetch('http://192.168.0.104:3000/api/v1/analysis/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if(response.ok){
        const executeResponse = await fetch('http://192.168.0.104:3000/api/v1/analysis/distributionmap', { method: 'POST', });
        if(executeResponse.ok){
          const executeData = await executeResponse.json();
          setImageUrl(executeData.imageUrl);
          alert('Script executed successfully.');
        }
        else{
          alert('Script execution failed.');
        }
      }
      else{
        alert('File upload failed.');
      }
    }
    catch(error){
      console.error('error submitting file:', error);
      alert('An error occurred while uploading');
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
      <TouchableOpacity onPress={submitData} style={tw`py-3 bg-green-600 rounded-md mx-4 mb-6`}>
        <Text style={tw`text-xl font-bold text-center text-white`}>
          Submit Data
        </Text>
      </TouchableOpacity>
      {imageUrl && (
          <View style={tw`mt-4 items-center`}>
            <Image source={{ uri: imageUrl }} style={{ width: width - 40, height: 300, resizeMode: 'contain' }} />
            <TouchableOpacity onPress={() => Linking.openURL(imageUrl)} style={tw`mt-2 py-2 px-4 self-center bg-blue-500 rounded-full`}>
              <Text style={tw`text-lg text-white font-bold`}>
                Download Image
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
  