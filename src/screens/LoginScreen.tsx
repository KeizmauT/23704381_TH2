
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useAuthStore } from '@stores/authStore';
import { STUDENT, VARIANT } from '@constants/student';
import { COLORS } from '@constants/theme';

export default function LoginScreen() {
    const [value, setValue] = useState('');
    const login = useAuthStore(s => s.login);
    const isPhone = VARIANT.authField === 'phone';
    const handleLogin = () => {
        if (!value.trim()) {
            Alert.alert('KTXGo', `Vui lòng nhập ${isPhone ? 'số điện thoại' : 'email'}`);
            return;
        }
        login();
    };
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.content}>
                <View style={styles.logoBox}>
                    <Ionicons name="storefront-outline" size={34} color={COLORS.primary} />
                </View>
                <Text style={styles.title}>KTXGO</Text>
                <Text style={styles.subtitle}>Giao đồ tận phòng ký túc xá</Text>
                <View style={styles.card}>
                    <Text style={styles.label}>{isPhone ? 'Số điện thoại' : 'Email'}</Text>
                    <View style={styles.inputRow}>
                        <Ionicons name={isPhone ? 'call-outline' : 'mail-outline'} size={20} color={COLORS.textLight} />
                        <TextInput
                            style={styles.input}
                            placeholder={`${isPhone ? 'Phone' : 'Email'} — ${STUDENT.mssv}`}
                            placeholderTextColor={COLORS.textLight}
                            keyboardType={isPhone ? 'phone-pad' : 'email-address'}
                            autoCapitalize="none"
                            value={value}
                            onChangeText={setValue}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
                        <Text style={styles.buttonText}>Vào cửa hàng</Text>
                        <Ionicons name="arrow-forward-outline" size={20} color={COLORS.surface} />
                    </TouchableOpacity>
                    <Text style={styles.note}>Auth Stack · chưa có token</Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    content: { flex: 1, justifyContent: 'center', paddingHorizontal: 22, paddingBottom: 100 },
    logoBox: { width: 64, height: 64, borderRadius: 18, backgroundColor: '#DBEAFE', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 14 },
    title: { fontSize: 30, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center' },
    subtitle: { fontSize: 13, color: COLORS.textLight, textAlign: 'center', marginTop: 6, marginBottom: 28 },
    card: { backgroundColor: COLORS.surface, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, padding: 18 },
    label: { fontSize: 14, fontWeight: '600', color: COLORS.text, marginBottom: 10 },
    inputRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, paddingHorizontal: 12, height: 52 },
    input: { flex: 1, height: '100%', marginLeft: 10, fontSize: 14, color: COLORS.text, paddingVertical: 0 },
    button: { backgroundColor: COLORS.primary, height: 52, borderRadius: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 18, gap: 10 },
    buttonText: { color: COLORS.surface, fontSize: 16, fontWeight: 'bold' },
    note: { textAlign: 'center', fontSize: 12, color: COLORS.textLight, marginTop: 16 },
});
