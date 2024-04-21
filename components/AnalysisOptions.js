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
      id: "111",
      title: "Average Height",
      image: require("../assets/TreeHeight.png"),
      screen: "Height",
    },
    {
      id: "222",
      title: "Average Width",
      image: require("../assets/TreeWidth.png"),
      screen: "Width",
    },
    {
      id: "333",
      title: "Diversity",
      image: require("../assets/Diversity.png"),
      screen: "Diversity",
    },
    {
      id: "444",
      title: "Distribution",
      image: require("../assets/Distribution.png"),
      screen: "Distribution",
    },
    {
      id: "555",
      title: "HeatMap",
      image: require("../assets/HeatMap.png"),
      screen: "HeatMap",
    },
    {
      id: "666",
      title: "Summary",
      image: require("../assets/Summary.png"),
      screen: "Summary",
    },
    {
      id: "777",
      title: "Final Report",
      image: require("../assets/Report.png"),
      screen: "FinalReport",
    },
  ];
  const AnalysisOptionItem = ({ item }) => {
    const navigation = useNavigation();
    return (
      <Animatable.View
        animation="fadeInUp"
        duration={0}
        delay={1 * item.id}
        style={tw`rounded-xl p-6 bg-[#14594a] m-6 w-3.5/4 self-center shadow-xl`}
      >
        <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
          <View style={tw`items-center`}>
            <Image style={tw`w-60 h-40`} source={item.image} />
            <Text style={tw`mt-3.5 text-3xl font-bold text-white`}>
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    );
  };
  
  const AnalysisOptions = () => {
    return (
      <FlatList
        data={data}
        vertical
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AnalysisOptionItem item={item} />}
      />
    );
  };
  
  export default AnalysisOptions;
  