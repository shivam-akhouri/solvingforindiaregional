import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import { ReactPropTypes, useState } from 'react'
import SunCloud from '../../assets/pictures/SunClouds.png'
import SunPlant from '../../assets/pictures/plantSun.png'
import Bush from '../../assets/pictures/Bush.png'
import React from 'react'
import { Svg } from 'react-native-svg'
import { useDispatch, useSelector } from 'react-redux'
import { update } from '../../redux/reducers/language'
import { t } from '../../utils/language'
import { AnimationWrapperView, AnimationType, AnimationTriggerType } from 'animation-wrapper-view'

const Language = ({ navigation }) => {

    const language = useSelector(state => state.language.language);
    console.log(t[language])
    const dispatch = useDispatch();

    const fadeConfig = {
        type: AnimationType.FADE,
        triggerType: AnimationTriggerType.ON_LOAD,
        initialOpacity: 0,
        finalOpacity: 1,
        animationDuration: 750
    }

    const languageCards = [
        {
            english: "English",
            local:"English",
            letter: "F"
        },
        {
            english: "Hindi",
            local:"हिन्दी",
            letter: "हि"
        },
        {
            english: "Marathi",
            local:"मराठी",
            letter: "म"
        },
        {
            english: "Gujrati",
            local:"ગુજરાતી",
            letter: "ગ"
        },
        {
            english: "Tamil",
            local:"தமிழ்",
            letter: "த"
        },
        {
            english: "Punjabi",
            local:"ਪੰਜਾਬੀ",
            letter: "ਪੰ"
        },
        {
            english: "Telugu",
            local:"తెలుగు",
            letter: "తె"
        },
        {
            english: "Bangla",
            local:"বাংলা",
            letter: "বা"
        },
        {
            english: "Odia",
            local:"ଓଡିଆ",
            letter: "ଓ"
        },
        {
            english: "Kannada",
            local:"ಕನ್ನಡ",
            letter: "ಕ"
        },
        {
            english: "Malyalam",
            local:"മലയാളം",
            letter: "മ"
        },
        {
            english: "Urdu",
            local:"اردو",
            letter: "ار"
        },
        {
            english: "Bhojpuri",
            local:"भोजपुरी",
            letter: "भो"
        },
    ]

    return (
        <View style={styles.mainContainer}>
            <Image source={SunPlant} style={styles.bgImage} />
            <View style={styles.InnerMain}>
                <Text style={styles.subText}>{t[language]["Choose"]} {t[language]['Language']}</Text>
                <Text style={[styles.subText, {fontFamily: "WorkSans-Medium", fontSize: 15, fontWeight: "100", marginTop: -20}]}>Navigate the app in your preferred language</Text>
                <View style={styles.LangMain}>
                    <ScrollView contentContainerStyle={styles.LangSub}>
                    {
                        languageCards.map((item, index)=>(
                            <AnimationWrapperView animationConfig={{...fadeConfig, triggerDelay: index*150}}>
                                <TouchableOpacity onPress={() => dispatch(update({ "language": "english" }))} style={language == "english" ? styles.LangButtonActive : styles.LangButton}>
                                    <Text style={language == "english" ? styles.LangTextActive : styles.LangText}>{item.english}</Text>
                                    <Text style={language == "english" ? styles.LangSubTextActive : styles.LangSubText}>{item.local}</Text>
                                    <Text style={styles.letter}>{item.letter}</Text>
                                </TouchableOpacity>
                            </AnimationWrapperView>
                            ))
                        }

                <TouchableOpacity style={styles.NextButton} onPress={() => { navigation.navigate('Onboarding'); }}>
                    <Text style={styles.NextButtonText}>
                        {t[language]["Next"]}
                    </Text>
                </TouchableOpacity>
                        </ScrollView>
                </View>
            </View>
            <Image source={Bush} style={styles.BushImage} />
            <Image source={SunCloud} style={styles.bgImage}/>
        </View>
    )
}


export default Language

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

    subText: {
        fontSize: 36,
        color: 'green',
        opacity: 0.7,
        fontFamily: 'WorkSans-SemiBold',
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 25
    },
    InnerMain: {
        width:"100%"
    },
    LangButton: {
        backgroundColor: '#FEF9EF',
        opacity: 0.4,
        borderRadius: 15,
        width: 165,
        height: 75,
        textAlign: 'center',
        margin: 5,

    },
    LangText: {
        fontFamily: 'WorkSans-Medium',
        fontSize: 18,
        color: 'black',
        marginLeft: 15,
        marginTop: 10
    },
    LangSubText: {
        fontFamily: 'WorkSans-Medium',
        fontSize: 58,
        color: 'black',
        marginLeft: 15,
        marginTop: 10
    },
    LangTextActive: {
        fontFamily: 'WorkSans-Medium',
        fontSize: 20,
        color: '#229D3D',
        marginLeft: 15,
        marginTop: 10
    },
    LangSubTextActive: {
        fontFamily: 'WorkSans-Medium',
        fontSize: 15,
        color: '#229D3D',
        textAlign:"left",
        marginLeft: 15,
        marginTop: -5
    },
    LangSub: {
        alignSelf: "center",
        display: 'flex',
        flexDirection: 'row',
        flexWrap: "wrap",
        alignItems:"center",
        justifyContent:"center"
    },
    LangButtonActive: {
        backgroundColor: '#FEF9EF',
        borderRadius: 15,
        width: 165,
        height: 75,
        textAlign: 'center',
        margin: 5,
    },
    NextButton: {
        borderRadius: 25,
        backgroundColor: '#229D3D',
        width: "90%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 10,
    },
    NextButtonText: {
        fontSize: 18,
        fontFamily: 'WorkSans-Medium'
    },
    letter:{
        position:"absolute",
        color:"green",
        bottom: 5,
        right: 15,
        fontSize: 40,
        fontWeight: "700"
    }
})
