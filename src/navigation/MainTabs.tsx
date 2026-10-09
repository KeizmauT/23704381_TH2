
import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';
import ShopStack from '@navigation/ShopStack';
import CartScreen from '@screens/CartScreen';
import MeScreen from '@screens/MeScreen';
import Watermark from '@components/Watermark';
import { VARIANT } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useCartStore } from '@stores/cartStore';

const Tab = createBottomTabNavigator();
export default function MainTabs() {
    const quantity = useCartStore(s => s.items.reduce((sum, item) => sum + item.quantity, 0));
    const shopTab = <Tab.Screen key="Shop" name="Shop" component={ShopStack} options={{ title: 'Cửa hàng', tabBarIcon: ({ color, size }) => <Ionicons name="storefront-outline" size={size} color={color} /> }} />;
    const cartTab = <Tab.Screen key="Cart" name="Cart" component={CartScreen} options={{ title: 'Giỏ', tabBarIcon: ({ color, size }) => <Ionicons name="cart-outline" size={size} color={color} />, tabBarBadge: quantity > 0 ? quantity : undefined, tabBarBadgeStyle: { backgroundColor: COLORS.secondary } }} />;
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false, tabBarActiveTintColor: COLORS.primary, tabBarInactiveTintColor: COLORS.textLight }}
            tabBar={props => (
                <View>
                    {!VARIANT.watermarkAtTop && <Watermark />}
                    <BottomTabBar {...props} />
                </View>
            )}
        >
            {VARIANT.tabOrder === 'shopFirst' ? shopTab : cartTab}
            {VARIANT.tabOrder === 'shopFirst' ? cartTab : shopTab}
            <Tab.Screen name="Me" component={MeScreen} options={{ title: 'Tôi', tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} /> }} />
        </Tab.Navigator>
    );
}
