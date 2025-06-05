// File: ./Screens/CoFounders.tsx

import { db } from '@/app/backend/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { collection, getDocs } from 'firebase/firestore';
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

type CoFoundersScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CoFounders'>;
interface Founder {
  id:string;
  displayName:string;
  title: string;
  age:string;
  location: string;
   description:string;
   lastSeen:string;
}

const CoFounders: React.FC = () => {
  const navigation = useNavigation<CoFoundersScreenNavigationProp>();

  // Sample data for co-founders
  const [coFoundersData, setCoFoundersData] = React.useState<Founder[]>([]);
const [favoriteStates, setFavoriteStates] = React.useState<boolean[]>([]);

React.useEffect(() => {
  const fetchCoFounders = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'cofounder'));
      const cofoundersList: any[] = [];
      snapshot.forEach((doc) => cofoundersList.push(doc.data()));

      setCoFoundersData(cofoundersList);
      setFavoriteStates(new Array(cofoundersList.length).fill(false));
    } catch (error) {
      console.error('Error fetching cofounders:', error);
    }
  };

  fetchCoFounders();
}, []);

  const toggleFavorite = (index: number) => {
    setFavoriteStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  // Toggle side menu presence when hamburger is pressed
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);
  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section (like HomeScreen.tsx) */}
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
        <Text style={styles.navTitle}>CO-FOUNDERS</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={35} color="#f5d17f" />
        </TouchableOpacity>
      </View>

      {/* Main Content: Two Co-Founder Boxes */}
      <ScrollView contentContainerStyle={styles.content}>
        {coFoundersData.map((person, index) => (
          <View key={index} style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.profileLeft}>
                <Image
                  style={styles.profileImage}
                  source={require('../../../assets/images/mentor1.jpg')}
                />
                <Text style={styles.profileName}>{person.displayName}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleFavorite(index)} style={styles.starButton}>
                <Ionicons name="star" size={24} color={favoriteStates[index] ? '#f5d17f' : 'white'} />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileDetail}>
              {person.location} | Age: {person.age} | Last Seen: {person.lastSeen}
            </Text>
            <Text style={styles.profileTitle}>{person.title}</Text>
            <Text style={styles.profileDescription}>{person.description}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Footer / Bottom Navigation (like HomeScreen.tsx) */}
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

export default CoFounders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Header styles matching HomeScreen.tsx
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
  // Navigation bar (like HomeScreen.tsx)
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
  // Profile card styles for co-founder boxes
  profileCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  starButton: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  profileDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  profileTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileDescription: {
    fontSize: 14,
    color: '#333',
  },
  // Footer styles matching HomeScreen.tsx
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