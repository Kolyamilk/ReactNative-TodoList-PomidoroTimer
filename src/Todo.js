import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'

export const Todo = ({ todo, onRemove }) => {


    return (
        <>

            <View style={styles.todo} >
                <Text style={styles.text}>{todo.title}</Text>
                <TouchableOpacity
                    activeOpacity={0.}
                    onPress={onRemove.bind(null, todo.id)}
                >
                    <Image source={require('../assets/garbage.png')} style={styles.image} />
                </TouchableOpacity>
            </View>


        </>
    )
}

const styles = StyleSheet.create({
    todo: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        padding: 15,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        marginBottom: 10,
        
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
    image: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
    },
    text: {
        color: 'white'
    }
})