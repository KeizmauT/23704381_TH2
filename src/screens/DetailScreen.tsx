
import React from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ShopStackParams } from '@navigation/ShopStack';
import { getProductById } from '@services/productApi';
import { useCartStore } from '@stores/cartStore';
import { STUDENT, PRICE_MULTIPLIER, STALE_TIME_MS } from '@constants/student';
import { COLORS } from '@constants/theme';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { VARIANT } from '@constants/student';
type Props = NativeStackScreenProps<ShopStackParams, 'Detail'>;
export default function DetailScreen({ route }: Props) {
    const { id } = route.params;
    const addItem = useCartStore(s => s.addItem);
    const { data: product, isPending, isError, refetch } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductById(id),
        staleTime: STALE_TIME_MS,
    });
    if (isPending) return <View style={styles.center}><ActivityIndicator size="large" color={COLORS.primary} /></View>;
    if (isError || !product) return (
        <View style={styles.center}>
            <Text style={styles.text}>Không tải được sản phẩm {id}.</Text>
            <TouchableOpacity onPress={() => refetch()}><Text style={styles.price}>Thử lại</Text></TouchableOpacity>
        </View>
    );
    const price = Math.round(product.price * PRICE_MULTIPLIER);
    const handleAdd = () => {
        addItem({ id: String(product.id), title: product.title, price });
        ReactNativeHapticFeedback.trigger(
            VARIANT.hapticOnAdd === 'impact' ? 'impactMedium' : 'selection'
        );
        Alert.alert('KTXGo', `Đã thêm vào giỏ - MSSV: ${STUDENT.mssv}`);
    };
    return (
        <View style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
            <Text style={styles.name}>{product.title}</Text>
            <Text style={styles.price}>{price.toLocaleString('vi-VN')} đ</Text>
            <Text style={styles.text}>{product.description}</Text>
            <TouchableOpacity style={styles.button} onPress={handleAdd}>
                <Text style={styles.buttonText}>Thêm vào giỏ</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.background },
    heading: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginBottom: 14 },
    image: { width: '100%', height: 200, backgroundColor: COLORS.surface, borderRadius: 12 },
    name: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginTop: 16 },
    price: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary, marginTop: 10 },
    text: { fontSize: 13, color: COLORS.textLight, marginTop: 14 },
    button: { backgroundColor: COLORS.primary, padding: 16, alignItems: 'center', borderRadius: 10, marginTop: 24 },
    buttonText: { color: COLORS.surface, fontWeight: 'bold' },
});
