"use server";
/**
 * CRUD ACCOUNT
 *
 * Created By Avaa & Aethyy
 */

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { encryptPass } from "@/lib/utils";
import { auth } from "@/auth";
import { inputAccountSchema, updateAccountSchema } from "@/lib/zod";
import { redirect } from "next/navigation";

/**
 * Get Function by ID
 *
 * Created By Avaa & Aethyy
 */

const getDataById = async (id: string) => {
  const session = await auth();
  if (!session) {
    return {
      message: "Anda harus login terlebih dahulu.",
      status: 401,
    };
  }

  const data = await prisma.accountStorage.findFirst({
    where: {
      id: id,
      userid: session.user.id,
      deletedat: null,
    },
    include: {
      category: true,
    },
  });

  if (!data) {
    return {
      message: "Data tidak ditemukan",
      status: 404,
    };
  }

  const result = {
    ...data,
    categoryname: data.category?.name || null,
  };

  return {
    message: "Data ditemukan",
    status: 200,
    data: result,
  };
};

/**
 * Get Function with Category
 *
 * Created By Avaa & Aethyy
 */
const getData = async (id?: string) => {
  const session = await auth();
  if (!session) {
    return {
      message: "anda harus login terlebih dahulu.",
    };
  }

  let data = await prisma.accountStorage.findMany({
    where: {
      userid: session.user.id,
      deletedat: null,
    },
    include: {
      category: true,
    },
  });

  data = data.map((acc) => ({
    ...acc,
    category: acc.category && {
      id: acc.category.id,
      description: acc.category.description,
      userid: acc.category.userid,
      createdat: acc.category.createdat,
      updatedat: acc.category.updatedat,
      deletedat: acc.category.deletedat,
      name: acc.category.name,
    },
  }));

  if (data.length > 0) {
    return {
      message: "Founding data",
      status: true,
      data,
    };
  } else {
    return {
      message: "Data can't be found",
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

  const { title, account, password, description, category } =
    validatedFields.data;
  const encryptingPass = encryptPass(password);

  try {
    if (!session.user.id) {
      throw new Error("User ID is required");
    }
    const createAccount = await prisma.accountStorage.create({
      data: {
        title,
        account,
        password: encryptingPass,
        description,
        userid: session.user.id,
        categoryid: category || null,
      },
    });

    if (createAccount) {
      console.log("Data berhasil dibuat:", createAccount);
    }
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Tangani error Prisma yang diketahui
      if (error.code === "P2003") {
        // Foreign key constraint violation
        return {
          message: "Category ID tidak valid atau tidak ditemukan.",
          status: false,
        };
      }
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      // Tangani error validasi Prisma
      return {
        message: "Data yang dikirimkan tidak valid.",
        status: false,
      };
    }

    // Error lainnya
    console.error("Unexpected error:", error);
    return {
      message: "Terjadi kesalahan yang tidak terduga.",
      status: 500,
    };
  }
  redirect("/storage");
};

/**
 * Update Function
 *
 * Created By Avaa & Aethyy
 */
const updateData = async (prevState: any, formData: FormData) => {
  const session = await auth();
  if (!session) return null;
  const validatedFields = updateAccountSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, account, password, description, category, id } =
    validatedFields.data;

  try {
    const beforeUpdate = await prisma.accountStorage.findFirst({
      where: { id },
    });
    const updatedAccount = await prisma.accountStorage.update({
      data: {
        title,
        account,
        description,
        password: encryptPass(password),
        categoryid: category || null,
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
const deleteData = async ({ id }: { id: string }) => {
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

export { getDataById, getData, insertData, updateData, deleteData };
