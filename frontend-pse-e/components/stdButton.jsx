// Change the site-wide standard button look here.
const Button = ({ onClick, children }) => {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={onClick}
        >
            {children}
        </button>
    );
};
export default Button;
