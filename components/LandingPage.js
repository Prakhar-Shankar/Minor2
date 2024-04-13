import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

const LandingPage = ({ navigation }) => {
  return(
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Find")} style={styles.button}>
        <Text style={styles.buttonText}>Find Ride</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Offer")} style={styles.button}>
        <Text style={styles.buttonText}>Offer Ride</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e7e7e7",
  },
  container:{
    marginHorizontal:20,
    marginVertical:20,
    justifyContent:"center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LandingPage;
