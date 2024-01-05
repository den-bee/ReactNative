import { Tabs } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}>
            <Tabs.Screen name="index" options={{
                title: "Home",
                tabBarIcon: ({color, size}) => <FontAwesome name="home" size={size} color={color} />
                }}/>
            
            <Tabs.Screen name="profiles" options={{
                title: "Profiles",
                tabBarIcon: ({color, size}) => <Ionicons name="person" size={size} color={color} />
                }}/>
        </Tabs>
    )
}

export default TabsLayout;