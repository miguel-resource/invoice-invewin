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
    },
    sassOptions: {
        includePaths: ['./src/styles'],
    },
}

module.exports = nextConfig
