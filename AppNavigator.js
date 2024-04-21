import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen  from './screens/HomeScreen';
import LocationInputScreen from './screens/LocationInputScreen';
import DataAnalysis from './screens/DataAnalysis';
import HeightScreen, { HeightScreenComponent } from './components/HeightScreen';
import WidthScreen from './components/WidthScreen';
import DiversityScreen from './components/DiversityScreen';
import DistributionScreen from './components/DistributionScreen';
import HeatMapScreen from './components/HeatMapScreen';
import SummaryScreen from './components/SummaryScreen';
import FinalReportScreen from './components/FinalReportScreen';
import DataCuration, { DataCurationScreen } from './screens/DataCuration';
import CameraComponent, { CameraScreen } from './components/CameraComponent';
import DetectedTagScreen from './screens/DetectedTagScreen';
import { StatusBar } from 'expo-status-bar';
import MenuScreen from './screens/MenuScreen';
import { LoginScreen } from './components/LoginScreen';
import { SignupScreen } from './components/SignupScreen';
import { ForgotPasswordScreen } from './components/ForgotPasswordScreen';
import { ResetPasswordScreen } from './components/ResetPasswordScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <>
    <StatusBar style="dark" />
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                presentation: "fullScreenModal",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Menu"
              component={MenuScreen}
              options={{
                presentation: "card",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="LocationInputScreen"
              component={LocationInputScreen}
              options={{
                presentation: "card",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Camera"
              component={CameraComponent}
              options={{
                presentation: "card",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="DetectedTagScreen"
              component={DetectedTagScreen}
              options={{
                presentation: "card",
                headerShown: false,
              }}
            /> 
             <Stack.Screen
              name="DataAnalysis"
              component={DataAnalysis}
              options={{
                presentation: "card",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Height"
              component={HeightScreen}
              options={{
                presentation: "modal",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Width"
              component={WidthScreen}
              options={{
                presentation: "modal",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Diversity"
              component={DiversityScreen}
              options={{
                presentation: "modal",
                headerShown: false,
              }}
            /> 
            <Stack.Screen
              name="Distribution"
              component={DistributionScreen}
              options={{
                presentation: "modal",
                headerShown: false,
              }}
            />
             <Stack.Screen
              name="HeatMap"
              component={HeatMapScreen}
              options={{
                presentation: "modal",
                headerShown: false,
              }}
            /> 
             <Stack.Screen
              name="Summary"
              component={SummaryScreen}
              options={{
                presentation: "modal",
                headerShown: false,
              }}
            />
             <Stack.Screen
              name="FinalReport"
              component={FinalReportScreen}
              options={{
                presentation: "modal",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="DataCuration"
              component={DataCuration}
              options={{
                presentation: "card",
                headerShown: false,
              }}
            />
             <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                presentation: "modal",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
              options={{
                presentation: "modal",
                headerShown: false,
              }}
            />
             <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
              options={{
                presentation: "modal",
                headerShown: false,
              }}
            />
             <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{
                presentation: "modal",
                headerShown: false,
              }}
            />                    
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

export default AppNavigator;
