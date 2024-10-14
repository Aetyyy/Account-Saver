/**
 * CRUD ACCOUNT
 *
 * Created By Avaa & Aethyy
 */

import { category } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

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

  let data: any = await prisma.category.findMany({
    where: {
      userid: session.user.id,
    },
  });

  if (id) {
    data = await prisma.category.findFirst({ where: { id } });
  }

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
const insertData = async ({ name, description, userid }: category) => {
  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
        description,
        userid,
      } as category,
    });
    if (newCategory.id) {
      return {
        message: "memek 1",
      };
    } else {
      return {
        message: "memek 2",
      };
    }
  } catch (e) {
    return {
      message: "memek 3",
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
const deleteData = async ({ id }: category) => {
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
