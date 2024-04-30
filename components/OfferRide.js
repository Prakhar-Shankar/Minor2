import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { firestore } from "../utils/firebaseConfig";

const OfferRide = ({ navigation }) => {
  const [dropLocation, setDropLocation] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [seat, setSeat] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const toggleDatepicker = () => {
    setShowDatePicker((prev) => !prev);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const toggleTimepicker = () => {
    setShowTimePicker((prev) => !prev);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === "ios");
    setTime(currentTime);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString();
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSubmit = async () => {
    try {
      const rideData = {
        dropLocation,
        pickupLocation,
        date: Timestamp.fromDate(date),
        time: Timestamp.fromDate(time),
        seat,
      };
      // Add ride data to Firestore
      const docRef = await addDoc(collection(firestore, "rides"), rideData);
      console.log("Ride added with ID: ", docRef.id);
      // Navigate to FindRequest page
      navigation.navigate("FindR");
    } catch (error) {
      console.error("Error adding ride: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
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

            <View style={styles.other}>
              <Pressable onPress={toggleDatepicker}>
                <View style={[styles.inputContainer, styles.input]}>
                  <MaterialIcons
                    name="date-range"
                    size={15}
                    color="black"
                    marginRight={10}
                  />
                  <Text>{formatDate(date)}</Text>
                </View>
              </Pressable>
              <Pressable onPress={toggleTimepicker}>
                <View style={[styles.inputContainer, styles.input]}>
                  <Entypo
                    name="clock"
                    size={15}
                    color="black"
                    marginRight={10}
                  />
                  <Text>{formatTime(time)}</Text>
                </View>
              </Pressable>
            </View>
            <View style={[styles.inputContainer, styles.input]}>
              <MaterialIcons
                name="date-range"
                size={15}
                color="black"
                marginRight={10}
              />
              <TextInput
                placeholder="No.of seat"
                placeholderTextColor="#ccc"
                value={seat}
                onChangeText={setSeat}
              />
            </View>
          </View>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={onChangeTime}
          />
        )}
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
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
  other: {
    flexDirection: "row",
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

export default OfferRide;
