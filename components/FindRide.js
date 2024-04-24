import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../utils/firebaseConfig";

const FindRide = ({ navigation }) => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');

  const handleFindRide = () => {
    // Navigate to FilteredRides screen with pickup and drop location params
    navigation.navigate("FilteredRides", { pickupLocation, dropLocation });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Pickup Location"
        value={pickupLocation}
        onChangeText={setPickupLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Drop Location"
        value={dropLocation}
        onChangeText={setDropLocation}
      />
      <TouchableOpacity style={styles.button} onPress={handleFindRide}>
        <Text style={styles.buttonText}>Find Ride</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FindRide;
