import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
