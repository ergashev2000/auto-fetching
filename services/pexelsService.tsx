const PEXELS_API_KEY = 'ybDne75Z570K1ZAd5iCuplbyqtNE65OPeiUBfoTDNKXCLoIuT0iurm7S'; // Pexels API key

export interface PexelsPhoto {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_url: string;
    photographer_id: number;
    avg_color: string;
    src: {
        original: string;
        large2x: string;
        large: string;
        medium: string;
        small: string;
        portrait: string;
        landscape: string;
        tiny: string;
    };
    liked: boolean;
    alt: string;
}

export interface PexelsResponse {
    total_results: number;
    page: number;
    per_page: number;
    photos: PexelsPhoto[];
    next_page: string;
}

export const searchPhotos = async (query: string, page: number = 1, per_page: number = 10): Promise<PexelsResponse> => {
    try {
        const response = await fetch(
            `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${per_page}`,
            {
                headers: {
                    Authorization: PEXELS_API_KEY,
                },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch photos from Pexels');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching photos:', error);
        throw error;
    }
};

export const getCuratedPhotos = async (page: number = 1, per_page: number = 10): Promise<PexelsResponse> => {
    try {
        const response = await fetch(
            `https://api.pexels.com/v1/curated?page=${page}&per_page=${per_page}`,
            {
                headers: {
                    Authorization: PEXELS_API_KEY,
                },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch curated photos from Pexels');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching curated photos:', error);
        throw error;
    }
};
