import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SunCloud from '../../assets/pictures/SunClouds.png'
import SunPlant from '../../assets/pictures/plantSun.png'
import Bush from '../../assets/pictures/Bush.png'
import Input from '../../components/Input/Input'
import FlatButton from '../../components/FlatButton/FlatButton'
import { t } from '../../utils/language'
import { useSelector } from 'react-redux'

const Login = ({ navigation }) => {

    const [number, onChangeNumber] = useState(null)
  const language = useSelector(state=>state.language.language)
  return (
    <View style={styles.mainContainer}>
        <Image source={SunCloud}/>
        <Image source={SunPlant} style={styles.bgImage}/>
        <View style={styles.InnerMain}>
         <Text style = {styles.mainText}>{t[language]['Login']}</Text>
         <Input onChange = {onChangeNumber} value={number} maxLength={10} keyboardType = "numeric" text="Phone Number"/>
         <FlatButton buttonStyle = {styles.button} textStyle = {styles.NextButtonText} title = {t[language]["Send OTP"]} onPress = {() => navigation.navigate('Home')}/>
         <Text style={styles.subText} >Or Login With</Text>
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
        width: 300,
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
    


})

export default Login