import Link from "next/link";
import LocalePicker from "../LocalePicker";
import useTranslations from "../../utils/useTranslations";

export default function Nav() {
  const t = useTranslations();
  return (
    <nav className="text-xl flex items-center h-16 px-4 border-b border-gray-800 space-x-6">
      <Link href="/">
        <a>{t("home_title")}</a>
      </Link>
      <Link href="/about">
        <a>{t("about_title")}</a>
      </Link>
      <LocalePicker />
    </nav>
  );
}
