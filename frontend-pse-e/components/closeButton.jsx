// Change the site-wide close button look here.
const CloseButton = ({ onClick, children }) => {
    return (
        <button
            // className="hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded mt-4"
            className="ml-5 bg-pink-300 hover:bg-pink-400 text-white font-bold py-2 px-4 border-b-4 border-pink-500 hover:border-pink-500 rounded"
            onClick={onClick}
        >
            {children}
        </button>
    );
};
export default CloseButton;
