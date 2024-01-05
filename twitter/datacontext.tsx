import React from "react";
import { useEffect, useState } from "react";

export interface Tweet {
    id: number;
    handle: string;
    text: string;
    createdOn: Date;
    profile?: Profile;
}

export interface Profile {
    id: number;
    handle: string;
    name: string;
    bio: string;
    avatar: string;
    banner: string;
}

export interface DataContext {
    tweets: Tweet[];
    profiles: Profile[];
    loading: boolean;
    loadData: () => void;
}

export const DataContext = React.createContext<DataContext>({tweets: [], profiles: [], loading: false, loadData: () => {}});

export const DataProvider = ({children} : {children: React.ReactNode}) => {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const loadData = async () => {
        setLoading(true);
        let response = await fetch("https://my-json-server.typicode.com/similonap/twitter-json-server/tweets");
        const jsonTweets = await response.json();
        
        response = await fetch("https://my-json-server.typicode.com/similonap/twitter-json-server/profiles");
        const jsonProfiles = await response.json();
        setProfiles(jsonProfiles);

        let tweetArray = jsonTweets.map((tweet: Tweet) => {
            tweet.profile = jsonProfiles.find((profile: Profile) => (tweet.handle === profile.handle))

            return tweet;
        })

        setTweets(tweetArray);

        setLoading(false);
    } 

    useEffect(() => {
        loadData();
    }, [])

    return (
        <DataContext.Provider value={{tweets: tweets, profiles: profiles, loading: loading, loadData: loadData}}>
            {children}
        </DataContext.Provider>
    )
}