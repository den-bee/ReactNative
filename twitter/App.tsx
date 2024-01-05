import Constants from "expo-constants";
import { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TextInput } from 'react-native';
import { DataContext, DataProvider, Tweet } from './datacontext';

export const TweetComponent = ({tweet} : {tweet: Tweet}) => {

  return (
    <View style={styles.tweetContainer}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{uri: tweet.profile?.avatar}}/>
        <View>
          <Text style={styles.name}>{tweet.profile?.name}</Text>
          <Text style={styles.handle}>@{tweet.handle}</Text>
        </View>
      </View>
      
      <View>
        <Text>{tweet.text}</Text>
      </View>
    </View>
  )
}

export const TweetList = () => {
  const {tweets, loading, loadData} = useContext(DataContext);
  const [filterText, setFilterText] = useState("");

  const filteredTweets = tweets.filter(tweet => tweet.text.toUpperCase().includes(filterText.toUpperCase()) || tweet.handle.toUpperCase().includes(filterText.toUpperCase()));

  return (
    <View>
      <TextInput
        style={styles.filter}
        onChangeText={filterText => setFilterText(filterText)}
        value={filterText}
      />

      <FlatList
      data={filteredTweets}
      renderItem={({item}) => <TweetComponent tweet={item}/>}
      keyExtractor={item => item.id.toString()}
      refreshing={loading}
      onRefresh={() => loadData()}
      />
    </View>
  )
}

export default function App() {
  return (
    <DataProvider>
      <View style={styles.container}>
        <TweetList/>
      </View>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "#f5f5f5",
  },

  filter: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 3,
  },

  tweetContainer: {
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: "#ddd",
    borderWidth: 1,
  },

  avatarContainer: {
    flexDirection: "row"
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
  },

  handle: {
    fontSize: 14,
    fontWeight: "100",
  }
});
