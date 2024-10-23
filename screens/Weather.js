import React from 'react';  // Importerer React til opbygning af komponenter
import { View, Text, StyleSheet, ScrollView } from 'react-native';  // Importerer nødvendige komponenter fra React Native
import Ionicons from 'react-native-vector-icons/Ionicons';  // Importerer ikonbiblioteket Ionicons til visning af vejrikoner

// Definerer Weather-komponenten
const Weather = () => {
  // Statiske vejrdata for en uge
  const weeklyWeather = [
    { day: 'Monday', icon: 'sunny-outline', temp: '18°C', description: 'Sunny' },
    { day: 'Tuesday', icon: 'rainy-outline', temp: '14°C', description: 'Rain' },
    { day: 'Wednsday', icon: 'cloudy-outline', temp: '16°C', description: 'Slightly cloudy' },
    { day: 'Thursday', icon: 'thunderstorm-outline', temp: '13°C', description: 'Thunderstorms' },
    { day: 'Friday', icon: 'sunny-outline', temp: '19°C', description: 'Sunny' },
    { day: 'Saturday', icon: 'rainy-outline', temp: '15°C', description: 'Slightly cloudy' },
    { day: 'Sunday', icon: 'snow-outline', temp: '2°C', description: 'Snow' }
  ];

  // Returnerer UI for vejrudsigten
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Weather forecast</Text>
      {weeklyWeather.map((weather, index) => (
        <View key={index} style={styles.weatherRow}>
          <Ionicons name={weather.icon} size={24} color="black" />
          <Text style={styles.day}>{weather.day}</Text>
          <Text style={styles.temp}>{weather.temp}</Text>
          <Text style={styles.description}>{weather.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

// Definerer stilarter til komponenterne
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  weatherRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  day: {
    fontSize: 18,
    flex: 2,
  },
  temp: {
    fontSize: 18,
    flex: 1,
    textAlign: 'right',
  },
  description: {
    fontSize: 14,
    flex: 2,
    textAlign: 'right',
  },
});

export default Weather;
