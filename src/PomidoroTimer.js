import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'



export const PomidoroTimer = () => {
    const [mainTimer, setMainTimer] = useState(1 * 60);
    const [breakTimer, setBreakTimer] = useState(5 * 60);
    const [isActive, setIsActive] = useState(false);
    const [onBreak, setOnBreak] = useState(false);
    const [title, setTitle] = useState('')



    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                if (!onBreak && mainTimer > 0) {
                    setMainTimer(mainTimer => mainTimer - 1)
                } else if (!onBreak && mainTimer === 0) {
                    setOnBreak(true)
                } else if (onBreak && breakTimer > 0) {
                    setBreakTimer(breakTimer => breakTimer - 1)
                } else if (onBreak && breakTimer === 0) {
                    setIsActive(false);

                    setOnBreak(false);
                    setMainTimer(25 * 60);
                    setBreakTimer(5 * 60);
                }
            }, 1000);
        } else if (!isActive && (mainTimer !== 0 || breakTimer !== 0)) {
            clearInterval(interval);

        }
        return () => clearInterval(interval);
    }, [isActive, mainTimer, breakTimer, onBreak]);


    const toggle = () => {
        isActive ? setTitle('Остановка') : setTitle('Идёт работа')
        setIsActive(!isActive)
    };
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    return (
        <View style={classes.container}>


            <ImageBackground resizeMode="cover" style={classes.imageStatus} source={isActive ? require('../assets/fad2e730bb3a7bb0ecea4e446e283920.gif') : require('../assets/pong-pause.gif')}>
            </ImageBackground>

            <Text style={classes.text}>{onBreak ? formatTime(breakTimer) : formatTime(mainTimer)}</Text>
            <TouchableOpacity onPress={toggle}>
                <ImageBackground resizeMode="cover" style={classes.image} source={isActive ? require('../assets/pause.png') : require('../assets/play.png')}>
                </ImageBackground>
            </TouchableOpacity>


        </View>
    )
}

const classes = StyleSheet.create({
    container: {
        flexDirection: '',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'

    },
    title: {
        fontSize: 40,
        color: 'white'
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100
    },
    imageStatus: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
        borderRadius: 50
    },

    text: {
        fontSize: 100,
        color: 'white'
    }
});