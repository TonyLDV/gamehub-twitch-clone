"use server";

import { db } from "@/lib/db";
import { getSelf } from "@/lib/services/auth-service";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateUserInfo = async (values: Partial<User>) => {
  const self = await getSelf();

  const validData = {
    bio: values.bio,
  };

  const user = await db.user.update({
    where: { id: self.id },
    data: { ...validData },
  });

  revalidatePath(`/${self.username}`);
  revalidatePath(`/u/${self.username}`);

  return user;
};
