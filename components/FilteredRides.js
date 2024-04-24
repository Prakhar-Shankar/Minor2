import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../utils/firebaseConfig";

const FilteredRides = ({ route }) => {
  const { pickupLocation, dropLocation } = route.params;
  const [filteredRides, setFilteredRides] = useState([]);

  useEffect(() => {
    const fetchFilteredRides = async () => {
      const q = query(collection(firestore, "rides"), where("pickupLocation", "==", pickupLocation), where("dropLocation", "==", dropLocation));
      const querySnapshot = await getDocs(q);
      const rides = [];
      querySnapshot.forEach((doc) => {
        rides.push({ id: doc.id, ...doc.data() });
      });
      setFilteredRides(rides);
    };

    fetchFilteredRides();
  }, [pickupLocation, dropLocation]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Filtered Rides</Text>
      {filteredRides.length === 0 ? (
        <Text>No rides found</Text>
      ) : (
        filteredRides.map((ride) => (
          <View key={ride.id} style={styles.rideItem}>
            <Text>Pickup Location: {ride.pickupLocation}</Text>
            <Text>Drop Location: {ride.dropLocation}</Text>
            <Text>Date: {ride.date}</Text>
            <Text>Time: {ride.time}</Text>
            <Text>Seats: {ride.seat}</Text>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rideItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default FilteredRides;
