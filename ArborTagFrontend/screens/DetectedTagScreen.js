import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import tw from 'twrnc';
import * as Location from 'expo-location';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuScreen from "./MenuScreen";
const TreeSpecies = [
  {
    "Family ": "Meliaceae",
    "Scientific Name": "Azadirachta Indica",
    "Common Name": "Neem",
    "Kannnada Name": "(ಬೇವು) Bevu",
    "Mahrashtra Name": "(कडुलिंब) Kadulimba",
    "Tamil Nadu Name": "(வேம்பு) Vempu",
    "CO2 Stock Per Tree (ton)": "0.51",
  },
  {
    "Family ": "Lamiaceae",
    "Scientific Name": "Tectona Grandis",
    "Common Name": "Sagwaan / Teak",
    "Kannnada Name": "(ತೇಗ )Thega",
    "Mahrashtra Name": "(सागवान) Sagwan",
    "Tamil Nadu Name": "(தேக்கு) Tekku",
    "CO2 Stock Per Tree (ton)": "3.70 lakh tonnes",
  },
  {
    "Family ": "Myrtaceae",
    "Scientific Name": "Eucalyptus globulus",
    "Common Name": "Tasmanian Blue Gem",
    "Kannnada Name": "Neelgiri mara",
    "Mahrashtra Name": "Tailapatra",
    "Tamil Nadu Name": "",
    "CO2 Stock Per Tree (ton)": "2.47 lakh tonnes",
  },
  {
    "Family ": "Fabaceae",
    "Scientific Name": "Prosopis Juliflora",
    "Common Name": "Kabuli Kikar",
    "Kannnada Name": "Ballaari Jaali ( ಬಳ್ಳಾರಿ ಜಾಲಿ)",
    "Mahrashtra Name": "Katkali (काटकळी)",
    "Tamil Nadu Name": "Seemai Karuvel (சீமைக்கருவேலை)",
    "CO2 Stock Per Tree (ton)": "1.67 lakh tonnes",
  },
  {
    "Family ": "Casuarinaceae",
    "Scientific Name": "Casuarina Equisetifolia",
    "Common Name": "Whistling Pine / She Oak",
    "Kannnada Name": "Kyasurina",
    "Mahrashtra Name": "Suru",
    "Tamil Nadu Name": "Savukku",
    "CO2 Stock Per Tree (ton)": "1.28 lakh tonnes",
  },
  {
    "Family ": "Fabaceae",
    "Scientific Name": "Vachellia Tortilis",
    "Common Name": "Umbrella Thorn",
    "Kannnada Name": "Auri",
    "Mahrashtra Name": "Israeli Babool",
    "Tamil Nadu Name": "Karuvel",
    "CO2 Stock Per Tree (ton)": "1.04 lakh tonnes",
  },
  {
    "Family ": "Moraceae",
    "Scientific Name": "Ficus Benghalensis",
    "Common Name": "Banyan",
    "Kannnada Name": "ಆಲ (Aala)",
    "Mahrashtra Name": "",
    "Tamil Nadu Name": "(ஆலை) Alai",
    "CO2 Stock Per Tree (ton)": "0.635",
  },
  {
    "Family ": "Moraceae",
    "Scientific Name": "Ficus Religiosa",
    "Common Name": "Peepal / Holy Fig Tree",
    "Kannnada Name": "(ಅರಳಿಮರ) Aralimara",
    "Mahrashtra Name": "(अश्वत्थ) Ashwattha",
    "Tamil Nadu Name": "(அரசமரம்) Araca-maram",
    "CO2 Stock Per Tree (ton)": "1.784",
  },
  {
    "Family ": "Myrtaceae",
    "Scientific Name": "Syzygium Cumini",
    "Common Name": "Black Plum / Jamun",
    "Kannnada Name": "(ನೆರುಲ) Nerula",
    "Mahrashtra Name": "(जांबूळ) Jambool",
    "Tamil Nadu Name": " (நாவல்) Naval",
    "CO2 Stock Per Tree (ton)": "0.499",
  },
  {
    "Family ": "Sapotaceae",
    "Scientific Name": "Madhuca Longifolia",
    "Common Name": "Indian Butter Tree",
    "Kannnada Name": "(ಇಪ್ಪೆ) Ippe",
    "Mahrashtra Name": "Mahwa",
    "Tamil Nadu Name": "Iluppai (இலுப்பை)",
    "CO2 Stock Per Tree (ton)": "",
  },
  {
    "Family ": "Fabaceae",
    "Scientific Name": "Dalbergia Latifolia",
    "Common Name": "Black Rosewood",
    "Kannnada Name": "(ಇಬಡಿ) Ibadi",
    "Mahrashtra Name": "(काळारुख) Kalarukh",
    "Tamil Nadu Name": "(நூக்கம்) Nukkam",
    "CO2 Stock Per Tree (ton)": "",
  },
  {
    "Family ": "Anacardiaceae",
    "Scientific Name": "Mangifera Indica",
    "Common Name": "Mango",
    "Kannnada Name": "(ಮಾವು) Maavu",
    "Mahrashtra Name": "Amba (अंबा)",
    "Tamil Nadu Name": "(மா) Ma",
    "CO2 Stock Per Tree (ton)": "",
  },
  {
    "Family ": "Moraceae",
    "Scientific Name": "Artocarpus Heterophyllus",
    "Common Name": "Jackfruit",
    "Kannnada Name": "(ಹಲಸು) Halasu",
    "Mahrashtra Name": "(फणस) Phanas",
    "Tamil Nadu Name": "(பலா) Palaa",
    "CO2 Stock Per Tree (ton)": "",
  },
  {
    "Family ": "Fabaceae",
    "Scientific Name": "Peltophorum Pterocarpum",
    "Common Name": "Copperpod",
    "Kannnada Name": "Bettada Huli",
    "Mahrashtra Name": "(पीला गुलमोहर) Peela Gulmohar",
    "Tamil Nadu Name": "(பெருங்கொன்றை) Perung Kondrai",
    "CO2 Stock Per Tree (ton)": "2.323",
  },
  {
    "Family ": "Rutaceae",
    "Scientific Name": "Aegle Marmelos",
    "Common Name": "Bael",
    "Kannnada Name": "Bilvapatre",
    "Mahrashtra Name": "(बेल) Bel",
    "Tamil Nadu Name": "Vilvam",
    "CO2 Stock Per Tree (ton)": "",
  },
  {
    "Family ": "Fabaceae",
    "Scientific Name": "Pongamia Pinnata",
    "Common Name": "Indian Beech Tree",
    "Kannnada Name": "(ಹೊಂಗೆ ಮರ) Honge Mara",
    "Mahrashtra Name": "(करंज) Karanj",
    "Tamil Nadu Name": "(ஆசிருந்தம்) Aciruntam",
    "CO2 Stock Per Tree (ton)": "",
  },
  {
    "Family ": "Caesalpiniaceae",
    "Scientific Name": "Tamarindus Indica",
    "Common Name": "Tamarind",
    "Kannnada Name": "(ಹುಣಿಸೆ) Hunise",
    "Mahrashtra Name": "Chinch",
    "Tamil Nadu Name": "Puli (புளி)",
    "CO2 Stock Per Tree (ton)": "1.857",
  },
  {
    "Family ": "Pinaceae",
    "Scientific Name": "Cedrus Deodara",
    "Common Name": "Himalayan Cedar",
    "Kannnada Name": "(ದೇವದಾರು) Devadaru",
    "Mahrashtra Name": "(देवदार) Devdar",
    "Tamil Nadu Name": "Devadaram",
    "CO2 Stock Per Tree (ton)": "",
  },
  {
    "Family ": "Combretaceae",
    "Scientific Name": "Terminalia Anogeissiana",
    "Common Name": "Axle Wood Tree",
    "Kannnada Name": "(ಬೆಜ್ಜಲು) Bejjalu",
    "Mahrashtra Name": "Dhaora",
    "Tamil Nadu Name": "Nakam",
    "CO2 Stock Per Tree (ton)": "",
  },
  {
    "Family ": "Dipterocarpaceae",
    "Scientific Name": "Shorea Robusta",
    "Common Name": "Sal",
    "Kannnada Name": "(ಬಿಳಿಬೋವು) Bilibovu",
    "Mahrashtra Name": "Guggilu",
    "Tamil Nadu Name": "Venkungiliyam",
    "CO2 Stock Per Tree (ton)": "",
  },
  {
    "Family ": "Combretaceae",
    "Scientific Name": "Terminalia Elliptica",
    "Common Name": "Indian Laurel",
    "Kannnada Name": "(ಬನಪು) Banapu",
    "Mahrashtra Name": "(ऐन) Ain",
    "Tamil Nadu Name": "(அருச்சுனம்) Aruccunam",
    "CO2 Stock Per Tree (ton)": "",
  },
  {
    "Family ": "Fabaceae",
    "Scientific Name": "Acacia Auriculiformis",
    "Common Name": "Earleaf Acacia / Golden Shower",
    "Kannnada Name": "Auri",
    "Mahrashtra Name": "(अकाशिया) Akashia",
    "Tamil Nadu Name": "Karuvel",
    "CO2 Stock Per Tree (ton)": "0.51",
  },
  {
    "Family ": "Combretaceae",
    "Scientific Name": "Terminalia Catappa",
    "Common Name": "Indian Almond",
    "Kannnada Name": "(ಕಾಡುಬಾದಾಮಿ) Kaadubaadaami",
    "Mahrashtra Name": "(जंगली बादाम) Jangli badam",
    "Tamil Nadu Name": "Nattuvadumai",
    "CO2 Stock Per Tree (ton)": "1.09",
  },
  {
    "Family ": "Moraceae",
    "Scientific Name": "Ficus Racemosa",
    "Common Name": "Cluster Fig",
    "Kannnada Name": "(ಅತ್ತಿ) Atti",
    "Mahrashtra Name": "Umber",
    "Tamil Nadu Name": "(அத்தி) Atti",
    "CO2 Stock Per Tree (ton)": "",
  },
  {
    "Family ": "Meliaceae",
    "Scientific Name": "Swietenia Mahagoni",
    "Common Name": "West Indian Mahogany",
    "Kannnada Name": "Mahogany",
    "Mahrashtra Name": "",
    "Tamil Nadu Name": "Magahani",
    "CO2 Stock Per Tree (ton)": "",
  },
  {
    "Family ": "Fabaceae",
    "Scientific Name": "Parkia Biglandulosa",
    "Common Name": "African Locust Ttree",
    "Kannnada Name": "(ಶಿವಲಿಂಗದ ಮರ) Shivalingada mara",
    "Mahrashtra Name": "(चेन्डुफूल) Chendu Phul ",
    "Tamil Nadu Name": "",
    "CO2 Stock Per Tree (ton)": "",
  },
  {
    "Family ": "Caesalpiniaceae",
    "Scientific Name": "Senna Siamea",
    "Common Name": "Siamese Senna",
    "Kannnada Name": "Sima Tangedu",
    "Mahrashtra Name": "Kassod",
    "Tamil Nadu Name": "Chelumalarkkonrai",
    "CO2 Stock Per Tree (ton)": "",
  },
  {
    "Family ": "Fabaceae",
    "Scientific Name": "Vachellia Nilotica",
    "Common Name": "Babul Tree",
    "Kannnada Name": "Kari Jjaali",
    "Mahrashtra Name": "Babool",
    "Tamil Nadu Name": "Karu Vela",
    "CO2 Stock Per Tree (ton)": "",
  },
  {
    "Family ": "Fabaceae",
    "Scientific Name": "Samanea Saman",
    "Common Name": "Rain Tree",
    "Kannnada Name": "(ಮಳೆಮರ) Malemara",
    "Mahrashtra Name": "(गुलाबी शिरीष) Gulabi Siris",
    "Tamil Nadu Name": "Thoongumoonji Maram",
    "CO2 Stock Per Tree (ton)": "",
  },
  {
    "Family ": "Poaceae",
    "Scientific Name": "Bambusa Vulgaris",
    "Common Name": "Bamboo",
    "Kannnada Name": "(ಬಿದಿರು) Bidiru",
    "Mahrashtra Name": "(कळक) Kalaka",
    "Tamil Nadu Name": "(மூங்கில்) Moongil",
    "CO2 Stock Per Tree (ton)": "",
  },
  {
    "Family ": "Apocynaceae",
    "Scientific Name": "Alstonia Scholaris",
    "Common Name": "Devil Tree",
    "Kannnada Name": "Doddapala",
    "Mahrashtra Name": "(सप्तपर्ण) Saptaparna",
    "Tamil Nadu Name": "(ஏழிலை) Paalai",
    "CO2 Stock Per Tree (ton)": "",
  },
  {
    "Family ": "Fabaceae",
    "Scientific Name": "Saraca Asoca",
    "Common Name": "Ashoka tree",
    "Kannnada Name": "Achenge",
    "Mahrashtra Name": "Jasundi",
    "Tamil Nadu Name": "(அசோகம்) Asogam",
    "CO2 Stock Per Tree (ton)": "",
  },
  {
    "Family ": "Combretaceae",
    "Scientific Name": "Terminalia Arjuna",
    "Common Name": "Arjun Tree",
    "Kannnada Name": "Aatumaruthu",
    "Mahrashtra Name": "(अर्जुन) Arjun",
    "Tamil Nadu Name": "(மருது) Marutu",
    "CO2 Stock Per Tree (ton)": "",
  },
  {
    "Family ": "Bignoniaceae",
    "Scientific Name": "Millingtonia Hortensis",
    "Common Name": "Tree Jasmine",
    "Kannnada Name": "(ಬಿರಟೆಮರ) Birate Mara",
    "Mahrashtra Name": "(कावल निम्ब) Kaval Nimb",
    "Tamil Nadu Name": "(கட் மல்லீ) Kat-malli",
    "CO2 Stock Per Tree (ton)": "",
  },
  {
    "Family ": "Bignoniaceae",
    "Scientific Name": "Kigelia Africana",
    "Common Name": "Sausage Tree",
    "Kannnada Name": "(ಆನೆತೊರಡುಕಾಯಿ) Aanethoradu Kaayi",
    "Mahrashtra Name": "(झाड़ फ़ानूस) Jhar Fanoos",
    "Tamil Nadu Name": "",
    "CO2 Stock Per Tree (ton)": "",
  },
];

const { width, height } = Dimensions.get('window');

const DetectedTagScreen = () => {
  const [selectedSpecies, setSelectedSpecies] = useState("Select Species");
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState(TreeSpecies);
  const searchRef = useRef();
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');

  const onSearch = (txt) => {
    const tempData = txt
      ? TreeSpecies.filter((item) =>
          item["Scientific Name"].toLowerCase().includes(txt.toLowerCase()) ||
          item["Common Name"].toLowerCase().includes(txt.toLowerCase())
        )
      : TreeSpecies;
    setData(tempData);
  };

  const handleClearSelection = () => {
    setSelectedSpecies("Select Species"); 
    setIsClicked(false); 
    setData(TreeSpecies); 
    if (searchRef.current) {
      searchRef.current.clear();
    }
  };

  const discardData = () => {
    setSelectedSpecies("Select Species");
    setLatitude('');
    setLongitude('');
    setHeight('');
    setWidth('');
  };

  const saveData = () => {
    console.log({
      SelectedSpecies: selectedSpecies,
      Latitude: latitude,
      Longitude: longitude,
      Height: height,
      Width: width,
    });
    discardData();
    // Alert with options to continue or stop
    Alert.alert(
      "Save Successful",
      "Your data has been saved successfully.",
      [
        { text: "Continue", onPress: () => navigation.navigate('LocationInputScreen') },
        { text: "Stop", onPress: () => navigation.navigate('Menu'), style: "cancel" },
      ],
      { cancelable: false }
    );
  };

  const navigation = useNavigation();


  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLatitude(`${location.coords.latitude}° ${location.coords.latitude >= 0 ? 'N' : 'S'}`);
    setLongitude(`${location.coords.longitude}° ${location.coords.longitude >= 0 ? 'E' : 'W'}`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <SafeAreaView style={tw`flex-1 justify-center items-center bg-gray-50`}>
      <View style={tw`w-full px-4`}>
        <View style={tw`w-full items-center`}>
          <TouchableOpacity
            style={tw`bg-[#14594a] py-4 w-11/12 rounded-lg mb-4`}
            onPress={() => setIsClicked(true)}
          >
            <Text style={tw`text-2xl font-semibold text-center text-white`}>
              {selectedSpecies}
            </Text>
          </TouchableOpacity>

          <View style={tw`w-11/12`}>
            <TextInput
              value={latitude}
              onChangeText={setLatitude}
              placeholder="Latitude"
              keyboardType="numeric"
              style={tw`text-xl p-3 items-center border border-gray-300 rounded-lg mb-4`}
              placeholderTextColor="#9CA3AF"
            />
            <TextInput
              value={longitude}
              onChangeText={setLongitude}
              placeholder="Longitude"
              keyboardType="numeric"
              style={tw`text-xl p-3 border border-gray-300 rounded-lg`}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <TouchableOpacity
            style={tw`bg-blue-500 mt-4 py-4 w-11/12 rounded-lg mb-4`}
            onPress={getLocation}
          >
            <Text style={tw`text-xl font-semibold text-center text-white`}>
              Capture Location
            </Text>
          </TouchableOpacity>
        <View style={tw`w-11/12 mb-4`}>
        <TextInput
          value={height}
          onChangeText={setHeight}
          placeholder="Height"
          keyboardType="numeric"
          style={tw`text-xl p-3 border border-gray-300 rounded-lg mb-4`}
          placeholderTextColor="#9CA3AF"
          />
        <TextInput
          value={width}
          onChangeText={setWidth}
          placeholder="Width"
          keyboardType="numeric"
          style={tw`text-xl p-3 border border-gray-300 rounded-lg`}
          placeholderTextColor="#9CA3AF"
          />
      </View>
        <View style={tw`flex-row justify-between w-11/12 mt-4`}>
        <TouchableOpacity onPress={discardData} style={tw`bg-red-500 py-3 flex-1 mr-2 rounded-lg`}>
          <Text style={tw`text-xl font-semibold text-center text-white`}>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveData} style={tw`bg-green-500 py-3 flex-1 ml-2 rounded-lg`}>
          <Text style={tw`text-xl font-semibold text-center text-white`}>Save</Text>
        </TouchableOpacity>
      </View>
       </View>




        <Modal
          animationType="slide"
          transparent={true}
          visible={isClicked}
          onRequestClose={() => setIsClicked(!isClicked)}
        >
          <View style={tw`flex-1 justify-center items-center px-4 pt-12 pb-20`}>
            <View style={tw`bg-white rounded-lg w-11/12 max-h-full p-4 shadow-lg shadow-gray-400`}>
              <TextInput
                ref={searchRef}
                style={tw`text-lg py-3 px-3 border border-gray-300 rounded-lg`}
                placeholder="Search by name"
                placeholderTextColor="#9CA3AF"
                onChangeText={(txt) => onSearch(txt)}
              />
              <FlatList
                data={data}
                keyExtractor={(item) => item["Scientific Name"]}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={tw`py-3 border-b border-gray-200`}
                    onPress={() => {
                      setSelectedSpecies(item["Scientific Name"]);
                      setIsClicked(false);
                      if (searchRef.current) {
                        searchRef.current.clear();
                      }
                    }}
                  >
                    <Text style={tw`text-lg font-medium text-gray-900`}>{item["Scientific Name"]}</Text>
                    <Text style={tw`text-lg text-gray-600`}>{item["Common Name"]}</Text>
                  </TouchableOpacity>
                )}
              />
              <View style={tw`flex-row justify-evenly mt-4`}>
                <TouchableOpacity
                  style={tw`bg-red-500 flex-1 py-3 mx-1 rounded-lg`}
                  onPress={handleClearSelection}
                >
                  <Text style={tw`text-lg font-semibold text-center text-white`}>Clear Selection</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`bg-gray-400 mx-1 flex-1 py-3 rounded-lg`}
                  onPress={() => setIsClicked(false)}
                >
                  <Text style={tw`text-lg font-semibold text-center text-white`}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default DetectedTagScreen;
