/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            'images.unsplash.com',
            'img.freepik.com',
            'encrypted-tbn0.gstatic.com',
            'puppis.vteximg.com.br',
            'res.cloudinary.com'
        ]
    }
}

module.exports = nextConfig
