import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

const LandingPage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.containers}>
        <View style={styles.containers}>
          <ImageBackground
            source={require("../images/cab3.png")}
            style={styles.backgroundImage}
          />
            <TouchableOpacity
              onPress={() => navigation.navigate("Find")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Find Ride</Text>
            </TouchableOpacity>
          {/* </ImageBackground> */}
        </View>

        <View style={[styles.containers,styles.container]}>
          <ImageBackground
            source={require("../images/cab1.png")}
            style={styles.backgroundImage}
          />
            <TouchableOpacity
              onPress={() => navigation.navigate("Offer")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Offer Ride</Text>
            </TouchableOpacity>
          {/* </ImageBackground> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    marginBottom:20,
  },
  containers: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    alignItems: "center",
    borderBottomLeftRadius:8,
    borderBottomRightRadius:8,
    // marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "contain",
    height: 300, 
    backgroundColor: "rgba(0,0,0,0.2)",
  },
    
});

export default LandingPage;
