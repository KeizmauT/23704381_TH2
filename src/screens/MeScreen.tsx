
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { STUDENT, ROOM_LABEL, VARIANT, examStamp } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useAuthStore } from '@stores/authStore';
import { useCampusLocation } from '@hooks/useCampusLocation';

export default function MeScreen() {
    const token = useAuthStore(s => s.token);
    const logout = useAuthStore(s => s.logout);
    const { status, km, shipFee, requestLocation, openSettings } = useCampusLocation();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>TÔI - LOCATION</Text>
            <Text style={styles.name}>{STUDENT.hoTen}</Text>
            <Text style={styles.text}>MSSV: {STUDENT.mssv} · #{examStamp()}</Text>
            <Text style={styles.text}>Token: {token ? `${token.slice(0, 15)}...` : 'Chưa đăng nhập'}</Text>
            <View style={styles.card}>
                <Text style={styles.text}>Quyền: {status}</Text>
                {status === 'granted' && km !== null && shipFee !== null && (
                    <>
                        <Text style={styles.text}>Khoảng cách tới KTX: {km.toFixed(2)} km</Text>
                        <Text style={styles.text}>Giao đến {ROOM_LABEL}</Text>
                        <Text style={styles.text}>Công thức phí: {VARIANT.shipFormula}</Text>
                        <Text style={styles.fee}>Phí ship: {shipFee.toLocaleString('vi-VN')} đ</Text>
                    </>
                )}
                {status === 'denied' && <Text style={styles.text}>Đã từ chối quyền vị trí. Bạn có thể thử lại.</Text>}
                {status === 'blocked' && <Text style={styles.text}>Quyền vị trí bị chặn. Hãy mở Cài đặt để cấp quyền.</Text>}
                {status === 'idle' && <Text style={styles.text}>Chưa lấy vị trí ước tính phí ship.</Text>}
            </View>
            <TouchableOpacity style={styles.button} onPress={requestLocation}>
                <Text style={styles.buttonText}>Lấy vị trí ước tính ship</Text>
            </TouchableOpacity>
            {status === 'blocked' && (
                <TouchableOpacity style={styles.settings} onPress={openSettings}>
                    <Text style={styles.settingsText}>Mở Cài đặt</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.logout} onPress={logout}>
                <Text style={styles.buttonText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: COLORS.background },
    title: { fontSize: 22, color: COLORS.primary, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    name: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, textAlign: 'center' },
    text: { color: COLORS.text, marginTop: 8 },
    card: { backgroundColor: COLORS.surface, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, padding: 16, marginTop: 20 },
    fee: { color: COLORS.secondary, fontWeight: 'bold', fontSize: 18, marginTop: 10 },
    button: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 16 },
    buttonText: { color: COLORS.surface, fontWeight: 'bold' },
    settings: { borderColor: COLORS.primary, borderWidth: 1, padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 12 },
    settingsText: { color: COLORS.primary, fontWeight: 'bold' },
    logout: { backgroundColor: COLORS.error, padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 16 },
});
