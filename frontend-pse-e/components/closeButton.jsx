// Change the site-wide close button look here.
const CloseButton = ({ onClick, children }) => {
    return (
        <button
            className="hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded mt-4"
            onClick={onClick}
        >
            {children}
        </button>
    );
};
export default CloseButton;
