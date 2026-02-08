export const APP_CONFIG = {
    IS_DEMO: import.meta.env.VITE_IS_DEMO === 'true', // Cambiar mediante variables de entorno (scripts build:demo / build:full)
    DEMO_LIMIT: 2
};
