import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  return (
    <SafeAreaView style={styles.phoneContainer}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Hello!</Text>
        <Text style={styles.subtitleText}>My name is</Text>
        <View style={styles.innerContainer}>
          <Text style={styles.nameText}>Angelline</Text>
          <Text style={styles.pronounText}>she/her</Text>
        </View>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  phoneContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: '#EDAEC0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: "80%",
    height: "45%",
    backgroundColor: "white",
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  welcomeText: {
    fontSize: 80,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 5,
  },
  subtitleText: {
    fontSize: 28,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
    letterSpacing: 3,
  },
  nameText: {
    fontSize: 55,
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: 'italic',
    color: '#EDAEC0',
  },
  pronounText: {
    fontSize: 20,
    textAlign: "center",
    color: '#999',
    fontStyle: 'italic',
    marginTop: 4,
  },
});