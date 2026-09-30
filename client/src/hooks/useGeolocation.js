import { useCallback, useEffect, useState } from 'react';
import api from '../api/axios';

export function useGeolocation() {
  const [shops, setShops] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const findNearbyShops = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus('unsupported');
      return;
    }

    setStatus('loading');
    setError('');
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const response = await api.get('/shops/nearby', {
            params: { lat: coords.latitude, lng: coords.longitude }
          });
          setShops(response.data);
          setStatus('success');
        } catch (requestError) {
          setError(requestError.response?.data?.message || 'Could not find nearby shops.');
          setStatus('error');
        }
      },
      () => {
        setError('Location access was not available. You can still browse the menu.');
        setStatus('denied');
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
    );
  }, []);

  useEffect(() => {
    findNearbyShops();
  }, [findNearbyShops]);

  return { shops, status, error, findNearbyShops };
}
