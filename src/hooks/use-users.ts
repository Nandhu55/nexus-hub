import { useState } from 'react';

export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    password?: string;
    course: string;
    year: string;
    avatarUrl?: string;
};

// This would typically come from a database or API
const initialUsers: User[] = [
  { id: 1, name: 'Student User', username: 'student', email: 'student@example.com', password: 'password', course: 'Computer Science', year: '2nd Year', avatarUrl: 'https://placehold.co/100x100.png' },
  { id: 2, name: 'Jane Doe', username: 'janedoe', email: 'jane@example.com', password: 'password123', course: 'Electrical Engineering', year: '3rd Year', avatarUrl: 'https://placehold.co/100x100.png' },
];

export const useUsers = () => {
  const [users, setUsers] = useState(initialUsers);

  const addUser = (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: Math.max(...users.map(u => u.id), 0) + 1, avatarUrl: 'https://placehold.co/100x100.png' };
    setUsers(prev => [...prev, newUser]);
    return newUser;
  }

  return { users, addUser };
};
