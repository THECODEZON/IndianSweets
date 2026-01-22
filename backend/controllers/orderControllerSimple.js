const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access   Public (for guest checkout)
const addOrderItems = async (req, res) => {
  try {
    console.log('Simple order creation - Request body:', req.body);
    
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      orderNotes,
      guestInfo,
      user
    } = req.body;

    // Validate order items
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No order items'
      });
    }

    // Calculate prices manually
    const itemsPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    const shippingPrice = itemsPrice > 500 ? 0 : 50;
    const taxPrice = 0;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    // Create order object
    const orderData = {
      orderItems,
      shippingAddress,
      paymentMethod,
      orderNotes,
      guestInfo,
      user: user || null,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    };

    console.log('Simple order data:', orderData);

    // Create order without using the model constructor
    const order = new Order(orderData);
    
    console.log('Order object created:', order);

    // Save without validation
    const createdOrder = await order.save();
    console.log('Order saved successfully:', createdOrder);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: createdOrder
    });
  } catch (error) {
    console.error('Error creating order:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};

module.exports = {
  addOrderItems
};
