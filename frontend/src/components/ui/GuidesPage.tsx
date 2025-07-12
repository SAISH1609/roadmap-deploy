import React from 'react';

const guides = [
  { title: "Is SQL Hard to Learn? (An Expert's Take)", type: "Textual", link: "#" },
  { title: "How Long Does It Take to Learn SQL? (An Expert's Take)", type: "Textual", link: "#" },
  { title: "SQL vs. Python: Which should you learn for data analysis?", type: "Textual", link: "#" },
  { title: "SQL vs. MySQL: What's the Difference?", type: "Textual", link: "#" },
  { title: "30 SQL Queries Interview Questions and Answers", type: "Questions", link: "#" },
  { title: "Top 30 SQL Interview Questions and Answers (With Quiz)", type: "Questions", link: "#" },
  { title: "Data Analyst Career Path: My Pro Advice", type: "Textual", link: "#" },
  { title: "TypeScript vs JavaScript: Which to Choose For Your Project", type: "Textual", link: "#" },
  { title: "Top 30 JavaScript Interview Questions and Answers", type: "Questions", link: "#" },
  { title: "How to Become a Data Analyst with No Experience: My Advice", type: "Textual", link: "#" },
  { title: "50 Popular Golang Interview Questions (+ Quiz!)", type: "Questions", link: "#" },
  { title: "50 Popular Data Analyst Interview Questions (+ Quiz!)", type: "Questions", link: "#" },
  { title: "Top 50 Full Stack Developer Interview Questions", type: "Questions", link: "#" },
  { title: "50 Popular Backend Developer Interview Questions and Answers", type: "Questions", link: "#" },
];

export default function GuidesPage() {
  return (
    <section className="max-w-3xl mx-auto bg-white/95 dark:bg-gray-900/90 rounded-2xl shadow-xl px-6 py-10 mb-8 border border-gray-200 dark:border-gray-800">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">
        <span className="bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">Guides & Resources</span>
      </h1>
      <div className="grid gap-4">
        {guides.map((guide, index) => (
          <a
            key={index}
            href={guide.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 px-5 py-4 transition hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800/80 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-lg text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-gray-200 transition">
                {guide.title}
              </span>
              <span className="ml-4 text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700">
                {guide.type}
              </span>
            </div>
          </a>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <button className="px-6 py-2 rounded-full bg-gradient-to-r from-black to-gray-700 text-white font-semibold shadow hover:from-gray-900 hover:to-gray-800 transition">
          View All Guides →
        </button>
      </div>
    </section>
  );
}