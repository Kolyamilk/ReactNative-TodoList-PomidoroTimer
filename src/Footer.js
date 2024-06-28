import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Button, ImageBackground } from 'react-native'

export const Footer = ({ changeTab }) => {



    return (

        <View style={styles.block}>
            <TouchableOpacity TouchableOpacity={0.2} onPress={() => changeTab('Todo List')}>
                <ImageBackground source={require('../assets/lyric.png')} style={styles.image} ></ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity TouchableOpacity={0.2} onPress={() => changeTab('Pomidoro Timer')}>
                <Image source={require('../assets/play.png')} style={styles.image} />
            </TouchableOpacity>
            

        </View >
    )
}
const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        alignItems: 'center',
        paddingBottom: 20

    },
    image: {
        width: 50,
        height: 50,
    }
})

