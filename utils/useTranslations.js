import translations from "../locales/active.json";

export default function useTranslations() {
  function t(key) {
    return translations[key];
  }
  return t;
}
