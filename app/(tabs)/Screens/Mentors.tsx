import { db } from '@/app/backend/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getAuth } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  setDoc
} from 'firebase/firestore';
import * as React from 'react';
import {
  Image,
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../index';

interface Mentor {
  id: string;
  displayName: string;
  expertise: string;
  location: string;
  imageUrl?: string;
  linkedIn?: string;
  twitter?: string;
  email?: string;
}

type MentorsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Mentors'>;

const Mentors: React.FC = () => {
  const navigation = useNavigation<MentorsScreenNavigationProp>();
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);
  const [mentors, setMentors] = React.useState<Mentor[]>([]);
  const [selectedMentor, setSelectedMentor] = React.useState<Mentor | null>(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);

  React.useEffect(() => {
    const fetchMentors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'mentor'));
        const data: Mentor[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Mentor[];
        setMentors(data);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      }
    };

    fetchMentors();
  }, []);

  const handleConnect = async (mentor: Mentor) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        console.error('No user is logged in');
        return;
      }
      const userId = user.uid;
      await setDoc(
        doc(db, 'users', userId, 'connections', mentor.id),
        {
          name: mentor.displayName,
          expertise: mentor.expertise,
          location: mentor.location,
          imageUrl: mentor.imageUrl || null,
          connectedAt: new Date().toISOString(),
        }
      );
      console.log(`Connected to mentor: ${mentor.displayName}`);
    } catch (error) {
      console.error('Error connecting to mentor:', error);
    }
  };

  const openMessageModal = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setIsModalVisible(true);
  };

  const closeMessageModal = () => {
    setSelectedMentor(null);
    setIsModalVisible(false);
  };

  const openLink = (url?: string) => {
    if (url) {
      Linking.openURL(url).catch((err) =>
        console.error('Failed to open URL:', err)
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
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

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>MENTORS</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={35} color="#f5d17f" />
        </TouchableOpacity>
      </View>

      {/* Mentor List */}
      <ScrollView contentContainerStyle={styles.content}>
        {mentors.map((mentor) => (
          <View key={mentor.id} style={styles.mentorBox}>
            <Image
              style={styles.mentorImage}
              source={
                mentor.imageUrl
                  ? { uri: mentor.imageUrl }
                  : require('../../../assets/images/user.jpg')
              }
            />
            <Text style={styles.mentorName}>{mentor.displayName}</Text>
            <Text style={styles.mentorInfo}>{mentor.expertise}</Text>
            <Text style={styles.mentorInfo}>Location: {mentor.location}</Text>
            <View style={styles.mentorButtonContainer}>
              <TouchableOpacity
                style={styles.mentorButton}
                onPress={() => handleConnect(mentor)}
              >
                <Text style={styles.mentorButtonText}>Connect</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mentorButton}
                onPress={() => openMessageModal(mentor)}
              >
                <Text style={styles.mentorButtonText}>Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal */}
      {selectedMentor && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeMessageModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Connect with {selectedMentor.displayName}</Text>

              {selectedMentor.email && (
                <Text style={styles.modalText}>📧 {selectedMentor.email}</Text>
              )}
              {selectedMentor.linkedIn && (
                <Text
                  style={[styles.modalText, { color: 'blue' }]}
                  onPress={() => openLink(selectedMentor.linkedIn)}
                >
                  🔗 LinkedIn Profile
                </Text>
              )}
              {selectedMentor.twitter && (
                <Text
                  style={[styles.modalText, { color: 'blue' }]}
                  onPress={() => openLink(selectedMentor.twitter)}
                >
                  🐦 Twitter Profile
                </Text>
              )}

              <TouchableOpacity style={styles.closeButton} onPress={closeMessageModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Bottom Navigation */}
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

export default Mentors;


// --- Styles remain unchanged (you already had them) ---
const styles = StyleSheet.create({
  // ... your existing styles
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#C0C0C0', padding: 20 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  logo: { width: 50, height: 50, borderRadius: 25 },
  searchInput: { flex: 1, marginLeft: 10, height: 40, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 10 },
  bottomRow: { flexDirection: 'row', alignItems: 'center' },
  welcomeText: { fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  userImage: { width: 50, height: 50, borderRadius: 25 },
  navBar: { backgroundColor: '#fff', padding: 10, marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#eee' },
  navTitle: { fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase' },
  content: { flexGrow: 1, padding: 10 },
  mentorBox: { backgroundColor: '#f5f5f5', padding: 15, borderRadius: 10, marginBottom: 15, alignItems: 'center' },
  mentorImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  mentorName: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  mentorInfo: { fontSize: 16, color: '#555', marginBottom: 5, textAlign: 'center' },
  mentorButtonContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 10 },
  mentorButton: { backgroundColor: '#0000CD', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  mentorButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  bottomNavigation: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#C0C0C0', paddingVertical: 15, borderTopWidth: 1, borderColor: '#ddd' },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, marginTop: 4 },
  sideMenu: { position: 'absolute', top: 5, right: 0, width: 150, height: '100%', backgroundColor: '#fff', borderLeftWidth: 1, borderColor: '#ccc', paddingTop: 50, paddingHorizontal: 10, zIndex: 100, shadowColor: '#C0C0C0', shadowOpacity: 1, shadowOffset: { width: 0, height: 0 }, shadowRadius: 4, elevation: 5 },
  sideMenuText: { fontSize: 18, fontWeight: 'bold' },
  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContent: {
  width: '80%',
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 20,
  alignItems: 'center',
},
modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
},
modalText: {
  fontSize: 16,
  marginBottom: 10,
  textAlign: 'center',
},
closeButton: {
  marginTop: 15,
  backgroundColor: '#0000CD',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8,
},
closeButtonText: {
  color: 'white',
  fontWeight: 'bold',
},

});
