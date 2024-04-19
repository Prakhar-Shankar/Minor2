import React,{useState} from "react";
import { FlatList, StyleSheet, SafeAreaView, Text, TouchableOpacity,TextInput, View,Modal } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from "@expo/vector-icons";

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
        to:"Sector 18",
        time:'5:00',
        rating:"4.7",
    },
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
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState(null);
    const [isSortModalVisible, setIsSortModalVisible] = useState(false);

    const filteredData = data.filter(item => {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();
        return (
            item.name.toLowerCase().includes(lowerCaseSearchQuery) ||
            item.from.toLowerCase().includes(lowerCaseSearchQuery) ||
            item.to.toLowerCase().includes(lowerCaseSearchQuery)
        );
    });

    const sortData = (sortBy) => {
        const sortedData = [...filteredData];
        switch (sortBy) {
            case 'time':
                sortedData.sort((a, b) => a.time.localeCompare(b.time));
                break;
            case 'rating':
                sortedData.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
                break;
            case 'date':
                sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
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
                keyExtractor={item => item.id}
            />
            <Modal
                visible={isSortModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsSortModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={() => { setSortBy('time'); setIsSortModalVisible(false); }}>
                            <Text style={styles.sortOption}>Sort by Time</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setSortBy('rating'); setIsSortModalVisible(false); }}>
                            <Text style={styles.sortOption}>Sort by Rating</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setSortBy('date'); setIsSortModalVisible(false); }}>
                            <Text style={styles.sortOption}>Sort by Date</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};
const styles=StyleSheet.create({
    safearea:{
        flex: 1,
        backgroundColor: "#e7e7e7",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    searchContainer: {
        flex: 1,
        marginRight: 10,
        marginTop:15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
    },
    searchInput: {
        height: 40,
        paddingHorizontal: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    sortOption: {
        fontSize: 18,
        paddingVertical: 10,
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
