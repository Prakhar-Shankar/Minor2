import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, View, Modal } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../utils/firebaseConfig";

const FindRequest = () => {
  const [rideData, setRideData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);

  useEffect(() => {
    const fetchRideData = async () => {
      try {
        const rideCollection = collection(firestore, "rides");
        const snapshot = await getDocs(rideCollection);
        const rides = snapshot.docs.map((doc) => {
          try {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              date: data.date ? new Date(data.date.seconds * 1000) : null,
              time: data.time ? new Date(data.time.seconds * 1000) : null,
            };
          } catch (error) {
            console.error("Error parsing document data:", error);
            console.log("Document:", doc.id, doc.data());
            return null;
          }
        });
        // Filter out any null entries
        const validRides = rides.filter((ride) => ride !== null);
        setRideData(validRides);
      } catch (error) {
        console.error("Error fetching ride data:", error);
      }
    };

    fetchRideData();
  }, []);

  const renderItem = ({ item }) => {
    const formatDate = (date) => {
      if (!date) return "Invalid date";
      return date.toLocaleDateString();
    };

    const formatTime = (time) => {
      if (!time) return "Invalid time";
      return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
      <View style={styles.req_container}>
        <View style={styles.first_c}>
          <View style={styles.first_inner}>
            <FontAwesome6 style={styles.image} name="circle-user" size={30} color="black" />
          </View>
          <View style={styles.second_inner}>
            <View style={styles.second_inner_c}>
              <Text style={styles.text}>From: {item.pickupLocation}</Text>
            </View>
            <View style={styles.second_inner_c}>
              <Text>To: {item.dropLocation}</Text>
            </View>
            <View style={styles.second_inner_c}>
              <Text>Date: {formatDate(item.date)}</Text>
            </View>
            <View style={styles.second_inner_c}>
              <Text>Time: {formatTime(item.time)}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const sortData = (sortBy) => {
    const filteredData = rideData.filter((item) => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      return (
        item.pickupLocation.toLowerCase().includes(lowerCaseSearchQuery) ||
        item.dropLocation.toLowerCase().includes(lowerCaseSearchQuery)
      );
    });

    const sortedData = [...filteredData];
    switch (sortBy) {
      case "time":
        sortedData.sort((a, b) => a.time - b.time);
        break;
      case "date":
        sortedData.sort((a, b) => a.date - b.date);
        break;
      default:
        break;
    }
    return sortedData;
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
        </View>
        <TouchableOpacity onPress={() => setIsSortModalVisible(true)}>
          <MaterialIcons name="sort" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={sortData(sortBy)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Modal
        visible={isSortModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsSortModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => {
                setSortBy("time");
                setIsSortModalVisible(false);
              }}
            >
              <Text style={styles.sortOption}>Sort by Time</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSortBy("date");
                setIsSortModalVisible(false);
              }}
            >
              <Text style={styles.sortOption}>Sort by Date</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: "#e7e7e7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchContainer: {
    flex: 1,
    marginRight: 10,
    marginTop: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 10,
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
  req_container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderColor: "#007bff",
    borderWidth: 5,
  },
  first_c: {
    flexDirection: "row",
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 0,
  },
  first_inner: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 15,
  },
  second_inner: {
    flex: 3,
    flexDirection: "column",
    marginVertical: 0,
  },
  second_inner_c: {
    flex: 1,
  },
  image: {
    marginBottom: 10,
    height: 40,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default FindRequest;
