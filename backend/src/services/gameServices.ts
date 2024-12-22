import prisma from "../models/prisma.js";

export const getLeaderboard = (num: number) => {
  return prisma.leaderboard.findMany({
    orderBy: { time: "asc" },
    take: num,
  });
};

export const addRecordToLeaderboard = (username: string, time: number) => {
  return prisma.leaderboard.create({
    data: { username, time },
  });
};
