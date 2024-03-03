import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'; // Import sendEmailVerification
import { auth } from '../utils/firebaseConfig';
import CustomButton from '../components/CustomButton';
import profile from "../images/cab3.png";

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Registerpage = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const registerUser = async () => {
    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match.');
        return;
      }

      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user); // Call sendEmailVerification function

      // Additional database operations (e.g., saving user details)
      // ...

      console.log('User account created:', user);
      Alert.alert('Success', 'User account created successfully. Please check your email for verification.');
      
      // Navigate to login page after successful registration
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error creating user:', error);
      Alert.alert('Error', 'Failed to create user. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={profile} style={styles.image} />
        </View>
        <Text style={styles.login}>Register</Text>
        <View style={styles.inputContainer}>
        <Ionicons name="person" size={20} color="#464853" style={styles.icon}/>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full Name"
          autoCapitalize="words"
        />
        </View>
        <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={20} color="#464853" style={styles.icon}/>
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
        <Entypo name="lock" size={20} color="#464853" style={styles.icon}/> 
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        </View>
        <View style={styles.inputContainer}>
        <Entypo name="lock" size={20} color="#464853" style={styles.icon}/> 
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry
        />
        </View>
        <View style={styles.inputContainer}>
        <FontAwesome name="phone" size={20} color="#464853" style={styles.icon}/>
        <TextInput
          style={styles.input}
          value={mobileNumber}
          onChangeText={setMobileNumber}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
        />
        </View>
        <CustomButton label={"Register"} onPress={registerUser} />
        <View style={styles.loginContainer}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}> Login</Text>
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
    marginTop: 0,
  },
  image:{
    width: 370, 
    height: 350, 
    resizeMode: 'contain',
  },
  login: {
    fontFamily: 'arial',
    fontSize: 30,
    fontWeight: '800',
    color: '#181816',
    marginBottom: 20,
    // textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 20,
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  loginText: {
    color: '#AD40AF',
    fontWeight: '700',
    marginLeft: 5,
  },
});

export default Registerpage;
