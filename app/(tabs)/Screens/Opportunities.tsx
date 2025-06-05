// File: ./Screens/Opportunities.tsx

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

type OpportunitiesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Opportunities'>;

interface Opportunity {
  title: string;
  image: any;
}

const opportunities: Opportunity[] = [
  { title: 'Tech Innovations', image: require('../../../assets/images/opportunity1.jpg') },
  { title: 'Green Energy', image: require('../../../assets/images/opportunity2.jpg') },
  { title: 'Health & Wellness', image: require('../../../assets/images/opportunity3.jpg') },
  { title: 'Real Estate', image: require('../../../assets/images/opportunity4.jpg') },
  { title: 'Educational Apps', image: require('../../../assets/images/opportunity5.jpg') },
  { title: 'E-commerce', image: require('../../../assets/images/opportunity6.jpg') },
  { title: 'Fintech Startups', image: require('../../../assets/images/opportunity7.jpg') },
  { title: 'Travel & Tourism', image: require('../../../assets/images/opportunity8.jpg') },
];

const Opportunities: React.FC = () => {
  const navigation = useNavigation<OpportunitiesScreenNavigationProp>();
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
        <Text style={styles.navTitle}>OPPORTUNITIES</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={35} color="#f5d17f" />
        </TouchableOpacity>
      </View>

      {/* MAIN CONTENT: Grid of Opportunity Boxes */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.opportunitiesContainer}>
          {opportunities.map((opp, i) => (
            <TouchableOpacity key={i} style={styles.opportunityBox} onPress={() => { /* Navigate to details if needed */ }}>
              <Image source={opp.image} style={styles.opportunityImage} />
              <Text style={styles.opportunityTitle}>{opp.title}</Text>
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

      {/* SIDE MENU OVERLAY (Optional) */}
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

export default Opportunities;

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
  opportunitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  opportunityBox: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  opportunityImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  opportunityTitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  // FOOTER
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
  // SIDE MENU (optional)
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