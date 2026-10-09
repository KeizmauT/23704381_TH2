
// TH2 | 23704381 | TRẦN TRUNG KIÊN | #340399
import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from '@navigation/RootNavigator';
import Watermark from '@components/Watermark';
import { VARIANT, STALE_TIME_MS } from '@constants/student';
import { COLORS } from '@constants/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: STALE_TIME_MS, retry: 1 },
  },
});
export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
          {VARIANT.watermarkAtTop && <Watermark />}
          <View style={styles.content}>
            <RootNavigator />
          </View>
          {!VARIANT.watermarkAtTop && <Watermark />}
        </SafeAreaView>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1 },
});
