import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, SafeAreaView,Text, StyleSheet } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../utils/firebaseConfig";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const FindRide = ({ navigation }) => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  

  const handleFindRide = () => {
    // Navigate to FilteredRides screen with pickup and drop location params
    navigation.navigate("FilteredRides", { pickupLocation, dropLocation });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <View style={styles.innerContainer}>
          <View style={styles.button_c}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Find")}
              style={[styles.buttons, styles.button_1]}
            >
              <Text style={styles.buttonText}>Find Ride</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Offer")}
              style={[styles.buttons, styles.button_2]}
            >
              <Text style={styles.buttonText}>Offer Ride</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchSection}>
            <View style={[styles.inputContainer, styles.input]}>
              <Entypo
                name="location"
                size={15}
                color="green"
                marginRight={10}
              />
              <TextInput
                placeholder="Pickup Location"
                placeholderTextColor="black"
                value={pickupLocation}
                onChangeText={setPickupLocation} 
              />
            </View>
            <View style={[styles.inputContainer, styles.input]}>
              <Entypo name="location" size={15} color="red" marginRight={10} />
              <TextInput
                placeholder="Drop Location"
                placeholderTextColor="black"
                value={dropLocation}
                onChangeText={setDropLocation} 
              />
            </View>
            </View>
      
    </View>
    <TouchableOpacity style={styles.button} onPress={handleFindRide}>
        <Text style={styles.buttonText}>Find Ride</Text>
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
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  innerContainer: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 250,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },
  button_c: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  other: {
    flexDirection: "row",
  },
  date: {},
  seat: {
    marginRight: 20,
  },
  buttons: {
    flex: 1,
    backgroundColor: "#007bff",
    alignItems: "center",
    paddingVertical: 15,
  },
  button_1: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  button_2: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  searchSection: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 15,
    color: "#000",
  },
  button: {
    backgroundColor: "#007bff",
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 0,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FindRide;
