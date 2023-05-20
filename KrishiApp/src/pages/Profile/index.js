import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-native-modal'
import { update } from '../../redux/reducers/language'
import { t } from '../../utils/language'

import Header from '../../components/Header'
import SunPlant from '../../assets/pictures/plantSun.png'
import { useState } from 'react'
import { ActivityIndicator, Button, Surface } from 'react-native-paper'
import { useEffect } from 'react'

export default function Profile(props) {
    const language = useSelector(state => state.language.language);
    console.log(t[language])
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(true)
    useEffect(()=>{
        setLoading(true);
        setTimeout(()=>setLoading(false), 5000)
    }, [visible])
    return (
        <View style={styles.mainContainer}>
            <Header title="Profile" />
            <Image source={SunPlant} style={styles.bgImage} />
            <View style={styles.section}>
                <Image source={require("../../assets/pictures/farmer.png")} style={{ width: 75, height: 75, marginRight: 15 }} />
                <View>
                    <Text style={styles.farmername}>Farmer Name</Text>
                    <Text style={styles.phone}>+91 9955582384</Text>
                    <Text style={styles.locationText}>Jhinkpani, India</Text>
                </View>
            </View>
            <Text style={{ alignSelf: "flex-start", marginLeft: "5%", color: "#00000099", fontFamily: "WorkSans-ExtraBold", fontSize: 18, marginTop: 20 }}>Drone Control</Text>
            <TouchableOpacity onPress={() => setVisible(true)} style={[styles.section, { marginTop: 10, minHeight: 80 }]}>
                <Text style={{ fontFamily: "WorkSans-ExtraBold", fontSize: 20, color: "black" }}>Drone Controls</Text>
            </TouchableOpacity>
            <Text style={{ alignSelf: "flex-start", marginLeft: "5%", color: "#00000099", fontFamily: "WorkSans-ExtraBold", fontSize: 18, marginTop: 20 }}>Change Language</Text>
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
            <Modal isVisible={visible}>
                <Surface style={{ width: 355, height: 490, borderRadius: 30, paddingHorizontal: 10 }} elevation={4}>
                    {
                        loading ?
                            <>
                                <ActivityIndicator style={{ alignSelf: "center", marginTop: 150 }} size={50} color='green' />
                                <Text style={{textAlign:"center", color:"black", marginTop: 15}}>Establishing Secure Connection...</Text>
                            </>
                            :
                            <>
                                <Text style={{ fontFamily: "WorkSans-Medium", letterSpacing: -1, marginTop: 15, fontSize: 24, color: "black", alignSelf: "center" }}>Drone Controls</Text>
                                <Text style={{ fontFamily: "WorkSans-Medium", letterSpacing: -1, marginVertical: 2, fontSize: 12, color: "#888", alignSelf: "center" }}>IP: 337.67.23.89 PORT:223</Text>
                                <Text style={{ fontFamily: "WorkSans-Medium", letterSpacing: -1, marginVertical: 2, marginBottom: 20, fontSize: 12, color: "#888", alignSelf: "center" }}>Ping: 80ms | Network Connection: Bad | Bandwidth: 265 kb/s</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                    <TouchableOpacity onPress={()=>fetch("https://drone-3r75.onrender.com/up")} style={{ width: 100, alignItems: "center", justifyContent: "center", height: 100, borderRadius: 25, borderWidth: 1, borderColor: "green", backgroundColor: "#00ff0030" }}>
                                        <MaterialCommunityIcons name="arrow-up-bold-box" size={75} color={"green"} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>fetch("https://drone-3r75.onrender.com/forward")} style={{ width: 100, alignItems: "center", justifyContent: "center", height: 100, borderRadius: 25, borderWidth: 1, borderColor: "green", backgroundColor: "#00ff0090" }}>
                                        <MaterialCommunityIcons name="menu-up-outline" size={75} color={"green"} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{fetch("https://drone-3r75.onrender.com/down")
                                setReload(!reload)}} style={{ width: 100, alignItems: "center", justifyContent: "center", height: 100, borderRadius: 25, borderWidth: 1, borderColor: "green", backgroundColor: "#00ff0030" }}>
                                        <MaterialCommunityIcons name="arrow-down-bold-box" size={75} color={"green"} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}>
                                    <TouchableOpacity onPress={()=>{fetch("https://drone-3r75.onrender.com/left")
                                setReload(!reload)}} style={{ width: 100, alignItems: "center", justifyContent: "center", height: 100, borderRadius: 25, borderWidth: 1, borderColor: "green", backgroundColor: "#00ff0090" }}>
                                        <MaterialCommunityIcons name="menu-left-outline" size={75} color={"green"} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{fetch("https://drone-3r75.onrender.com/backward")
                                setReload(!reload)}} style={{ width: 100, alignItems: "center", justifyContent: "center", height: 100, borderRadius: 25, borderWidth: 1, borderColor: "green", backgroundColor: "#00ff0090" }}>
                                        <MaterialCommunityIcons name="menu-down-outline" size={75} color={"green"} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{fetch("https://drone-3r75.onrender.com/right")
                                setReload(!reload)}} style={{ width: 100, alignItems: "center", justifyContent: "center", height: 100, borderRadius: 25, borderWidth: 1, borderColor: "green", backgroundColor: "#00ff0090" }}>
                                        <MaterialCommunityIcons name="menu-right-outline" size={75} color={"green"} />
                                    </TouchableOpacity>
                                </View>
                                <Image key={new Date()} source={{ uri: `https://storage.googleapis.com/imagedata4rpi/camera.jpg?time=${new Date()}`, cache: "reload",  }} 
                    style={{ width: "90%", alignSelf: "center",marginTop: 10, borderRadius: 25, marginBottom: 10, height: 150 }} />
                                <Button onPress={() => setVisible(false)} mode='elevated' style={{ marginTop: 10, backgroundColor: "#229D3D" }} textColor='white'>Close</Button>
                            </>
                    }
                </Surface>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
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
    section: {
        width: "90%",
        minHeight: 115,
        backgroundColor: "#ffffff90",
        borderRadius: 25,
        marginTop: 25,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    farmername: {
        color: "black",
        fontFamily: "WorkSans-ExtraBold",
        fontSize: 24
    },
    phone: {
        color: "black",
        fontFamily: "WorkSans-Bold"
    },
    locationText: {
        color: "black",
        fontSize: 15,
        fontFamily: "WorkSans-Medium"
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
})