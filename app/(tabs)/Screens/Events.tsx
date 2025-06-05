// File: ./Screens/Events.tsx

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

type EventsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Events'>;

interface Event {
  title: string;
  date: string;
  location: string;
  image: any;
}

const eventsData: Event[] = [
  { title: 'Tech Conference 2025', date: 'May 10, 2025', location: 'Durban', image: require('../../../assets/images/event1.jpg') },
  { title: 'Startup Pitch Night', date: 'June 15, 2025', location: 'Johannesburg', image: require('../../../assets/images/event2.jpg') },
  { title: 'Innovation Summit', date: 'July 22, 2025', location: 'Cape Town', image: require('../../../assets/images/event3.jpg') },
  { title: 'Investor Meetup', date: 'August 8, 2025', location: 'Pretoria', image: require('../../../assets/images/event4.jpg') },
];

const Events: React.FC = () => {
  const navigation = useNavigation<EventsScreenNavigationProp>();
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);

  const toggleMenu = () => setIsMenuVisible((prev) => !prev);

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER: Same as HomeScreen.tsx */}
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

      {/* NAVIGATION BAR with Hamburger Icon */}
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>EVENTS</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={35} color="#f5d17f" />
        </TouchableOpacity>
      </View>

      {/* MAIN CONTENT: Events Grid */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.eventsContainer}>
          {eventsData.map((event, index) => (
            <TouchableOpacity key={index} style={styles.eventBox} onPress={() => { /* Navigate to event details if needed */ }}>
              <Image source={event.image} style={styles.eventImage} />
              <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDate}>{event.date}</Text>
                <Text style={styles.eventLocation}>{event.location}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* FOOTER: Same as HomeScreen.tsx */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
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

      {/* SIDE MENU OVERLAY (Fixed Missing Style Issue) */}
      {isMenuVisible && (
        <View style={styles.sideMenu}>
          <TouchableOpacity onPress={toggleMenu}>
            <Text style={styles.sideMenuText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Events;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // HEADER (same as HomeScreen.tsx)
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
  // NAVIGATION BAR
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
  // MAIN CONTENT
  content: {
    flexGrow: 1,
    padding: 10,
  },
  eventsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  eventBox: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  eventImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  eventDetails: {
    alignItems: 'center',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 14,
    color: '#555',
  },
  eventLocation: {
    fontSize: 14,
    color: '#888',
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
  // FIX: Added missing styles for Side Menu
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
  },
  sideMenuText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});