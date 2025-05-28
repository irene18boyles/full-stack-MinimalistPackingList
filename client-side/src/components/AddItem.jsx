import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddItem = () => {
  const { tripName } = useParams();
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
    if (itemName.trim() !== "" && category) {
      const token = localStorage.getItem("token");
      const newItem = {
        name: itemName,
        category: category,
        trip: tripName,
      };
  
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newItem),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        navigate(`/trip/${tripName}`);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-blue-500 mb-10">Add Item</h1>
      <div className="mb-3">
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Enter Item Name"
          className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-5">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2">
          <option value="" className="text-black">Select Category</option>
          <option value="Clothes" className="text-black">Clothes</option>
          <option value="Toiletries" className="text-black">Toiletries</option>
          <option value="Tech" className="text-black">Tech</option>
          <option value="Misc" className="text-black">Misc</option>
        </select>
      </div>
      <div className="flex gap-4">
        <button onClick={handleSave} className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition">Save</button>
        <button onClick={() => navigate(`/trip/${tripName}`)} className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition">Cancel</button>
      </div>
    </div>
  );
};

export default AddItem;
