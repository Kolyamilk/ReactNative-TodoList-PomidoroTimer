import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, FlatList, Alert, Modal } from 'react-native';
import { Navbar } from './src/Navbar.js'
import { Footer } from './src/Footer.js';
import { PomidoroTimer } from './src/PomidoroTimer.js';
import { AddTodo } from './src/AddTodo.js'
import { Todo } from './src/Todo.js';
export default function App() {

  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('Main')
  const [todoListView, setTodoListView] = useState(false)
  const [pomidoroTimerView, setPomidoroTimerView] = useState(false)

  const changeTab = (name) => {
    if (name == 'Pomidoro Timer') {
      setTodoListView(false)
      setPomidoroTimerView(true)
      setTitle(name)
    }
    if (name == 'Todo List') {
      setTodoListView(true)
      setPomidoroTimerView(false)
      setTitle(name)
    }

  }
  const addTodo = (title) => {
    setTodos(prev => [...prev,
    {
      id: Date.now().toString(),
      title
    }])
  }
  const removeTodo = id => {
    setTodos(prev => prev.filter(todo => todo.id != id))
  }

  return (
    <LinearGradient
      colors={['black', 'black']}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 1.0, y: 0.0 }}
    >
      <View>
        <Navbar title={title} />
        <View style={styles.container}>
          {todoListView ?
            <>
              <FlatList
                keyExtractor={(item) => item.id}
                data={todos}
                renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo} />} />
              <AddTodo onSubmit={addTodo} />
            </> : null}

          {pomidoroTimerView ?
            <>
              <PomidoroTimer />
            </> : null}
        </View>

        <StatusBar style='inverted' />
        <Footer changeTab={changeTab} />
      </View>

    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    height: '85%',
  }
});