import {
    View,
    Text,
    Image,
    FlatList,
    Touchable,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import tw from 'twrnc';
  import * as Animatable from 'react-native-animatable';
  import { useNavigation } from "@react-navigation/native";
  
  const data = [
    {
      id: "123",
      title: "New Location",
      image: require("../assets/Location.png"),
      screen: "LocationInputScreen",
    },
    {
      id: "456",
      title: "Data Curation",
      image: require("../assets/Curation.png"),
      screen: "DataCuration",
    },
    {
      id: "789",
      title: "Data Analysis",
      image: require("../assets/Analysis.png"),
      screen: "DataAnalysis",
    },
  ];
  
  const NavOptionItem = ({ item }) => {
    const navigation = useNavigation();
    return (
      <Animatable.View
        animation="fadeInUp"
        duration={0}
        delay={1 * item.id}
        style={tw`rounded-3xl p-6 bg-[#14594a] m-4 mt-8 mb-15 w-3/4 self-center shadow-xl`}
      >
        <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
          <View style={tw`items-center`}>
            <Image style={tw`w-60 h-60`} source={item.image} />
            <Text style={tw`mt-4.5 text-3xl font-bold text-white`}>
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    );
  };
  
  const NavOptions = () => {
    return (
      <FlatList
        data={data}
        vertical
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NavOptionItem item={item} />}
      />
    );
  };
  
  export default NavOptions;
  