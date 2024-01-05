import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router/src/hooks";
import { View, StyleSheet, Image, Text } from "react-native"
import { DataContext, Profile } from "../datacontext";
import { useContext } from "react";
import { TweetList } from "./(drawer)/(tabs)";

const ProfileScreen = () => {
    const {handle} = useLocalSearchParams<{handle: string}>();
    const {profiles, tweets, loadData, loading} = useContext(DataContext);

    const profile : Profile = profiles.find((profile) => profile.handle === handle)!;

    const filteredTweets = tweets.filter((tweet) => tweet.handle === handle);

    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                title: profile.name,
                headerTransparent: true,
                }}/>

            <View>
                <Image style={styles.banner} source={{uri: profile.banner}}/>
            </View>

            <View style={styles.nameContainer}>
                <Text style={styles.name}>{profile.name}</Text>
                <Text style={styles.handle}>@{handle}</Text>
            </View>

            <Text style={styles.bioContainer}>{profile.bio}</Text>

            <Image style={styles.avatar} source={{uri: profile.avatar}}/>

            <TweetList tweets={filteredTweets} profiles={profiles} loading={loading} loadData={loadData}/>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    banner: {
        height: 300,

    },

    avatar: {
        height: 100,
        width: 100,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "black",
        position: "absolute",
        top: 270,
        left: 10
    },

    nameContainer: {
        marginLeft: 130,
        marginBottom: 10,
    },

    name: {
        fontSize: 24,
        fontWeight: "900",
    },
    
    handle: {
        fontSize: 16,
        fontWeight: "200",
    },

    bioContainer: {
        fontSize: 16,
        marginTop: 16,
        marginHorizontal: 10,
        marginBottom: 5
    }
});
  

export default ProfileScreen;