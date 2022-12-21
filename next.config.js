/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: false,
    basePath: '/',
    images: {
        domains: [
            'images.unsplash.com',
            'img.freepik.com',
            'encrypted-tbn0.gstatic.com',
            'puppis.vteximg.com.br',
            'res.cloudinary.com',
            'lh3.googleusercontent.com',
            's.gravatar.com'
        ]
    }
}

module.exports = nextConfig
