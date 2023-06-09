import { Image, Linking, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SunCloud from '../../assets/pictures/SunClouds.png'
import SunPlant from '../../assets/pictures/plantSun.png'
import weather from '../../assets/pictures/weather.png'
import Bush from '../../assets/pictures/Bush.png'
import wheat from '../../assets/pictures/wheat.jpg'
import bajra from '../../assets/pictures/bajra.jpg'
import Bell from '../../assets/pictures/Notification.png'
import Therm from '../../assets/pictures/Thermometer.png'
import Hygro from '../../assets/pictures/Hygrometer.png'
import pH from '../../assets/pictures/pH.png'
import Menu from '../../assets/pictures/Menu.png'
import GetLocation from 'react-native-get-location'
import { update } from '../../redux/reducers/weather'
import Header from '../../components/Header';
import { t } from '../../utils/language';
import language from '../../redux/reducers/language';
import { ActivityIndicator } from 'react-native-paper';
import { AnimationTriggerType, AnimationType, AnimationWrapperView } from 'animation-wrapper-view';

const Home = ({ navigation }) => {

    const [news, setNews] = useState(null)
    const [wheatHealth, setWheatHealth] = useState(1)
    const [bajraHealth, setBajraHealth] = useState(0)
    const [wheatTemp, setWheatTemp] = useState(28)
    const [wheatHumidity, setWheatHumidity] = useState(80)
    const [wheatpH, setWheatpH] = useState(12)

    const dispatch = useDispatch();
    const icon = useSelector(state => state.weather.icon)
    const temperature = useSelector(state => state.weather.temperature_C)
    const maxtemp = useSelector(state => state.weather.max_C)
    const mintemp = useSelector(state => state.weather.min_C)
    const windSpeed = useSelector(state => state.weather.windSpeed)
    const humidity = useSelector(state => state.weather.humidity)

    const [weatherIcon, setWeatherIcon] = useState("cdn.weatherapi.com/weather/64x64/day/113.png")
    useEffect(() => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
            .then(location => {
                fetch(`https://api.weatherapi.com/v1/forecast.json?key=ff5ae7348c2243a9982150405231602&q=${location.latitude},${location.longitude}&days=7&aqi=yes&alerts=yes`)
                    .then(res => res.json())
                    .then(res => dispatch(update({
                        latitude: location.latitude,
                        longitude: location.longitude,
                        data: res,
                        icon: res.current.condition.icon,
                        temperature_C: res.current.temp_c,
                        max_C: res.forecast.forecastday[0].day.maxtemp_c,
                        min_C: res.forecast.forecastday[0].day.mintemp_c,
                        humidity: res.forecast.forecastday[0].day.avghumidity,
                        windSpeed: res.forecast.forecastday[0].day.maxwind_kph
                    })))
                    .then(_ => setWeatherIcon(icon))
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })

        fetch("https://newsapi.org/v2/everything?q=agriculture%20products%20india&apiKey=8ece078dac504ec0a15188e4886c61c9")
            .then(res => res.json())
            .then(res => setNews(res.articles))
    }, [])
    const language = useSelector(state => state.language.language)


    const fadeConfig = {
        type: AnimationType.FADE,
        triggerType: AnimationTriggerType.ON_LOAD,
        initialOpacity: 0,
        finalOpacity: 1,
        animationDuration: 500
    }


    return (
        <View style={styles.mainContainer}>
            <Header title={t[language]["Krishi Junction"]} />
            <Image source={SunPlant} style={styles.bgImage} />
            <ScrollView style={styles.InnerMain}>
                <Text style={styles.mainText}>{t[language]["Weather Condition"]}</Text>
                <View style={styles.row}>
                    <View style={{ borderWidth: 1, borderColor: "green", borderRadius: 15 }}>
                        <Image source={{ uri: `https://${icon}` }} style={{ width: 60, height: 60 }} />
                    </View>
                    <View>
                        <Text style={styles.wText}>{temperature}°C</Text>
                        <Text style={styles.date}>{maxtemp}°C - {mintemp}°C</Text>
                        <Text style={styles.date}>Banglore, India</Text>
                    </View>
                    <View style={styles.rightText}>
                        <View style={{ flexDirection: "row" }}>
                            <MaterialCommunityIcons style={{ marginRight: 10 }} name="waves-arrow-up" size={24} color="#1d99bf" />
                            <Text style={styles.date}>{humidity} %</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <MaterialCommunityIcons style={{ marginRight: 10 }} name="fan-chevron-up" size={24} color="#1d99bf" />
                            <Text style={styles.date}>{windSpeed} {t[language]["Km/h"]}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.mainText}>{t[language]["Current Task"]}</Text>
                <AnimationWrapperView animationConfig={fadeConfig}>

                    <TouchableOpacity onPress={() => navigation.navigate('Modules')}>
                        <View style={styles.card} >
                            <View style={{ width: 90, height: 90, backgroundColor: "#ebb215", borderRadius: 10 }}>
                                <Text style={{ color: "white", fontSize: 28, textAlign: "center", fontFamily: "WorkSans-ExtraBold" }}>2d due</Text>
                            </View>
                            <View style={{ width: 250, paddingLeft: 15 }}>
                                <Text style={{ color: "black", fontFamily: "WorkSans-Medium" }}>Scheduled Spray was not performed. 2 days left</Text>
                                <Text style={{ color: "black", fontFamily: "WorkSans-Medium", paddingVertical: 5, paddingHorizontal: 5, backgroundColor: "#ccc", width: 100, borderRadius: 10, textAlign: "center", marginTop: 10 }}>Maize #1</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </AnimationWrapperView>
                <AnimationWrapperView animationConfig={{...fadeConfig, triggerDelay: 200}}>
                    <TouchableOpacity onPress={() => navigation.navigate('DashBoard')}>
                        <View style={styles.card} >
                            <View style={{ width: 90, height: 90, backgroundColor: "#ebb215", borderRadius: 10 }}>
                                <Text style={{ color: "white", fontSize: 28, textAlign: "center", fontFamily: "WorkSans-ExtraBold" }}>2d due</Text>
                            </View>
                            <View style={{ width: 250, paddingLeft: 15 }}>
                                <Text style={{ color: "black", fontFamily: "WorkSans-Medium" }}>Requires Fertilization. Downward nutrition trends from past two weeks</Text>
                                <Text style={{ color: "black", fontFamily: "WorkSans-Medium", paddingVertical: 3, paddingHorizontal: 5, backgroundColor: "#ccc", width: 100, borderRadius: 10, textAlign: "center", marginTop: 5 }}>Maize #1</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </AnimationWrapperView>
                <AnimationWrapperView animationConfig={{...fadeConfig, triggerDelay: 200}}>
                    <TouchableOpacity onPress={() => navigation.navigate('DashBoard')}>
                        <View style={styles.card} >
                            <View style={{ width: 90, height: 90, backgroundColor: "green", borderRadius: 10 }}>
                                <Text style={{ color: "white", fontSize: 28, textAlign: "center", fontFamily: "WorkSans-ExtraBold" }}>2d due</Text>
                            </View>
                            <View style={{ width: 250, paddingLeft: 15 }}>
                                <Text style={{ color: "black", fontFamily: "WorkSans-Medium" }}>Scheduled Spray was not performed. 2 days left</Text>
                                <Text style={{ color: "black", fontFamily: "WorkSans-Medium", paddingVertical: 5, paddingHorizontal: 5, backgroundColor: "#ccc", width: 100, borderRadius: 10, textAlign: "center", marginTop: 10 }}>Maize #1</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </AnimationWrapperView>
                <Text style={styles.mainText}>{"Sensor Status"}</Text>
                <View style={styles.sensorcard}>
                    <MaterialCommunityIcons name="poker-chip" color={"green"} size={50} />
                    <View>
                        <Text style={styles.sensorcardtitle}>N-P-K Sensor</Text>
                        <Text style={styles.sensorcardsubtitle}>Device Id: nm0001</Text>
                        <Text style={[styles.sensorcardsubtitle, { fontSize: 8 }]}>Last data sync: 15mins ago</Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                            <Text style={styles.sensorcardright}>Device Health: Ok</Text>
                            <View style={styles.sensorcardcircle} />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                            <Text style={styles.sensorcardright}>Status: Normal</Text>
                            <View style={styles.sensorcardcircle} />
                        </View>
                    </View>
                </View>
                <View style={styles.sensorcard}>
                    <MaterialCommunityIcons name="chip" color={"green"} size={50} />
                    <View>
                        <Text style={styles.sensorcardtitle}>pH-Temp Sen.</Text>
                        <Text style={styles.sensorcardsubtitle}>Device Id: pt0001</Text>
                        <Text style={[styles.sensorcardsubtitle, { fontSize: 8 }]}>Last data sync: 7mins ago</Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                            <Text style={styles.sensorcardright}>Device Health: Ok</Text>
                            <View style={styles.sensorcardcircle} />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                            <Text style={styles.sensorcardright}>Status: Normal</Text>
                            <View style={styles.sensorcardcircle} />
                        </View>
                    </View>
                </View>
                <View style={styles.sensorcard}>
                    <MaterialCommunityIcons name="camera-gopro" color={"green"} size={50} />
                    <View>
                        <Text style={styles.sensorcardtitle}>NDVI Sensor</Text>
                        <Text style={styles.sensorcardsubtitle}>Device Id: nd0001</Text>
                        <Text style={[styles.sensorcardsubtitle, { fontSize: 8 }]}>Last data sync: 2mins ago</Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                            <Text style={styles.sensorcardright}>Device Health: Ok</Text>
                            <View style={styles.sensorcardcircle} />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                            <Text style={styles.sensorcardright}>Status: Normal</Text>
                            <View style={styles.sensorcardcircle} />
                        </View>
                    </View>
                </View>

                <Text style={styles.mainText}>{"Current News"}</Text>
                {news === null && <ActivityIndicator color='green' size={"large"} />}
                {news !== null && news !== undefined && news.map(val => (
                    <TouchableOpacity onPress={() => Linking.openURL(val.url)}>
                        <View style={styles.card} >
                            <View style={{ width: 90, height: 90, backgroundColor: "green", borderRadius: 10 }}>
                                <Image source={{ uri: val.urlToImage }} style={{ width: 90, height: 90, borderRadius: 10 }} />
                            </View>
                            <View style={{ width: 250, paddingLeft: 15 }}>
                                <Text style={{ color: "black", fontFamily: "WorkSans-Medium" }} numberOfLines={3}>{val.title}</Text>
                                <Text numberOfLines={2} style={{ color: "#00000050", paddingHorizontal: 2, borderRadius: 10, textAlign: "left", }}>{val.author}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

            </ScrollView>
            <StatusBar backgroundColor={"#229D3D"} />

        </View>
    )
}



const styles = StyleSheet.create({
    dataSmall: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: '25%',

    },
    dataSmallText: {
        color: '#0C2F15',
        opacity: 0.6,
        marginLeft: '4%',
        fontSize: 15
    },
    row: {
        paddingVertical: 15,
        display: 'flex',
        backgroundColor: "#ffffff98",
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 15,
        alignSelf: 'center',
        marginTop: '4%'
    },
    plantImage: {
        width: '41%',
        height: '100%',
        borderRadius: 15
    },
    cardData: {
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '90%',
    },

    healthy: {
        backgroundColor: '#07D334',
        width: 20,
        height: 20,
        borderRadius: 100,
        marginTop: '3%'
    },
    cardContent: {
        margin: '3%',
    },
    CardMainText: {
        fontFamily: 'WorkSans-SemiBold',
        fontSize: 24,
        color: 'black'
    },
    card: {
        backgroundColor: 'white',
        width: 300,
        height: 100,
        borderRadius: 15,
        alignSelf: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5

    },
    temp: {
        fontFamily: 'WorkSans-SemiBold',
        fontSize: 24,
        color: 'black',
    },
    normalText: {
        fontFamily: 'WorkSans-Regular',
        color: '#0C2F15',
        opacity: 0.4,
        fontSize: 9,
    },
    weatherImage: {
        width: '100%',
        position: 'absolute',
        top: '13%'
    },
    rightText: {
        textAlign: 'right',
        alignItems: 'flex-start'
    },
    wText: {
        fontSize: 20,
        fontFamily: 'WorkSans-ExtraBold',
        color: 'green'
    },
    date: {
        fontSize: 14,
        fontFamily: 'WorkSans-Regular',
        color: '#000000'
    },
    mainContainer: {
        backgroundColor: '#8BDED1',
        height: '100%',
        alignItems: 'center',

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

    mainText: {
        fontFamily: 'Worksans-Bold',
        fontSize: 24,
        color: 'black',
        marginTop: 25
    },

    InnerMain: {
        width: '90%',
        marginTop: '3%',
    },
    NavBar: {
        marginTop: '3%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '95%',
        alignSelf: 'center',
    },
    sensorcard: {
        marginVertical: 5,
        widh: "95%",
        backgroundColor: "#77cc7730",
        height: 75,
        borderRadius: 15,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "green",
        alignItems: 'center',
        paddingLeft: 10
    },
    sensorcardtitle: {
        fontFamily: "WorkSans-Medium",
        fontSize: 16,
        fontWeight: "700",
        color: "black",
        paddingLeft: 15
    },
    sensorcardsubtitle: {
        fontFamily: "WorkSans-Medium",
        fontSize: 12,
        color: "#222",
        paddingLeft: 15
    },
    sensorcardright: {
        fontFamily: "WorkSans-ExtraBold",
        fontSize: 12,
        color: "green",
        paddingLeft: 15,
        alignSelf: "flex-end",
    },
    sensorcardcircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "green",
        marginLeft: 15,
        marginTop: 5
    }

})

export default Home