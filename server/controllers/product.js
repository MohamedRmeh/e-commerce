import Product from "../models/product.js";
import multer from "multer";
import User from "../models/User.js";

// Create product
export const createProduct = async (req, res, next) => {
  const newProduct = new Product({
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
    img: req.file.filename,
    page: req.body.page,
  });
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    next(err);
  }
};

// get product
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// get all movies
export const getProducts = async (req, res, next) => {
  try {
    const limitNumber = 5;
    const allProduct = await Product.find({}).sort({
      _id: -1,
    });

    const bestSeller = await Product.find({ page: "bestSeller" })
      .sort({ _id: -1 })
      .limit(8);
    const newArrivals = await Product.find({ page: "newArrivals" })
      .sort({ _id: -1 })
      .limit(limitNumber);
    const forGamers = await Product.find({ page: "forGamers" })
      .sort({ _id: -1 })
      .limit(limitNumber);

    const products = {
      bestSeller,
      newArrivals,
      forGamers,
      allProduct,
    };

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// UPDATE Product
export const updateProduct = async (req, res, next) => {
  const { id: productId } = req.params;

  try {
    let updatedFields = {
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      page: req.body.page,
    };

    if (req.file) {
      updatedFields.img = req.file.filename;
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      updatedFields,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return next("Undefined");
    }

    res.status(200).json({ updatedProduct });
  } catch (err) {
    next(err);
  }
};

// delete product
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    await product.deleteOne();
    res.status(200).json("the product has been deleted");
  } catch (err) {
    next(err);
  }
};

// add to cart
export const addToCart = async (req, res) => {
  try {
    // Find user by ID
    const userId = req.body.userId;
    const product = req.body.product;
    const quantity = req.body.quantity;

    // Find user by ID and update cart
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add product to cart
    user.cart.push({ product, quantity });

    // Calculate total price of the cart
    let total = 0;
    for (const item of user.cart) {
      const product = await Product.findById(item.product);
      if (product) {
        total += product.price * item.quantity;
      }
    }

    // Update total in the user document
    user.total = total;

    // Save updated user document
    await user.save();

    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// upload image to public folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "../public/images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

export const upload = multer({ storage });
