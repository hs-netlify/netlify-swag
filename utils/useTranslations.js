const translations = {
  es: {
    home_title: "Casa",
    about_title: "Acerca de",
  },
  en: {
    home_title: "Home",
    about_title: "About",
  },
};

export default function useTranslations() {
  const locale = process.env.NEXT_PUBLIC_LOCALE;
  function t(key) {
    return translations[locale][key];
  }
  return t;
}
