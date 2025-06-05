import { auth, db } from '@/app/backend/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../index';

type NavigationProp = StackNavigationProp<RootStackParamList>;
const ProfileScreen: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Alert.alert('Signed Out');
      navigation.navigate('SignIn');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  if (!userData) {
    return (
      <View style={styles.center}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={
          userData.avatarUrl
            ? { uri: userData.avatarUrl }
            : require('../../../assets/images/user.jpg')
        }
        style={styles.avatar}
      />
      <Text style={styles.name}>{userData.displayName}</Text>
      <Text style={styles.role}>{userData.role}</Text>

      <View style={styles.infoSection}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userData.email}</Text>

        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{userData.age}</Text>

        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{userData.location}</Text>

        <Text style={styles.label}>Expertise:</Text>
        <Text style={styles.value}>{userData.expertise}</Text>

        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{userData.description}</Text>

        <Text style={styles.label}>Last Seen:</Text>
        <Text style={styles.value}>
          {userData.lastSeen?.toDate
            ? userData.lastSeen.toDate().toLocaleString()
            : 'Unknown'}
        </Text>
      </View>

      <View style={styles.signOutButton}>
        <Button title="Sign Out" onPress={handleSignOut} color="#f44336" />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
  },
  role: {
    fontSize: 16,
    color: '#777',
    marginBottom: 16,
  },
  infoSection: {
    alignSelf: 'stretch',
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  signOutButton: {
    marginTop: 30,
    width: '100%',
  },
});
