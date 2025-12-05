
import { BlogPost } from './types';

export const categories = [
  'Mental Wellness',
  'Mindset',
  'Business & Strategy',
  'Personal Growth',
  'Lifestyle & Learning',
  'Fitness',
  'Healthcare',
  'Medical Tourism'
];

const sampleContent = `
  <p class="mb-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </p>
  
  <h2 class="text-2xl font-serif font-bold mt-8 mb-4 text-zinc-900 dark:text-zinc-100">The Core Principle</h2>
  <p class="mb-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
  </p>

  <blockquote class="border-l-4 border-zinc-900 dark:border-zinc-100 pl-4 my-8 italic text-xl font-serif text-zinc-600 dark:text-zinc-400">
    "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle."
  </blockquote>

  <h2 class="text-2xl font-serif font-bold mt-8 mb-4 text-zinc-900 dark:text-zinc-100">Practical Application</h2>
  <p class="mb-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
    eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
  </p>
  
  <ul class="list-disc pl-6 mb-6 space-y-2 text-zinc-700 dark:text-zinc-300">
    <li>Focus on the process, not just the outcome.</li>
    <li>Embrace failure as a learning mechanism.</li>
    <li>Consistency beats intensity in the long run.</li>
  </ul>

  <p class="mb-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos 
    qui ratione voluptatem sequi nesciunt.
  </p>
`;

export const posts: BlogPost[] = [
  {
    id: '1',
    title: 'The Power of Starting Small: Why Tiny Habits Create Massive Change',
    slug: 'power-of-starting-small',
    excerpt: 'We often overestimate what we can do in a day and underestimate what we can do in a year. Here is why micro-habits are the key to long-term success.',
    content: sampleContent,
    category: 'Mental Wellness',
    readTime: '5 min read',
    date: 'Oct 12, 2023',
    imageUrl: 'https://picsum.photos/seed/mental-wellness/800/600',
    author: 'Abdul Azeem'
  },
  {
    id: '2',
    title: 'How to Think Better: A Practical Guide to Mental Clarity',
    slug: 'how-to-think-better',
    excerpt: 'In a world of noise, clarity is power. Discover the mental models that high performers use to make better decisions faster.',
    content: sampleContent,
    category: 'Mindset',
    readTime: '7 min read',
    date: 'Oct 15, 2023',
    imageUrl: 'https://picsum.photos/seed/mindset/800/600',
    author: 'Abdul Azeem'
  },
  {
    id: '3',
    title: 'Lessons I Learned From Failing Forward',
    slug: 'lessons-failing-forward',
    excerpt: 'Failure is not the opposite of success; it is part of success. Here are the hard-won lessons from my biggest setbacks.',
    content: sampleContent,
    category: 'Personal Growth',
    readTime: '6 min read',
    date: 'Oct 20, 2023',
    imageUrl: 'https://picsum.photos/seed/failure/800/600',
    author: 'Abdul Azeem'
  },
  {
    id: '4',
    title: 'The Art of Focus: Strategies to Protect Your Attention',
    slug: 'art-of-focus',
    excerpt: 'Your attention is your most valuable asset. Learn how to reclaim your focus in an age of infinite distraction.',
    content: sampleContent,
    category: 'Lifestyle & Learning',
    readTime: '4 min read',
    date: 'Oct 25, 2023',
    imageUrl: 'https://picsum.photos/seed/focus/800/600',
    author: 'Abdul Azeem'
  },
  {
    id: '5',
    title: 'Why Most People Don’t Achieve Their Goals—and How You Can',
    slug: 'achieve-goals',
    excerpt: 'Goal setting is easy. Goal getting is hard. We explore the psychological barriers that stop execution and how to break through them.',
    content: sampleContent,
    category: 'Business & Strategy',
    readTime: '8 min read',
    date: 'Oct 28, 2023',
    imageUrl: 'https://picsum.photos/seed/goals/800/600',
    author: 'Abdul Azeem'
  },
  {
    id: '6',
    title: 'The Future of Health: Why Prevention is the New Cure',
    slug: 'future-of-health',
    excerpt: 'Modern medicine is amazing at fixing acute problems, but true longevity comes from proactive lifestyle design. Here is the blueprint for a healthier life.',
    content: sampleContent,
    category: 'Healthcare',
    readTime: '6 min read',
    date: 'Nov 02, 2023',
    imageUrl: 'https://picsum.photos/seed/healthcare/800/600',
    author: 'Abdul Azeem'
  },
  {
    id: '7',
    title: 'Global Care: The Rise of Medical Tourism',
    slug: 'global-care-medical-tourism',
    excerpt: 'Why more patients are traveling abroad for high-quality, affordable healthcare, and what you need to consider before packing your bags.',
    content: sampleContent,
    category: 'Medical Tourism',
    readTime: '5 min read',
    date: 'Nov 05, 2023',
    imageUrl: 'https://picsum.photos/seed/travel/800/600',
    author: 'Abdul Azeem'
  },
  {
    id: '8',
    title: 'The Architecture of Strength: Building a Body That Lasts',
    slug: 'architecture-of-strength',
    excerpt: 'True fitness is not just about aesthetics; it is about capability and longevity. A foundational approach to physical resilience.',
    content: sampleContent,
    category: 'Fitness',
    readTime: '6 min read',
    date: 'Nov 10, 2023',
    imageUrl: 'https://picsum.photos/seed/fitness/800/600',
    author: 'Abdul Azeem'
  }
];