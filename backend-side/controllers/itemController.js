import Item from '../models/Item.js';

export const getItem = async (req, res) => {
    const query = { isDeleted: false };
    if (req.query.trip) query.trip = req.query.trip;
    try {
      const items =await Item.find(query);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve items"})
    }
};

export const createItem = async (req, res) => {
    try {
      const { name, category, trip } = req.body;
      const userId = req.user ? req.user._id : null

      if (!userId) {
        return res.status(400).json({ message: "User not authenticated"})
      }
  
      const newItem = await Item.create({ name, category, trip, user: userId });
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to create item", error: error.message });
    }
  };
  
export const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(item)
  } catch (error) {
    res.status(500).json({ message: "Failed to update item", error: error.message})
  }
};

export const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndUpdate(req.params.id, { isDeleted: true })
    res.json({ message: 'Item deleted' })
  } catch (error) {
    res.status(500).json({ message: "Failed to delete item", error: error.message})
  }
};