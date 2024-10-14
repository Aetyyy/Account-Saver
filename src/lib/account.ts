/**
 * CRUD ACCOUNT
 *
 * Created By Avaa & Aethyy
 */

"use server";

import { accountStorage } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { encryptPass } from "@/lib/utils";
import { auth } from "@/auth";
import { inputAccountSchema } from "@/lib/zod";
import { redirect } from "next/navigation";

/**
 * Get Function
 *
 * Created By Avaa & Aethyy
 */
const getData = async () => {
  const session = await auth();
  if (!session) {
    return {
      message: "anda harus login terlebih dahulu.",
    };
  }
  let data: any = await prisma.accountStorage.findMany({
    where: {
      userid: session.user.id,
    },
    include: {
      category: true,
    },
  });

  await prisma.accountStorage.findFirst({
    where: { userid: session.user.id },
    include: {
      category: true,
    },
  });

  if (data) {
    return {
      message: "data ditemukan.",
      status: true,
      data,
    };
  } else {
    return {
      message: "data tidak ditemukan.",
      status: false,
    };
  }
};

/**
 * Insert Function
 *
 * Created By Avaa & Aethyy
 */
const insertData = async (prevState: any, formData: FormData) => {
  const session = await auth();
  if (!session) return null;
  const validatedFields = inputAccountSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, account, password, description } = validatedFields.data;
  const encryptingPass = encryptPass(password);

  try {
    const createAccount = await prisma.$transaction(async (prisma) => {
      if (!session.user.id) {
        throw new Error("User ID is required");
      }
      return await prisma.accountStorage.create({
        data: {
          title,
          account,
          password: encryptingPass,
          description,
          userid: session.user.id,
          categoryid: null,
        },
      });
    });

    if (createAccount) {
      console.log("Data berhasil dibuat:", createAccount);
    }
  } catch (error: any) {
    console.error("Error:", error);
    return {
      message: error.message,
      status: false,
    };
  }
  redirect("/storage");
};

/**
 * Update Function
 *
 * Created By Avaa & Aethyy
 */
const updateData = async ({
  id,
  title,
  account,
  password,
  categoryid,
}: accountStorage) => {
  try {
    const beforeUpdate = await prisma.accountStorage.findFirst({
      where: { id },
    });
    const updatedAccount = await prisma.accountStorage.update({
      data: {
        title,
        account,
        password: encryptPass(password),
        categoryid,
      },
      where: {
        id,
      },
    });

    if (beforeUpdate?.updatedat != updatedAccount.updatedat) {
      return {
        message: "berhasil",
        status: true,
      };
    } else {
      return {
        message: "gagal 1",
        status: false,
      };
    }
  } catch (e) {
    return {
      message: "gagal 2",
      status: false,
    };
  }
};

/**
 * Delete Function
 *
 * Created By Avaa & Aethyy
 */
const deleteData = async ({ id }: accountStorage) => {
  try {
    const beforeDelete = await prisma.accountStorage.findFirst({
      where: { id },
    });
    const deletedAccount = await prisma.accountStorage.update({
      data: {
        deletedat: new Date(),
      },
      where: {
        id,
      },
    });
    if (beforeDelete?.deletedat != deletedAccount.deletedat) {
      return {
        message: "berhasil",
        status: false,
      };
    } else {
      return {
        message: "gagal 1",
        status: false,
      };
    }
  } catch (e) {
    return {
      message: "gagal 2",
      status: false,
    };
  }
};

export { getData, insertData, updateData, deleteData };
