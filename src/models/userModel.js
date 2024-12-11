const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (username, password_hash, email) => {
  return await prisma.user.create({
    data: {
      username,
      password_hash,
      email,
    },
  });
};

const findUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
};
