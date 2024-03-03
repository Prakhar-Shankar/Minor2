import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import CustomButton from '../components/CustomButton';
import profile from "../images/profile.png";

const Loginpage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    try {
      // Sign in user with email and password

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('User logged in:', user);

      // Navigate user to Landing page after successful login

      navigation.navigate('Landing');
    } catch (error) {
      console.error('Error logging in:', error);

      // Check if the error is due to user not found

      if (error.code === 'auth/user-not-found') {
        // Display a message prompting the user to register first

        Alert.alert('User Not Found', 'Please register first before logging in.');
      } else {
        // Display generic error message for other errors
        
        Alert.alert('User Not Found', 'Please register first before logging in.');
      }
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
        <CustomButton label={"Login"} onPress={loginUser} />
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
    backgroundColor: 'white',
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
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#AD40AF',
    fontWeight: '700',
    marginLeft: 5,
  },
});

export default Loginpage;
