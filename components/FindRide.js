import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../utils/firebaseConfig";

const FindRide = () => {
  const [dropLocation, setDropLocation] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [seats, setSeats] = useState('');

  const handleSubmit = async () => {
    try {
      const rideData = {
        dropLocation,
        pickupLocation,
        date,
        time,
        seats,
      };
      // Add ride data to Firestore
      const docRef = await addDoc(collection(firestore, "rides"), rideData);
      console.log("Ride added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding ride: ", error);
    }
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
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Time"
        value={time}
        onChangeText={setTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Seats"
        value={seats}
        onChangeText={setSeats}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
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
