
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screens/HomeScreen';
import DetailScreen from '@screens/DetailScreen';
import { VARIANT } from '@constants/student';
import { COLORS } from '@constants/theme';

export type ShopStackParams = {
    Home: undefined;
    Detail: { id: string };
};
const Stack = createNativeStackNavigator<ShopStackParams>();
export default function ShopStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={{
                    headerShown: true,
                    headerTitle: 'Chi tiết món',
                    headerTintColor: COLORS.primary,
                    headerStyle: { backgroundColor: COLORS.background },
                    presentation: VARIANT.detailPresentation === 'modal' ? 'modal' : 'card',
                }}
            />
        </Stack.Navigator>
    );
}
