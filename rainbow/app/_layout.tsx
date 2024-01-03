import { Tabs } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false
            }}
        >
            <Tabs.Screen 
                name="index" 
                options={{
                    title: "Home",
                    tabBarIcon: ({color, size}) => <FontAwesome name="home" size={size} color={color} />
                    }}/>
            <Tabs.Screen 
                name="rainbow" 
                options={{
                    title: "Rainbow",
                    tabBarIcon: ({color, size}) => <Fontisto name="rainbow" size={size} color={color} />
                    }}/>
            <Tabs.Screen 
                name="rainbows" 
                options={{
                    title: "Rainbow List",
                    tabBarIcon: ({color, size}) => <Fontisto name="rainbow" size={size} color={color} />
                    }}/>        
        </Tabs>
    )
}