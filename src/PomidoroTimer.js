import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity,  ImageBackground} from 'react-native'



export const PomidoroTimer = () => {
    const [mainTimer, setMainTimer] = useState(25 * 60);
    const [breakTimer, setBreakTimer] = useState(5 * 60);
    const [isActive, setIsActive] = useState(false);
    const [onBreak, setOnBreak] = useState(false);



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


    const toggle = () => setIsActive(!isActive);



    
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    return (
        <View style={classes.container}>
        
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
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100
    },
    text: {
        fontSize: 100,
        color: 'white'
    }
});