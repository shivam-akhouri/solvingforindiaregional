import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { ReactPropTypes, useState } from 'react'
import SunCloud from '../../assets/pictures/SunClouds.png'
import SunPlant from '../../assets/pictures/plantSun.png'
import Bush from '../../assets/pictures/Bush.png'
import React from 'react'
import { Svg } from 'react-native-svg'
import { useDispatch, useSelector } from 'react-redux'
import { update } from '../../redux/reducers/language'
import { t } from '../../utils/language'

const Language = ({ navigation }) => {

    const language = useSelector(state => state.language.language);
    console.log(t[language])
    const dispatch = useDispatch();

    return (
        <View style={styles.mainContainer}>
            <Image source={SunCloud} />
            <Image source={SunPlant} style={styles.bgImage} />
            <View style={styles.InnerMain}>
                <Text style={styles.subText}>{t[language]["Choose"]} {t[language]['Language']}</Text>
                <View style={styles.LangMain}>
                    <View style={styles.LangSub}>
                        <TouchableOpacity onPress={() => dispatch(update({ "language": "english" }))} style={language == "english" ? styles.LangButtonActive : styles.LangButton}>
                            <Text style={language == "english" ? styles.LangTextActive : styles.LangText}>Aa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => dispatch(update({ "language": "hindi" }))} style={language === "hindi" ? styles.LangButtonActive : styles.LangButton}>
                            <Text style={language === "hindi" ? styles.LangTextActive : styles.LangText}>अ</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.LangSub}>
                        <TouchableOpacity onPress={() => dispatch(update({ "language": "tamil" }))} style={language == "tamil" ? styles.LangButtonActive : styles.LangButton}>
                            <Text style={language == "tamil" ? styles.LangTextActive : styles.LangText}>அ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => dispatch(update({ "language": "telugu" }))} style={language == "telugu" ? styles.LangButtonActive : styles.LangButton}>
                            <Text style={language == "telugu" ? styles.LangTextActive : styles.LangText}>అ</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <TouchableOpacity style={styles.NextButton} onPress={() => { navigation.navigate('Onboarding'); }}>
                    <Text style={styles.NextButtonText}>
                        {t[language]["Next"]}
                    </Text>
                </TouchableOpacity>
            </View>
            <Image source={Bush} style={styles.BushImage} />
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
        fontSize: 24,
        color: 'black',
        fontFamily: 'WorkSans-SemiBold'

    },
    InnerMain: {
    },
    LangButton: {
        backgroundColor: '#FEF9EF',
        opacity: 0.4,
        borderRadius: 15,
        width: 140,
        height: 135,
        textAlign: 'center',
        margin: 10,

    },
    LangText: {
        fontFamily: 'WorkSans-SemiBold',
        fontSize: 72,
        color: 'black',
        alignSelf: 'center'


    },
    LangTextActive: {
        fontFamily: 'WorkSans-SemiBold',
        fontSize: 72,
        color: '#229D3D',
        alignSelf: 'center'


    },
    LangSub: {
        display: 'flex',
        flexDirection: 'row'
    },
    LangButtonActive: {
        backgroundColor: '#FEF9EF',
        borderRadius: 15,
        width: 140,
        height: 135,
        textAlign: 'center',
        margin: 10,
    },
    NextButton: {
        borderRadius: 25,
        backgroundColor: '#229D3D',
        width: 140,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        margin: 10,
    },
    NextButtonText: {
        fontSize: 18,
        fontFamily: 'WorkSans-Medium'
    }

})
