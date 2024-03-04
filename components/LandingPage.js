import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const carImage = require("../images/cab5.png");

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          {/* Header content */}
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.title}>Book your Cab</Text>
        </View>

        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder="Pickup Location"
            placeholderTextColor="#ccc"
          />
          <TextInput
            style={styles.input}
            placeholder="Drop Location"
            placeholderTextColor="#ccc"
          />
        </View>

        <View style={styles.carImageContainer}>
          <Image
            source={carImage}
            resizeMode="cover"
            style={styles.carImage}
          />
        </View>

        <TextInput
          style={[styles.input, styles.priceInput]}
          placeholder="Enter your price"
          placeholderTextColor="#ccc"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Book Cab</Text>
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
  searchSection: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
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
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
