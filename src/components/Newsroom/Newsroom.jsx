import { useEffect, useState } from "react";

const RSS_URL =
  "https://api.rss2json.com/v1/api.json?rss_url=https://techcrunch.com/feed/";

export default function Newsroom() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(RSS_URL)
      .then((res) => res.json())
      .then((data) => {
        setNews(data.items.slice(0, 10)); // ✅ max 6
      })
      .catch((err) => console.error("News fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-400 py-12">
        Fetching latest tech news…
      </p>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-bold">📰 Newsroom</h2>
        <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
          Live · TechCrunch
        </span>
      </div>

      {/* GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((item, i) => (
          <a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              block
              rounded-xl
              border border-gray-200 dark:border-gray-800
              p-5
              hover:shadow-lg
              transition
            "
          >
            {/* CATEGORY */}
            {item.categories?.[0] && (
              <p className="text-xs uppercase tracking-wide text-blue-600 mb-2">
                {item.categories[0]}
              </p>
            )}

            {/* TITLE */}
            <h3 className="text-lg font-semibold leading-snug group-hover:underline">
              {item.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
              {item.description}
            </p>

            {/* META */}
            <div className="mt-4 text-xs text-gray-500 flex flex-wrap gap-2">
              <span>{item.author || "TechCrunch"}</span>
              <span>•</span>
              <span>
                {new Date(item.pubDate).toLocaleDateString()}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
