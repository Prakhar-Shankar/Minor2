import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../utils/firebaseConfig";

const FilteredRides = ({ route, navigation }) => {
  const { pickupLocation, dropLocation } = route.params;
  const [filteredRides, setFilteredRides] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);

  useEffect(() => {
    const fetchFilteredRides = async () => {
      const q = query(
        collection(firestore, "rides"),
        where("pickupLocation", "==", pickupLocation),
        where("dropLocation", "==", dropLocation)
      );
      const querySnapshot = await getDocs(q);
      const rides = [];
      querySnapshot.forEach((doc) => {
        rides.push({ id: doc.id, ...doc.data() });
      });
      setFilteredRides(rides);
    };

    fetchFilteredRides();
  }, [pickupLocation, dropLocation]);

  const sortData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      if (sortBy === "time") {
        return new Date(a.time) - new Date(b.time);
      } else if (sortBy === "date") {
        return new Date(a.date) - new Date(b.date);
      }
    });
    return sortedData;
  };

  const handleSortPress = () => {
    setIsSortModalVisible(true);
  };

  const handleSortOptionSelect = (option) => {
    setSortBy(option);
    setIsSortModalVisible(false);
  };

  const handleDeclinePress = (rideId) => {
    setFilteredRides(filteredRides.filter((ride) => ride.id !== rideId));
  };

  const handleChatPress = (ride) => {
    // Navigate to the ChatScreen with ride information
    navigation.navigate('ChatScreen', { sender: ride.senderId });
  };

  const renderRides = () => {
    let displayedRides = [...filteredRides];
  
    if (searchQuery) {
      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      displayedRides = displayedRides.filter(
        (ride) =>
          ride.pickupLocation.toLowerCase().includes(lowerCaseSearchQuery) ||
          ride.dropLocation.toLowerCase().includes(lowerCaseSearchQuery)
      );
    }
  
    displayedRides = sortData(displayedRides);
  
    return displayedRides.map((ride) => (
      <View key={ride.id} style={styles.rideItem}>
        <Text>Pickup Location: {ride.pickupLocation}</Text>
        <Text>Drop Location: {ride.dropLocation}</Text>
        {/* Convert Firestore Timestamp to string */}
        <Text>Date: {ride.date.toDate().toLocaleDateString()}</Text>
        <Text>Time: {ride.time.toDate().toLocaleTimeString()}</Text>
        <Text>Seats: {ride.seat}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.declineButton}
            onPress={() => handleDeclinePress(ride.id)}
          >
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatButton} onPress={handleChatPress}>
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    ));
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
        </View>
        <TouchableOpacity onPress={handleSortPress}>
          <MaterialIcons name="sort" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {filteredRides.length === 0 ? <Text>No rides found</Text> : renderRides()}
      <Modal
        visible={isSortModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsSortModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => handleSortOptionSelect("time")}>
              <Text style={styles.sortOption}>Sort by Time</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSortOptionSelect("date")}>
              <Text style={styles.sortOption}>Sort by Date</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  searchContainer: {
    flex: 1,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 10,
  },
  rideItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  declineButton: {
    backgroundColor: "red",
    flex: 1,
    marginRight: 5,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 5,
  },
  chatButton: {
    backgroundColor: "green",
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  sortOption: {
    fontSize: 18,
    paddingVertical: 10,
  },
});

export default FilteredRides;
