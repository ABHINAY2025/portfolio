import { useParams, Link } from "react-router-dom";
import { blogs } from "../blog-data/blog";
import { useEffect, useMemo, useRef, useState } from "react";


export default function BlogPost() {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  const contentRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  if (!blog) {
    return <p className="pt-32 text-center">Post not found.</p>;
  }

  /* ---------------------------
     🔥 TABLE OF CONTENTS
  --------------------------- */
  const headings = useMemo(() => {
    return blog.content
      .split("\n")
      .filter((line) => line.startsWith("## "))
      .map((h) => h.replace("## ", ""));
  }, [blog.content]);

  /* ---------------------------
     🕒 READING PROGRESS BAR
  --------------------------- */
  useEffect(() => {
    const handleScroll = () => {
      const el = contentRef.current;
      if (!el) return;

      const total = el.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setProgress(Math.min((current / total) * 100, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      {/* 🔵 PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-transparent z-[2000]">
        <div
          className="h-full bg-black dark:bg-white transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <article className="bg-[#f7f8fa] dark:bg-[#0e0e11] min-h-screen transition-colors">
        <div className="max-w-3xl mx-auto pt-32 px-6 pb-24">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/blog"
              className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
            >
              ← Back to Writing
            </Link>

            {/* 🌙 DARK MODE TOGGLE */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded-full border text-sm
                border-black/10 dark:border-white/10
                bg-white dark:bg-[#16161a]
                text-black dark:text-white"
            >
              {darkMode ? "Light mode" : "Dark mode"}
            </button>
          </div>

          {/* META */}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {blog.date} · {blog.readTime}
          </p>

          {/* TITLE */}
          <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-black dark:text-white">
            {blog.title}
          </h1>

          {/* 📌 TABLE OF CONTENTS */}
          {headings.length > 0 && (
            <div className="
              mt-10 mb-16
              p-6 rounded-2xl
              bg-white dark:bg-[#16161a]
              border border-black/5 dark:border-white/10
            ">
              <p className="text-sm font-semibold mb-4 text-black dark:text-white">
                On this page
              </p>

              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {headings.map((h, i) => (
                  <li key={i}>
                    <a href={`#${h.replace(/\s+/g, "-")}`} className="hover:underline">
                      {h}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CONTENT */}
          <div
            ref={contentRef}
            className="
              prose prose-lg max-w-none
              dark:prose-invert

              prose-h2:text-2xl prose-h2:md:text-3xl
              prose-h2:font-semibold
              prose-h2:mt-16 prose-h2:mb-6

              prose-h3:text-xl prose-h3:md:text-2xl
              prose-h3:font-semibold
              prose-h3:mt-12 prose-h3:mb-4

              prose-p:leading-relaxed
              prose-p:text-gray-700 dark:prose-p:text-gray-300

              prose-strong:text-black dark:prose-strong:text-white

              prose-ul:text-gray-700 dark:prose-ul:text-gray-300
              prose-li:marker:text-black dark:prose-li:marker:text-white

              prose-blockquote:border-l-4
              prose-blockquote:border-black dark:prose-blockquote:border-white
              prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
              prose-blockquote:italic
            "
          >
            {blog.content.split("\n").map((line, i) => {
              if (line.startsWith("## ")) {
                const id = line.replace("## ", "").replace(/\s+/g, "-");
                return (
                  <h2 key={i} id={id}>
                    {line.replace("## ", "")}
                  </h2>
                );
              }

              return <p key={i}>{line}</p>;
            })}
          </div>

          {/* 🔥 SECTION DIVIDER */}
          <div className="mt-20 flex items-center gap-4">
            <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              End
            </span>
            <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
          </div>

        </div>
      </article>
    </div>
  );
}
