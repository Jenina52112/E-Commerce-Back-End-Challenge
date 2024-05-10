const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    // Find all categories including associated products
    const categories = await Category.findAll({
      include: Product // Include associated Products
    });
    
    res.json(categories); // Send response with categories and their associated products
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
  });


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    // Find one category by its `id` value, including associated products
    const category = await Category.findOne({
      where: { id: req.params.id }, // Filter by id parameter in the URL
      include: Product // Include associated Products
    });

    if (!category) {
      // If category with the given id is not found, send 404 Not Found response
      return res.status(404).json({ error: 'Category not found' });
    }
    
    res.json(category); // Send response with the retrieved category and its associated products
  } catch (err) {
    console.error('Error fetching category:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    // Create a new category with the data from the request body
    const newCategory = await Category.create(req.body);

    res.status(201).json(newCategory); // Send response with the newly created category
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryId = req.params.id;
    const updatedCategoryData = req.body;

    // Update the category with the given id using the data from the request body
    const [rowsUpdated, [updatedCategory]] = await Category.update(updatedCategoryData, {
      where: { id: categoryId }, // Filter by id parameter in the URL
      returning: true // Return the updated category data
    });

    if (rowsUpdated === 0) {
      // If no category is updated (i.e., category with the given id not found), send 404 Not Found response
      return res.status(404).json({ error: 'Category not found' });
    }
    
    res.json(updatedCategory); // Send response with the updated category data
  } catch (err) {
    console.error('Error updating category:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryId = req.params.id;

    // Delete the category with the given id
    const rowsDeleted = await Category.destroy({
      where: { id: categoryId } // Filter by id parameter in the URL
    });

    if (rowsDeleted === 0) {
      // If no category is deleted (i.e., category with the given id not found), send 404 Not Found response
      return res.status(404).json({ error: 'Category not found' });
    }
    
    res.status(204).end(); // Send a 204 No Content response indicating successful deletion
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
