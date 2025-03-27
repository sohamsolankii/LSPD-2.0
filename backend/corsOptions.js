export const corsOptions = {
    origin: (origin, callback) => {
        callback(null, true) // Allow all origins
    },
    credentials: true, // Allow cookies/auth to be passed
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'XMLHttpRequest',
    ], // Specify allowed headers
}
