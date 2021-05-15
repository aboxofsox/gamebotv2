export interface GBData {
    redirect?: boolean;
    id: number;
    slug: string;
    name: string;
    name_original?: string;
    description?: string; // Descriptions may contain HTML
    metacritic?: number;
    released: string;
    updated: string;
    background_image: string;
    background_image_additional?: string;
    rating: number;
    reddit_url?: string;
    reddit_name?: string;
    developers: {
        id?: number;
        name: string;
        slug?: string;
        games_count?: number;
        image_background?: string;
    };
    publishers: {
        id?: number;
        name: string;
        slug?: string;
        games_count?: number;
        image_background?: string;
    }
    

}

export interface Question {
    q: string,
    a: string;
}

export interface TopGames {
    name: string;
    metacritic: number;
}

export interface StreamInfo {
    channel_id: string | number;
    username: string;
    live: boolean;
    title: string;
    description: string;
    embed?: string | number | object;
}