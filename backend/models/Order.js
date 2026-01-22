const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false, // Allow guest checkout
      ref: 'User',
    },
    guestInfo: {
      name: { type: String },
      email: { type: String },
      phone: { type: String }
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Sweet',
        },
      },
    ],
    shippingAddress: {
      addressLine1: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true, default: 'India' },
      phone: { type: String, required: true }
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['COD', 'UPI', 'Card', 'NetBanking'],
      default: 'COD'
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Placed',
    },
    orderNotes: {
      type: String,
      maxlength: [500, 'Order notes cannot exceed 500 characters']
    }
  },
  {
    timestamps: true,
  }
);

// Calculate total price before saving - DISABLED FOR NOW
// orderSchema.pre('save', function(next) {
//   if (this.orderItems && this.orderItems.length > 0) {
//     this.itemsPrice = this.orderItems.reduce(
//       (acc, item) => acc + item.price * item.qty,
//       0
//     );
    
//     this.shippingPrice = this.itemsPrice > 500 ? 0 : 50;
//     this.taxPrice = 0; // No tax for now
//     this.totalPrice = this.itemsPrice + this.taxPrice + this.shippingPrice;
//   }
  
//   next();
// });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
