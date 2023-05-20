import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import SunCloud from '../../assets/pictures/SunClouds.png'
import SunPlant from '../../assets/pictures/plantSun.png'
import Bush from '../../assets/pictures/Bush.png'

const Start = ({ navigation }) => {

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('Language');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.mainContainer}>
        <Image source={SunCloud}/>
        <Image source={SunPlant} style={styles.bgImage}/>
        <View style={styles.InnerMain}>
          <Image source={SunPlant} />
          <Text style={styles.mainText}>कृषि JUNCTION</Text>
          <Text style={styles.subText}>Khet ko Smart Banaye</Text>
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
      alignItems: 'center',
    }

})

export default Start