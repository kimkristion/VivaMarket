const AddToCartAction = ({ addToCart }) => {
    const handleAddToCart = () => {
        addToCart();
    };

    return (
        <button onClick={handleAddToCart}>
            Test ME 
        </button>
    );
};

export default AddToCartAction;