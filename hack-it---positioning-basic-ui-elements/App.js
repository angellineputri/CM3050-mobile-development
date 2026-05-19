import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Switch,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/background.jpg')}
        resizeMode="cover"
        style={styles.image}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.safeView}>
              <View style={styles.welcomeTextContainer}>
                <Text style={styles.welcomeText}>Welcome to Social 👋</Text>
              </View>

              <View style={styles.bodyTextContainer}>
                <Text style={styles.bodyText}>
                  At social we believe in a new type of interaction.
                  {'\n'}
                  {'\n'}
                  One that crosses the boundaries of what was possible before.
                  {'\n'}
                  {'\n'}
                  Sign up today and check out the future of social networking.
                </Text>
              </View>

              <View style={styles.signUpContainer}>
                <TextInput
                  style={styles.emailInput}
                  value="Your email address"
                />
                <View style={styles.newsletterContainer}>
                  <View>
                    <Switch ios_backgroundColor="#3e3e3e"></Switch>
                  </View>
                  <View style={styles.newsletterGrow}>
                    <Text style={styles.newsletterText}>
                      Sign up to our newsletter to hear the latest news before
                      anyone else
                    </Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.signUp}>
                  <Text style={styles.signUpText}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

// remove backgroundColor from container! or you won't see the background image after you have added the avoid keyboard view
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  safeView: {
    flex: 1,
  },
  welcomeTextContainer: {
    flex: 2,
    //backgroundColor:"red",
    justifyContent: 'flex-end',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  bodyTextContainer: {
    //backgroundColor:"yellow",
    paddingTop: 20,
    paddingBottom: '20%',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  bodyText: {
    fontSize: 17,
  },
  welcomeText: {
    fontSize: 55,
    fontWeight: 'bold',
  },
  signUpContainer: {
    paddingTop: '10%',
    //backgroundColor:"blue",
    justifyContent: 'flex-end',
  },
  signUp: {
    width: '90%',
    height: 70,
    borderRadius: 35,
    marginLeft: '5%',
    marginBottom: 10,
    backgroundColor: 'black',
    alignContent: 'center',
    justifyContent: 'center',
  },
  signUpText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 28,
  },
  newsletterContainer: {
    flexDirection: 'row',
    width: '90%',
    paddingLeft: '5%',
    paddingBottom: '5%',
  },
  emailInput: {
    borderWidth: 3,
    borderRadius: 17,
    borderColor: 'black',
    width: '90%',
    height: 60,
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: 20,
    paddingLeft: '10%',
    paddingRight: '10%',
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'white',
  },
  newsletterText: {
    paddingLeft: 15,
  },
  newsletterGrow: {
    flexGrow: 1,
    flex: 1, //{This is a bug fix}
  },
});
