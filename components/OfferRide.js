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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* <View style={styles.headerSection}>Header content */}
        {/* </View> */}

        {/* <View style={styles.titleSection}>
          <Text style={styles.title}>Book your Cab</Text>
        </View> */}
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
                // style={styles.input}
                placeholder="Pickup Location"
                placeholderTextColor="black"
                value={pickupLocation}
                onChangeText={setPickupLocation} // Add onChangeText handler
              />
            </View>
            <View style={[styles.inputContainer, styles.input]}>
              <Entypo name="location" size={15} color="red" marginRight={10} />
              <TextInput
                // style={styles.input}
                placeholder="Drop Location"
                placeholderTextColor="black"
                value={dropLocation}
                onChangeText={setDropLocation} // Add onChangeText handler
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
                // style={styles.input}
                placeholder="No.of seat"
                placeholderTextColor="#ccc"
                value={seat}
              />
            </View>
          </View>
          {/* 
        <View style={styles.carImageContainer}>
          <Image
            source={carImage}
            resizeMode="cover"
            style={styles.carImage}
          />
        </View> */}

          {/* <TextInput
          style={[styles.input, styles.priceInput]}
          placeholder="Enter your price"
          placeholderTextColor="#ccc"
        /> */}
        </View>
        <TouchableOpacity style={styles.button}>
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
    marginTop: 260,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },
  button_c: {
    // flex:1,
    flexDirection: "row",
    paddingHorizontal: 20,
    // width:'100%',
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    // borderBottomWidth: 1,
    // paddingBottom: 8,
    // marginBottom: 20,
  },

  other: {
    flexDirection: "row",
  },
  date: {
    // flex:1,
    // marginRight:20,
  },
  seat: {
    marginRight: 20,
  },
  headerSection: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleSection: {
    marginTop: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#000",
  },
  buttons: {
    flex: 1,
    backgroundColor: "#007bff",
    // borderRadius: 8,
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
  carImageContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  carImage: {
    width: "100%",
    height: 200,
  },
  priceInput: {
    marginTop: 20,
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
