import mongoose from 'mongoose';

const {
  Schema,
} = mongoose;

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  accountNumber: {
    type: String,
    unique: true,
    required: true
  },
  balance: {
    type: Number,
    default: 0,
    min: 0,
  },
});

const Account = mongoose.model("Account", accountSchema);

export {
  Account
}
