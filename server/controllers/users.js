import User from "../models/User.js";

export const getUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, isAdmin, _id, username, email, ...otherDetails } =
      user._doc;
    res.status(200).json(otherDetails);
  } catch (err) {
    // return res.status(500).json(err);
    return res.status(404).json({ message: "User not found" });
  }
};

export const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;
  const userId = req.user.id;

  try {
    // ابحث عن المستخدم باستخدام الـ _id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ابحث عن المنتج في مصفوفة cart واحذفه
    const updatedCart = user.cart.filter(
      (item) => item.product._id.toString() !== productId
    );

    // قم بتحديث مصفوفة cart بعد الحذف
    user.cart = updatedCart;

    // حساب القيمة الجديدة لـ total
    const newTotal = updatedCart.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );
    user.total = newTotal;

    await user.save();

    res
      .status(200)
      .json({ message: "Product has been removed from the cart", newTotal });
  } catch (err) {
    next(err);
  }
};
