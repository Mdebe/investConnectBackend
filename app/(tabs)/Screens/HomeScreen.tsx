// File: ./app/(tabs)/Screens/HomeScreen.tsx

import { auth, db } from '@/app/backend/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
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

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Category {
  title: string;
  image: any;
}

const categories: Category[] = [
  { title: 'Connections', image: require('../../../assets/images/Connections.png') },
  { title: 'Mentors', image: require('../../../assets/images/Mentors.png') },
  { title: 'CoFounders', image: require('../../../assets/images/CoFounders.png') },
  { title: 'Selling', image: require('../../../assets/images/Selling.png') },
  { title: 'Investments', image: require('../../../assets/images/Investments.png') },
  { title: 'Community', image: require('../../../assets/images/Community.png') },
  { title: 'Opportunities', image: require('../../../assets/images/Opportunities.png') },
  { title: 'Events', image: require('../../../assets/images/Events.png') },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');

  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);

  useEffect(() => {
    const fetchUserProfileAndUpdateLastSeen = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserName(userData.displayName || 'User');
            setUserPhoto(userData.avatarUrl || '');
          }

          await updateDoc(docRef, { lastSeen: serverTimestamp() });

        } catch (error) {
          console.error('Error fetching user profile or updating lastSeen:', error);
        }
      }
    };

    fetchUserProfileAndUpdateLastSeen();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.topRow}>
          <Image style={styles.logo} source={require('../../../assets/images/IC logo.png')} />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Search..." 
            placeholderTextColor="#888" 
          />
        </View>
        <View style={styles.bottomRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
  <Image
    style={styles.userImage}
    source={
      userPhoto
        ? { uri: userPhoto }
        : require('../../../assets/images/user.jpg')
    }
  />
</TouchableOpacity>

          <Text style={styles.welcomeText}>Welcome, {userName}</Text>
        </View>
      </View>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>InvestConnect Home</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={35} color="#f5d17f" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.categoriesContainer}>
          {categories.map((cat, index) => (
            <View key={index} style={styles.categoryItem}>
              <TouchableOpacity
                style={styles.categoryButton}
                onPress={() => navigation.navigate(cat.title.replace(/ /g, '') as any)}
              >
                <Image source={cat.image} style={styles.categoryImage} />
              </TouchableOpacity>
              <Text style={styles.categoryText}>{cat.title}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={28} color="blue" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search-outline" size={28} color="black" />
          <Text style={styles.navText}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('ConnectionsList')}
        >
          <Ionicons name="people-outline" size={28} color="black" />
          <Text style={styles.navText}>My Network</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('CoFounders')}
        >
          <Ionicons name="person-outline" size={28} color="black" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Side Menu */}
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

export default HomeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
    borderRadius: 25, // For a circular logo appearance—adjust as needed.
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
    // Adjusted so profile image and text are next to each other.
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10, // Adds a little spacing between the image and the text.
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
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
    textTransform: 'uppercase', // Makes the title display in all caps.
  },
  content: {
    flexGrow: 1,
    padding: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryButton: {
    width: '100%',
    height: 120,      // Explicit height for a rectangle shape.
    borderRadius: 100,  // Rounded edges.
    overflow: 'hidden', // Clips the image to the rounded edges.
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
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
    // Optional: Add a shadow if desired.
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