/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "utfs.io",
      "res.cloudinary.com",
      "pm-s3-images.s3.us-east-2.amazonaws.com",
    ],
  },
};

export default nextConfig;
