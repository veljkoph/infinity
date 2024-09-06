import { useState, useCallback } from 'react';

const useStringSimilarity = () => {
    const [similarity, setSimilarity] = useState(null);

    const levenshteinDistance = (s, t) => {
        const d = Array(s.length + 1).fill(null).map(() => Array(t.length + 1).fill(0));

        for (let i = 0; i <= s.length; i++) d[i][0] = i;
        for (let j = 0; j <= t.length; j++) d[0][j] = j;

        for (let i = 1; i <= s.length; i++) {
            for (let j = 1; j <= t.length; j++) {
                const cost = s[i - 1] === t[j - 1] ? 0 : 1;
                d[i][j] = Math.min(
                    d[i - 1][j] + 1, // brisanje
                    d[i][j - 1] + 1, // umetanje
                    d[i - 1][j - 1] + cost // zamena
                );
            }
        }

        return d[s.length][t.length];
    };

    const calculateSimilarity = useCallback((str1, str2) => {
        console.log(str1, '1', str2, '2')
        const distance = levenshteinDistance(str1, str2);
        const maxLength = Math.max(str1.length, str2.length);

        if (maxLength === 0) return 100; // Ako su oba stringa prazna

        const similarityPercentage = ((maxLength - distance) / maxLength) * 100;
        setSimilarity(Math.round(similarityPercentage * 100) / 100); // Zaokružujemo na 2 decimalna mesta
    }, []);

    return { similarity, calculateSimilarity };
};

export default useStringSimilarity;
