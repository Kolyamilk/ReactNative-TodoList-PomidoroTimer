import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
export const Navbar = ({ title }) => {
    const [userName, setUserName] = useState('')
    return (
        <View style={classes.navbar}>

            <View style={classes.image}>
                <TouchableOpacity TouchableOpacity={0.2} >
                    <Image source={require('../assets/user.png')} style={classes.image} />
                    <Text style={classes.textUser}>{userName}</Text>
                </TouchableOpacity>

            </View>
            <View style={classes.text}>
                <Text style={classes.text}>{title}</Text>
            </View>
            <View />
        </View>
    )
}
const classes = StyleSheet.create({
    navbar: {
        height: 90,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: "row",
    },
    text: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 30,
    },
    textUser: {
        color: 'white',
        fontSize: 16,
        width: 400

    },
    image: {
        width: 40,
        height: 40,
    }
})