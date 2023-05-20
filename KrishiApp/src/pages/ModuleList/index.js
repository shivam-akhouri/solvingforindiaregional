import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { useState, useCallback, useEffect } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from '../../components/Header'
import bajra from '../../assets/pictures/bajra.jpg'
import { t } from '../../utils/language'
import { useSelector } from 'react-redux'
import Modal from 'react-native-modal'
import { Button, Surface, TextInput } from 'react-native-paper'

function Card(props) {

    const [cropHealth, setCropHealth] = useState(1);
    return (
        <TouchableOpacity style={styles.card} onPress={props.onClick}>
            <Image source={{ uri: `https://source.unsplash.com/720x600/?${props.data.crop}%20crop` }} style={styles.plantImage} />
            <View style={styles.cardContent}>
                <View style={styles.cardData}>
                    <Text style={styles.CardMainText}>
                        {props.data.crop}
                    </Text>
                    <View style={cropHealth ? styles.healthy : styles.unHealthy}></View>
                </View>
                <Text style={{ color: "#666" }}>{props.data.subtitle}</Text>
                <View style={styles.cardData}>
                    <View style={{ flexDirection: "row" }}>
                        <MaterialCommunityIcons name='thermometer' size={18} color={"black"} />
                        <Text style={styles.dataSmallText}>{props.data.temp}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <MaterialCommunityIcons name='waves-arrow-up' size={18} color={"black"} />
                        <Text style={styles.dataSmallText}>{props.data.humidity}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <MaterialCommunityIcons name='ph' size={18} color={"black"} />
                        <Text style={styles.dataSmallText}>{props.data.pH}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default function ModuleList(props) {
    const language = useSelector(state => state.language.language)
    const data = [
        {
            crop: "Bajra",
            subtitle: "Watering required in 2 days",
            temp: "25 C",
            humidity: "45.8 %",
            pH: "7.5",
        },
        {
            crop: "Wheat",
            subtitle: "Watering required in 2 days",
            temp: "25 C",
            humidity: "45.8%",
            pH: "7.5",
        },
        {
            crop: "Corn",
            subtitle: "Watering required in 2 days",
            temp: "25 C",
            humidity: "45.8 %",
            pH: "7.5",
        },
        {
            crop: "Coffee",
            subtitle: "Watering required in 2 days",
            temp: "25 C",
            humidity: "45.8 %",
            pH: "7.5",
        },
    ]
    const [crop, setCrops] = useState(data);
    const [input, setInput] = useState({
        crop: "",
        location: "",
        id: ""
    })
    const [visible, setVisible] = useState(false)
    return (
        <View style={styles.mainContainer}>
            <Header title={t[language]['Modules']} />
            <ScrollView>

                {
                    crop !== null && crop !== undefined && crop.map(val => <Card data={val} onClick={() => props.navigation.navigate("ModuleDashboard", {title: val.crop})} />)
                }
            </ScrollView>
            <TouchableOpacity style={styles.cornerbutton} onPress={()=>setVisible(true)}>
                <MaterialCommunityIcons name="pencil-plus" size={32} color="white" />
            </TouchableOpacity>
            <Modal isVisible={visible} style={{ alignItems: "center" }}>
                <Surface style={{ width: 300, height: 360, borderRadius: 30, paddingHorizontal: 10 }} elevation={4}>
                    <Text style={{ fontFamily: "WorkSans-Medium", letterSpacing: -1, marginVertical: 15, fontSize: 24, color: "black", alignSelf: "center" }}>Enter Farm details</Text>
                    <TextInput value={input.crop} onChangeText={val => setInput({ ...input, crop: val })} placeholder='Enter Crop Name' />
                    <TextInput value={input.location} onChangeText={val => setInput({ ...input, location: val })} placeholder='Enter farm location' />
                    <TextInput value={input.id} onChangeText={val => setInput({ ...input, id: val })} placeholder='Enter Prodcut ID' />
                    <Button mode='contained' style={{marginTop: 30, backgroundColor: "green"}} onPress={() => {
                        setCrops([
                        ...crop,
                        {
                            crop: input.crop,
                            subtitle: "Need 2 days time.",
                            temp: "25 C",
                            humidity: "45.8 %",
                            pH: "***",
                        }])
                    }}>Save</Button>
                    <Button textColor='green' onPress={()=>setVisible(false)}>Cancel</Button>
                </Surface>
            </Modal>
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
        marginLeft: '3%',
        fontSize: 15
    },
    row: {
        paddingVertical: 15,
        display: 'flex',
        backgroundColor: "#ffffff98",
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 15,
        alignSelf: 'center',
        marginTop: '4%'
    },
    plantImage: {
        width: '45%',
        height: '110%',
        borderRadius: 15
    },
    cardData: {
        justifyContent: 'space-between',
        // display: 'flex',
        flexDirection: 'row',
        marginTop: 5
    },
    cardContent: {
        display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'space-around',
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
        marginTop: 15,
        backgroundColor: 'white',
        height: 100,
        borderRadius: 15,
        alignSelf: 'center',
        width: '95%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
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
    cornerbutton: {
        width: 60,
        height: 60,
        position: "absolute",
        bottom: 10,
        right: 10,
        borderRadius: 100,
        backgroundColor: "#229D3D",
        alignItems: "center",
        justifyContent: "center",
    }
})