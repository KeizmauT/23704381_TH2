
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from '@stores/authStore';
import { STUDENT, VARIANT } from '@constants/student';
import { COLORS } from '@constants/theme';

export default function LoginScreen() {
    const [value, setValue] = useState('');
    const login = useAuthStore(s => s.login);
    const isPhone = VARIANT.authField === 'phone';
    const handleLogin = () => {
        if (!value.trim()) {
            Alert.alert('KTXGo', 'Vui lòng nhập số điện thoại');
            return;
        }
        login();
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>KTXGO</Text>
            <Text style={styles.subtitle}>Giao đồ tận phòng ký túc xá</Text>
            <TextInput
                style={styles.input}
                placeholder={isPhone ? `Phone — ${STUDENT.mssv}` : `Email — ${STUDENT.mssv}`}
                placeholderTextColor={COLORS.textLight}
                keyboardType={isPhone ? 'phone-pad' : 'email-address'}
                value={value}
                onChangeText={setValue}
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Vào cửa hàng</Text>
            </TouchableOpacity>
            <Text style={styles.note}>Auth Stack · chưa có token</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, padding: 24, paddingTop: 60 },
    title: { fontSize: 30, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center' },
    subtitle: { fontSize: 13, color: COLORS.textLight, textAlign: 'center', marginBottom: 45 },
    input: { height: 50, borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.surface, borderRadius: 10, paddingHorizontal: 14, color: COLORS.text },
    button: { backgroundColor: COLORS.primary, padding: 16, borderRadius: 10, marginTop: 15, alignItems: 'center' },
    buttonText: { color: COLORS.surface, fontSize: 16, fontWeight: 'bold' },
    note: { color: COLORS.textLight, textAlign: 'center', marginTop: 18, fontSize: 12 },
});
