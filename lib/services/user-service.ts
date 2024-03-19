import { db } from "../db";

export const getUserByUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      bio: true,
      username: true,
      imageUrl: true,
      externalUserId: true,
      stream: {
        select: {
          id: true,
          isLive: true,
          isChatEnable: true,
          isChatDelayed: true,
          isChatFollowersOnly: true,
          name: true,
          thumbnailUrl: true,
        },
      },
      _count: { select: { followedBy: true } },
    },
  });

  return user;
};

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
    include: {
      stream: true,
    },
  });

  return user;
};
