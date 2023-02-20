import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";
import CustomHits from "./CustomHits";
import CustomSearchBox from "./CustomSearchBox";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "3TRURWF89M",
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ||
    "19cc66997036a6b6da05028fba5a4d9c"
);

export default function Search() {
  return (
    <div className="max-w-7xl flex flex-col items-stretch justify-between mx-auto px-4 sm:px-6 lg:px-8">
      <InstantSearch searchClient={searchClient} indexName="shopify_products">
        <CustomSearchBox />
        <CustomHits />
      </InstantSearch>
    </div>
  );
}
