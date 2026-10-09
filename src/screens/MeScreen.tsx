
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { STUDENT } from '@constants/student';
import { useAuthStore } from '@stores/authStore';
import { COLORS } from '@constants/theme';

export default function MeScreen() {
    const logout = useAuthStore(s => s.logout);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>TÔI</Text>
            <Text style={styles.text}>{STUDENT.hoTen}</Text>
            <Text style={styles.text}>{STUDENT.mssv}</Text>
            <TouchableOpacity style={styles.button} onPress={logout}>
                <Text style={styles.buttonText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary },
    text: { color: COLORS.text, marginTop: 12 },
    button: { backgroundColor: COLORS.error, padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 24 },
    buttonText: { color: COLORS.surface, fontWeight: 'bold' },
});
