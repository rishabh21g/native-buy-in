import moongose from "mongoose";

const userSchema = new moongose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    addresses: [
      {
        name: String,
        mobileNo: String,
        houseNo: String,
        street: String,
        landmark: String,
        city: String,
        state: String,
        country: String,
        pincode: String,
      },
    ],
    order: [
      {
        type: moongose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const User = moongose.model("User", userSchema);
export default User;
