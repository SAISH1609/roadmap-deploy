import React from "react";

const videos = [
  {
    title: "The Ultimate Frontend Developer Roadmap",
    duration: "10 Minutes",
    link: "https://www.youtube.com/watch?v=w3nt4k2jZUo&t=1s",
  },
  {
    title: "Session Based Authentication",
    duration: "2 Minutes",
    link: "https://www.youtube.com/watch?v=gKkBEOq_shs",
  },
  {
    title: "Basic Authentication",
    duration: "5 Minutes",
    link: "https://www.youtube.com/watch?v=mwccHwUn7Gc&t=3s",
  },
  {
    title: "Basics of Authentication",
    duration: "5 Minutes",
    link: "https://www.youtube.com/watch?v=Mcyt9SrZT6g",
  },
  {
    title: "Graph Data Structure",
    duration: "13 Minutes",
    link: "https://www.youtube.com/watch?v=0sQE8zKhad0",
  },
  {
    title: "Heap Data Structure",
    duration: "11 Minutes",
    link: "https://www.youtube.com/watch?v=F_r0sJ1RqWk",
  },
  {
    title: "Tree Data Structure",
    duration: "8 Minutes",
    link: "https://www.youtube.com/watch?v=S2W3SXGPVyU",
  },
];

const VideosSection = () => {
  return (
    <section className="max-w-3xl mx-auto bg-white/95 dark:bg-gray-900/90 rounded-2xl shadow-xl px-6 py-10 mb-8 border border-gray-200 dark:border-gray-800">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">
        <span className="bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
          Guide Videos
        </span>
      </h1>
      <div className="grid gap-4">
        {videos.map((video, index) => (
          <a
            key={index}
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 px-5 py-4 transition hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800/80 group"
          >
            <span className="font-medium text-base md:text-lg text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-gray-200 transition">
              {video.title}
            </span>
            <span className="ml-4 text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700">
              {video.duration}
            </span>
          </a>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <button className="px-6 py-2 rounded-full bg-gradient-to-r from-black to-gray-700 text-white font-semibold shadow hover:from-gray-900 hover:to-gray-800 transition">
          View All Videos →
        </button>
      </div>
    </section>
  );
};

export default VideosSection;
