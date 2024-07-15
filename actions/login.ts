"use server";
import { db } from "@/lib/db";
import * as z from "zod";
import { LoginSchema } from "@/schema";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail, sendTwoFactorEmail } from "@/mail";
import { generateTwoFactorToken } from "@/lib/tokens";

import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
export const login = async (values: z.infer<typeof LoginSchema>) => {
  console.log(values);

  try {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        error: "Invalid Fields",
      };
    }

    const { email, password, code } = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password) {
      return {
        error: "User Not Found",
      };
    }
    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(email);
      console.log(verificationToken);
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );
      return {
        success: "Confirmation Email Sent",
      };
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
      if (code) {
        const twoFactorToken = await getTwoFactorTokenByEmail(
          existingUser.email
        );
        if (!twoFactorToken) {
          return {
            error: "Invalid Two Factor Code",
          };
        }
        if (twoFactorToken.token !== code) {
          return {
            error: "Invalid Two Factor Code",
          };
        }

        const hasExpired = new Date() > twoFactorToken.expires;
        if (hasExpired) {
          return {
            error: "Two Factor Code Expired",
          };
        }

        await db.twoFactorToken.delete({
          where: {
            id: twoFactorToken.id,
          },
        });

        const existingConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (existingConfirmation) {
          await db.twoFactorConfirmation.delete({
            where: {
              id: existingConfirmation.id,
            },
          });
        }

        await db.twoFactorConfirmation.create({
          data: {
            userId: existingUser.id,
          },
        });
      } else {
        const twoFactorToken = await generateTwoFactorToken(existingUser.email);
        console.log(twoFactorToken);
        await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);
        return {
          twoFactor: "Two Factor Email Sent",
        };
      }
    }

    await signIn("credentials", {
      email,
      password,
      redirect: true,
      
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid Credentials",
          };

        default:
          return {
            error: error.message,
          };
      }
    }
    throw error;
  }
};
