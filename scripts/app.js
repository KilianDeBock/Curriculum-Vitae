(() => {
  const app = {
    async initialize() {
      await this.getLanguage();
      this.cacheElements();
    },
    async getLanguage(lang = null) {
      try {
        // get language from url parameter
        const urlParams = new URLSearchParams(window.location.search);
        const language = lang ?? urlParams.get("lang") ?? "en";

        // get json file
        const response = await fetch(`./i18n/${language}.json`);
        this.language = await response.json();
      } catch (error) {
        return this.getLanguage("en");
      }
    },
    cacheElements() {
      console.log(this.language);
      const languageKeys = Object.keys(this.language);
      for (const key of languageKeys) {
        const elements = document.querySelectorAll(`[data-i18n="${key}"]`);
        for (const element of elements) {
          if (element) {
            // I would suggest to use innerText instead of innerHTML
            // But it depends on your use case and if you need to render HTML
            // I don't use user content, so i use innerHTML!
            element.innerHTML = this.language[key];
          }
        }
      }
    },
  };

  app.initialize();
})();
