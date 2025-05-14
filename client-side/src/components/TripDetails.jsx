import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const categories = ["Clothes", "Toiletries", "Tech", "Misc"];

const TripDetails = () => {
  const { tripName } = useParams();
  const navigate = useNavigate();
  const [packingItems, setPackingItems] = useState({
    Clothes: [],
    Toiletries: [],
    Tech: [],
    Misc: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchPackingItems = async () => {
      const token = localStorage.getItem("token");
  
      try {
        const response = await fetch(`http://localhost:8000/api/items/name/${tripName}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch packing items: ${response.statusText}`);
        }
  
        const data = await response.json();
  
        const formattedItems = categories.reduce((acc, category) => {
          acc[category] = [];
          return acc;
        }, {});
  
        data.forEach((item) => {
          if (categories.includes(item.category)) {
            formattedItems[item.category].push(item);
          }
        });
  
        setPackingItems(formattedItems);
      } catch (error) {
        console.error("Error fetching packing items:", error);
        alert("Error loading packing items.");
      }
    };

    fetchPackingItems();
  }, [tripName]);

  const updatePackingItemsInDB = async (itemId, itemData) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8000/api/items/${itemId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update packing items: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating packing items:", error);
      alert("Error updating packing items.");
    }
  };

  const handleRemoveItem = async (index) => {
    if (!selectedCategory) return;

    const itemToRemove = packingItems[selectedCategory][index];
    const updatedItems = [...packingItems[selectedCategory]];
    updatedItems.splice(index, 1);

    const updatedPackingItems = { ...packingItems, [selectedCategory]: updatedItems };
    setPackingItems(updatedPackingItems);

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8000/api/items/${itemToRemove._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`}
      });
      if(!response.ok){
        throw new Error(`Failed to delete item: ${response.statusText}`)
      }
    } catch (error) {
      console.error("Error deleting item:", error)
    }
  };

  const handleCheckboxChange = async (category, index) => {
    const updatedItems = [...packingItems[category]];
    const item = updatedItems[index];
    item.isPacked = !item.isPacked;
    
    const updatedPackingItems = { ...packingItems, [category]: updatedItems };
    setPackingItems(updatedPackingItems);
  
    await updatePackingItemsInDB(item._id, { isPacked: item.isPacked });
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="font-bold">{tripName} Packing List</h1>
      <div className="grid grid-cols-2 gap-10 w-full mt-15">
        {categories.map((category) => (
          <div key={category} className="p-10 bg-gray-800 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 font-bold">
            <h2 onClick={() => { 
              if (category){
                setSelectedCategory(category);
                setShowModal(true);
              }
              }}>
              {category} ({packingItems[category].length || 0})
            </h2>
          </div>
        ))}
      </div>
      <div className="mt-15 flex flex-col space-y-5">
        <button onClick={() => navigate(`/add-item/${tripName}`)}>Add Item</button>
        <button onClick={() => navigate("/home")}>
          Back to Trips
        </button>
      </div>
      {/* Modal */}
      {showModal && selectedCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-blue-100 p-10 rounded-lg w-[500px] max-h-[80vh] overflow-hidden flex flex-col">
            <h2 className="font-semibold text-blue-700 mb-10">
              Items in {selectedCategory}
            </h2>
            <ul className="text-black space-y-3 flex flex-col items-center w-full max-h-[60vh] overflow-y-auto">
              {packingItems[selectedCategory]?.length > 0 ? (
                packingItems[selectedCategory].map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md w-70 overflow-hidden"
                  >
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.isPacked || false}
                        onChange={() => handleCheckboxChange(selectedCategory, index)}
                        className="w-5 h-4"
                      />
                      <span
                        className={`text-lg ml-14 ${
                          item.isPacked ? "line-through text-gray-500" : "text-black"
                        }`}
                      >
                        {typeof item === "object" && item ? item.name : item}
                      </span>
                    </label>
                    <button
                      className="text-red-500 hover:text-red-700 transition duration-200 w-6 h-7 flex items-center justify-center"
                      onClick={() => handleRemoveItem(index)}
                    >
                      ✖
                    </button>
                  </li>
                ))
              ) : (
                <p>No items in this category</p>
              )}
            </ul>
            <button onClick={() => setShowModal(false)} className="mt-10">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripDetails;
