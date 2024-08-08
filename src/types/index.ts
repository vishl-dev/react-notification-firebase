export interface Notification {
    id: string;
    message: string;
    read: boolean;
    createdAt: string;
    messageType:string
}

export type NotificationType = 'info' | 'success' | 'warning';