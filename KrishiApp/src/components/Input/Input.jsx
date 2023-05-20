import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native'

import React from 'react'

const index = (props) => {
    const windowHeight = Dimensions.get("screen").height;
    const formInputHeight = windowHeight * 0.5 * 0.1;

    return (
        <View style={styles.main}>
            <Text style={styles.formText}>{props.text}</Text>

            <View style={[styles.textInputWithIcon]} height={formInputHeight}>
               
                <TextInput
                    style={[styles.input]}
                    height={formInputHeight}
                    onChangeText={props.onChange}
                    value={props.value}
                    secureTextEntry = {props.password?true:false}
                    keyboardType={props.keyboardType ? props.keyboardType : null}
                    maxLength={props.maxLength ? props.maxLength : null}
                />
            </View>
        </View>
    )
}

export default index

const styles = StyleSheet.create({

    textInputWithIcon: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "#FEF9EF",
        width: '95%',
        height: 60,
        borderRadius: 15,
        opacity: 0.4,
    
      },
    
      formText: {
        fontFamily: "WorkSans-Medium",
        fontSize: 14,
        color: 'black',
        marginTop: '7%'
      },

    
    
     

      input: {
        width: "100%",
        fontFamily: 'WorkSans-SemiBold',
        fontSize: 24,
        color: '#229D3D',
        justifyContent: 'center',
        lineHeight: 30,
        letterSpacing: 1,
        padding: 0,
        margin: 0,
        marginTop: 8,
        marginLeft: 20,
        borderWidth: 0,
      },
})