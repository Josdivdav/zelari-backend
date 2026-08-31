import bcrypt from "bcrypt";
import { Document, Schema, model } from "mongoose";

interface IUser extends Document {
  fullName: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
  password: string;
}

const userSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  password: { type: String, required: true },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Instance method to compare passwords on login
userSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export const User = model<IUser>("User", userSchema);
