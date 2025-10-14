import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    orderNumber: { type: String, unique: true, required: true },

    user: { type: Schema.Types.ObjectId, ref: "User", required: true },

    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        image: String,
        size: String,
      },
    ],

    shippingAddress: {
      fullName: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: String,
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
    },

    billingAddress: {
      fullName: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
      phone: String,
    },

    payment: {
      method: {
        type: String,
        enum: ["COD", "CARD", "UPI", "WALLET", "NETBANKING"],
        required: true,
      },
      status: {
        type: String,
        enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
        default: "PENDING",
      },
      transactionId: String,
      amount: { type: Number, required: true },
      paidAt: Date,
      refundId: String,
    },

    delivery: {
      status: {
        type: String,
        enum: [
          "PENDING",
          "PROCESSING",
          "SHIPPED",
          "DELIVERED",
          "CANCELLED",
          "RETURNED",
        ],
        default: "PENDING",
      },
      expectedDate: Date,
      shippedAt: Date,
      deliveredAt: Date,
      trackingId: String,
      courier: String,
      notes: String,
    },

    discount: {
      code: String,
      type: { type: String, enum: ["PERCENT", "FLAT"] },
      value: Number,
      discountAmount: Number,
    },

    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    shippingCharge: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },

    notes: String,
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Auto-generate order number if not provided
orderSchema.pre("save", function (next) {
  if (!this.orderNumber) {
    this.orderNumber = "ORD-" + Date.now().toString();
  }
  next();
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
