import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import tw from 'twrnc';
import { SafeAreaView } from "react-native-safe-area-context";
import AnalysisOptions from '../components/AnalysisOptions'
import React from 'react'


const { width, height } = Dimensions.get('window');

const DataAnalysis = () => {
  return (
    <SafeAreaView style={tw`mx-5 flex-1`}>
      <View style={[styles.buttonContainer, { marginBottom: height * 0.05 }]}>
        <Text style={tw`text-3xl text-white font-bold text-center`}>
          Data Analysis
        </Text>
      </View>
      <AnalysisOptions />
      </SafeAreaView>  
  )
}

export default DataAnalysis

const styles = StyleSheet.create({
    buttonContainer: {
      paddingVertical: 18,
      borderRadius: 50,
      backgroundColor: '#14594a',
      marginBottom: 10,
    },
})