import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Button, Alert, Image, TouchableOpacity } from 'react-native'

export const AddTodo = ({ onSubmit }) => {
    const [value, setValue] = useState('')
    const pressHandler = () => {
        if (value.trim()) {
            onSubmit(value)
            setValue('')
        } else {
            Alert.alert('Название дела не может быть пустым')
        }
    }

    return (
        <View style={styles.block}>
            <TextInput
                style={styles.input}
                onChangeText={setValue}
                value={value}
                placeholder='Напиши задание'
                placeholderTextColor="gray"
                autoCapitalize='sentences'
                cursorColor={'orange'}
                keyboardType='url'

            />
            <TouchableOpacity
                activeOpacity={0.}
                onPress={pressHandler}
            >
                <Image source={require('../assets/plus.png')} style={styles.image} />
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    block: {

        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
        marginBottom: 70

    },
    input: {
        width: '80%',
        borderTopWidth: 0.2,
        borderLeftWidth: 0.2,
        borderBottomWidth: 0.2,
        borderRightWidth: 0.2,
        borderColor: 'orange',
        fontSize: 18,
        padding: 10,
        color: 'white',
    },
    image: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
    }
})
