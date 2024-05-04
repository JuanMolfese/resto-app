module.exports = {
    images: {   
      /* domains: ['res.cloudinary.com'],  */ // Add your domain for the image
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',          
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          port: '',
          pathname: '/',
        
        },
      ],
    },
    //Para arreglar problema :https://raddy.dev/blog/next-js-14-0-2-x-forwarded-host-header-with-value-localhost3000-does-not-match-origin-fix/
    experimental: {
        serverActions: {
          allowedOrigins: ["website.com", "localhost:3000"]
        }
      }
};