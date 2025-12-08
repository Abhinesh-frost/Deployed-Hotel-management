// Production environment configuration
// This will be loaded from runtime config for cloud deployments
declare const window: any;

export const environment = {
    production: true,
    // Default to relative path, but can be overridden by runtime config
    apiUrl: (window as any).config?.apiUrl || ''
};
