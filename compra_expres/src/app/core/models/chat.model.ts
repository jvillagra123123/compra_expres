export interface Chat {
    id: string;
    userId: string;
    message: Array<{ text: string, timestamp: Date }>;
}