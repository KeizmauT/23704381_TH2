
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Product } from '@services/productApi';
import { PRICE_MULTIPLIER, VARIANT } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useCartStore } from '@stores/cartStore';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
type Props = { product: Product; onPress: () => void };
export default function ProductCard({ product, onPress }: Props) {
    const addItem = useCartStore(s => s.addItem);
    const price = Math.round(product.price * PRICE_MULTIPLIER);
    const handleAdd = () => {
        addItem({ id: String(product.id), title: product.title, price });
        ReactNativeHapticFeedback.trigger(
            VARIANT.hapticOnAdd === 'impact' ? 'impactMedium' : 'selection'
        );
    };
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
            <Text style={styles.name} numberOfLines={2}>{product.title}</Text>
            <View style={styles.row}>
                <Text style={styles.price}>{price.toLocaleString('vi-VN')} đ</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                    <Text style={styles.addText}>+</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    card: { flex: 1, margin: 5, padding: 10, backgroundColor: COLORS.surface, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border },
    image: { width: '100%', height: 110, marginBottom: 10 },
    name: { fontSize: 13, color: COLORS.text, minHeight: 36 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
    price: { flex: 1, fontSize: 12, fontWeight: 'bold', color: COLORS.primary },
    addButton: { backgroundColor: COLORS.primary, width: 30, height: 30, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
    addText: { color: COLORS.surface, fontSize: 20, fontWeight: 'bold' },
});
