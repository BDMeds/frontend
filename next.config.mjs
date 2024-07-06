/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "t4.ftcdn.net",
      },
      {
        protocol: "https",
        hostname: "cdn.punchng.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "t3.ftcdn.net",
      },
      {
        protocol: "https",
        hostname: "st3.depositphotos.com",
      },
      {
        protocol: "https",
        hostname: "us.123rf.com",
      },
      {
        protocol: "https",
        hostname: "victoria.mediaplanet.com",
      },
      {
        protocol: "https",
        hostname: "parade.com",
      },
      {
        protocol: "https",
        hostname: "shelleefisher.com",
      },
    ],
  },
};

export default nextConfig;
