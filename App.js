import { StatusBar } from 'expo-status-bar';  // Importerer StatusBar-komponenten fra Expo for at styre statuslinjen på skærmen
import { StyleSheet, Text, View } from 'react-native';  // Importerer nødvendige komponenter fra React Native
import { createStackNavigator } from "@react-navigation/stack";  // Stack Navigator til at håndtere skærm-stakke
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";  // Bottom Tab Navigator til bundnavigationen

import { NavigationContainer } from '@react-navigation/native';  // Navigation Container til at styre navigationen i appen
import Ionicons from 'react-native-vector-icons/Ionicons';  // Importerer Ionicons ikonbibliotek til at vise ikoner i navigationsfaner

import UmbrellaList from './screens/UmbrellaList';  // Importerer UmbrellaList-skærmen
import UmbrellaDetails from './screens/UmbrellaDetails';  // Importerer UmbrellaDetails-skærmen
import Support from './screens/Support';  // Importerer Support-skærmen

import UmbrellaMap from './screens/UmbrellaMap';  // Importerer UmbrellaMap-skærmen
import Profile from './screens/Profile';  // Importerer Profile-skærmen
import Weather from './screens/Weather';  // Importerer Weather-skærmen

// Firebase konfiguration
import { initializeApp, getApps } from "firebase/app";  // Firebase initialisering og opsætning

const firebaseConfig = {
  apiKey: "API_KEY",  //Firebase API-nøgle
  authDomain: "paratply-9d36d.firebaseapp.com",  // Firebase Auth domæne
  databaseURL: "https://paratply-9d36d-default-rtdb.europe-west1.firebasedatabase.app",  // Firebase database URL
  projectId: "paratply-9d36d",  // Firebase projekt ID
  storageBucket: "paratply-9d36d.appspot.com",  // Firebase Storage Bucket
  messagingSenderId: "MESSAGING_SENDER_ID",  // Firebase Messaging ID
  appId: "APP_ID"  // Firebase App ID
};

export default function App() {
  // Initialiserer Firebase 
  if (getApps().length < 1) {
    initializeApp(firebaseConfig);  // Starter Firebase appen med konfigurationen
    console.log("Firebase On!");  // Logger at Firebase er startet
  }

  const Stack = createStackNavigator();  // Opretter en Stack Navigator til at håndtere stakke af skærme
  const Tab = createBottomTabNavigator();  // Opretter en Bottom Tab Navigator til bundnavigationen

  // Definerer StackNavigation-komponenten, som håndterer stack-navigation for bookingshistorikken
  const StackNavigation = () => {
    return (
      <Stack.Navigator>
        {/* Viser forskellige skærme i stacken */}
        <Stack.Screen name={'Umbrella List'} component={UmbrellaList} options={{headerShown: null}} />
        <Stack.Screen name={'Umbrella Details'} component={UmbrellaDetails} options={{headerShown: null}} />
        <Stack.Screen name={'Support'} component={Support} options={{headerShown: null}} />
      </Stack.Navigator>
    );
  }

  // Definerer BottomNavigation-komponenten, som håndterer navigationen i bunden af skærmen
  const BottomNavigation = () => {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          {/* For bookingshistorikken */}
          <Tab.Screen 
            name={'Booking history'} 
            component={StackNavigation}  // Bruger StackNavigation for bookingshistorik
            options={{ 
              tabBarIcon: () => (<Ionicons name="list" size={20} />)  // Viser listeikon i navigationsmenuen
            }} 
          />
          {/* For Support */}
          <Tab.Screen 
            name={'Support'} 
            component={Support}  // Viser Support-skærmen
            options={{ 
              tabBarIcon: () => (<Ionicons name="headset-outline" size={20} />)  // Viser headset-ikon i navigationsmenuen
            }} 
          />
          {/* For kortet */}
          <Tab.Screen 
            name={'Map'} 
            component={UmbrellaMap}  // Viser UmbrellaMap-skærmen
            options={{ 
              tabBarIcon: () => (<Ionicons name="map" size={20} />)  // Viser kort-ikon i navigationsmenuen
            }} 
          />
          {/* For vejrudsigten */}
          <Tab.Screen 
            name={'Weather'} 
            component={Weather}  // Viser Weather-skærmen
            options={{ 
              tabBarIcon: () => (<Ionicons name="cloudy" size={20} />)  // Viser sky-ikon i navigationsmenuen
            }} 
          />
          {/* For profil */}
          <Tab.Screen 
            name={'Profile'} 
            component={Profile}  // Viser Profile-skærmen
            options={{ 
              tabBarIcon: () => (<Ionicons name="person" size={20} />)  // Viser person-ikon i navigationsmenuen
            }} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  };

  return <BottomNavigation />;  // Returnerer BottomNavigation som den primære navigation for appen
}

// Stilarter til layout og visning
const styles = StyleSheet.create({
  container: {
    flex: 1,  // Gør containeren fleksibel, så den strækker sig over hele skærmen
    backgroundColor: '#fff',  // Hvid baggrundsfarve
    alignItems: 'center',  // Centrerer indholdet vandret
    justifyContent: 'center',  // Centrerer indholdet lodret
  },
});
