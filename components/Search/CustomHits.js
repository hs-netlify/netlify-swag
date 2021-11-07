import { connectStateResults } from "react-instantsearch-dom";
import ProductCard from "../ProductCard";
import NoResults from "./NoResults";

function Hits({ searchState, searchResults }) {
  const validQuery = searchState.query?.length >= 1;

  return (
    <div className="mt-12 mb-24">
      {searchResults?.hits.length === 0 && validQuery ? (
        <NoResults />
      ) : searchResults?.hits.length > 0 ? (
        <ol className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {searchResults.hits.map((hit) => {
            const product = {
              title: hit.title,
              id: hit.handle,
              href: `/product/${hit.handle}`,
              imageUrl: hit.image,
              price: hit.price,
            };
            return (
              <li key={hit.objectID}>
                <ProductCard product={product} />
              </li>
            );
          })}
        </ol>
      ) : (
        <></>
      )}
    </div>
  );
}

export default connectStateResults(Hits);
