export const getURL = (path) => {
  const url =
    process?.env?.URL && process.env.URL !== ""
      ? process.env.URL
      : process?.env?.NEXT_PUBLIC_VERCEL_URL &&
        process.env.NEXT_PUBLIC_VERCEL_URL !== ""
      ? process.env.NEXT_PUBLIC_VERCEL_URL
      : "http://localhost:3000";
  console.log("-------------------URL", url);
  return url.includes("http") ? url + path : `https://${url}${path}`;
};
