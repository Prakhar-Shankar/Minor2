import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import profile from "../images/cab.png";

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

      navigation.navigate('Find');
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
          <Image source={profile} /*height={30} width={30}*/ style={styles.image}/>
        </View>
        <Text style={styles.login}>Login</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="person" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        </View>
      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        </View>
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
  image:{
    width: 350, // Set the width to fit the space
    height: 320, // Set the height to fit the space
    resizeMode: 'contain',
  },
  login: {
    fontFamily: 'arial',
    fontSize: 30,
    fontWeight: '800',
    color: '#181816',
    marginBottom: 25,
    // textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
  },
  icon: {
    marginRight: 10,
    textAlign: 'center',
  },
  input: {
    flexDirection: 'row',
    borderBottomColor: '#181816',
    alignItems:'center',
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
