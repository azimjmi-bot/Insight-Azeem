import React from 'react';

const About: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero */}
      <div className="bg-zinc-50 dark:bg-zinc-900 py-20">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-zinc-900 dark:text-white mb-6">Who is Abdul Azeem?</h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed">
            A thinker, a writer, and a lifelong student of what makes us better.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="aspect-[3/4] rounded-lg overflow-hidden">
            <img src="https://picsum.photos/seed/azeem_portrait/800/1000" alt="Abdul Azeem Portrait" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-6">
             <h2 className="text-3xl font-serif font-bold text-zinc-900 dark:text-white">The Mission</h2>
             <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
               Welcome to AzeemInsights. My mission is simple: <strong>to bridge the gap between deep philosophy and practical action.</strong>
             </p>
             <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
               We live in an age of information overload but wisdom scarcity. I spend my days reading, researching, and experimenting with ideas from business, psychology, and stoicism, distilling them into clear, actionable insights for you.
             </p>
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert prose-zinc mx-auto mb-16">
          <h3 className="font-serif">My Philosophy</h3>
          <p>
            I believe that the quality of your life is determined by the quality of your questions. Most people are looking for easy answers; I am interested in better questions.
          </p>
          <p>
            On this site, you won't find quick hacks or shallow listicles. You will find:
          </p>
          <ul>
            <li><strong>Deep Thinking:</strong> First-principles analysis of modern problems.</li>
            <li><strong>Practical Insights:</strong> Theory is useless without execution.</li>
            <li><strong>Honest Reflection:</strong> I share my wins, but also my failures.</li>
          </ul>

          <h3 className="font-serif">What I Write About</h3>
          <p>
            My writing revolves around a few core pillars:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-8">
            <div className="p-6 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
              <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Self-Growth</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Mastering your habits and routines.</p>
            </div>
            <div className="p-6 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
              <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Mindset</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Mental models for better decisions.</p>
            </div>
            <div className="p-6 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
              <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Business</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Strategy, leadership, and execution.</p>
            </div>
            <div className="p-6 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
              <h4 className="font-bold text-zinc-900 dark:text-white mb-2">Lifestyle</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Designing a life of freedom and purpose.</p>
            </div>
          </div>
        </div>

        <div className="text-center bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 p-12 rounded-2xl">
          <h2 className="text-3xl font-serif font-bold mb-4">Let's Connect</h2>
          <p className="mb-8 opacity-80">I love hearing from readers. Drop me a line or follow me on social.</p>
          <a href="/contact" className="inline-block px-8 py-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
            Contact Me
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;