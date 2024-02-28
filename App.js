import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Loginpage from './components/Loginpage';
import Registerpage from './components/Registerpage';

export default function App() {
  return (
    <>
    {/* <Loginpage/> */}
    <Registerpage/>
    </>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
