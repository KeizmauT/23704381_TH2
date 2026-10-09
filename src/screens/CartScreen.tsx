
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCartStore } from '@stores/cartStore';
import { ROOM_LABEL } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useCampusLocation } from '@hooks/useCampusLocation';
export default function CartScreen() {
    const items = useCartStore(s => s.items);
    const changeQty = useCartStore(s => s.changeQty);
    const removeItem = useCartStore(s => s.removeItem);
    const totalAmount = useCartStore(s => s.totalAmount);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const { shipFee } = useCampusLocation();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>GIỎ HÀNG</Text>
            <FlatList
                data={items}
                keyExtractor={item => item.id}
                ListEmptyComponent={<Text style={styles.empty}>Giỏ hàng đang trống</Text>}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.title}</Text>
                        <Text style={styles.price}>{(item.price * item.quantity).toLocaleString('vi-VN')} đ</Text>
                        <View style={styles.row}>
                            <TouchableOpacity style={styles.button} onPress={() => changeQty(item.id, item.quantity - 1)}>
                                <Text style={styles.buttonText}>−</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantity}>{item.quantity}</Text>
                            <TouchableOpacity style={styles.button} onPress={() => changeQty(item.id, item.quantity + 1)}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => removeItem(item.id)}>
                                <Text style={styles.buttonText}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <View style={styles.footer}>
                <Text style={styles.text}>Giao đến {ROOM_LABEL}</Text>
                <Text style={styles.text}>
                    {shipFee === null ? 'Chưa ước tính phí — mở tab Tôi' : `Phí ship: ${shipFee.toLocaleString('vi-VN')} đ`}
                </Text>
                <Text style={styles.total}>Tổng tiền hàng: {total.toLocaleString('vi-VN')} đ</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 12, backgroundColor: COLORS.background },
    title: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center', marginBottom: 16 },
    card: { backgroundColor: COLORS.surface, padding: 12, marginBottom: 10, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border },
    name: { fontSize: 14, fontWeight: 'bold', color: COLORS.text },
    price: { color: COLORS.primary, marginTop: 6, fontWeight: 'bold' },
    row: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
    button: { backgroundColor: COLORS.primary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 6 },
    buttonText: { color: COLORS.surface, fontWeight: 'bold' },
    quantity: { color: COLORS.text, marginHorizontal: 14, fontWeight: 'bold' },
    deleteButton: { backgroundColor: COLORS.error, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6, marginLeft: 'auto' },
    empty: { textAlign: 'center', color: COLORS.textLight, marginTop: 30 },
    footer: { backgroundColor: COLORS.surface, borderRadius: 10, padding: 14, borderWidth: 1, borderColor: COLORS.border },
    text: { color: COLORS.text, marginBottom: 8 },
    total: { color: COLORS.primary, fontSize: 17, fontWeight: 'bold' },
});
