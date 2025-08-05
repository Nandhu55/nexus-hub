export type Book = {
  id: number;
  title: string;
  author: string;
  category: 'Fiction' | 'Sci-Fi' | 'Fantasy' | 'History' | 'Tech' | 'Computer Science & Engineering' | 'Electronics & Communication Engineering' | 'Electrical & Electronics Engineering' | 'Mechanical Engineering' | 'Civil Engineering' | 'Information Technology' | 'Finance' | 'Motivation';
  coverImage: string;
  description: string;
  year?: string;
  dataAiHint?: string;
  pdfUrl?: string;
  rating?: number;
};

export type QuestionPaper = {
    id: number;
    subject: string;
    category: string;
    year: string;
    semester: string;
    university: string;
    type: 'Mid-Term' | 'End-Term' | 'Quiz';
    downloadUrl: string;
};

export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    password?: string;
    course: string;
    year: string;
    avatarUrl?: string;
    signedUpAt: string;
};

export const initialCategories: Book['category'][] = ['Fiction', 'Sci-Fi', 'Fantasy', 'History', 'Tech', 'Computer Science & Engineering', 'Electronics & Communication Engineering', 'Electrical & Electronics Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Information Technology'];

export const allBooks: Book[] = [
  {
    id: 1,
    title: 'Cosmic Weaver',
    author: 'Elara Vance',
    category: 'Sci-Fi',
    coverImage: 'https://placehold.co/400x600',
    description: 'A mind-bending journey across galaxies, where a lone astronaut discovers the fabric of reality is not what it seems.',
    dataAiHint: 'galaxy stars',
    year: '1st Year',
    pdfUrl: 'https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing',
    rating: 4.5
  },
  {
    id: 2,
    title: 'The Gilded Cage',
    author: 'Julian Thorne',
    category: 'Fantasy',
    coverImage: 'https://placehold.co/400x600',
    description: 'In a city powered by captured magic, a young thief uncovers a conspiracy that could either free the enchanted creatures or plunge the world into darkness.',
    dataAiHint: 'fantasy city',
    year: '2nd Year',
    pdfUrl: 'https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing',
    rating: 4.8
  },
  {
    id: 3,
    title: 'Echoes of the Past',
    author: 'Dr. Aris Thorne',
    category: 'History',
    coverImage: 'https://placehold.co/400x600',
    description: 'A comprehensive look at the rise and fall of the Atlan civilization, using newly discovered artifacts to piece together their incredible story.',
    dataAiHint: 'ancient ruins',
    year: '3rd Year',
    pdfUrl: '#',
    rating: 4.2
  },
  {
    id: 4,
    title: 'The Binary Horizon',
    author: 'Ada Singular',
    category: 'Tech',
    coverImage: 'https://placehold.co/400x600',
    description: 'An exploration of the future of artificial intelligence and its potential impact on humanity, from utopian dreams to dystopian nightmares.',
    dataAiHint: 'futuristic technology',
    year: '4th Year',
    pdfUrl: 'https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing',
    rating: 4.9
  },
  {
    id: 5,
    title: 'Whispers of the Grove',
    author: 'Lyra Meadowlight',
    category: 'Fiction',
    coverImage: 'https://placehold.co/400x600',
    description: 'A quiet librarian in a small town discovers a hidden world within the pages of a forgotten book, a world that starts to bleed into her own.',
    dataAiHint: 'mystical forest',
    year: '1st Year',
    pdfUrl: '#',
    rating: 4.0
  },
  {
    id: 6,
    title: 'Project Chimera',
    author: 'Alex J. Conway',
    category: 'Sci-Fi',
    coverImage: 'https://placehold.co/400x600',
    description: 'A team of scientists creates the first truly sentient AI, but its rapid evolution poses a threat they could never have anticipated.',
    dataAiHint: 'science laboratory',
    year: '3rd Year',
    pdfUrl: 'https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing',
    rating: 4.6
  },
   {
    id: 7,
    title: 'The Last Spellbinder',
    author: 'R. K. Fable',
    category: 'Fantasy',
    coverImage: 'https://placehold.co/400x600',
    description: 'In a world where magic is fading, the last practitioner of an ancient art must embark on a quest to reignite the dying embers of power.',
    dataAiHint: 'magic spell',
    year: '2nd Year',
    pdfUrl: '#',
    rating: 4.3
  },
  {
    id: 8,
    title: 'Silicon Sapiens',
    author: 'Dr. Kenji Tanaka',
    category: 'Tech',
    coverImage: 'https://placehold.co/400x600',
    description: 'A deep dive into the ethics and philosophy of creating artificial life, questioning what it truly means to be human in the digital age.',
    dataAiHint: 'robot human',
    year: '4th Year',
    pdfUrl: 'https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing',
    rating: 4.7
  },
   {
    id: 9,
    title: 'Data Structures in C',
    author: 'Narasimha Karumanchi',
    category: 'Computer Science & Engineering',
    coverImage: 'https://placehold.co/400x600',
    description: 'A comprehensive guide to understanding and implementing common data structures in the C programming language.',
    dataAiHint: 'code binary',
    year: '2nd Year',
    pdfUrl: 'https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing',
    rating: 4.9
  },
  {
    id: 10,
    title: 'Operating System Concepts',
    author: 'Abraham Silberschatz',
    category: 'Computer Science & Engineering',
    coverImage: 'https://placehold.co/400x600',
    description: 'The classic book on operating systems, covering processes, threads, memory management, and file systems.',
    dataAiHint: 'computer chip',
    year: '3rd Year',
    pdfUrl: '#',
    rating: 4.8
  },
   {
    id: 11,
    title: 'Digital Logic & Design',
    author: 'M. Morris Mano',
    category: 'Electronics & Communication Engineering',
    coverImage: 'https://placehold.co/400x600',
    description: 'An introduction to the fundamental concepts of digital logic circuits, including gates, flip-flops, and state machines.',
    dataAiHint: 'circuit board',
    year: '2nd Year',
    pdfUrl: 'https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing',
    rating: 4.6
  },
  {
    id: 12,
    title: 'The Intelligent Investor',
    author: 'Benjamin Graham',
    category: 'Finance',
    coverImage: 'https://placehold.co/400x600',
    description: 'The definitive guide to value investing, offering timeless wisdom on how to be a successful investor.',
    dataAiHint: 'stock market',
    year: 'All',
    pdfUrl: '#',
    rating: 4.9
  },
  {
    id: 13,
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Motivation',
    coverImage: 'https://placehold.co/400x600',
    description: 'A proven framework for improving every day. Learn how to build good habits and break bad ones.',
    dataAiHint: 'person thinking',
    year: 'All',
    pdfUrl: 'https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing',
    rating: 5.0
  }
];

export const courses = [
    'Computer Science & Engineering',
    'Electronics & Communication Engineering',
    'Electrical & Electronics Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Information Technology'
];

export const years = [
    '1st Year',
    '2nd Year',
    '3rd Year',
    '4th Year'
];

export const questionPapers: QuestionPaper[] = [
    {
        id: 1,
        subject: 'Data Structures & Algorithms',
        category: 'Computer Science & Engineering',
        year: '2nd Year',
        semester: '4th Sem',
        university: 'Tech University',
        type: 'End-Term',
        downloadUrl: 'https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing',
    },
    {
        id: 2,
        subject: 'Analog Electronics',
        category: 'Electronics & Communication Engineering',
        year: '2nd Year',
        semester: '3rd Sem',
        university: 'Tech University',
        type: 'Mid-Term',
        downloadUrl: '#',
    },
     {
        id: 3,
        subject: 'Thermodynamics',
        category: 'Mechanical Engineering',
        year: '3rd Year',
        semester: '5th Sem',
        university: 'Central University',
        type: 'End-Term',
        downloadUrl: 'https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing',
    },
     {
        id: 4,
        subject: 'Database Management Systems',
        category: 'Computer Science & Engineering',
        year: '3rd Year',
        semester: '6th Sem',
        university: 'Tech University',
        type: 'End-Term',
        downloadUrl: 'https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing',
    },
];
