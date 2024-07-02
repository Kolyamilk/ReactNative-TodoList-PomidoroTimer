import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';
import { useKeepAwake } from 'expo-keep-awake';

export const PomidoroTimer = () => {
    const [mainTimer, setMainTimer] = useState(20 * 60);
    const [breakTimer, setBreakTimer] = useState(5 * 60);
    const [isActive, setIsActive] = useState(false);
    const [onBreak, setOnBreak] = useState(false);
    const intervalRef = useRef(null);
    const soundRef = useRef(null);

    useKeepAwake();

    useEffect(() => {
        const loadSound = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require('../assets/zvuk-na-sms-attractive-sms.mp3')
            );
            soundRef.current = sound;
        };

        loadSound();

        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, []);

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                if (onBreak) {
                    setBreakTimer(breakTimer => {
                        if (breakTimer === 1) {
                            playSound();
                            setIsActive(false);
                            setOnBreak(false);
                            setMainTimer(25 * 60);
                            setBreakTimer(5 * 60);
                            clearInterval(intervalRef.current);
                        }
                        return breakTimer - 1;
                    });
                } else {
                    setMainTimer(mainTimer => {
                        if (mainTimer === 1) {
                            playSound();
                            setOnBreak(true);
                        }
                        return mainTimer - 1;
                    });
                }
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isActive, onBreak]);

    const playSound = async () => {
        if (soundRef.current) {
            await soundRef.current.replayAsync();
        }
    };

    const toggle = () => {

        setIsActive(!isActive);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                resizeMode="cover"
                style={styles.imageStatus}
                source={isActive ? require('../assets/fad2e730bb3a7bb0ecea4e446e283920.gif') : require('../assets/pong-pause.gif')}
            />
            <Text style={styles.text}>{onBreak ? formatTime(breakTimer) : formatTime(mainTimer)}</Text>
            <TouchableOpacity onPress={toggle}>
                <ImageBackground
                    resizeMode="cover"
                    style={styles.image}
                    source={isActive ? require('../assets/pause.png') : require('../assets/play.png')}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 50,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'white'
    },
    title: {
        fontSize: 40,
        color: 'white',
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
    },
    imageStatus: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
        borderRadius: 150,
    },
    text: {
        fontSize: 100,
        color: 'white',
    },
});