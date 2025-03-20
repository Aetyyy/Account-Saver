"use server";

/**
 * CRUD CATEGORY
 *
 * Created By Avaa & Aethyy
 */

import { category } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { inputCategorySchema, updateCategorySchema } from "@/lib/zod";

type ServerResponse = {
  message?: string;
  errors?: Record<string, string[]>;
  status: boolean;
  data?: category[];
};

// Variabel global untuk mencegah spam request
let isProcessingInsert = false;
let isProcessingUpdate = false;
let isProcessingDelete = false;

/**
 * Get Function
 */
const getData = async (): Promise<ServerResponse> => {
  const session = await auth();
  if (!session) {
    return {
      status: false,
      message: "Anda harus login terlebih dahulu.",
    };
  }

  const data: category[] = await prisma.category.findMany({
    where: {
      userid: session.user.id,
      deletedat: null,
    },
  });

  if (data.length > 0) {
    return {
      status: true,
      message: "Data ditemukan.",
      data,
    };
  } else {
    return {
      status: false,
      message: "Data tidak ditemukan.",
    };
  }
};

/**
 * Insert Function
 */
const insertData = async (
  _prevState: unknown,
  formData: FormData
): Promise<ServerResponse> => {
  if (isProcessingInsert) {
    return {
      status: false,
      message: "Request is being processed. Please wait.",
    };
  }
  isProcessingInsert = true;
  const session = await auth();
  if (!session) {
    isProcessingInsert = false;
    return { status: false, message: "Unauthorized" };
  }

  const validatedFields = inputCategorySchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    isProcessingInsert = false;
    return {
      status: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, description } = validatedFields.data;

  try {
    if (!session.user.id) {
      throw new Error("User ID is required");
    }

    await prisma.category.create({
      data: {
        name,
        description,
        userid: session.user.id,
      },
    });

    return {
      status: true,
      message: "Category created successfully",
    };
  } catch (e) {
    return {
      status: false,
      message: `Failed to create category: ${e}`,
    };
  } finally {
    isProcessingInsert = false;
  }
};

/**
 * Update Function
 */
const updateData = async (
  _prevState: unknown,
  formData: FormData
): Promise<ServerResponse> => {
  if (isProcessingUpdate) {
    return {
      status: false,
      message: "Request is being processed. Please wait.",
    };
  }
  isProcessingUpdate = true;
  const session = await auth();
  if (!session) {
    isProcessingUpdate = false;
    return { status: false, message: "Unauthorized" };
  }

  const validatedFields = updateCategorySchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    isProcessingUpdate = false;
    return {
      status: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, description, id } = validatedFields.data;

  try {
    await prisma.category.update({
      where: { id },
      data: { name, description },
    });

    return {
      status: true,
      message: "Category updated successfully",
    };
  } catch (e) {
    return {
      status: false,
      message: `Failed to update category: ${e}`,
    };
  } finally {
    isProcessingUpdate = false;
  }
};

/**
 * Delete Function
 */
const deleteData = async ({ id }: { id: string }) => {
  if (isProcessingDelete) {
    return {
      message: "Request is being processed. Please wait.",
      status: false,
    };
  }
  isProcessingDelete = true;
  try {
    const beforeDelete = await prisma.category.findFirst({
      where: { id },
    });
    const deletedCategory = await prisma.category.update({
      data: {
        deletedat: new Date(),
      },
      where: { id },
    });
    if (beforeDelete?.deletedat !== deletedCategory.deletedat) {
      return { message: "Berhasil", status: true };
    } else {
      return { message: "Gagal menghapus data", status: false };
    }
  } catch (e) {
    return { message: `Failed: ${e}`, status: false };
  } finally {
    isProcessingDelete = false;
  }
};

export { getData, insertData, updateData, deleteData };
