"use client";

import React, { useCallback, useEffect, useState } from "react";
import { category } from "@prisma/client";
import { getData } from "@/lib/category"; // Fungsi server-side getData
import AddCategory from "@/components/category/form";
import CategoryTable from "@/components/category/categoryTable";
import ModalForm from "@/components/category/form/modal";

export default function IndexCategory() {
  // State data
  const [categoryData, setCategoryData] = useState<category[]>([]);
  // State loading
  const [loading, setLoading] = useState<boolean>(true);
  // State trigger update
  const [updateData, setUpdateData] = useState<boolean>(false);

  // State modal Add/Edit
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedCategory, setSelectedCategory] = useState<category | null>(
    null
  );

  // State untuk mode select di tabel
  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);

  // Fungsi buka modal add/edit
  const handleOpenModal = useCallback(
    (mode: "add" | "edit", category?: category) => {
      setIsOpen(true);
      setModalMode(mode);
      if (category) {
        setSelectedCategory(category);
      }
    },
    []
  );

  // Fungsi untuk menutup modal; dibungkus dengan useCallback agar stabil
  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
    setSelectedCategory(null);
  }, []);

  // Fungsi updateCategory juga dibungkus agar referensinya tidak berubah tiap render
  const updateCategoryStable = useCallback(() => {
    setUpdateData(true);
  }, []);

  // Toggle mode select
  const handleToggleSelect = useCallback(() => {
    setIsSelectMode((prev) => !prev);
  }, []);

  // Fetch data kategori
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getData();
        if (res.status && res.data) {
          setCategoryData(res.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();

    // Jika updateData bernilai true, panggil ulang getData
    if (updateData) {
      (async () => {
        try {
          const res = await getData();
          if (res.status && res.data) {
            setCategoryData(res.data);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setUpdateData(false);
        }
      })();
    }
  }, [updateData]);

  return (
    <>
      {/* Header */}
      <AddCategory
        onOpen={() => handleOpenModal("add")}
        onToggleSelect={handleToggleSelect}
        isSelectMode={isSelectMode}
        // Tampilkan tombol Select jika data ada (misalnya, > 1)
        hasData={categoryData.length > 1}
      />

      {/* Modal Form (Add/Edit) */}
      <ModalForm
        isOpen={isOpen}
        onClose={handleCloseModal}
        modalMode={modalMode}
        updateCategory={updateCategoryStable}
        initialData={selectedCategory}
      />

      {/* Tabel */}
      <CategoryTable
        dataCategory={categoryData}
        setCategory={setCategoryData}
        loading={loading}
        updateCategory={updateCategoryStable}
        isSelectMode={isSelectMode}
        onToggleSelect={handleToggleSelect}
        onEdit={(cat) => handleOpenModal("edit", cat)}
      />
    </>
  );
}
