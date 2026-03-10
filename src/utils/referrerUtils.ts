import { TrafficSource } from "@/types/visitTypes";

const SOCIAL_DOMAINS = [
  { pattern: "twitter.com", name: "Twitter" },
  { pattern: "x.com", name: "Twitter" },
  { pattern: "t.co", name: "Twitter" },
  { pattern: "linkedin.com", name: "LinkedIn" },
  { pattern: "github.com", name: "GitHub" },
  { pattern: "facebook.com", name: "Facebook" },
  { pattern: "instagram.com", name: "Instagram" },
  { pattern: "youtube.com", name: "YouTube" },
  { pattern: "reddit.com", name: "Reddit" },
  { pattern: "discord.com", name: "Discord" },
];

const SEARCH_DOMAINS = [
  { pattern: "google.", name: "Google" },
  { pattern: "bing.com", name: "Bing" },
  { pattern: "duckduckgo.com", name: "DuckDuckGo" },
  { pattern: "yahoo.com", name: "Yahoo" },
  { pattern: "baidu.com", name: "Baidu" },
  { pattern: "yandex.", name: "Yandex" },
];

const BLOG_DOMAINS = [
  { pattern: "medium.com", name: "Medium" },
  { pattern: "dev.to", name: "Dev.to" },
  { pattern: "hashnode.", name: "Hashnode" },
  { pattern: "substack.com", name: "Substack" },
  { pattern: "wordpress.com", name: "WordPress" },
  { pattern: "blogger.com", name: "Blogger" },
  { pattern: "hackernoon.com", name: "HackerNoon" },
];

export interface ReferrerInfo {
  category: TrafficSource;
  sourceName: string;
}

export function categorizeReferrer(
  referrerUrl: string,
  currentHostname: string
): ReferrerInfo {
  if (!referrerUrl || referrerUrl === "") {
    return { category: "direct", sourceName: "Direct" };
  }

  try {
    const url = new URL(referrerUrl);
    const hostname = url.hostname.toLowerCase();

    if (
      hostname === currentHostname ||
      hostname.endsWith(`.${currentHostname}`)
    ) {
      return { category: "direct", sourceName: "Direct" };
    }

    for (const social of SOCIAL_DOMAINS) {
      if (hostname.includes(social.pattern)) {
        return { category: "social", sourceName: social.name };
      }
    }

    for (const search of SEARCH_DOMAINS) {
      if (hostname.includes(search.pattern)) {
        return { category: "search", sourceName: search.name };
      }
    }

    for (const blog of BLOG_DOMAINS) {
      if (hostname.includes(blog.pattern)) {
        return { category: "blog", sourceName: blog.name };
      }
    }

    return { category: "other", sourceName: hostname };
  } catch {
    return { category: "other", sourceName: "Unknown" };
  }
}
