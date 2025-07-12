import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 pt-10 pb-6 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mb-10 text-base font-medium text-gray-400">
          {["Roadmaps", "Best Practices", "Guides", "Videos", "FAQs", "YouTube"].map((item) => (
            <a key={item} href="#" className="hover:text-white transition-colors duration-200">
              {item}
            </a>
          ))}
        </nav>

        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-8">
          <div className="flex flex-col items-center md:items-start w-full max-w-md text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white rounded px-2 py-1">
                <span className="font-bold text-black text-lg">r.</span>
              </span>
              <span className="font-semibold text-white text-lg">roadmap.sh</span>
              <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">by @kamrify</span>
            </div>

            <p className="text-sm text-gray-400 mb-3">
              Community created roadmaps, best practices, projects, articles, and resources to help you grow in your career.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-gray-400 mb-3">
              <span>© roadmap.sh</span>
              <span>·</span>
              <a href="#" className="hover:text-white">Terms</a>
              <span>·</span>
              <a href="#" className="hover:text-white">Privacy</a>
            </div>

            <div className="flex gap-4 justify-center md:justify-start mt-2">
              <a href="#" aria-label="LinkedIn" className="hover:scale-110 transition-transform">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                  alt="LinkedIn"
                  className="w-6 h-6"
                />
              </a>
              <a href="#" aria-label="Facebook" className="hover:scale-110 transition-transform">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
                  alt="Facebook"
                  className="w-6 h-6"
                />
              </a>
              <a href="#" aria-label="YouTube" className="hover:scale-110 transition-transform">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
                  alt="YouTube"
                  className="h-5 w-auto"
                />
              </a>
            </div>

            <button className="mt-4 bg-gray-800 text-gray-400 px-4 py-2 rounded-lg text-xs hover:text-white transition">
              Cookie Settings
            </button>
          </div>

          <div className="flex flex-col items-center md:items-start w-full max-w-md">
            <h2 className="font-extrabold text-2xl text-white mb-2 text-center md:text-left">
              <span className="text-[#00e6ff]">THE</span>{" "}
              <span className="text-[#ff0080]">NEW</span>{" "}
              <span className="text-white">STACK</span>
            </h2>

            <p className="text-sm text-gray-400 mb-2 text-center md:text-left">
              The top DevOps resource for Kubernetes, cloud-native computing, and large-scale development and deployment.
            </p>

            <div className="flex flex-wrap gap-3 text-xs text-gray-400 justify-center md:justify-start">
              <span>DevOps</span>
              <span>·</span>
              <span>Kubernetes</span>
              <span>·</span>
              <span>Cloud-Native</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
