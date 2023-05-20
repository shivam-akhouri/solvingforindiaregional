import { View, Text, StyleSheet, Image } from "react-native";
import SunPlant from '../../assets/pictures/plantSun.png'

export default function Header(props){
    return (
        <View style={styles.header}>
            <Image source={SunPlant} style={{width: 50, height: 50, backgroundColor:"#229D3D80"}}/>
            <Text style={styles.headerText}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width: "100%",
        backgroundColor:"#229D3D",
        paddingBottom: 10,
        paddingTop: 10,
        borderBottomRightRadius: 50,
        paddingLeft: 20,
        flexDirection:"row",
        alignItems:"center"
    },
    headerText:{
        fontFamily:"WorkSans-ExtraBold",
        letterSpacing: -1,
        color:"white",
        fontSize: 24,
        paddingLeft: 10
    },
})