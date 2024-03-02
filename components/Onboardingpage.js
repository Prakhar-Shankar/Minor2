import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const imageWidth = width * 0.95; 
const imageHeight = imageWidth;


import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16,color:"#0066ff"}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
);

const Onboardingpage = ({navigation}) => {
    return (
        <View style={{flex:1}}>
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.replace("Login")}
        onDone={() => navigation.navigate("Login")}
        pages={[
          {
            backgroundColor: 'white',
            image: <Image source={require('../images/profiles.png')} style={{ width: imageWidth, height: imageHeight }}/>,
            title: 'Set Up Your Profile',
            subtitle: 'Create a profile, set your travel preferences, and easily create or join ride requests.',
          },
          {
            backgroundColor: 'white',
            image: <Image source={require('../images/chat.png')} style={{ width: imageWidth, height: imageHeight }}/>,
            title: 'Connect and Coordinate',
            subtitle: 'Connect with others, form carpool groups, and coordinate plans using the built-in chat feature.',
          },
          {
            backgroundColor: 'white',
            image: <Image source={require('../images/book.png')} style={{ width: imageWidth, height: imageHeight }}/>,
            title: 'Easy Booking and Payment',
            subtitle: "Book rides effortlessly, set your fare, and choose from driver offers with our secure in-app payment gateway.",
          },
          {
            backgroundColor: 'white',
            image: <Image source={require('../images/rate.png')} style={{ width: imageWidth, height: imageHeight }}/>,
            title: 'Rate, Feedback, and Safety',
            subtitle: 'Rate and provide feedback to build a reliable carpooling community. Your privacy and safety are our priorities.',
          },
        ]}
      />
      </View>
    );
};

export default Onboardingpage;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});