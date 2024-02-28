import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import profile from "../images/profile.png"
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';

const Registerpage = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
        <Image source={profile}
            height={300}
            width={300}
            style={{/*transform: [{rotate: '-5deg'}],*/marginTop:'8'}}
          />
        </View>

        <Text
          style={styles.login}>
          Register
        </Text>

        <InputField
          label={'Full Name'}
          icon={
            <Ionicons name="person" size={20} color="black" style={{marginRight: 8}}/>
          }
          inputType="text" 
        />

        <InputField
          label={'Email ID'}
          icon={
            <MaterialIcons name="email" size={20} color="black" style={{marginRight: 8}}/>
          }
          keyboardType="email-address"
        />

        <InputField 
          label={'Password'}
          icon={
            <Entypo name="lock" size={20} color="black" style={{marginRight: 8}}/> 
          }
          inputType="password" 
        />
        <InputField 
          label={'Confirm Password'}
          icon={
            <Entypo name="lock" size={20} color="black" style={{marginRight: 8}}/> 
          }
          inputType="password" 
        />
        <InputField 
          label={'Mobile Number'}
          icon={
            <FontAwesome name="phone" size={20} color="black" style={{marginRight: 8}}/>
          }
          inputType="number" 
        />
        
        <CustomButton label={"Register"} onPress={() => {}} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already have an account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Login</Text>
          </TouchableOpacity>
        </View> 
      </View>
    </SafeAreaView>
  );
};

export default Registerpage;

const styles = StyleSheet.create({
      container: {
        flex: 1, justifyContent: 'center',backgroundColor:'#F0C935'
        
      },
      login: {
        fontFamily: 'arial',
        fontSize: 30,
        fontWeight: '800',
        color: '#181816',
        marginBottom: 30,
      },
      icon:{
        borderColor: '#181816',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 10,
      },
    });
