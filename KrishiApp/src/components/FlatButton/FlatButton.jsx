import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native"; 

const FlatButton = (props) =>  {
    return(
        <TouchableOpacity onPress = {props.onPress}>
            <View style={props.buttonStyle}>
                <Text style={props.textStyle}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}



export default FlatButton