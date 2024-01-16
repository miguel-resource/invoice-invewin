/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/load-ticket',
                permanent: true,
            },
        ]
    }
}

module.exports = nextConfig
