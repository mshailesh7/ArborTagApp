import React, { useState } from 'react';
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, View,TouchableOpacity, Dimensions, StyleSheet,Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';


const { width, height } = Dimensions.get('window');

const SummaryScreen = () => {
  const [pickedFileName, setPickedFileName] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [showButtons, setShowButtons] = useState(true);

  const pickCsvFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      });

      console.log('Document Picker Result:', result);

      if (result.type !== 'cancel') {
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
        const executeResponse = await fetch('http://192.168.0.104:3000/api/v1/analysis/summary_tree', { method: 'POST', });
        if(executeResponse.ok){
          const executeData = await executeResponse.json();
          setImageUrl(executeData.imageUrl);
          setShowButtons(false);
          alert('Script executed successfully.');
        } else {
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
  const downloadImage = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access media library is required!');
        return;
      }

      const downloadResumable = FileSystem.createDownloadResumable(
        imageUrl,
        FileSystem.documentDirectory + 'SummaryTree.jpg'
      );

      const { uri } = await downloadResumable.downloadAsync();

      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Download', asset, false);
      alert('Image downloaded successfully!');
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('An error occurred while downloading the image.');
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 mx-4`}>
    <View style={tw`flex-1 justify-around`}>
      <View>
        <Text style={tw`text-3xl text-center font-bold my-6 text-green-600`}>
          Summary
        </Text>
        <Text style={tw`text-lg text-center font-semibold text-gray-700 px-4`}>
        This is an overall statistics table that shows key stats and their respective values for them.
        </Text>
        {showButtons && (
            <TouchableOpacity onPress={pickCsvFile} accessibilityLabel="select-csv-file" style={tw`mt-8 py-2 px-4 self-center bg-blue-500 rounded-full`}>
              <Text style={tw`text-lg text-white font-bold`}>
                Select CSV File
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {showButtons && (
          <TouchableOpacity onPress={submitData} style={tw`py-3 bg-green-600 rounded-md mx-4 mb-6`}>
            <Text style={tw`text-xl font-bold text-center text-white`}>
              Submit Data
            </Text>
          </TouchableOpacity>
        )}
      {imageUrl && (
          <View style={tw`mt-4 items-center`}>
            <Image source={{ uri: imageUrl }} style={{ width: width - 40, height: 300, resizeMode: 'contain' }} />
            <TouchableOpacity onPress={downloadImage} style={tw`mt-2 py-2 px-4 self-center bg-blue-500 rounded-full`}>
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


export default SummaryScreen;
const styles = StyleSheet.create({
    buttonContainer: {
      paddingVertical: 18,
      borderRadius: 50,
      backgroundColor: '#14594a',
    },
  });
  