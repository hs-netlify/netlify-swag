import Search from "../components/Search";
import { getNavigation } from "../lib/prismic";

export default function SearchPage() {
  return <Search />;
}

export async function getStaticProps() {
  const navLinks = await getNavigation();
  return {
    props: {
      navLinks,
    },
  };
}
