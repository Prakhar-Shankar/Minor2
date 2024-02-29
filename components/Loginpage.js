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
import profile from "../images/profile.png";
import { AntDesign } from '@expo/vector-icons';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';

const Loginpage = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
        <Image source={profile}
            height={300}
            width={300}
            style={{/*transform: [{rotate: '-5deg'}]*/marginTop:'8'}}
          />
        </View>

        <Text
          style={styles.login}>
          Login
        </Text>

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
          fieldButtonLabel={"Forgot?" }
          fieldButtonFunction={() => {}} 
        />
        
        <CustomButton label={"Login"} onPress={() => {}} />

        <Text style={{textAlign: 'center', color: '#181816', marginBottom: 30}}>
          Or, login with ...
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => {}}
            style={styles.icon }>
            <AntDesign name="google" height={24} width={24} style={{fontSize:25}}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={styles.icon }>
            <AntDesign name="twitter" height={24} width={24} style={{fontSize:25}}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={styles.icon }>
            <AntDesign name="facebook-square" height={24} width={24} style={{fontSize:25}}/>
          </TouchableOpacity>
          
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Register</Text>
          </TouchableOpacity>
        </View> 
      </View>
    </SafeAreaView>
  );
};

export default Loginpage;

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
