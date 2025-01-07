"use server";

/**
 * CRUD CATEGORY
 *
 * Created By Avaa & Aethyy
 */

import { category } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { inputCategorySchema } from "@/lib/zod";

/**
 * Get Function
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

  let data: category[] = await prisma.category.findMany({
    where: {
      userid: session.user.id,
      deletedat: null,
    },
  });

  if (data.length > 0) {
    return {
      message: "data ditemukan.",
      status: 200,
      data,
    };
  } else {
    return {
      message: "data tidak ditemukan.",
      status: 500,
    };
  }
};

/**
 * Insert Function
 *
 * Created By Avaa & Aethyy
 */
const insertData = async (_prevState: any, formData: FormData) => {
  const session = await auth();
  if (!session) return null;
  const validatedFields = inputCategorySchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, description } = validatedFields.data;

  try {
    if (!session.user.id) {
      throw new Error("User ID is required");
    }
    const createCategory = await prisma.category.create({
      data: {
        name,
        description,
        userid: session.user.id,
      },
    });

    if (createCategory) {
      return {
        // message: "Success Create Category",
        status: true,
      };
    }
  } catch (e: any) {
    return {
      message: "Failed Create Category",
      status: false,
    };
  }
};

/**
 * Update Function
 *
 * Created By Avaa & Aethyy
 */
const updateData = async ({ id, name, description }: category) => {
  try {
    const beforeUpdate = await prisma.category.findFirst({
      where: { id },
    });
    const updatedCategory = await prisma.category.update({
      data: {
        name,
        description,
      },
      where: {
        id,
      },
    });

    if (beforeUpdate?.updatedat != updatedCategory.updatedat) {
      return {
        message: "berhasil",
      };
    } else {
      return {
        message: "gagal 1",
      };
    }
  } catch (e) {
    return {
      message: "gagal 2",
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
    const beforeDelete = await prisma.category.findFirst({
      where: { id },
    });
    const deletedCategory = await prisma.category.update({
      data: {
        deletedat: new Date(),
      },
      where: {
        id,
      },
    });
    if (beforeDelete?.deletedat != deletedCategory.deletedat) {
      return {
        message: "berhasil",
      };
    } else {
      return {
        message: "gagal 1",
      };
    }
  } catch (e) {
    return {
      message: "gagal 2",
    };
  }
};

export { getData, insertData, updateData, deleteData };
