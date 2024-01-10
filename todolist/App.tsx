import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface Todo {
  id: number,
  text: string,
  done: boolean, 
  finishedAt?: number,
}

interface TodoComponentProps {
  todo: Todo,
  toggleDone: (todo: Todo) => void,
  removeTodo: (todo: Todo) => void
}

interface TodoListProps {
  todos: Todo[],
  toggleDone: (todo: Todo) => void,
  removeTodo: (todo: Todo) => void
}

const TodoComponent = ({todo, toggleDone, removeTodo} : TodoComponentProps) => {
  return (
    <Pressable 
      onPress={() => toggleDone(todo)}
      onLongPress={() => removeTodo(todo)}
    >
      <View style={styles.todoItem}>
        <Text>{todo.id}</Text>
        <Text style={{textDecorationLine: todo.done? "line-through" : "none"}}>{todo.text}</Text>
        {todo.done && <Text>Task completed on: {new Date(todo.finishedAt!).toDateString()} at {new Date(todo.finishedAt!).toLocaleDateString()}</Text>}
      </View>
    </Pressable>
  )
}

const TodoList = ({todos, toggleDone, removeTodo} : TodoListProps) => {
  
  return (
    <View style={styles.todoList}>
      <FlatList
        data={todos}
        renderItem={({item}) => <TodoComponent todo={item} toggleDone={toggleDone} removeTodo={removeTodo}/>}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

export default function App() {
  const [todo, setTodo] = useState<string>("");
  const [idCounter, setIdCounter] = useState<number>(0);
  const [todoArray, setTodoArray] = useState<Todo[] | undefined>([{
    id: 0,
    text: "test",
    done: false
  }])

  const toggleDone = (todo: Todo) => {
    let newTodos = todoArray!.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          done: !t.done,
          finishedAt: t.done ? undefined : new Date().getTime()
        }
      } else {
        return t;
      }
    }) 
    
    setTodoArray(newTodos);
  }

  const removeTodo = (todo: Todo) => {
    let newTodos = todoArray!.filter((t) => t.id !== todo.id);

    setTodoArray(newTodos);
  }

  const addTodo = () => {
    if (!todoArray) {
      return;
    }

    setIdCounter(idCounter +1);

    let newTodos = [...todoArray, {
      id: idCounter,
      text: todo,
      done: false,
    }];
    
    setTodoArray(newTodos);
    setTodo("");
  }

  useEffect(() => {
    const saveToStorage = async () => {
      await AsyncStorage.setItem("todos", JSON.stringify(todoArray));
    }
    if(todoArray) {
      saveToStorage();
    }
  }, [todoArray]);

  useEffect(() => {
    const loadFromStorage = async () => {
      let todos = await AsyncStorage.getItem("todos");
      if(todos) {
        setTodoArray(JSON.parse(todos));
      } else {
        setTodoArray([]);
      }
    }
    loadFromStorage();
  }, []);

  if(!todoArray) {
    return (
      <View/>
    )
  }

  return (
    <View style={styles.container}>
      <TodoList todos={todoArray!} toggleDone={toggleDone} removeTodo={removeTodo}/>
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
    textAlign: "center",
    borderRadius: 5
  },
  todoItem: {
    margin: 10,
    padding: 5,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5
  },
  todoList: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  }

});
