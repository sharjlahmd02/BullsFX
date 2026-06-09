"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, TrendingUp } from "lucide-react";

interface NewsItem {
  uuid: string;
  title: string;
  description: string;
  source: string;
  url: string;
  image_url?: string;
  published_at?: string;
}

interface MarketNewsProps {
  isDark: boolean;
}

const STORAGE_KEY = "bullsfx_daily_news";
const STORAGE_TIME_KEY = "bullsfx_news_time";
const ONE_DAY = 24 * 60 * 60 * 1000;

const MarketNews = ({ isDark }: MarketNewsProps) => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const cachedNews = localStorage.getItem(STORAGE_KEY);
        const cachedTime = localStorage.getItem(STORAGE_TIME_KEY);

        if (cachedNews && cachedTime) {
          const isValid = Date.now() - Number(cachedTime) < ONE_DAY;
          if (isValid) {
            setNews(JSON.parse(cachedNews));
            return;
          }
        }

        const API_KEY = import.meta.env.VITE_MARKETAUX_KEY;

        const res = await fetch(
          `https://api.marketaux.com/v1/news/all?language=en&filter_entities=true&limit=8&api_token=${API_KEY}`
        );

        const data = await res.json();

        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.data));
        localStorage.setItem(STORAGE_TIME_KEY, Date.now().toString());

        setNews(data.data || []);
      } catch (err) {
        console.error("Market News Error", err);
      }
    };

    fetchNews();
  }, []);

  if (!news.length) return null;

  const featured = news[0];
  const rest = news.slice(1);

  return (
    <section
      className={`py-28 transition-colors ${
        isDark ? "bg-neutral-950 text-white" : "bg-neutral-50 text-neutral-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div
            className={`h-0.5 w-14 mx-auto mb-6 ${
              isDark ? "bg-[#08CB00]" : "bg-neutral-900"
            }`}
          />
          <h2 className="text-4xl md:text-6xl font-light mb-4">
            Latest News
          </h2>
          <p
            className={`max-w-xl mx-auto text-lg font-light ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            Today’s most important movements across global markets.
          </p>
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured News */}
          <motion.a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -6 }}
            className={`lg:col-span-2 group rounded-3xl overflow-hidden border transition-all
              ${
                isDark
                  ? "bg-neutral-900 border-neutral-800"
                  : "bg-white border-neutral-200"
              }
            `}
          >
            <div className="relative h-[320px]">
              <img
                src={
                  featured.image_url ||
                  "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg"
                }
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>

            <div className="p-8">
              <div className="flex items-center gap-2 text-xs text-[#08CB00] uppercase tracking-widest mb-3">
                <TrendingUp size={14} />
                {featured.source}
              </div>

              <h3 className="text-2xl md:text-3xl font-semibold mb-4 leading-snug">
                {featured.title}
              </h3>

              <p
                className={`text-base leading-relaxed ${
                  isDark ? "text-neutral-400" : "text-neutral-600"
                }`}
              >
                {featured.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[#08CB00]">
                Read full analysis <ExternalLink size={14} />
              </div>
            </div>
          </motion.a>

          {/* Side News */}
          <div className="flex flex-col gap-6">
            {rest.map((item) => (
              <motion.a
                key={item.uuid}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className={`group rounded-2xl p-5 border transition-all
                  ${
                    isDark
                      ? "bg-neutral-900 border-neutral-800"
                      : "bg-white border-neutral-200"
                  }
                `}
              >
                <div className="flex gap-4">
                  <img
                    src={
                      item.image_url ||
                      "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg"
                    }
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />

                  <div>
                    <p className="text-xs text-[#08CB00] uppercase tracking-wide mb-1">
                      {item.source}
                    </p>
                    <h4 className="text-sm font-semibold leading-snug mb-1">
                      {item.title}
                    </h4>
                    <p
                      className={`text-xs line-clamp-2 ${
                        isDark ? "text-neutral-400" : "text-neutral-600"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketNews;
