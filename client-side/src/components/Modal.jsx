const Modal = ({ showModal, selectedCategory, closeModal, packingItems, setPackingItems }) => {
  if (!showModal) return null;

  const handleCheckboxChange = (item) => {
    setPackingItems((prevItems) => {
      const updatedItems = { ...prevItems };
      const categoryItems = updatedItems[selectedCategory];

      if (categoryItems.includes(item)) {
        updatedItems[selectedCategory] = categoryItems.filter((i) => i !== item);
      } else {
        updatedItems[selectedCategory].push(item);
      }
      return updatedItems;
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg relative w-96">
        <span
          onClick={closeModal}
          className="absolute top-2 right-2 text-xl cursor-pointer"
        >
          &times;
        </span>
        <h2 className="text-xl font-semibold mb-4">Add an Item to {selectedCategory}</h2>

        <div className="space-y-3">
          {packingItems[selectedCategory].map((item, index) => (
            <label key={index} className="flex items-center">
              <input
                type="checkbox"
                checked={packingItems[selectedCategory].includes(item)}
                onChange={() => handleCheckboxChange(item)}
                className="mr-2"
              />
              {item}
            </label>
          ))}
        </div>

        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
