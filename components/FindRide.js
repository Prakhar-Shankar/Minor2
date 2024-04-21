import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

const carImage = require("../images/cab5.png");
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../utils/firebaseConfig";

const OfferRide = ({ navigation }) => {
  const [dropLocation, setDropLocation] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [seat, setSeat] = useState("");

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setDatePicker] = useState(false);

  const [time, setTime] = useState(new Date());
  const [showTimePicker, setTimePicker] = useState(false);

  const toggleDatepicker = () => {
    setDatePicker(!showDatePicker);
  };

  const onChangeDate = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatepicker();
        setDate(formatDate(currentDate));
      }
    } else {
      toggleDatepicker();
    }
  };

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    return `${day}/${month}/${year}`;
  };

  const formatTime = (rawTime) => {
    let date = new Date(rawTime);

    let hr = date.getHours();
    let min = date.getMinutes();
    return `${hr}:${min}`;
  };
  const toggleTimepicker = () => {
    setTimePicker(!showTimePicker);
  };

  const onChangeTime = ({ type }, selectedTime) => {
    if (type == "set") {
      const currentTime = selectedTime || time;
      setTime(currentTime);

      if (Platform.OS === "android") {
        toggleTimepicker();
        setTime(formatTime(currentTime));
      }
    } else {
      toggleTimepicker();
    }
  };

  const handleSubmit = async () => {
    try {
      const rideData = {
        dropLocation,
        pickupLocation,
        date,
        time,
        seat,
      };
      // Add ride data to Firestore
      const docRef = await addDoc(collection(firestore, "rides"), rideData);
      console.log("Ride added with ID: ", docRef.id);
      // Navigate to FindR page
      navigation.navigate("FindR");
    } catch (error) {
      console.error("Error adding ride: ", error);
    }
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

            <View style={styles.other}>
              <View
                style={[styles.inputContainer, styles.input]}
                marginRight={10}
              >
                <MaterialIcons
                  name="date-range"
                  size={15}
                  color="black"
                  marginRight={10}
                />
                {showDatePicker && (
                  <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    onChange={onChangeDate}
                    minimumDate={new Date()}
                  />
                )}

                {!showDatePicker && (
                  <Pressable onPress={toggleDatepicker}>
                    <TextInput
                      style={[styles.date]}
                      placeholder="Date(Choose)"
                      placeholderTextColor="#ccc"
                      value={date}
                      onChangeText={setDate}
                      editable={false}
                    />
                  </Pressable>
                )}
              </View>
              <View
                style={[styles.inputContainer, styles.input]}
                marginLeft={10}
              >
                <Entypo name="clock" size={15} color="black" marginRight={10} />
                {showTimePicker && (
                  <DateTimePicker
                    mode="time"
                    display="clock"
                    value={time}
                    onChange={onChangeTime}
                    minimumDate={new Date()}
                    is24Hour={true}
                  />
                )}

                {!showTimePicker && (
                  <Pressable onPress={toggleTimepicker}>
                    <TextInput
                      style={[styles.seat]}
                      placeholder="Time"
                      placeholderTextColor="#ccc"
                      value={time}
                      onChangeText={setTime}
                      editable={false}
                    />
                  </Pressable>
                )}
              </View>
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
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
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
    marginTop: 260,
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

export default OfferRide;
