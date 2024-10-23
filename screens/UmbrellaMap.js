import React, { useEffect, useState } from 'react';  // Importerer React og hooks til state management og side-effekter
import { View, Text, Image, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';  // Importerer nødvendige komponenter fra React Native
import MapView, { Marker, Callout } from 'react-native-maps';  // Komponenter til kortvisning og markeringer
import { getDatabase, ref, onValue } from 'firebase/database';  // Firebase-funktioner til at hente data fra databasen
import { useNavigation } from '@react-navigation/native';  // Til navigation mellem skærme
import { BarCodeScanner } from 'expo-barcode-scanner';  // QR-kode scanningskomponent fra Expo. Denne er ikke supported længere, så der skal man nok bruge "camera" på længere sigt
import Ionicons from 'react-native-vector-icons/Ionicons';  // Ikonbibliotek til at vise ikoner

// Definerer UmbrellaMap-komponenten
const UmbrellaMap = () => {
  // State til at gemme paraplydata hentet fra Firebase
  const [umbrellas, setUmbrellas] = useState([]);
  // State til at tjekke om brugeren har givet kamera tilladelse
  const [hasPermission, setHasPermission] = useState(null);
  // State til at holde styr på om QR-koden er scannet
  const [scanned, setScanned] = useState(false);
  // State til at vise eller skjule QR-kodescanneren
  const [showScanner, setShowScanner] = useState(false);
  // Navigation hook til at navigere mellem skærme
  const navigation = useNavigation();

  // useEffect kører ved komponentens mount, og indhenter kamera tilladelse samt henter data fra Firebase
  useEffect(() => {
    // Asynkron funktion til at anmode om kamera tilladelse
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted'); // Opdaterer state afhængigt af om tilladelse blev givet
    })();
    
    // Firebase-database reference for at hente paraplydata
    const db = getDatabase();
    const umbrellaRef = ref(db, 'Umbrellas/');
    
    // Henter data fra Firebase og opdaterer paraplylisten
    onValue(umbrellaRef, (snapshot) => {
      let data = snapshot.val() ? snapshot.val() : {};
      let umbrellaList = Object.keys(data).map(key => ({
        id: key,  // Tildeler et unikt ID til hver paraply
        ...data[key]  // Kopierer paraplydata
      }));
      setUmbrellas(umbrellaList); //Opdaterer paraply state
    });
  }, []); // Tom array sikrer, at useEffect kun kører én gang ved mount

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setShowScanner(false);  // Skjul scanneren efter scanning
    Alert.alert(`QR Code scanned!`, `Data: ${data}`); // Viser en alert med data fra QR-koden
  };

  // Funktion til at navigere til brugerens nuværende position (logik tilføjes af dig)
  const handleMyLocation = () => {
    Alert.alert('Navigating to My Location'); // Viser en alert
  };

  const handleNearestStation = () => {
    Alert.alert('Navigating to Nearest Station');
  };

  // Hvis kamera-tilladelse stadig behandles
  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  // Hvis kamera-tilladelse ikke blev givet
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Knapperne vises kun, hvis scanneren IKKE er vist */}
      {!showScanner && (
        <View style={styles.topButtonContainer}>
          <TouchableOpacity style={styles.topButton} onPress={handleMyLocation}>
            <Text style={styles.topButtonText}>My Location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton} onPress={handleNearestStation}>
            <Text style={styles.topButtonText}>Nearest Station</Text>
          </TouchableOpacity>
        </View>
      )}

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 55.676098,
          longitude: 12.568337,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {umbrellas.map((umbrella) => (
          <Marker
            key={umbrella.id}
            coordinate={{
              latitude: umbrella.latitude,
              longitude: umbrella.longitude,
            }}
          >
            <Image
              source={require('../assets/umbrella-icon.png')}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
            <Callout>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle} numberOfLines={1}>{umbrella.type}</Text>
                <Text style={styles.calloutText}>Available umbrellas: {umbrella.availableUmbrellas}</Text>
                <Button
                  title="Book"
                  onPress={() => navigation.navigate('Book', {
                    latitude: umbrella.latitude,
                    longitude: umbrella.longitude,
                    type: umbrella.type,
                    area: umbrella.area
                  })}
                />
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Scan-knap */}
      <View style={styles.scanButtonContainer}>
        <View style={styles.scanButtonWrapper}>
          <Button
            title="Scan"
            onPress={() => setShowScanner(true)}  // Viser scanneren, når knappen trykkes
            color="#000"
          />
        </View>
      </View>

      {/* QR-kodescanner */}
      {showScanner && (
        <View style={StyleSheet.absoluteFillObject}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />

          {/* Luk-knap for QR-kodescanneren */}
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowScanner(false)}>
            <Ionicons name="close" size={32} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// Stilarter til komponenterne
const styles = StyleSheet.create({
  topButtonContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 10,
  },
  topButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  topButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  calloutContainer: {
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    width: 150,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  calloutText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
  scanButtonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  scanButtonWrapper: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 20,
  },
});

export default UmbrellaMap;
