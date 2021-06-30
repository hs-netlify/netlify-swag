import useTranslations from "../utils/useTranslations";

export default function About() {
  const t = useTranslations();

  return <h1 className="p-12 text-3xl font-bold">{t("about_title")}</h1>;
}
