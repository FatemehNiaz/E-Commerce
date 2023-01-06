const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findAll({
      include: [
        Product
      ]
    });
    return res.json(categoryData);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const categoryData =await Category.findByPk(req.params.id,{
      include: [
        Product
      ]
    });
    if (!categoryData){
      return res.status(400).json({
        message: "Category not found"
      });
    }
    return res.status(200).json(categoryData);
  }
   catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  /*
    {
      category_name: "Sports"
    }
  */
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name
    });
    return res.status(200).json(newCategory);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const updateCategory = await Category.update({
      category_name: req.body.category_name
    }, {
      where: {
        id:req.params.id
      }
    });
   if (!updateCategory[0]){
    return res.status(400).json({
      message: "Category not found"
    });
   }
   return res.status(200).json(updateCategory);
  }
  catch(err){
    res.status(500).json(err);
  } 
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const destroyCategory = await Category.destroy({
      where: {
        id:req.params.id
      }
    });
   if (!destroyCategory){
    return res.status(400).json({
      message: "Category not found"
    });
   }
   return res.status(200).json(destroyCategory);
  }
  catch(err){
    res.status(500).json(err);
  } 
});

module.exports = router;
