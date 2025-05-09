import { Document } from "mongoose";

export interface User extends Document {
  userName: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  about?: string;
  avatar?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  verified?: boolean;
  otp?: string;
  otp_expiry_time?: string;
  socket_id?: string;
  status?: string;
  googleId?: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  isOtpCorrect(otp: string): Promise<boolean>;
  createPasswordResetToken(): Promise<boolean>;
}
