import { View, Text, Image, StyleSheet } from 'react-native'
import { useState, useCallback, useEffect } from 'react'
import Header from '../../components/Header'
import SunPlant from '../../assets/pictures/plantSun.png'
import { GiftedChat } from 'react-native-gifted-chat'
import { preProcessFile } from 'typescript'
import { t } from '../../utils/language'
import { useSelector } from 'react-redux'

export default function Chat(props) {
    const language = useSelector(state=>state.language.language)
    const [messages, setMessages] = useState([]);
    const onSend = useCallback((messages = []) => {
        console.log(messages)
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        fetch(`http://34.131.250.30:8000/users/chat/?query=${messages[0]['text']}&lang=${language}`)
            .then(res => res.json())
            .then(res => {
                setMessages(previousMessages => GiftedChat.append(previousMessages, {
                    "_id": new Date().toISOString(),
                    "createdAt": new Date().toISOString(),
                    "text": res.data,
                    "user": {
                        _id: 2,
                        name: 'React Native',
                        avatar: "https://cdn-icons-png.flaticon.com/128/2870/2870898.png",
                    }
                }))
            })
    }, [])

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: t[language]["Greet"],
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: "https://cdn-icons-png.flaticon.com/128/2870/2870898.png",
                },
            },
        ])
        console.log(messages)
    }, [])

    return (
        <View style={styles.mainContainer}>
            <Header title={t[language]["Friend"]} />
            <GiftedChat
                textInputProps={{color:"black"}}
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#8BDED1',
        height: '100%',
        // alignItems: 'center',
        color:"black"

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
    }
})