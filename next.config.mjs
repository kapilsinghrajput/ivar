/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    runtime: 'nodejs', // Ensures you're using a Node.js runtime instead of Edge.
  },
    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "**",
            },
          ],  
    }
};  

export default nextConfig;
