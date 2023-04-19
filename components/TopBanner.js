export default function TopBanner({ message }) {
  return (
    <div className="relative bg-indigo-600">
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:px-16 sm:text-center">
          <p id="discountMessage" className="font-medium text-white">
            {message} - something here
          </p>
        </div>
      </div>
    </div>
  );
}
