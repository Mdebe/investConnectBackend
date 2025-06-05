// File: ./Screens/Selling.tsx

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

type SellingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Selling'>;

const Selling: React.FC = () => {
  const navigation = useNavigation<SellingScreenNavigationProp>();
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);

  const toggleMenu = () => setIsMenuVisible((prev) => !prev);

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
        <Text style={styles.navTitle}>SELLING</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={35} color="#f5d17f" />
        </TouchableOpacity>
      </View>

      {/* Main Content: Two Boxes */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Box 1 */}
        <View style={styles.box}>
          <Image
            style={styles.boxImage}
            source={require('../../../assets/images/selling1.jpg')}
          />
          <Text style={styles.boxText}>
            Explore our latest products and exclusive deals available now!
          </Text>
          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreButtonText}>View More</Text>
          </TouchableOpacity>
        </View>

        {/* Box 2 */}
        <View style={styles.box}>
          <Image
            style={styles.boxImage}
            source={require('../../../assets/images/selling2.jpg')}
          />
          <Text style={styles.boxText}>
            Discover premium offers and limited edition marketplace specials curated just for you.
          </Text>
          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreButtonText}>View More</Text>
          </TouchableOpacity>
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

export default Selling;

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
  // Navigation Bar styles (with Hamburger Icon)
  navBar: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',      // Now including row alignment
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
  box: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  boxImage: {
    width: '90%',       // Reduced width to make the image smaller
    height: 100,        // Smaller height for the image
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  boxText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  viewMoreButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  viewMoreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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