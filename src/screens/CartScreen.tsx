
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ROOM_LABEL } from '@constants/student';
import { useCartStore } from '@stores/cartStore';
import { COLORS } from '@constants/theme';

export default function CartScreen() {
    const items = useCartStore(s => s.items);
    const amount = items.reduce((sum, x) => sum + x.price * x.quantity, 0);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>GIỎ HÀNG</Text>
            <Text style={styles.text}>Giao đến {ROOM_LABEL}</Text>
            <Text style={styles.text}>Số loại món: {items.length}</Text>
            <Text style={styles.text}>Tổng tiền: {amount.toLocaleString('vi-VN')} đ</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary },
    text: { color: COLORS.text, marginTop: 12 },
});
