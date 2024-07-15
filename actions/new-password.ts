"use server";
import * as z from "zod";
import { NewPasswordSchema } from "@/schema";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null,
) => {
  if (!token) {
    return {
      error: "Invalid Token",
    };
  }
  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid Fields",
    };
  }
  const { password } = validatedFields.data;

  //todo update password
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return {
      error: "Invalid Token",
    };
  }
  const hasExpired = new Date() > new Date(existingToken.expires);
  if (hasExpired) {
    return {
      error: "Token Expired",
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return {
      error: "User not found",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: { password: hashedPassword },
  });
  return { success: "Password Updated" };
};
