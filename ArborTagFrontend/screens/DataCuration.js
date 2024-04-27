import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

const Spacer = ({ height = 0, width = 0 }) => <View style={{ height, width }} />;

// Static mapping of types to their required assets
const icons = {
  csv: require('../assets/csv.png'),
  excel: require('../assets/excel.png'),
  pdf: require('../assets/pdf.png'),
};

const TableRow = ({ rowIndex }) => (
  <>
    <View style={styles.row}>
      <View style={[styles.cell, { flex: 4 }]}>
        <Text style={tw`text-xl`}>{`LOCATION${rowIndex + 1}`}</Text>
      </View>
      <View style={[styles.cell, { flex: 3 }]}>
        <Text style={tw`text-xl`}>{`DATE${rowIndex + 1}`}</Text>
      </View>
      <View style={[styles.cell, { flex: 2 }]}>
        <Text style={tw`text-lg`}>{`EDIT${rowIndex + 1}`}</Text>
      </View>
    </View>
    <View style={styles.row}>
      {Object.entries(icons).map(([type, source], index) => (
        <View style={[styles.cell, styles.iconCell]} key={type}>
          <TouchableOpacity accessibilityLabel={`${type}-icon-${rowIndex + 1}`}>
            <Image style={styles.image} source={source} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
    <Spacer height={35} />
  </>
);

const DataCuration = () => {
  return (
    <SafeAreaView style={tw`mx-5 flex-1`}>
      <View style={[styles.buttonContainer, tw`mb-10`]}>
        <Text style={tw`text-3xl text-white font-bold text-center`}>Data Curation</Text>
      </View>
      <View style={styles.table}>
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <TableRow key={rowIndex} rowIndex={rowIndex} />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  table: {
    marginTop: 30,
  },
  row: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
  },
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  iconCell: {
    flex: 1,
    minWidth: 40, 
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  buttonContainer: {
    paddingVertical: 18,
    borderRadius: 50,
    backgroundColor: '#14594a',
  },
});

export default DataCuration
