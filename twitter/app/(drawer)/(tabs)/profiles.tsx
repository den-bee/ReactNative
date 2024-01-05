import { View, Text, Image, StyleSheet, FlatList, Pressable } from "react-native";
import { DataContext, DataProvider, Profile } from "../../../datacontext";
import { useContext } from "react";
import { useRouter } from "expo-router";

const ProfileComponent = ({profile} : {profile: Profile}) => {
    const router = useRouter();

    return (
        <Pressable onPress={() => {router.push("/" + profile.handle)}}>
            <View style={styles.profileContainer}>
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatar} source={{uri: profile.avatar}}/>
                </View>
                <View>
                    <Text style={styles.name}>{profile.name}</Text>
                    <Text style={styles.handle}>@{profile.handle}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const ProfileList = () => {
    const {profiles} = useContext(DataContext);

    return (
        <View>
            <FlatList
                data={profiles}
                renderItem={({item}) => <ProfileComponent profile={item}/>}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}

const ProfilesScreen = () => {
    return (
        <DataProvider>
            <View>
                <ProfileList/>
            </View>
        </DataProvider>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "stretch",
      backgroundColor: "#f5f5f5",
    },
  
    profileContainer: {
      borderRadius: 8,
      padding: 15,
      marginVertical: 8,
      marginHorizontal: 16,
      borderColor: "#ddd",
      borderWidth: 1,
      flexDirection: "row"
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

export default ProfilesScreen;