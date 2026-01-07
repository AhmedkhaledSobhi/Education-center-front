class ConfigService {
  constructor() {
    // Public configuration with defaults
    this.publicConfig = {
      API_BASE_URL: process.env.REACT_APP_API_BASE_URL || "",
    };

    // Sensitive config (لو مش مستخدمها حاليًا خليها فاضية)
    this.sensitiveConfig = {};

    // Combined config
    this.config = { ...this.publicConfig, ...this.sensitiveConfig };
    this.loaded = false;

    // Prevent sensitive config from being modified at runtime
    Object.freeze(this.sensitiveConfig);
  }

  getConfig() {
    if (!this.loaded) {
      console.warn("Config not loaded yet. Using default values.");
    }
    return this.config;
  }

  get(key) {
    const config = this.getConfig();
    return config ? config[key] : undefined;
  }

  // Convenience getter
  get apiBaseUrl() {
    return this.get("API_BASE_URL");
  }
}
// Create singleton instance
const configService = new ConfigService();

export default configService;