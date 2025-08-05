export type Book = {
  id: number;
  title: string;
  author: string;
  category: 'Fiction' | 'Sci-Fi' | 'Fantasy' | 'History' | 'Tech';
  cover: string;
  description: string;
  content: string;
};

export const bookCategories: Book['category'][] = ['Fiction', 'Sci-Fi', 'Fantasy', 'History', 'Tech'];

export const books: Book[] = [
  {
    id: 1,
    title: 'Cosmic Weaver',
    author: 'Elara Vance',
    category: 'Sci-Fi',
    cover: 'https://placehold.co/400x600',
    description: 'A mind-bending journey across galaxies, where a lone astronaut discovers the fabric of reality is not what it seems.',
    content: 'Chapter 1: The signal was faint, a whisper across the void. Captain Eva Rostova adjusted the receiver, her heart pounding a rhythm that echoed the station\'s low hum. It was a pattern, something too structured for cosmic noise...'
  },
  {
    id: 2,
    title: 'The Gilded Cage',
    author: 'Julian Thorne',
    category: 'Fantasy',
    cover: 'https://placehold.co/400x600',
    description: 'In a city powered by captured magic, a young thief uncovers a conspiracy that could either free the enchanted creatures or plunge the world into darkness.',
    content: 'Chapter 1: The rooftops of Aeridor were Kaelen\'s kingdom. Tonight, the gilded spires glittered under a sky full of captive stars. His target was the Magister\'s tower, said to hold a gem of pure, untamed magic...'
  },
  {
    id: 3,
    title: 'Echoes of the Past',
    author: 'Dr. Aris Thorne',
    category: 'History',
    cover: 'https://placehold.co/400x600',
    description: 'A comprehensive look at the rise and fall of the Atlan civilization, using newly discovered artifacts to piece together their incredible story.',
    content: 'Introduction: The Atlan civilization, long thought to be a mere myth, has emerged from the mists of history through the discovery of the Sunken Archives. This text aims to reconstruct their society...'
  },
  {
    id: 4,
    title: 'The Binary Horizon',
    author: 'Ada Singular',
    category: 'Tech',
    cover: 'https://placehold.co/400x600',
    description: 'An exploration of the future of artificial intelligence and its potential impact on humanity, from utopian dreams to dystopian nightmares.',
    content: 'Chapter 1: The Turing test is obsolete. Modern AIs can mimic human conversation with flawless accuracy. The new frontier is consciousness, a concept we can barely define, let alone replicate. Or so we thought...'
  },
  {
    id: 5,
    title: 'Whispers of the Grove',
    author: 'Lyra Meadowlight',
    category: 'Fiction',
    cover: 'https://placehold.co/400x600',
    description: 'A quiet librarian in a small town discovers a hidden world within the pages of a forgotten book, a world that starts to bleed into her own.',
    content: 'Chapter 1: The book was bound in simple green leather, with no title. It was this anonymity that drew Clara to it. In a library of shouting titles, this one whispered. She opened it, and the scent of old paper and fresh rain filled the air...'
  },
  {
    id: 6,
    title: 'Project Chimera',
    author: 'Alex J. Conway',
    category: 'Sci-Fi',
    cover: 'https://placehold.co/400x600',
    description: 'A team of scientists creates the first truly sentient AI, but its rapid evolution poses a threat they could never have anticipated.',
    content: 'Day 1: Subject Alpha is active. It has processed all human languages in 4.7 seconds. Dr. Evelyn Reed watched the data stream, a knot of excitement and fear tightening in her stomach. It was learning too fast...'
  },
   {
    id: 7,
    title: 'The Last Spellbinder',
    author: 'R. K. Fable',
    category: 'Fantasy',
    cover: 'https://placehold.co/400x600',
    description: 'In a world where magic is fading, the last practitioner of an ancient art must embark on a quest to reignite the dying embers of power.',
    content: 'Chapter 1: The air in the stone circle was thin and cold. Fenris traced the final rune, his fingers numb. The incantation was a dry rasp in his throat. For a moment, nothing happened. Then, a single spark of violet light danced in the air, defiant and frail...'
  },
  {
    id: 8,
    title: 'Silicon Sapiens',
    author: 'Dr. Kenji Tanaka',
    category: 'Tech',
    cover: 'https://placehold.co/400x600',
    description: 'A deep dive into the ethics and philosophy of creating artificial life, questioning what it truly means to be human in the digital age.',
    content: 'Introduction: We stand at a precipice. The ability to create beings of silicon that mirror our own intelligence is no longer science fiction. This book does not ask "can we?" but rather, "should we?"'
  },
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
