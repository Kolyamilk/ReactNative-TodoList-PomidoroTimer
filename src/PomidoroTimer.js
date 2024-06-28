import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, Button, ImageBackground } from 'react-native'

export const PomidoroTimer = () => {


    return (
        <View style={classes.container}>

            <ImageBackground resizeMode="cover" style={classes.image} source={require('../assets/pomidorka.png')}>
                <Text style={classes.text}>PLAY</Text>
            </ImageBackground>



        </View>
    )
}

const classes = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'

    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300
    },
    text: {
        fontSize: 40,
        color:'white'
    }

})