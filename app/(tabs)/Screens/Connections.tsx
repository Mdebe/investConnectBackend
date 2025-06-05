// File: ./app/(tabs)/Screens/Connections.tsx

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

type ConnectionsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Connections'>;

const Connections: React.FC = () => {
  const navigation = useNavigation<ConnectionsScreenNavigationProp>();
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);

  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section (matching HomeScreen) */}
      <View style={styles.header}>
        <View style={styles.topRow}>
          {/* Logo from local storage */}
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
          {/* User profile image on the left and welcome text to its right */}
          <Image 
            style={styles.userImage} 
            source={require('../../../assets/images/user.jpg')} 
          />
          <Text style={styles.welcomeText}>Welcome, Zama Langfled</Text>
        </View>
      </View>

      {/* Navigation Bar (below header) */}
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>CONNECTIONS</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={35} color="#f5d17f" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* First big box with static text */}
        <View style={styles.firstBox}>
          <Text style={styles.firstBoxText}>
            Welcome to your connections dashboard. Here you can manage your professional network,
            view new opportunities, and discover insights tailored for you.
          </Text>
        </View>

        {/* Second big box with input fields */}
        <View style={styles.secondBox}>
          <TextInput
            style={styles.inputField}
            placeholder="First Name"
            placeholderTextColor="#555"
          />
          <TextInput
            style={styles.inputField}
            placeholder="Last Name"
            placeholderTextColor="#555"
          />
          <TextInput
            style={styles.inputField}
            placeholder="Email"
            placeholderTextColor="#555"
          />
          <TextInput
            style={styles.inputField}
            placeholder="Location"
            placeholderTextColor="#555"
          />
          <TextInput
            style={[styles.inputField, styles.multiLineInput]}
            placeholder="Introduce Yourself"
            placeholderTextColor="#555"
            multiline={true}
          />
          <TextInput
            style={[styles.inputField, styles.multiLineInput]}
            placeholder="Accomplishments"
            placeholderTextColor="#555"
            multiline={true}
          />
          <TextInput
            style={[styles.inputField, styles.multiLineInput]}
            placeholder="Highest Qualification"
            placeholderTextColor="#555"
            multiline={true}
          />
          <TextInput
            style={[styles.inputField, styles.multiLineInput]}
            placeholder="Employment"
            placeholderTextColor="#555"
            multiline={true}
          />
          <TextInput
            style={[styles.inputField, styles.multiLineInput]}
            placeholder="Skills"
            placeholderTextColor="#555"
            multiline={true}
          />
        </View>

        {/* Buttons at the bottom */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Match Me</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>See My Connects</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer / Bottom Navigation (matching HomeScreen) */}
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

      {/* Side Menu Overlay */}
      {isMenuVisible && (
        <View style={styles.sideMenu}>
          <TouchableOpacity onPress={() => setIsMenuVisible(false)}>
            <Text style={styles.sideMenuText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Connections;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Header styles (matching HomeScreen)
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
    borderRadius: 25, // Circular logo appearance.
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
  // Main Content styles
  content: {
    flexGrow: 1,
    padding: 10,
  },
  firstBox: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  firstBoxText: {
    fontSize: 16,
    color: '#333',
  },
  secondBox: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
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
  multiLineInput: {
    height: 100,           // Increased height for multiline fields.
    textAlignVertical: 'top', // Ensures text starts at the top inside the input.
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 15,
  },
  button: {
    backgroundColor: '#0000CD',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Footer styles (matching HomeScreen)
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
  // Side Menu Overlay
  sideMenu: {
    position: 'absolute',
    top: 5,
    right: 0,
    width: 150,
    height: '100%',
    backgroundColor: '#fff',
    borderLeftWidth: 1,
    borderColor: '#ccc',
    paddingTop: 50,
    paddingHorizontal: 10,
    zIndex: 100,
    shadowColor: '#C0C0C0',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    elevation: 5,
  },
  sideMenuText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});