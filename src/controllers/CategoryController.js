const Category  = require('../models/Category'); 



  exports.getAllCategories = async (req, res) => {
    try {
      const categories = await Category.findAll();
  
      if (!categories.length) {
        return res.status(404).json({ error: 'No jobs found' });
      }
  
      return res.status(200).json({ categories });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  };



exports.getCategoryById = async (req, res) => {
    const categoryId = req.params.categoryId;

    try {
        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        return res.status(200).json({ category });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

