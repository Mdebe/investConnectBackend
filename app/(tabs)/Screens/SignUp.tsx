import { auth, db } from "@/app/backend/firebaseConfig";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../index';

const roles = ['startup', 'cofounder', 'mentor', 'investor'];

const SignupScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SignUp'>>();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [expertise, setExpertise] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [age, setAge] = useState('');

  const handleSignUp = async () => {
    if (!email || !password || !displayName || !role || !location || !description || !age) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName });

      const userData = {
        uid: user.uid,
        displayName,
        email,
        role,
        avatarUrl: '',
        createdAt: new Date(),
        expertise,
        location,
        description,
        age: parseInt(age),
      };

      await setDoc(doc(db, 'users', user.uid), userData);
      await setDoc(doc(db, role, user.uid), userData); // Role-specific collection

      Alert.alert('Success', 'Account created!');
      navigation.navigate('Home');
    } catch (error: any) {
      console.error('Signup error:', error);
      Alert.alert('Signup Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Account</Text>

      <TextInput style={styles.input} placeholder="Display Name" value={displayName} onChangeText={setDisplayName} />
      <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      <Text style={styles.label}>Register as:</Text>
      <View style={styles.roleButtons}>
        {roles.map((r) => (
          <TouchableOpacity
            key={r}
            style={[styles.roleButton, role === r && styles.roleButtonSelected]}
            onPress={() => setRole(r)}
          >
            <Text style={[styles.roleButtonText, role === r && styles.roleButtonTextSelected]}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Additional Fields */}
      <TextInput style={styles.input} placeholder="Expertise (optional)" value={expertise} onChangeText={setExpertise} />
      <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Age" keyboardType="numeric" value={age} onChangeText={setAge} />

      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  roleButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 10,
  },
  roleButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  roleButtonSelected: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
  roleButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  roleButtonTextSelected: {
    color: '#fff',
  },
});
