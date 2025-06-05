// File: ./Screens/ConnectionsList.tsx

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '@/app/backend/firebaseConfig';
import { RootStackParamList } from '../index';

type ConnectionsListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ConnectionsList'>;

type Connection = {
  id: string;
  name: string;
  expertise: string;
  location: string;
  imageUrl?: string;
};

const ConnectionsList: React.FC = () => {
  const navigation = useNavigation<ConnectionsListScreenNavigationProp>();
  const [connections, setConnectionsList] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);

  useEffect(() => {
    fetchConnectionsList();
  }, []);

  const fetchConnectionsList = async () => {
    try {
      const user = getAuth().currentUser;
      if (!user) return;

      const snapshot = await getDocs(collection(db, 'users', user.uid, 'connections'));
      const data: Connection[] = snapshot.docs.map((doc) => {
  const docData = doc.data() as Omit<Connection, 'id'>;  
  return {
    id: doc.id,
    ...docData,
  };
});


      setConnectionsList(data);
    } catch (error) {
      console.error('Error fetching connections:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.topRow}>
          <Image
            style={styles.logo}
            source={require('../../../assets/images/IC logo.png')}
          />
        </View>
        <View style={styles.bottomRow}>
          <Image
            style={styles.userImage}
            source={require('../../../assets/images/user.jpg')}
          />
          <Text style={styles.welcomeText}>Your ConnectionsList</Text>
        </View>
      </View>

      {/* Nav Bar */}
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>ConnectionsList</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={35} color="#f5d17f" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000CD" />
        ) : connections.length === 0 ? (
          <Text style={styles.noData}>No connections yet.</Text>
        ) : (
          connections.map((mentor) => (
            <View style={styles.mentorBox} key={mentor.id}>
              <Image
                style={styles.mentorImage}
                source={
                  mentor.imageUrl
                    ? { uri: mentor.imageUrl }
                    : require('../../../assets/images/user.jpg')
                }
              />
              <Text style={styles.mentorName}>{mentor.name}</Text>
              <Text style={styles.mentorInfo}>{mentor.expertise}</Text>
              <Text style={styles.mentorInfo}>Location: {mentor.location}</Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* Footer */}
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

export default ConnectionsList;
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
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
    textTransform: 'uppercase',
  },
  content: {
    flexGrow: 1,
    padding: 10,
  },
  mentorBox: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  mentorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  mentorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  mentorInfo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
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
  noData: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
    color: '#888',
  },
});
