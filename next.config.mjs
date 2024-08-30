/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push({
      'spline-runtime': 'Spline',
    })
    return config
  },
}

export default nextConfig;