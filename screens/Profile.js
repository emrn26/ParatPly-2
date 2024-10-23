import React from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Profile = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header med tilbage-knap */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" onPress={() => {}} />
        <Ionicons name="person-circle" size={32} color="black" />
      </View>

      {/* Brugernavn*/}
      <View style={styles.profileInfo}>
        <Text style={styles.username}>John Doe</Text>
      </View>

      {/* Abonnement sektion */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Abonnement</Text>
        <Text style={styles.rowText}>Standard abonnement</Text>
      </View>

      {/* Personlig information og sikkerhed */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.row}>
          <Ionicons name="person-outline" size={20} color="black" />
          <Text style={styles.rowText}>Personal info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Ionicons name="shield-outline" size={20} color="black" />
          <Text style={styles.rowText}>Login & security</Text>
        </TouchableOpacity>
      </View>

      {/* Gemte steder */}
      <Text style={styles.sectionTitle}>Saved places</Text>
      <View style={styles.section}>
        <TouchableOpacity style={styles.row}>
          <Ionicons name="home-outline" size={20} color="black" />
          <Text style={styles.rowText}>Add home address</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Ionicons name="briefcase-outline" size={20} color="black" />
          <Text style={styles.rowText}>Add work address</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Ionicons name="add-outline" size={20} color="black" />
          <Text style={styles.rowText}>Add a place</Text>
        </TouchableOpacity>
      </View>

      {/* Andre indstillinger */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Language</Text>
          <Text style={styles.subText}>English-GB</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Communication preferences</Text>
        </TouchableOpacity>
      </View>

      {/* Log ud og slet konto */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.row}>
          <Ionicons name="log-out-outline" size={20} color="black" />
          <Text style={styles.rowText}>Log out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Ionicons name="trash-outline" size={20} color="black" />
          <Text style={styles.rowText}>Delete account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 5,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rowText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 'auto',
  },
});

export default Profile;
