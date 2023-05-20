import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import wheat from '../../assets/pictures/wheat.jpg'
import SunPlant from '../../assets/pictures/plantSun.png'
import Thermometer from '../../assets/pictures/Thermometer.png'
import Hygrometer from '../../assets/pictures/Hygrometer.png'
import pH from '../../assets/pictures/pH.png'
import nitro from '../../assets/pictures/N.png'
import Potassium from '../../assets/pictures/K.png'
import Phosphorous from '../../assets/pictures/P.png'
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import { useDispatch, useSelector } from 'react-redux';
import { t } from '../../utils/language';
import { update } from '../../redux/reducers/crop';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { update2 } from '../../redux/reducers/npk';
import { ActivityIndicator } from 'react-native-paper';


const DashBoard = ({ navigation, route }) => {
    const language = useSelector(state => state.language.language);
    const nitrogen = useSelector(state => state.npk.n)
    const phosphorus = useSelector(state => state.npk.p)
    const potassium = useSelector(state => state.npk.k)

    const [npkdata, setNPK] = useState([
        {
            name: t[language]['Nitrogen'],
            population: Math.random() * 45,
            color: "#228c22",
            legendFontColor: "#013220",
            legendFontSize: 15
        },
        {
            name: t[language]['Potassium'],
            population: Math.random() * 45,
            color: "#8fd400",
            legendFontColor: "#013220",
            legendFontSize: 15
        },
        {
            name: t[language]['Phosphorous'],
            population: Math.random() * 45,
            color: "#d0f0c0",
            legendFontColor: "#013220",
            legendFontSize: 15
        }
    ])

    const microNutrients = {
        labels: ["Carbon", "Copper", "Calcium", "Magnesium"],
        datasets: [
            {
                data: [
                    80 * Math.random(),
                    80 * Math.random(),
                    80 * Math.random(),
                    80 * Math.random(),
                ]
            }
        ]
    };

    const today = new Date()
    console.log(today.getDate())
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]

    const data = {
        labels: [
            new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6).toDateString().split(" ")[0], ,
            new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5).toDateString().split(" ")[0], ,
            new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4).toDateString().split(" ")[0], ,
            new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3).toDateString().split(" ")[0], ,
            new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2).toDateString().split(" ")[0], ,
            new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toDateString().split(" ")[0], ,
            today.toDateString().split(" ")[0]
        ],
        datasets: [
            {
                data: [39.5, 38, 42.3, 37, 40, 41, 42],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Temperature"] // optional
    };
    const data2 = {
        labels: [
            new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6).toDateString().split(" ")[0], ,
            new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5).toDateString().split(" ")[0], ,
            new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4).toDateString().split(" ")[0], ,
            new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3).toDateString().split(" ")[0], ,
            new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2).toDateString().split(" ")[0], ,
            new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toDateString().split(" ")[0], ,
            today.toDateString().split(" ")[0]
        ],
        datasets: [
            {
                data: [45.7, 54.6, 62.3, 78.8, 65, 67, 48],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Humidity"] // optional
    };

    const chartConfig = {
        backgroundGradientFrom: "white",
        backgroundGradientFromOpacity: 0.5,
        backgroundGradientTo: "white",
        backgroundGradientToOpacity: 0.5,
        color: () => "#138808",
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };
    const dispatch = useDispatch()
    const model1 = useSelector(state => state.ml.model1)
    const model2 = useSelector(state => state.ml.model2)

    useEffect(() => {
        var data1 ="", data2 ="";
        fetch(`http://34.131.250.30:8000/soil/crop_pred/?nitrogen=${Math.random() * 80}&phosphorous=${Math.random() * 80}&potassium=${Math.random() * 80}&temperature=34&humidity=45&ph=7&rainfall=45`)
            .then(res => res.json())
            .then(res => {
                data1 = res.data
            })
            .then(()=>{
                fetch(`http://34.131.250.30:8000/soil/fert_pred/`)
                .then(res => res.json())
                .then(res => dispatch(update({
                    model1: data1,
                    model2: res.data
                })))
            })
        fetch()
        fetch("http://34.131.250.30:8000/soil/oneyearplan/?nutrient=Potassium")
            .then(res => res.json())
            .then(res => {
                var data = []
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i]['Potassium'] != null) {
                        data.push(res.data[i]['Potassium'])
                    } else {
                        data.push(res.data[i]['prediction_label'])
                    }
                }
                console.log(data)
                dispatch(update2({
                    n: {
                        labels: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
                        datasets: [
                            {
                                "data": data
                            }
                        ]
                    }
                }))
            })
            .then(_ => console.log(nitrogen))
    }, [])

    const [live, setLive] = useState({
        n: 173,
        p: 187,
        k: 13
    })
    useEffect(() => {
        // setInterval(() => {
        //     setLive({
        //         n: Number(Math.random() * 40).toFixed(1),
        //         p: Number(Math.random() * 40).toFixed(1),
        //         k: Number(Math.random() * 40).toFixed(1),
        //     })
        // }, 5000)
    }, [])
    const tablenpk = {
        tableHead: ['Day Before', 'NPK', 'pH', 'Temp'],
        tableData: [
            ['1', '2.4:1:5', '7.5', '42'],
            ['2', '3.7:2:4', '7.4', '41'],
            ['3', '3:1.5:4.5', '7.6', '40'],
            ['4', '1.4:1:3', '7.2', '37']
            ['5', '3.7:2:4', '7.4', '41'],
            ['6', '3:1.5:4.5', '7.6', '40'],
            ['7', '3:1.5:4.5', '7.6', '40'],
        ]
    }

    return (
        <View style={styles.mainContainer}>

            <Image source={SunPlant} style={styles.bgImage} />
            <View style={styles.InnerMain}>
                {/* <Image source = {wheat} style={styles.wheatImage}/> */}
                <View style={styles.text}>
                    <Text style={styles.mainText}>{route.params?.title}</Text>
                    {/* <Text style={styles.paraText}>Wheat is a cereal grain that is one of the most widely cultivated and consumed crops in the world. It is a staple food for millions of people and is used in a variety of products, such as bread, pasta, and breakfast cereals.</Text> */}
                </View>
            </View>
            <ScrollView>

                <Text style={styles.heading}>{t[language]["Macro Nutrients"]}</Text>
                <PieChart
                    data={npkdata}
                    width={400}
                    height={150}
                    chartConfig={chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    center={[20, 0]}
                // absolute
                />
                <Text style={styles.heading}>{t[language]["Micro Nutrients"]}</Text>
                <BarChart
                    //   style={graphStyle}
                    data={microNutrients}
                    width={380}
                    height={180}
                    chartConfig={chartConfig}
                    verticalLabelRotation={5}
                />
                <Text style={styles.heading}>{t[language]["Crop Status"]}</Text>
                <Image key={new Date()} source={{ uri: `https://storage.googleapis.com/imagedata4rpi/orignal_imgs/rpi001.png?time=${new Date()}`, cache: "reload",  }} 
                    style={{ width: "90%", alignSelf: "center", borderRadius: 25, marginBottom: 10, height: 150 }} />
                <Image source={{ uri: `https://storage.googleapis.com/imagedata4rpi/contrasted_imgs/rpi001.png?time=${new Date()}` }}
                    style={{ width: "90%", alignSelf: "center", borderRadius: 25, marginBottom: 10, height: 150 }} />
                <Image source={{ uri: `https://storage.googleapis.com/imagedata4rpi/colormapped_imgs/rpi001.png?time=${new Date()}` }}
                    style={{ width: "90%", alignSelf: "center", borderRadius: 25, marginBottom: 10, height: 150 }} />
                <Image source={{ uri: `https://storage.googleapis.com/imagedata4rpi/NDVI_contrasted_imgs/rpi001.png?time=${new Date()}` }}
                    style={{ width: "90%", alignSelf: "center", borderRadius: 25, marginBottom: 10, height: 150 }} />
                <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                    <View style={styles.card}>
                        <Text style={styles.cardText}>NDVI value</Text>
                        <Text style={styles.cardVal}>{Number(Math.random()*0.3).toFixed(2)}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardText}>Overall Plant Health</Text>
                        <Text style={styles.cardVal}>UnHealthy</Text>
                    </View>
                </View>
                <Text style={styles.heading}>AI</Text>
                <View style={[styles.card, { width: "92%" }]}>
                    <Text style={styles.cardText}>Next Crop to retain soil Value</Text>
                    <Text style={styles.cardVal}>{model1}</Text>
                </View>
                <View style={[styles.card, { width: "92%" }]}>
                    <Text style={styles.cardText}>AI Fertilizer Prediction</Text>
                    <Text style={styles.cardVal}>{model2}</Text>
                </View>
                {/* <View style={[styles.card, { width: "92%" }]}>
                    <Text style={styles.cardText}>NDVI</Text>
                    <Text style={styles.cardVal}>0.89</Text>
                </View> */}
                <Text style={styles.heading}>Live Status</Text>
                <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>

                    <View style={[styles.card, { width: "28%", alignItems: "center" }]}>
                        <Text style={[styles.cardVal, { marginLeft: 0, fontSize: 42 }]}>N</Text>
                        <Text style={[styles.cardText, { fontSize: 32, marginTop: -20, marginLeft: 0 }]}>{live.n}</Text>
                    </View>
                    <View style={[styles.card, { width: "28%", alignItems: "center" }]}>
                        <Text style={[styles.cardVal, { marginLeft: 0, fontSize: 42 }]}>P</Text>
                        <Text style={[styles.cardText, { fontSize: 32, marginTop: -20, marginLeft: 0 }]}>{live.p}</Text>
                    </View>
                    <View style={[styles.card, { width: "28%", alignItems: "center" }]}>
                        <Text style={[styles.cardVal, { marginLeft: 0, fontSize: 42 }]}>K</Text>
                        <Text style={[styles.cardText, { fontSize: 32, marginTop: -20, marginLeft: 0 }]}>{live.k}</Text>
                    </View>
                </View>

                <Text style={styles.heading}>{t[language]["Weather Condition"]}</Text>
                <LineChart
                    data={data}
                    width={400}
                    height={256}
                    verticalLabelRotation={5}
                    chartConfig={chartConfig}
                    bezier
                />
                <LineChart
                    data={data2}
                    width={400}
                    height={256}
                    verticalLabelRotation={5}
                    chartConfig={chartConfig}
                    bezier
                />
                <Text style={styles.heading}>{"Past Data"}</Text>
                <Table borderStyle={{ borderWidth: 1, borderColor: 'green' }} style={{ marginHorizontal: 20 }}>
                    <Row data={tablenpk.tableHead} style={styles.tablehead} textStyle={styles.tablehead} />
                    <Rows data={tablenpk.tableData} textStyle={styles.tabletext} />
                </Table>
                <Text style={styles.heading}>One Year Prediction</Text>
                <Text style={[styles.heading, {fontSize: 15}]}>Nitrogen</Text>
                
                {nitrogen == null ? <ActivityIndicator /> : <LineChart
                    data={{
                        labels: ["2010", "2012", "2013", "2015", "2016", "2017", "2018", "2020", "2021", "2022", "2023"],
                        datasets: [
                            {
                                "data": [95.5077303061, 242.4321481345, 186.6584551619, 152.6579134702, 39.7847533128, 39.7786026857, 14.8113211029, 220.8749171726, 153.2843279945, 180.558507338, 5.2490460454, 247.3270123013, 212.2728734041, 54.146473223, 46.3653666378, 46.7681500126, 77.5817719547, 133.8128900662, 110.1459797537, 74.2634307505, 156.0224881542, 35.5709344663, 74.4968853765, 93.4222700399, 116.2978459753, 200.2198701552, 50.9168144504, 131.1297817955, 151.0657150598, 11.8448552436, 154.9239372349, 43.4836515403, 16.5881562112, 241.9658119996, 246.236168434, 206.1413237697, 77.6765111392, 24.9063890716, 174.4794217606, 112.2388859036, 31.1197498854, 126.2701120784, 8.7690728844, 231.8767025301, 65.988895308, 168.9431825103, 79.4863244028, 132.6173454003, 139.4111212325, 47.137886159, 247.24408008, 197.6588699571, 239.5722300989, 228.1809743591, 152.4644945968, 235.0779299309, 22.5655880232, 49.9756299169, 11.5329586722, 82.9592343446, 99.1127088708, 69.1940031023, 211.3280648337, 90.9720983069, 71.6382999703, 138.3875012054, 35.9356773686, 204.5602300923, 19.0104141383, 251.6561688331, 196.9224161706, 50.6724987912, 1.4081398665, 207.942664256, 180.2486226811, 185.8968278505, 196.6739384049, 18.8813861922, 91.4087607788, 29.5466101789, 220.0913735983, 158.941022341, 84.3789963374, 16.2073793229, 79.3004920375, 82.9217471168, 186.0495754762, 162.5771551956, 226.239249357, 120.4148059163, 30.4965327143, 181.8774207419, 194.0001873973, 143.1256853802, 196.5966308884, 125.9178770729, 112.7272720337, 117.3032073975, 149.0689086914, 150.2971496582, 129.6111297607, 101.3677520752, 83.9260864258, 123.5902404785, 135.9472198486, 146.8097076416, 128.9533996582, 128.9533996582],
                                // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                                strokeWidth: 1
                            }
                        ]
                    }}
                    width={400}
                    height={256}
                    verticalLabelRotation={5}
                    chartConfig={chartConfig}
                    bezier
                    />}
                    <Text style={[styles.heading, {fontSize: 15}]}>Phosphorous</Text>
                {phosphorus == null ? <ActivityIndicator /> : <LineChart
                    data={{
                        labels: ["2010", "2012", "2013", "2015", "2016", "2017", "2018", "2020", "2021", "2022", "2023"],
                        datasets: [
                            {
                                "data": [133.2968714924, 109.0229596814, 6.4818773197, 27.5123138833, 8.0144423501, 162.2846548723, 80.1607751745, 129.685526247, 231.4294508512, 63.569518433, 104.6476453741, 192.6655403285, 58.3435322004, 19.6298770063, 73.886620493, 41.1114282498, 237.0729013474, 206.0706967889, 161.5179579102, 222.2224504979, 204.9363796093, 47.5753650159, 227.6025446149, 137.5322716885, 205.8972395668, 228.5032814805, 81.0908861178, 28.0632407546, 58.1234664482, 108.9124860997, 208.5937653102, 219.4862987304, 1.7727932855, 130.2405621573, 106.4398058029, 56.63749167, 30.5656686701, 86.0918687079, 240.4419744977, 82.4167476653, 132.2916085446, 179.2698345183, 92.7255486067, 247.8044310938, 245.4240602102, 64.2044854355, 126.7983690026, 76.7239690033, 72.6343260663, 9.4061715754, 155.4389051649, 128.1831509234, 13.1270815687, 71.0548483803, 231.6078009215, 61.0882821201, 36.9481923833, 124.8104538708, 251.3408657982, 61.7240942354, 171.3945645885, 194.2130019088, 60.5975737181, 185.695168896, 93.7846988434, 161.2379868014, 161.550076244, 136.6225444391, 23.0238913639, 213.0021363753, 81.7989165678, 47.562220152, 10.3976610965, 150.677700513, 172.7789122698, 4.2298963766, 130.5837298663, 57.7564226755, 164.5190615544, 44.4634393963, 176.1891232161, 98.6175133066, 238.8661471279, 35.0678407572, 86.9719195178, 28.9357479164, 235.796872661, 223.7215351122, 65.7751150674, 168.2959317387, 208.3916610513, 141.5762069579, 135.0608974808, 61.6723341796, 23.7412057905, 228.7900182781, 109.1881790161, 109.1881790161, 122.9945602417, 100.8497695923, 99.1086807251, 134.8062744141, 156.6474914551, 135.0643615723, 120.5381698608, 93.142074585, 98.3030090332, 98.5383605957],
                                // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                                strokeWidth: 1
                            }
                        ]
                    }}
                    width={400}
                    height={256}
                    verticalLabelRotation={5}
                    chartConfig={chartConfig}
                    bezier
                    />}
                    <Text style={[styles.heading, {fontSize: 15}]}>Potassium</Text>
                {potassium == null ? <ActivityIndicator /> : <LineChart
                    data={{
                        labels: ["2010", "2012", "2013", "2015", "2016", "2017", "2018", "2020", "2021", "2022", "2023"],
                        datasets: [
                            {
                                "data": [229.6066045766, 161.4408716047, 86.4525967174, 89.0484415262, 185.1186981119, 228.7631162879, 226.2070381876, 198.8682641937, 163.7180697693, 21.4556910737, 41.2153220941, 229.1313180744, 154.6394102132, 2.3452481622, 25.8752434308, 169.1929511226, 1.2907038808, 41.0060531115, 139.9271162885, 176.4332754116, 166.2501211732, 57.1886739124, 181.6057014436, 60.4985173117, 82.9769230306, 190.3553083051, 165.656389257, 216.551969676, 167.6912875366, 144.9186938505, 23.8870657962, 93.7675297802, 67.6266037588, 62.2173590617, 248.1176914619, 100.23991979, 227.4718715702, 160.9403496293, 202.6768824031, 128.1724587418, 147.1104905797, 125.5920119238, 49.7869618885, 184.2252893917, 71.5969524224, 6.20057144, 164.5954354563, 45.1632232488, 239.81693901, 243.2517871357, 233.2904195062, 94.3904685651, 3.9414372149, 236.7212334599, 109.1869578209, 246.4969788561, 245.7230941578, 217.5174111442, 75.0844674777, 98.1999207935, 217.0398512368, 80.8151113149, 43.220650405, 141.9843219269, 238.719467411, 177.4875981521, 145.3655983728, 24.7800059115, 156.8268428083, 252.4637317766, 35.7214238853, 132.1740613528, 223.7301333416, 188.8959975273, 177.7390139538, 179.1334414167, 91.670243561, 74.8659202874, 206.387094647, 206.5789156432, 221.1034412379, 232.8763409019, 130.3923117095, 127.8866551452, 203.5652706365, 165.7408023483, 179.0015537007, 202.9271307062, 226.9513621635, 86.1887649971, 95.7736529232, 23.9653946594, 147.461435954, 9.1652798182, 118.7274946238, 138.3743818504, 178.3269348145, 177.7024688721, 151.077835083, 155.8338470459, 122.104133606, 126.2733764648, 121.5268783569, 118.5001983643, 120.6975631714, 108.1918334961, 96.7700805664, 100.7288894653],
                                // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                                strokeWidth: 1
                            }
                        ]
                    }}
                    width={400}
                    height={256}
                    verticalLabelRotation={5}
                    chartConfig={chartConfig}
                    bezier
                />}
            </ScrollView>
        </View>
    )
}



const styles = StyleSheet.create({
    heading: {
        alignSelf: "flex-start",
        marginLeft: 20,
        fontFamily: "WorkSans-ExtraBold",
        color: "#00000090",
        fontSize: 18,
        marginTop: 25,
        marginBottom: 10,
    },
    mainContainer: {
        backgroundColor: '#8BDED1',
        height: '100%',
        alignItems: 'center',
    },
    atHome: {
        fontSize: 18,
        fontFamily: 'WorkSans-Medium',
        color: 'black',
        display: 'flex',
        flexDirection: 'row',
        marginTop: '5%'
    },
    atHomeResult: {
        fontSize: 32,
        fontFamily: 'Worksans-Bold',
        color: 'black',
        display: 'flex',
        flexDirection: 'row',
        marginTop: '5%'
    },
    health: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '10%',
        justifyContent: 'space-between'
    },
    party: {
        width: '90%',
        marginTop: "5%"
    },
    dataRow: {
        textAlign: "left",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '5%',
    },
    currVal: {
        color: 'black',
        fontFamily: 'WorkSans-SemiBold'
    },
    dataText: {
        fontSize: 15,
        fontFamily: 'WorkSans-Regular',
        color: 'black',
        textAlign: 'left'
    },
    range: {
        color: '#0C2F15',
        opacity: 0.6,
        fontFamily: 'Worksans-Bold',
        fontSize: 15
    },
    text: {
        marginTop: 10,
        backgroundColor: 'white',
        width: '100%',
        marginBottom: '5%'
    },
    mainText: {
        fontSize: 32,
        fontFamily: 'WorkSans-SemiBold',
        color: 'black',
        alignSelf: 'flex-start'
    },
    paraText: {
        fontSize: 12,
        fontFamily: 'WorkSans-Light',
        color: 'black'
    },
    wheatImage: {
        width: '50%',
        height: '50%',
        zIndex: 20,
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

    InnerMain: {
        width: "100%",
        alignItems: 'center',
        paddingHorizontal: '10%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    card: {
        width: "44%",
        borderColor: "#299617",
        borderWidth: 1,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 0,
        minHeight: 50,
        backgroundColor: "#00ff0040",
        borderRadius: 25
    },
    cardText: {
        fontFamily: "WorkSans-Black",
        fontWeight: "700",
        fontSize: 16,
        marginLeft: 20,
        marginTop: 5,
        color: "#00563f",
        letterSpacing: -1
    },
    cardVal: {
        marginTop: -5,
        fontFamily: "WorkSans-ExtraBold",
        fontSize: 28,
        paddingBottom: 15,
        paddingTop: 15,
        marginLeft: 20,
        color: "#013220",
        letterSpacing: -1
    },
    tablehead: {
        color: "black",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
        fontFamily: "WorkSans-Medium"
    },
    tabletext: {
        textAlign: "center",
        color: "black",
        fontSize: 15,
        fontWeight: "400",
        fontFamily: "WorkSans-Medium"
    }
})

export default DashBoard