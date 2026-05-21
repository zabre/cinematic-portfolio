/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing']
};

module.exports = nextConfig;
