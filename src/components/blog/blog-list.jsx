import { Link } from "react-router-dom";
import { blogs } from "../blog-data/blog";
import { motion } from "framer-motion";

export default function BlogList() {
  return (
    <section className="max-w-7xl mx-auto pt-28 pb-24 px-5 sm:px-6 md:px-10">

      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 md:mb-16"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black">
          Writing
        </h1>

        <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-xl leading-relaxed">
          Thoughts on backend systems, small UI details, and building things that feel right.
        </p>
      </motion.div>

      {/* ================= BLOG GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
        {blogs.map((blog, i) => (
          <motion.div
            key={blog.slug}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            viewport={{ once: true }}
          >
            <Link
              to={`/blog/${blog.slug}`}
              className="
                group block h-full
                rounded-2xl sm:rounded-3xl
                bg-white
                p-5 sm:p-6 md:p-7
                shadow-[0_8px_24px_rgba(0,0,0,0.06)]
                hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)]
                transition-all duration-300
              "
            >
              {/* META */}
              <p className="text-[11px] sm:text-xs uppercase tracking-widest text-gray-500 mb-2 sm:mb-3">
                {blog.date} · {blog.readTime}
              </p>

              {/* TITLE */}
              <h2 className="
                text-lg sm:text-xl md:text-2xl
                font-semibold text-black
                leading-snug
                group-hover:underline
                underline-offset-4
              ">
                {blog.title}
              </h2>

              {/* EXCERPT */}
              <p className="mt-3 sm:mt-4 text-gray-600 text-sm leading-relaxed">
                {blog.excerpt}
              </p>

              {/* CTA */}
              <span className="
                inline-flex items-center gap-1
                mt-5 sm:mt-6
                text-sm font-medium text-black
                group-hover:gap-2 transition-all
              ">
                Read article <span>→</span>
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
