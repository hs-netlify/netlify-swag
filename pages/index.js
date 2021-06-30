import useTranslations from "../utils/useTranslations";
export default function Home() {
  const t = useTranslations();
  return <h1 className="p-12 text-3xl font-bold">{t("home_title")}</h1>;
}
