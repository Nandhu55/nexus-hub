import { useState, useEffect, useCallback } from 'react';

export type Notification = {
  id: string;
  type: 'welcome' | 'new_book' | 'security';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'welcome',
    title: 'Welcome to B-Tech Hub!',
    description: 'We are excited to have you here. Explore our library and resources.',
    timestamp: new Date().toISOString(),
    read: false,
  },
  {
    id: '2',
    type: 'new_book',
    title: 'New Book Added: AI Ethics',
    description: '"Silicon Sapiens" has been added to the Tech category.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    read: false,
  },
   {
    id: '3',
    type: 'security',
    title: 'Security Alert',
    description: 'We have updated our privacy policy. Please review the changes.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    read: true,
  },
];

const NOTIFICATIONS_STORAGE_KEY = 'btech-hub-notifications';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    try {
      const storedNotifications = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      } else {
        setNotifications(initialNotifications);
        localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(initialNotifications));
      }
    } catch (error) {
        console.error("Failed to access localStorage for notifications:", error);
        setNotifications(initialNotifications);
    }
  }, []);

  const updateStoredNotifications = (newNotifications: Notification[]) => {
      try {
        localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(newNotifications));
      } catch (error) {
        console.error("Failed to save notifications to localStorage:", error);
      }
  }

  const clearNotifications = useCallback(() => {
    setNotifications([]);
    updateStoredNotifications([]);
  }, []);

  const markAsRead = useCallback(() => {
    setNotifications(prev => {
        const newNotifications = prev.map(n => ({ ...n, read: true }));
        updateStoredNotifications(newNotifications);
        return newNotifications;
    });
  }, []);

  return { notifications, clearNotifications, markAsRead };
};
