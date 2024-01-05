import Constants from "expo-constants";
import { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TextInput, Pressable } from 'react-native';
import { DataContext, DataProvider, Tweet } from '../../../datacontext';
import { useRouter } from "expo-router";

export const TweetComponent = ({tweet} : {tweet: Tweet}) => {
  const router = useRouter();

  return (
    <View style={styles.tweetContainer}>
      <Pressable onPress={() => {router.push("/" + tweet.profile?.handle)}}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={{uri: tweet.profile?.avatar}}/>
          <View>
            <Text style={styles.name}>{tweet.profile?.name}</Text>
            <Text style={styles.handle}>@{tweet.handle}</Text>
          </View>
        </View>
      </Pressable>
      
      <View>
        <Text>{tweet.text}</Text>
      </View>
    </View>
  )
}

export const TweetList = ({tweets, profiles, loading, loadData} : DataContext) => {
  
  return (
    <View>
      <FlatList
      data={tweets}
      renderItem={({item}) => <TweetComponent tweet={item}/>}
      keyExtractor={item => item.id.toString()}
      refreshing={loading}
      onRefresh={() => loadData()}
      />
    </View>
  )
}

export default function Home() {
  const {tweets, profiles, loading, loadData} = useContext(DataContext);

  const [filterText, setFilterText] = useState("");

  const filteredTweets = tweets.filter(tweet => tweet.text.toUpperCase().includes(filterText.toUpperCase()) || tweet.handle.toUpperCase().includes(filterText.toUpperCase()));

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.filter}
        onChangeText={filterText => setFilterText(filterText)}
        value={filterText}
      />
      <TweetList tweets={filteredTweets} profiles={profiles} loading={loading} loadData={loadData}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
