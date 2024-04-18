import React from "react";
import { FlatList, StyleSheet, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';

const data = [
    {
        id: '1',
        name: 'Saumya Bansal',
        date: '12/02/2024',
        from:"Jaypee 62",
        to:"Jaypee 128",
        time:'4:00',
        rating:'4.5',
    },
    {
        id: '2',
        name: 'Arshika Porwal',
        date: '12/03/2024',
        from:"Jaypee 128",
        to:"Jaypee 62",
        time:'5:00',
        rating:"0.0",
    },
    // Add more data as needed
];

const renderItem = ({ item }) => (
    <View style={styles.req_container}>
        <View style={styles.first_c}>
            <View style={styles.first_inner}>
                <FontAwesome6 style={styles.image} name="circle-user" size={30} color="black" />
            </View>
            <View style={styles.second_inner}>
                <View style={styles.second_inner_c}>
                    <Text style={styles.text}>{item.name}</Text> 
                </View>
                <View style={styles.second_inner_c}>
                    <Text>From: {item.from}</Text> 
                </View>
                <View style={styles.second_inner_c}>
                    <Text>To: {item.to}</Text> 
                </View>
            </View>
            <View style={styles.third_inner}>
                <View style={styles.second_inner_c}>
                    <Text style={styles.text_d}>{item.date}</Text> 
                </View>
                <View style={styles.second_inner_c}>
                    <Text>Time: {item.time}</Text> 
                </View>
                <View style={styles.second_inner_c}>
                    <Text>Rating: {item.rating}</Text> 
                </View>
            </View>
        </View>
        <View style={styles.second_c}>
            <TouchableOpacity style={[styles.buttons, styles.button_1]}>
                <Text style={[styles.buttonText,styles.buttonText_1]}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Offer')} style={[styles.buttons, styles.button_2]}>
                <Text style={[styles.buttonText,styles.buttonText_2]}>Chat</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const FindRequest = () => {
    return (
        <SafeAreaView style={styles.safearea}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
};

const styles=StyleSheet.create({
    safearea:{
        flex: 1,
        backgroundColor: "#e7e7e7",
    },
    req_container:{
        paddingHorizontal:10,
        paddingVertical:15,
        marginVertical:10,
        marginHorizontal:10,
        backgroundColor:'white',
        borderColor:"#007bff",
        borderWidth:5,
        borderRadius:5,
    },
    first_c:{
        flexDirection:"row",
        marginHorizontal:5,
        marginVertical:5,
        paddingVertical:0,
    },
    first_inner:{
        flex:1,
        paddingHorizontal:0,
        paddingVertical:15,
    },
    second_inner:{
        flex:3,
        flexDirection:'column',
        marginVertical:0,
    },
    second_inner_c:{
        flex:1,
    },
    third_inner:{
        flex:1.5,
        flexDirection:'column',
        marginVertical:0,
    },
    second_c:{
        flexDirection:"row",
        marginHorizontal:10,
        paddingHorizontal: 20,
    },
    image:{
        marginBottom:10,
        height:40,
    },
    text:{
        fontSize:18,
        fontWeight:"500"
    },
    text_d:{
        fontSize:15,
        color:'green',
        fontWeight:"600"
    },
    buttons: {
        flex: 1,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal:10,
        paddingVertical: 8,
    },
    button_1: {
        backgroundColor: "white",
        borderColor:"#007bff",
        borderWidth:2,
        textcolor:"red",
    },
    button_2: {
        backgroundColor: "#007bff",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
    },
    buttonText_1: {
        color: "red",
    },
    buttonText_2: {
        color: "white",
    },
});

export default FindRequest;
