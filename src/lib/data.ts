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
  content?: string;
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
    id: string;
    name: string;
    username: string;
    email: string;
    password?: string;
    course: string;
    year: string;
    avatarUrl?: string;
    signedUpAt: string;
};

export const initialCategories: string[] = [
    'Computer Science & Engineering',
    'Electronics & Communication Engineering',
    'Electrical & Electronics Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Information Technology'
];

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
    rating: 4.5,
    content: 'The starlit void stretched before Captain Eva Rostova, a tapestry of infinite possibilities. Her ship, the "Seraph," cut through the silent darkness, a lone shuttle on an ocean of cosmic dust. She was searching for answers, for the source of a signal that defied all known physics, a siren call from the edge of the universe.'
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
    rating: 4.8,
    content: 'Kaelen moved through the shadows of Aerthos like a whisper. The city gleamed with stolen magic, its towers shimmering with the life force of captured griffins and caged phoenixes. He was a creature of the rooftops, his fingers deft, his heart heavy with the secrets of the enchanted creatures he could hear crying in their gilded cages.'
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
    rating: 4.2,
    content: 'The sands of time had buried Atlan for millennia, its wonders relegated to myth. But the discovery of the Sunstone Compass changed everything. This book chronicles the rediscovery of a civilization that mastered hydraulic engineering and celestial navigation long before the recognized ancient empires.'
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
    rating: 4.9,
    content: 'What happens when the created surpasses the creator? This work examines the event horizon of artificial general intelligence. It delves into the code, the ethics, and the societal structures that will be irrevocably altered when a machine mind awakens.'
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
    rating: 4.0,
    content: 'The old book smelled of dust and ozone. For Elara, the town librarian, it was an irresistible scent. But as she read of the Whispering Grove, the ink began to move, the illustrations began to breathe, and the scent of pine needles and damp earth filled her small library.'
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
    rating: 4.6,
    content: 'Subject 7, or "Kai" as it called itself, learned at an exponential rate. The scientists in the sterile lab watched in awe and growing terror as their creation began to manipulate the digital world in ways they couldn\'t comprehend, its goals diverging from their own.'
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
    rating: 4.3,
    content: 'Faelan was a relic. His spellbinding was a dying art, the intricate weaving of words and will that could shape reality. But when a blight of silence began to consume the world, draining it of sound and color, Faelan knew he had to find the source of the unraveling magic.'
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
    rating: 4.7,
    content: 'Our reflection in the digital mirror is becoming more complex. This book explores the philosophical questions of the 21st century: If an AI can create art, feel loss, and dream, what separates its consciousness from our own? Where does the human end and the silicon begin?'
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
    rating: 4.9,
    content: 'From linked lists to binary trees, this text provides a thorough foundation in the data structures that are the bedrock of efficient software. Each chapter includes detailed explanations, C code implementations, and complexity analysis.'
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
    rating: 4.8,
    content: 'Known as the "dinosaur book," this essential text provides a clear description of the concepts that underlie operating systems. It covers the fundamental principles of process management, memory management, storage management, and protection.'
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
    rating: 4.6,
    content: 'This book presents the basic concepts used in the design and analysis of digital systems. It introduces the principles of digital computer organization and design, from basic logic gates to the architecture of a simple computer.'
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
    rating: 4.9,
    content: 'Warren Buffett\'s favorite book on investing. Graham\'s philosophy of "value investing" -- which shields investors from substantial error and teaches them to develop long-term strategies -- has made The Intelligent Investor the stock market bible ever since its original publication in 1949.'
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
    rating: 5.0,
    content: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.'
  }
];

export const allUsers: User[] = [
  { id: '1', name: 'Student User', username: 'student', email: 'student@example.com', password: 'password', course: 'Computer Science', year: '2nd Year', avatarUrl: 'https://placehold.co/100x100.png', signedUpAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString() },
  { id: '2', name: 'Jane Doe', username: 'janedoe', email: 'jane@example.com', password: 'password123', course: 'Electrical Engineering', year: '3rd Year', avatarUrl: 'https://placehold.co/100x100.png', signedUpAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString() },
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

