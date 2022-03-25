import { useCallback, useState } from 'react';

function useFetch() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConf, callback) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(requestConf.url, requestConf.config);
            
            if (!response.ok) {
                throw new Error('Request failed');
            }

            const responseJson = await response.json();

            callback(responseJson);
        } catch (err) {
            setError(err.message || 'There was an error');
        }
    }, []);

    return {
        isLoading,
        error,
        sendRequest,
    };
}