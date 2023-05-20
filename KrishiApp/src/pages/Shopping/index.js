import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Linking } from 'react-native'
import { useState, useCallback, useEffect } from 'react'
import Header from '../../components/Header'
import SunPlant from '../../assets/pictures/plantSun.png'
import { GiftedChat } from 'react-native-gifted-chat'
import { preProcessFile } from 'typescript'
import { t } from '../../utils/language'
import { useSelector } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Card, Button } from 'react-native-paper'

export default function Market(props) {
    const [item, setItem] = useState("")
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState(null)
    const language = useSelector(state => state.language.language)
    const params = {
        api_key: "9630FD06EA994EC79004F9630B3A27D1",
        type: "search",
        amazon_domain: "amazon.com",
        search_term: "memory cards",
        sort_by: "price_high_to_low"
    }

    // make the http GET request to Rainforest API
    function fetchProducts() {
        setLoading(true)
        fetch(`https://api.rainforestapi.com/request?api_key=9630FD06EA994EC79004F9630B3A27D1&type=search&amazon_domain=amazon.in&search_term=${item}`)
            .then(res => res.json())
            .then(res => setResults(res['search_results']))
            .then(res => setLoading(false))
    }
    return (
        <View style={styles.mainContainer}>
            <Header title={t[language]["Shopping"]} />
            <View style={{ flexDirection: "row" }}>
                <TextInput value={item} onChangeText={val => setItem(val)} style={styles.searchbar} placeholder={t[language]['Search']} placeholderTextColor={"black"} />
                <TouchableOpacity style={{ marginTop: 10, backgroundColor: "green", borderTopRightRadius: 100, borderBottomRightRadius: 100, padding: 10 }} onPress={fetchProducts}>
                    <MaterialCommunityIcons name='search-web' size={32} color={"white"} />
                </TouchableOpacity>
            </View>
            {
                results == null && loading === false ? <Text style={{ alignSelf: "center", marginTop: 300, fontSize: 32, fontFamily: "WorkSans-Medium", letterSpacing: -2 }}>Search for a product</Text> : null
            }
            {
                loading === true ? <ActivityIndicator color={"green"} size={"large"} /> : null
            }
            <ScrollView style={{marginTop: 20}}>

                {
                    results !== null && results !== undefined && (
                        results.map(val => (
                            <Card style={{width:"95%", alignSelf:"center", marginVertical: 5, }}>
                                <Card.Title titleNumberOfLines={3} left={()=>(<MaterialCommunityIcons name="barn" size={40} color={"green"} />)} title={val.title} subtitle={val.rating !== undefined ? `${val.rating} ⭐`:""} />
                                <Card.Cover source={{ uri: val.image }} />
                                <Card.Actions>
                                    <Button textColor='green'>{val.sponsored === true ? `Sponsored ${val.rating != undefined ? `| Rating :${val.rating}`:""}`:`New Product ${val.rating != undefined ? `| Rating :${val.rating}`:""}`}</Button>
                                    <Button buttonColor='green' onPress={()=>Linking.openURL(val.link)}>{val.prices === undefined ? 0 : val.prices[0].raw}</Button>
                                </Card.Actions>
                            </Card>
                        ))
                    )
                }
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#8BDED1',
        height: '100%',
        // alignItems: 'center',
        color: "black"

    },
    searchbar: {
        width: "80%",
        backgroundColor: "white",
        marginTop: 10,
        marginLeft: 15,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        borderRadius: 0,
        borderRadius: 0,
        borderWidth: 0.5,
        borderColor: "green",
        paddingLeft: 20,
        fontSize: 20,
        color: "black"
    }
})