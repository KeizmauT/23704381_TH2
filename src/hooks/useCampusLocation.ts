
import { useEffect } from 'react';
import { Linking, PermissionsAndroid, Platform } from 'react-native';
import { create } from 'zustand';
import { BASE_SHIP_FEE, VARIANT } from '@constants/student';

type PermissionStatus = 'idle' | 'granted' | 'denied' | 'blocked';
type LocationState = {
    status: PermissionStatus;
    km: number | null;
    shipFee: number | null;
    setLocation: (status: PermissionStatus, km: number | null, shipFee: number | null) => void;
};
const useLocationStore = create<LocationState>(set => ({
    status: 'idle',
    km: null,
    shipFee: null,
    setLocation: (status, km, shipFee) => set({ status, km, shipFee }),
}));
const CAMPUS_GATE = { latitude: 10.822, longitude: 106.687 };
const MOCK_LOCATION = { latitude: 10.829, longitude: 106.692 };

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const rad = (degree: number) => degree * Math.PI / 180;
    const dLat = rad(lat2 - lat1);
    const dLon = rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
export function useCampusLocation() {
    const status = useLocationStore(s => s.status);
    const km = useLocationStore(s => s.km);
    const shipFee = useLocationStore(s => s.shipFee);
    const setLocation = useLocationStore(s => s.setLocation);
    const calculateFee = () => {
        const distance = haversine(MOCK_LOCATION.latitude, MOCK_LOCATION.longitude, CAMPUS_GATE.latitude, CAMPUS_GATE.longitude);
        const fee = VARIANT.shipFormula === 'A'
            ? BASE_SHIP_FEE + Math.round(distance * 2000)
            : BASE_SHIP_FEE + Math.round(distance * 1500) + 2000;
        setLocation('granted', distance, fee);
    };
    const requestLocation = async () => {
        if (Platform.OS !== 'android') {
            setLocation('denied', null, null);
            return;
        }
        try {
            const permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
            const granted = await PermissionsAndroid.check(permission);
            if (granted) {
                calculateFee();
                return;
            }
            const result = await PermissionsAndroid.request(permission, {
                title: 'KTXGo - Quyền vị trí',
                message: 'Cho phép sử dụng vị trí để ước tính phí giao hàng.',
                buttonPositive: 'Cho phép',
                buttonNegative: 'Từ chối',
            });
            if (result === PermissionsAndroid.RESULTS.GRANTED) calculateFee();
            else if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) setLocation('blocked', null, null);
            else setLocation('denied', null, null);
        } catch {
            setLocation('denied', null, null);
        }
    };
    const openSettings = () => Linking.openSettings();
    useEffect(() => {
        if (Platform.OS !== 'android' || status !== 'blocked') return;
        const subscription = Linking.addEventListener('url', () => { });
        return () => subscription.remove();
    }, [status]);
    return { status, km, shipFee, requestLocation, openSettings };
}
