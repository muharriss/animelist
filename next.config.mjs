/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          // {
          //   hostname: 'cdn.myanimelist.net',
          // },
          {
            hostname: 'avatars.githubusercontent.com'
          },
          {
            hostname: 'lh3.googleusercontent.com'
          }
        ],
        domains: ['cdn.myanimelist.net'],
      }
};

export default nextConfig;
