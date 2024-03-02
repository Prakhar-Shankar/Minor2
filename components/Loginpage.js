import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';

import { Entypo, MaterialIcons } from '@expo/vector-icons';
import profile from "../images/profile.png";
import CustomButton from '../components/CustomButton';

const Loginpage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User account created & signed in:', user);
      // You can navigate to another screen here if needed
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={profile} height={300} width={300} />
        </View>
        <Text style={styles.login}>Login</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        <CustomButton label={"Login"} onPress={createUser} />
        <Text style={styles.orText}>Or, login with ...</Text>
        {/* Add login with social media buttons */}
        <View style={styles.registerContainer}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F0C935',
  },
  contentContainer: {
    paddingHorizontal: 25,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  login: {
    fontFamily: 'arial',
    fontSize: 30,
    fontWeight: '800',
    color: '#181816',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  orText: {
    textAlign: 'center',
    color: '#181816',
    marginBottom: 30,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  registerText: {
    color: '#AD40AF',
    fontWeight: '700',
  },
});

export default Loginpage;
