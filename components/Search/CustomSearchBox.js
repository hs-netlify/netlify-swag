import { connectSearchBox } from "react-instantsearch-dom";

function SearchBox({ refine }) {
  return (
    <form action="" role="search">
      <label
        htmlFor="algolia_search"
        className="ml-px pl-4 block text-sm font-medium text-gray-700"
      >
        Search
      </label>
      <div className="mt-1">
        <input
          type="search"
          name="search"
          id="algolia_search"
          className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 px-4 rounded-full"
          placeholder="Search for categories, products, styles, materials or anything else"
          onChange={(e) => refine(e.currentTarget.value)}
        />
      </div>
    </form>
  );
}

export default connectSearchBox(SearchBox);
