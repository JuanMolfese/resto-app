module.exports = {
    images: {
    domains: ["lh3.googleusercontent.com"],
    formats: ["image/avif", "image/webp"],
    },
    //Para arreglar problema :https://raddy.dev/blog/next-js-14-0-2-x-forwarded-host-header-with-value-localhost3000-does-not-match-origin-fix/
    experimental: {
        serverActions: {
          allowedOrigins: ["website.com", "localhost:3000"]
        }
      }
};