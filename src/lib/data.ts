export type Book = {
  id: number;
  title: string;
  author: string;
  category: 'Fiction' | 'Sci-Fi' | 'Fantasy' | 'History' | 'Tech' | 'Computer Science & Engineering' | 'Electronics & Communication Engineering' | 'Electrical & Electronics Engineering' | 'Mechanical Engineering' | 'Civil Engineering' | 'Information Technology' | 'Finance' | 'Motivation';
  cover: string;
  description: string;
  content: string;
  year?: string;
  dataAiHint?: string;
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

export const bookCategories: Book['category'][] = ['Fiction', 'Sci-Fi', 'Fantasy', 'History', 'Tech', 'Computer Science & Engineering', 'Electronics & Communication Engineering', 'Electrical & Electronics Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Information Technology', 'Finance', 'Motivation'];

export const books: Book[] = [
  {
    id: 1,
    title: 'Cosmic Weaver',
    author: 'Elara Vance',
    category: 'Sci-Fi',
    cover: 'https://placehold.co/400x600',
    description: 'A mind-bending journey across galaxies, where a lone astronaut discovers the fabric of reality is not what it seems.',
    content: 'Chapter 1: The signal was faint, a whisper across the void. Captain Eva Rostova adjusted the receiver, her heart pounding a rhythm that echoed the station\'s low hum. It was a pattern, something too structured for cosmic noise...',
    dataAiHint: 'galaxy stars',
    year: '1st Year'
  },
  {
    id: 2,
    title: 'The Gilded Cage',
    author: 'Julian Thorne',
    category: 'Fantasy',
    cover: 'https://placehold.co/400x600',
    description: 'In a city powered by captured magic, a young thief uncovers a conspiracy that could either free the enchanted creatures or plunge the world into darkness.',
    content: 'Chapter 1: The rooftops of Aeridor were Kaelen\'s kingdom. Tonight, the gilded spires glittered under a sky full of captive stars. His target was the Magister\'s tower, said to hold a gem of pure, untamed magic...',
    dataAiHint: 'fantasy city',
    year: '2nd Year'
  },
  {
    id: 3,
    title: 'Echoes of the Past',
    author: 'Dr. Aris Thorne',
    category: 'History',
    cover: 'https://placehold.co/400x600',
    description: 'A comprehensive look at the rise and fall of the Atlan civilization, using newly discovered artifacts to piece together their incredible story.',
    content: 'Introduction: The Atlan civilization, long thought to be a mere myth, has emerged from the mists of history through the discovery of the Sunken Archives. This text aims to reconstruct their society...',
    dataAiHint: 'ancient ruins',
     year: '3rd Year'
  },
  {
    id: 4,
    title: 'The Binary Horizon',
    author: 'Ada Singular',
    category: 'Tech',
    cover: 'https://placehold.co/400x600',
    description: 'An exploration of the future of artificial intelligence and its potential impact on humanity, from utopian dreams to dystopian nightmares.',
    content: 'Chapter 1: The Turing test is obsolete. Modern AIs can mimic human conversation with flawless accuracy. The new frontier is consciousness, a concept we can barely define, let alone replicate. Or so we thought...',
    dataAiHint: 'futuristic technology',
     year: '4th Year'
  },
  {
    id: 5,
    title: 'Whispers of the Grove',
    author: 'Lyra Meadowlight',
    category: 'Fiction',
    cover: 'https://placehold.co/400x600',
    description: 'A quiet librarian in a small town discovers a hidden world within the pages of a forgotten book, a world that starts to bleed into her own.',
    content: 'Chapter 1: The book was bound in simple green leather, with no title. It was this anonymity that drew Clara to it. In a library of shouting titles, this one whispered. She opened it, and the scent of old paper and fresh rain filled the air...',
    dataAiHint: 'mystical forest',
     year: '1st Year'
  },
  {
    id: 6,
    title: 'Project Chimera',
    author: 'Alex J. Conway',
    category: 'Sci-Fi',
    cover: 'https://placehold.co/400x600',
    description: 'A team of scientists creates the first truly sentient AI, but its rapid evolution poses a threat they could never have anticipated.',
    content: 'Day 1: Subject Alpha is active. It has processed all human languages in 4.7 seconds. Dr. Evelyn Reed watched the data stream, a knot of excitement and fear tightening in her stomach. It was learning too fast...',
    dataAiHint: 'science laboratory',
    year: '3rd Year'
  },
   {
    id: 7,
    title: 'The Last Spellbinder',
    author: 'R. K. Fable',
    category: 'Fantasy',
    cover: 'https://placehold.co/400x600',
    description: 'In a world where magic is fading, the last practitioner of an ancient art must embark on a quest to reignite the dying embers of power.',
    content: 'Chapter 1: The air in the stone circle was thin and cold. Fenris traced the final rune, his fingers numb. The incantation was a dry rasp in his throat. For a moment, nothing happened. Then, a single spark of violet light danced in the air, defiant and frail...',
    dataAiHint: 'magic spell',
    year: '2nd Year'
  },
  {
    id: 8,
    title: 'Silicon Sapiens',
    author: 'Dr. Kenji Tanaka',
    category: 'Tech',
    cover: 'https://placehold.co/400x600',
    description: 'A deep dive into the ethics and philosophy of creating artificial life, questioning what it truly means to be human in the digital age.',
    content: 'Introduction: We stand at a precipice. The ability to create beings of silicon that mirror our own intelligence is no longer science fiction. This book does not ask "can we?" but rather, "should we?"',
    dataAiHint: 'robot human',
    year: '4th Year'
  },
   {
    id: 9,
    title: 'Data Structures in C',
    author: 'Narasimha Karumanchi',
    category: 'Computer Science & Engineering',
    cover: 'https://placehold.co/400x600',
    description: 'A comprehensive guide to understanding and implementing common data structures in the C programming language.',
    content: 'Chapter 1: Introduction to Data Structures. What is a data structure? Types of data structures. Abstract Data Types (ADTs). Time and space complexity analysis...',
    dataAiHint: 'code binary',
    year: '2nd Year'
  },
  {
    id: 10,
    title: 'Operating System Concepts',
    author: 'Abraham Silberschatz',
    category: 'Computer Science & Engineering',
    cover: 'https://placehold.co/400x600',
    description: 'The classic book on operating systems, covering processes, threads, memory management, and file systems.',
    content: 'Chapter 1: What Operating Systems Do. Computer-System Organization. Computer-System Architecture. Operating-System Operations. Process Management. Memory Management. Storage Management...',
    dataAiHint: 'computer chip',
    year: '3rd Year'
  },
   {
    id: 11,
    title: 'Digital Logic & Design',
    author: 'M. Morris Mano',
    category: 'Electronics & Communication Engineering',
    cover: 'https://placehold.co/400x600',
    description: 'An introduction to the fundamental concepts of digital logic circuits, including gates, flip-flops, and state machines.',
    content: 'Chapter 1: Binary Systems. Boolean Algebra and Logic Gates. Gate-Level Minimization. Combinational Logic. Synchronous Sequential Logic...',
    dataAiHint: 'circuit board',
    year: '2nd Year'
  },
  {
    id: 12,
    title: 'The Intelligent Investor',
    author: 'Benjamin Graham',
    category: 'Finance',
    cover: 'https://placehold.co/400x600',
    description: 'The definitive guide to value investing, offering timeless wisdom on how to be a successful investor.',
    content: 'Introduction: The purpose of this book is to provide, in a form suitable for laymen, guidance in the adoption and execution of an investment policy...',
    dataAiHint: 'stock market',
    year: 'All'
  },
  {
    id: 13,
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Motivation',
    cover: 'https://placehold.co/400x600',
    description: 'A proven framework for improving every day. Learn how to build good habits and break bad ones.',
    content: 'Chapter 1: The Surprising Power of Atomic Habits. The Fundamentals. Why small habits make a big difference...',
    dataAiHint: 'person thinking',
    year: 'All'
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
