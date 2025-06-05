import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../index'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "@/app/backend/firebaseConfig";

type SignInScreenProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

export default function SignIn() {
  const navigation = useNavigation<SignInScreenProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home');
    } catch (error: any) {
      Alert.alert('Sign in failed', error.message);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ marginBottom: 12 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 12 }}
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Don't have an account? Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
}
