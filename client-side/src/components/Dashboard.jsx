import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [packingList, setPackingList] = useState([]);
    const [newList, setNewList] = useState("");
    const navigate = useNavigate();

    const fetchWithAuth = async (url, options = {}) => {
        const token = localStorage.getItem("token");
        return fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
    };

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const res = await fetchWithAuth("http://https://full-stack-minimalistpackinglist.onrender.com/api/trips");
                if (!res.ok) throw new Error("Failed to fetch trips");
                const data = await res.json();
                setPackingList(data.map((trip) => ({
                    id: trip._id,
                    name: trip.destination,
                })));
            } catch (error) {
                console.error("Error fetching trips:", error);
                alert("Session expired. Please log in again.");
                navigate("/auth");
            }
        };

        fetchTrips();
    }, [navigate]);

    const handleAddList = async () => {
        if (newList.trim() === "") return;

        const isDuplicate = packingList.some((trip) => trip.name === newList.trim());
        if (isDuplicate) {
            alert("Trip already exists!");
            return;
        }

        try {
            const res = await fetchWithAuth("http://https://full-stack-minimalistpackinglist.onrender.com/api/trips", {
                method: "POST",
                body: JSON.stringify({ destination: newList.trim() }),
            });
            if (!res.ok) throw new Error("Failed to create trip");
            const newTrip = await res.json();
            setPackingList([...packingList, { id: newTrip._id, name: newTrip.destination }]);
            setNewList("");
        } catch (error) {
            console.error("Error creating trip:", error);
        }
    };

    const removeItem = async (index) => {
        const trip = packingList[index];
        try {
            const res = await fetchWithAuth(`http://https://full-stack-minimalistpackinglist.onrender.com/api/trips/${trip.id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete trip");
            setPackingList(packingList.filter((_, i) => i !== index));
        } catch (error) {
            console.error("Error deleting trip:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/auth");
    };

    return (
        <div className="mt-10">
            <div className="absolute top-5 right-10">
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <h1 className="font-bold">Minimalist Packing Lists</h1>
            <div className="mt-20 flex justify-center gap-4">
                <input
                    type="text"
                    value={newList}
                    onChange={(e) => setNewList(e.target.value)}
                    placeholder="Enter New Trip"
                    className="p-2 rounded bg-blue-700"
                />
                <button onClick={handleAddList}>Add Trip</button>
            </div>

            <ul className="mt-10 h-95 overflow-y-auto flex flex-col items-center space-y-4">
                {packingList.map((trip, index) => (
                    <li
                        key={trip.id}
                        className="flex items-center justify-between w-full max-w-md p-2 rounded border bg-gray-800"
                    >
                        <button onClick={() => navigate(`/trip/${trip.name}`)}>
                            {trip.name}
                        </button>
                        <button onClick={() => removeItem(index)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
