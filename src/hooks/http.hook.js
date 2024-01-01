import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [action, setAction] = useState('waiting');

    const request = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
        setLoading(true);
        setAction('loading');
        try { // тут запит тільки відправляється, а не обробляється
            const response = await fetch(url, { method, body, headers });

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            setLoading(false);
            return data;
        } catch (e) {
            setLoading(false);
            setAction('error');
            throw e;
        }
    }, []);

    const clearError = useCallback(() => setAction('loading'), []);

    return { loading, error, request, clearError, action, setAction };
}