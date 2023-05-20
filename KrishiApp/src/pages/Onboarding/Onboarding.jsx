import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import SunCloud from '../../assets/pictures/SunClouds.png'
import SunPlant from '../../assets/pictures/plantSun.png'
import Bush from '../../assets/pictures/Bush.png'
import Carousel from 'react-native-snap-carousel';
import data from '../../assets/dataOnboarding/data';
import FlatButton from '../../components/FlatButton/FlatButton'
import { useSelector } from 'react-redux'
import { t } from '../../utils/language'


const Onboarding = ({ navigation }) => {
  const language = useSelector(state=>state.language.language)

    const _renderItem = ({item}) => {
        return(

            <Text style={styles.description}>{item.description}</Text>

        )
      }

    const [slideIndex, setSlideIndex] = useState(0);
    
      

    
  return (
    <View style={styles.mainContainer}>
    <Image source={SunCloud}/>
    <Image source={SunPlant} style={styles.bgImage}/>
    <View style={styles.InnerMain}>
    <Carousel
              data={data}
              renderItem={_renderItem}
              sliderWidth={Dimensions.get("screen").width}
              itemWidth={350}
              ref={(c) => { this._carousel = c; }}
            />

            <View style={styles.circles}>
              <View style={[styles.circle, slideIndex == 0 ? styles.active : styles.circle]}></View> 
              <View style={[styles.circle, slideIndex == 1 ? styles.active : styles.circle]}></View> 
              <View style={[styles.circle, slideIndex == 2 ? styles.active : styles.circle]}></View>
            </View>

            <FlatButton buttonStyle = {slideIndex == 2? styles.getStartedButton : styles.NextButton} textStyle = {styles.NextButtonText} title = {slideIndex == 2 ? t[language]['Get Started'] : "NEXT"} onPress = {() => {slideIndex == 2 ? navigation.navigate('Login') : this._carousel.snapToNext(); setSlideIndex(this._carousel.currentIndex);}}/>
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
      color: 'black'
    },
    subText: {
      fontSize: 18,
      color: 'black',
      fontFamily: 'WorkSans-Medium'

    },
    InnerMain: {
      width: '90%',
      alignItems: 'center',
      marginTop: "30%"
    },
    description: {
        fontSize: 20,
        fontFamily: 'WorkSans-SemiBold',
        textAlign: 'center',
        color: 'black'
    },
    NextButton: {
        borderRadius: 25,
        backgroundColor: '#229D3D',
        width: 140,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginTop: '40%'
    },

    getStartedButton: {
        borderRadius: 25,
        backgroundColor: '#229D3D',
        width: 300,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        margin: 20,
        marginTop: '40%'
    },
    NextButtonText: {
        fontSize: 18,
        fontFamily: 'WorkSans-Medium'
    },

    circle: {
        width: 6,
        height: 6,
        backgroundColor: "black",
        borderRadius: 100,
        marginRight: 5
    
      },
    
      active: {
        backgroundColor: "#229D3D",
        width: 20,
      },
    
      circles: {
        marginTop: "10%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
      },

})

export default Onboarding

