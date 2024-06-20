/** @type {import('next').NextConfig} */
const nextConfig = {
  // give access cdn.pixabay.com for images
  images: {
    domains: [
      "cdn.pixabay.com",
      "ofwhprmqrnoxqgrydljw.supabase.co",
      "lh3.googleusercontent.com",
    ],
  },
  // reactStrictMode: false,
  experimental: {
    serverComponentsExternalPackages: ["sharp", "onnxruntime-node"],
  },
};

export default nextConfig;
