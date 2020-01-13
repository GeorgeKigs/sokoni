const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  orderedProducts: [
    {
      productData: {
        type: Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: { type: Number }
    }
  ],
  total: {
    type: Number,
    required: true
  },
  userId: { type: Schema.Types.ObjectId, required: true }
});

orderSchema.statics.createNew = function(orderData) {
  const order = new this({
    userId: orderData.userId,
    orderedProducts: orderData.orderedProducts,
    total: orderData.totalPriceOfOrderedProducts
  });
  return order.save();
};
orderSchema.statics.findAllforUserId = function(Id) {
  return this.find({ userId: Id })
    .populate("orderedProducts.productData", "title price")
    .exec();
};
orderSchema.statics.findByIdAndPopulateProductsDetails = function(Id) {
  return this.findById(Id)
    .populate("orderedProducts.productData", "title price adminId")
    .exec();
};
orderSchema.statics.deleteById = function(Id) {
  return this.findByIdAndDelete(Id);
};
orderSchema.methods.isOrderedById = function(Id) {
  console.log(this)
  return Id.toString() === this.userId.toString();
};
module.exports = mongoose.model("Order", orderSchema);