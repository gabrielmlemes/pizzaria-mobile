import 'dotenv/config'; // Lê os valores do arquivo .env

export default ({ config }) => {
  return {
    ...config,
    extra: {
      ...config.extra,
      REACT_APP_API_URL: process.env.NODE_ENV === 'development' 
        ? process.env.API_URL_DEV 
        : process.env.API_URL_PROD,
    },
  };
};
