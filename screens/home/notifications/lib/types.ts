export type NotificationListType = {
  id: number;
  type: string;
  title: string;
  message: string;
  read: boolean;
  status: 'success' | 'warning' | 'urgent';
};
