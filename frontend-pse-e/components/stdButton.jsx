// Change the site-wide standard button look here.
const Button = ({ onClick, children }) => {
    return (
        <button
            // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            className="bg-fuchsia-300 hover:bg-fuchsia-400 text-white font-bold py-2 px-4 border-b-4 border-fuchsia-500 hover:border-fuchsia-500 rounded"
            onClick={onClick}
        >
            {children}
        </button>
)};
export default Button;
