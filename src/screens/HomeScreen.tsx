
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ShopStackParams } from '@navigation/ShopStack';
import { getProducts } from '@services/productApi';
import ProductCard from '@components/ProductCard';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import { STUDENT, ROOM_LABEL, DEBOUNCE_MS, STALE_TIME_MS } from '@constants/student';
import { COLORS } from '@constants/theme';
type Props = NativeStackScreenProps<ShopStackParams, 'Home'>;
export default function HomeScreen({ navigation }: Props) {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebouncedValue(search, DEBOUNCE_MS);
    const { data, isPending, isError, isRefetching, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        staleTime: STALE_TIME_MS,
    });
    const products = (data ?? []).filter(item =>
        item.title.toLowerCase().includes(debouncedSearch.toLowerCase().trim())
    );
    if (isPending) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.message}>Đang tải món...</Text>
            </View>
        );
    }
    if (isError) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>{STUDENT.mssv}</Text>
                <Text style={styles.message}>Không tải được dữ liệu món.</Text>
                <TouchableOpacity style={styles.retry} onPress={() => refetch()}>
                    <Text style={styles.retryText}>Thử lại</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>KTXGO</Text>
                <Text style={styles.subtitle}>Giao tận {ROOM_LABEL}</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder={`Tìm món (debounce) — ${STUDENT.mssv}`}
                placeholderTextColor={COLORS.textLight}
                value={search}
                onChangeText={setSearch}
            />
            <FlashList
                data={products}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        onPress={() => navigation.navigate('Detail', { id: String(item.id) })}
                    />
                )}
                keyExtractor={item => `${STUDENT.mssv}-${item.id}`}
                numColumns={2}
                estimatedItemSize={260}
                refreshing={isRefetching}
                onRefresh={refetch}
                ListEmptyComponent={<Text style={styles.message}>Không tìm thấy món.</Text>}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { backgroundColor: COLORS.primary, padding: 16 },
    title: { fontSize: 22, fontWeight: 'bold', color: COLORS.surface },
    subtitle: { fontSize: 12, color: COLORS.surface, marginTop: 4 },
    input: { margin: 12, paddingHorizontal: 12, height: 44, borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, backgroundColor: COLORS.surface, color: COLORS.text },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.background, padding: 20 },
    message: { textAlign: 'center', color: COLORS.text, marginTop: 12 },
    error: { fontWeight: 'bold', color: COLORS.error },
    retry: { marginTop: 20, backgroundColor: COLORS.error, paddingHorizontal: 36, paddingVertical: 12, borderRadius: 8 },
    retryText: { color: COLORS.surface, fontWeight: 'bold' },
});
