import { useState } from 'react';

export type User = {
    id: number;
    name: string;
    email: string;
    password?: string;
};

// This would typically come from a database or API
const initialUsers: User[] = [
  { id: 1, name: 'Student User', email: 'student@example.com', password: 'password' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com', password: 'password123' },
];

export const useUsers = () => {
  const [users, setUsers] = useState(initialUsers);

  const addUser = (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: Math.max(...users.map(u => u.id), 0) + 1 };
    setUsers(prev => [...prev, newUser]);
    return newUser;
  }

  return { users, addUser };
};
