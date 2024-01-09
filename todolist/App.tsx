import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Constants from "expo-constants";

interface Todo {
  id: number,
  text: string,
  date?: Date
}

interface TodoListProps {
  todos: Todo[]
}

const TodoComponent = ({todo} : {todo : Todo}) => {
  return (
    <Pressable onPress={() => {}}>
      <View style={styles.todoItem}>
        <Text>{todo.id}</Text>
        <Text>{todo.text}</Text>
      </View>
    </Pressable>
  )
}

const TodoList = ({todos} : TodoListProps) => {
  
  return (
    <View style={styles.todoList}>
      <FlatList
        data={todos}
        renderItem={({item}) => <TodoComponent todo={item}/>}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

export default function App() {
  const [todo, setTodo] = useState<string>("");
  const [idCounter, setIdCounter] = useState<number>(0);
  const [todoArray, setTodoArray] = useState<Todo[]>([{
    id: 0,
    text: "test"
  }])

  const addTodo = () => {
    setIdCounter(idCounter +1);
    setTodoArray([...todoArray, {
      id: idCounter,
      text: todo,
    }])
  }

  console.log(todoArray);

  return (
    <View style={styles.container}>
      <TodoList todos={todoArray}/>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          onChangeText={todo => setTodo(todo)}
          value={todo}
        />
          <Button
            title="Add todo"
            onPress={addTodo}
          />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 50,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center"
  },
  todoItem: {
    margin: 10,
    padding: 5,
    borderColor: "grey",
    borderWidth: 1,
  },
  todoList: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  }

});
