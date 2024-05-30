import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { BADGE_CRITERIA } from "@/constants";
import { BadgeCounts } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const diff = Math.abs(now.getTime() - createdAt.getTime());
  const days = Math.floor(diff / (1000 * 3600 * 24));

  if (days === 0) {
    const hours = Math.floor(diff / (1000 * 3600));
    if (hours === 0) {
      return "just now";
    } else if (hours === 1) {
      return "1 hour ago";
    } else {
      return `${hours} hours ago`;
    }
  } else if (days === 1) {
    return "1 day ago";
  } else {
    return `${days} days ago`;
  }
};

export const formatNumber = (number: number): string => {
  const suffixes = ["", "K", "M", "B", "T"]; // Add more as needed
  if (number > 999) {
    const suffixNum = Math.floor(("" + number).length / 3);
    let shortValue = parseFloat(
      (suffixNum !== 0 ? number / Math.pow(1000, suffixNum) : number).toFixed(2)
    );
    if (shortValue % 1 !== 0) {
      shortValue = parseFloat(shortValue.toFixed(1));
    }
    return shortValue + suffixes[suffixNum];
  }
  return String(number);
};

export const formatDate = (date: Date) => {
  return date.toLocaleString("default", { month: "long", year: "numeric" });
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface RemoveQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveQueryParams) => {
  const currentUrl = qs.parse(params);
  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface BadgeParam {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}

export const assignBadges = (params: BadgeParam) => {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };

  const { criteria } = params;

  for (const criterium of criteria) {
    const { type, count } = criterium;
    const badgeCriteria: any = BADGE_CRITERIA[type];

    Object.keys(badgeCriteria).forEach((level: any) => {
      if (count >= badgeCriteria[level]) {
        badgeCounts[level as keyof BadgeCounts] += 1;
      }
    });
  }
  return badgeCounts;
};
