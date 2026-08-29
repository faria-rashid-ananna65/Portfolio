export const formatDate = (dateString) => {
  if (!dateString) return "";
  const options = { year: "numeric", month: "long" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export const truncate = (str, len = 100) => {
  if (!str) return "";
  return str.length > len ? str.substring(0, len) + "..." : str;
};

export const calculateReadingTime = (content) => {
  if (!content) return 5;
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};
