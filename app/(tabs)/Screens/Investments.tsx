// File: ./Screens/Investments.tsx

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

type InvestmentsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Investments'>;

const Investments: React.FC = () => {
  const navigation = useNavigation<InvestmentsScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section (exactly like HomeScreen.tsx) */}
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

      {/* Navigation Bar with Hamburger Icon (like HomeScreen.tsx) */}
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>INVESTMENTS</Text>
        <TouchableOpacity onPress={() => { /* Toggle side menu here if needed */ }}>
          <Ionicons name="menu" size={35} color="#f5d17f" />
        </TouchableOpacity>
      </View>

      {/* Main Content: Investment Form */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.formContainer}>
          {/* Field 1: Investment/Crowdfunding Form with Upload */}
          <View style={styles.uploadRow}>
            <TextInput
              style={[styles.inputField, styles.uploadInput]}
              placeholder="Investment/Crowdfunding Form"
              placeholderTextColor="#555"
            />
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
          </View>

          {/* Field 2: Pitch Deck Requirements with Upload */}
          <View style={styles.uploadRow}>
            <TextInput
              style={[styles.inputField, styles.uploadInput]}
              placeholder="Pitch Deck Requirements"
              placeholderTextColor="#555"
            />
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
          </View>

          {/* Field 3: Company Name */}
          <TextInput
            style={styles.inputField}
            placeholder="Company Name"
            placeholderTextColor="#555"
          />

          {/* Field 4: Location */}
          <TextInput
            style={styles.inputField}
            placeholder="Location"
            placeholderTextColor="#555"
          />

          {/* Field 5: Industry */}
          <TextInput
            style={styles.inputField}
            placeholder="Industry"
            placeholderTextColor="#555"
          />

          {/* Only "Submit" Button Remains */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer / Bottom Navigation (exactly like HomeScreen.tsx) */}
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

export default Investments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Header Styles (matching HomeScreen.tsx)
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
  // Navigation Bar Styles
  navBar: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10,
    flexDirection: 'row', // row alignment for nav title and icon
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
  // Main Content Styles
  content: {
    flexGrow: 1,
    padding: 10,
  },
  formContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  uploadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadInput: {
    flex: 1,
    marginRight: 10,
  },
  uploadButton: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Footer Styles (matching HomeScreen.tsx)
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