// File: ./Screens/Community.tsx

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../index';

type CommunityScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Community'>;

// Updated locations array with additional entries
const locationsData = [
  { id: '1', name: 'Durban' },
  { id: '2', name: 'Johannesburg' },
  { id: '3', name: 'Cape Town' },
  { id: '4', name: 'Port Elizabeth' },
  { id: '5', name: 'Pretoria' },
  { id: '6', name: 'Bloemfontein' },
  { id: '7', name: 'Kimberley' },
  { id: '8', name: 'Polokwane' },
  { id: '9', name: 'East London' },
  { id: '10', name: 'Nelspruit' },
];

const Community: React.FC = () => {
  const navigation = useNavigation<CommunityScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header (same as HomeScreen.tsx) */}
      <View style={styles.header}>
        <View style={styles.topRow}>
          <Image
            style={styles.logo}
            source={require('../../../assets/images/IC logo.png')}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.bottomRow}>
          <Image
            style={styles.userImage}
            source={require('../../../assets/images/user.jpg')}
          />
          <Text style={styles.welcomeText}>Welcome, Zama Langfled</Text>
        </View>
      </View>

      {/* Navigation Bar with Hamburger Icon */}
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>COMMUNITY</Text>
        <TouchableOpacity onPress={() => { /* Optionally toggle side menu */ }}>
          <Ionicons name="menu" size={35} color="#f5d17f" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Dark Box: Community Information */}
        <View style={styles.darkBox}>
          <Text style={styles.darkBoxTitle}>Join Our Community</Text>
          <Text style={styles.darkBoxText}>
            Become part of a growing network where you can share experiences, discover local
            events, and connect with like-minded people. Get exclusive access to content,
            discussions, and collaborative opportunities.
          </Text>
        </View>

        {/* Search Bar for Community */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.communitySearchInput}
            placeholder="Search Community..."
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Locations Section */}
        <View style={styles.locationsContainer}>
          <Text style={styles.locationsTitle}>Locations</Text>
          <View style={styles.locationsList}>
            {locationsData.map((loc) => (
              <View key={loc.id} style={styles.locationItem}>
                <Text style={styles.locationText}>{loc.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer (same as HomeScreen.tsx) */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="home-outline" size={28} color="blue" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search-outline" size={28} color="black" />
          <Text style={styles.navText}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="people-outline" size={28} color="black" />
          <Text style={styles.navText}>My Network</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={28} color="black" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Community;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Header styles (matching HomeScreen.tsx)
  header: {
    backgroundColor: '#C0C0C0',
    padding: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  // Navigation Bar styles
  navBar: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  navTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  // Main content styles
  content: {
    flexGrow: 1,
    padding: 10,
  },
  // Dark Box for Community Information
  darkBox: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  darkBoxTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  darkBoxText: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 22,
  },
  // Search Bar styling
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
  },
  communitySearchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  // Locations Section styling
  locationsContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
  },
  locationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  locationsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  locationItem: {
    backgroundColor: '#ddd',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#333',
  },
  // Footer styles (matching HomeScreen.tsx)
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#C0C0C0',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
});