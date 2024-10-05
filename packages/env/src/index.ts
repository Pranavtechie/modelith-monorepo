const env = process.env.NODE_ENV || 'development';

interface ENV {
    BACKEND_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
}

const development: ENV = {
    BACKEND_URL: 'http://localhost:8080',
    NODE_ENV: 'development',
};

const production: ENV = {
    BACKEND_URL: 'https://api.modelith.com',
    NODE_ENV: 'production',
};

const getEnvVars = (env: string): ENV => {
    switch (env) {
        case 'production':
            return production;
        case 'development':
        default:
            return development;
    }
};

export default getEnvVars(env);
