import { Stack } from "expo-router"
import { DataProvider } from "../datacontext";

const HomeLayout = () => {
    return (
        <DataProvider>
            <Stack
                screenOptions={{
                    headerTintColor: "white",
                    animation: "slide_from_right"
                }}
            >
                <Stack.Screen 
                name="(drawer)"
                options={{headerShown: false}}
                />
            </Stack>
        </DataProvider>
    )
}

export default HomeLayout;