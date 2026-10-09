
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { STUDENT, ROOM_LABEL, VARIANT, examStamp } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useAuthStore } from '@stores/authStore';
import { useCampusLocation } from '@hooks/useCampusLocation';

export default function MeScreen() {
    const token = useAuthStore(s => s.token);
    const logout = useAuthStore(s => s.logout);
    const { status, km, shipFee, requestLocation, openSettings } = useCampusLocation();
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.title}>TÔI – LOCATION</Text>
            <View style={styles.card}>
                <View style={styles.profileRow}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>TK</Text>
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.name}>{STUDENT.hoTen}</Text>
                        <Text style={styles.subtitle}>MSSV: {STUDENT.mssv}</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <Text style={styles.label}>Token đăng nhập</Text>
                <Text style={styles.token}>{token ?? 'Chưa đăng nhập'}</Text>
                <Text style={styles.stamp}>Stamp: #{examStamp()}</Text>
            </View>
            <View style={styles.card}>
                <View style={styles.headerRow}>
                    <Text style={styles.sectionTitle}>Vị trí giao hàng</Text>
                    <Text style={[styles.status, { color: status === 'granted' ? COLORS.success : status === 'blocked' ? COLORS.error : COLORS.textLight }]}>
                        ● {status}
                    </Text>
                </View>
                {status === 'granted' && km !== null && shipFee !== null ? (
                    <>
                        <View style={styles.infoRow}>
                            <View style={styles.infoBox}>
                                <Text style={styles.label}>Khoảng cách</Text>
                                <Text style={styles.infoValue}>{km.toFixed(2)} km</Text>
                            </View>
                            <View style={styles.infoBox}>
                                <Text style={styles.label}>Phòng giao</Text>
                                <Text style={styles.infoValue}>{ROOM_LABEL}</Text>
                            </View>
                        </View>
                        <View style={styles.divider} />
                        <Text style={styles.label}>Phí ship ước tính · Công thức {VARIANT.shipFormula}</Text>
                        <Text style={styles.fee}>{shipFee.toLocaleString('vi-VN')} đ</Text>
                    </>
                ) : (
                    <View style={styles.notice}>
                        {status === 'idle' && <Text style={styles.text}>Chưa lấy vị trí ước tính phí ship.</Text>}
                        {status === 'denied' && <Text style={styles.text}>Bạn đã từ chối quyền vị trí. Nhấn nút bên dưới để thử lại.</Text>}
                        {status === 'blocked' && <Text style={styles.text}>Quyền vị trí bị chặn. Hãy mở Cài đặt để cấp quyền.</Text>}
                    </View>
                )}
            </View>
            <TouchableOpacity style={styles.button} onPress={requestLocation}>
                <Text style={styles.buttonText}>⌖  Lấy vị trí ước tính ship</Text>
            </TouchableOpacity>
            {status === 'blocked' && (
                <TouchableOpacity style={styles.settingsButton} onPress={openSettings}>
                    <Text style={styles.settingsText}>Mở Cài đặt</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    content: { padding: 16, paddingBottom: 30 },
    title: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center', marginBottom: 20 },
    card: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: COLORS.border, marginBottom: 16 },
    profileRow: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 58, height: 58, borderRadius: 29, backgroundColor: '#DBEAFE', alignItems: 'center', justifyContent: 'center' },
    avatarText: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary },
    profileInfo: { flex: 1, marginLeft: 12 },
    name: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
    subtitle: { fontSize: 13, color: COLORS.textLight, marginTop: 5 },
    divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 14 },
    label: { fontSize: 12, color: COLORS.textLight },
    token: { fontSize: 13, color: COLORS.text, marginTop: 6 },
    stamp: { fontSize: 12, color: COLORS.textLight, marginTop: 6 },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
    status: { fontSize: 12, fontWeight: 'bold' },
    infoRow: { flexDirection: 'row', gap: 10 },
    infoBox: { flex: 1, backgroundColor: COLORS.background, borderRadius: 10, padding: 12 },
    infoValue: { fontSize: 17, fontWeight: 'bold', color: COLORS.text, marginTop: 6 },
    fee: { fontSize: 25, fontWeight: 'bold', color: COLORS.secondary, marginTop: 8 },
    notice: { backgroundColor: COLORS.background, padding: 12, borderRadius: 10 },
    text: { color: COLORS.text, fontSize: 13, lineHeight: 20 },
    button: { backgroundColor: COLORS.primary, padding: 16, borderRadius: 10, alignItems: 'center', marginBottom: 12 },
    buttonText: { color: COLORS.surface, fontSize: 14, fontWeight: 'bold' },
    settingsButton: { borderWidth: 1, borderColor: COLORS.primary, padding: 14, borderRadius: 10, alignItems: 'center', marginBottom: 12 },
    settingsText: { color: COLORS.primary, fontWeight: 'bold' },
    logoutButton: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.error, padding: 15, borderRadius: 10, alignItems: 'center' },
    logoutText: { color: COLORS.error, fontWeight: 'bold', fontSize: 14 },
});
