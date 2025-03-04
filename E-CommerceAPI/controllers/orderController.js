import Order from "../models/modelOrder.js";
import Product from "../models/modelProduct.js";

//  Place Order (Multiple Products)
export const placeOrder = async (req, res) => {
  try {
    const { products } = req.body; // Expecting an array of products { productId, quantity }
    let totalAmount = 0;
    const orderItems = [];

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(404).json({ success: false, message: `Product not found: ${item.productId}` });

      if (product.stock < item.quantity)
        return res.status(400).json({ success: false, message: `Not enough stock for ${product.name}` });

      product.stock -= item.quantity; // Reduce stock
      await product.save();

      totalAmount += product.price * item.quantity;
      orderItems.push({ product: product._id, quantity: item.quantity, price: product.price });
    }

    const order = new Order({
      user: req.user._id,
      products: orderItems,
      totalAmount
    });

    await order.save();
    res.status(201).json({ success: true, message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error placing order", error });
  }
};

//  View Order History
export const getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("products.product", "name price");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching orders", error });
  }
};
