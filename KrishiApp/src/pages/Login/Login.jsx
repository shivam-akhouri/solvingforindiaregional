import { Image, StyleSheet, Text, TouchableOpacity, View, NativeModules } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next'
import { RNTwitter } = NativeModules

import SunCloud from '../../assets/pictures/SunClouds.png'
import SunPlant from '../../assets/pictures/plantSun.png'
import Bush from '../../assets/pictures/Bush.png'
import Input from '../../components/Input/Input'

import google from '../../assets/pictures/google.png'
import facebook from '../../assets/pictures/facebook.png'
import twitter from '../../assets/pictures/twitter.png'

import FlatButton from '../../components/FlatButton/FlatButton'
import { t } from '../../utils/language'
import { useSelector } from 'react-redux'
import { AnimationTriggerType, AnimationType, AnimationWrapperView, EasingType } from 'animation-wrapper-view';

// Cards for login
const ButtonCard = (props)=>{
  return(
    <TouchableOpacity style={styles.buttonCard} onPress={props.onClick}>
      <Image source={props.image} style={styles.buttonCardImage} />
    </TouchableOpacity>
  )
}




const Login = ({ navigation }) => {

  const [number, onChangeNumber] = useState(null)
  const language = useSelector(state=>state.language.language)

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  const handleSignin = async ()=>{
    const confirmation = await auth().signInWithPhoneNumber("+91 9955582384")
    console.log(confirmation)
  }

  const animationConfig= {
    type: AnimationType.SLIDE_VERTICAL,
    triggerType: AnimationTriggerType.ON_LOAD,
    initialOffset: 40,
    finalOffset: 0,
    animationDuration: 250,
  }

  useEffect(()=>{
    GoogleSignin.configure({
      webClientId: '295357938280-nl433omhst5f9i9jib3hev0b4rht025j.apps.googleusercontent.com',
    })
  })

  return (
    <View style={styles.mainContainer}>
        <Image source={SunCloud}/>
        <Image source={SunPlant} style={styles.bgImage}/>
        <View style={styles.InnerMain}>
         <Text style = {styles.mainText}>{t[language]['Login']}</Text>
         <Input onChange = {onChangeNumber} value={number} maxLength={10} keyboardType = "numeric" text="Phone Number"/>
         <FlatButton buttonStyle = {styles.button} textStyle = {styles.NextButtonText} title = {t[language]["Send OTP"]} onPress = {()=>auth().signOut()}/>
         <Text style={styles.subText} >Or Login With</Text>
         <View style={{flexDirection:"row", marginTop: 15}}>
          <AnimationWrapperView animationConfig={animationConfig}>
            <ButtonCard image={google} onClick={()=>onGoogleButtonPress().then(()=>console.log('signed in'))}/>
          </AnimationWrapperView>
          <AnimationWrapperView animationConfig={{...animationConfig, triggerDelay: 150}}>
          <ButtonCard image={facebook} onClick={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}/>
          </AnimationWrapperView>
          <AnimationWrapperView animationConfig={{...animationConfig, triggerDelay: 300}}>
          <ButtonCard image={twitter} />
          </AnimationWrapperView>
         </View>
        </View>
        <Image source={Bush}  style={styles.BushImage}/>
    </View>
  )
}



const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#8BDED1',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        
    },
    bgImage: {
      position: "absolute",
      height: "50%",
      width: "100%",
      opacity: 0.1,
      zIndex: -10,
      left: "45%",
      top: '35%',
    },
    BushImage: {
      width: '100%'
    },
    mainText: {
      fontFamily: 'Worksans-Black',
      fontSize: 32,
      color: 'black',
      display: 'flex',
      justifyContent: 'flex-start',
    },
    subText: {
        fontFamily: "WorkSans-Medium",
        fontSize: 14,
        color: 'black',
    },
    InnerMain: {
      alignItems: 'center',
      width: '90%'
    },
    button: {
        borderRadius: 25,
        backgroundColor: '#229D3D',
        width: 350,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        margin: 20,
        marginTop: '5%'
    },
    NextButtonText: {
        fontSize: 18,
        fontFamily: 'WorkSans-Medium'
    },
    buttonCardImage:{
      width: 40,
      height: 40
    },
    buttonCard:{
      width: 60,
      height: 60,
      alignItems:"center",
      justifyContent:"center",
      backgroundColor: "white",
      borderRadius: 10,
      marginHorizontal: 10
    }
})

export default Login