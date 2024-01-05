import {Drawer} from "expo-router/drawer"

const DrawerLayout = () => {
    return (
        <Drawer
            screenOptions={{
                headerStyle: {backgroundColor: "#1D9BF0"},
                headerTintColor: "white"
            }}
        >
            <Drawer.Screen name="(tabs)" options={{title: "Home"}}/>
            <Drawer.Screen name="settings" options={{title: "Settings"}}/>
        </Drawer>
    )
}

export default DrawerLayout;

