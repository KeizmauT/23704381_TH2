
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { STUDENT, examStamp, VARIANT } from '@constants/student';
import { COLORS } from '@constants/theme';

export default function Watermark() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                TH2 · {STUDENT.mssv} · {STUDENT.hoTen} · #{examStamp()}
            </Text>
        </View>
    );
}

export const watermarkAtTop = VARIANT.watermarkAtTop;

const styles = StyleSheet.create({
    container: { paddingVertical: 8, alignItems: 'center', backgroundColor: COLORS.background },
    text: { color: COLORS.text, fontSize: 10, textAlign: 'center' },
});
