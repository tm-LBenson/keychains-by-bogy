export default function Header() {
  return (
    <div className='flex flex-col items-center'>
      <h1 className="text-5xl text-pink-100 font-bold mb-4">
        KeyChains By Bogy
      </h1>
      <p className="text-xl text-pink-100">
        Explore our stylish self-defense keychains!
      </p>
      <a href="#products">
        <button className="bg-pink-600 mt-10 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition duration-300 ease-in-out">
          Products
        </button>
      </a>
    </div>
  );
}
