"use client";

import React, { useEffect, useState } from "react";
import ModalForm from "@/components/category/form/modal";
import AddCategory from "@/components/category/form";
import { category } from "@prisma/client";
import CategoryTable from "@/components/category/categoryTable";
import { getData } from "@/lib/category";
import { set } from "zod";

export default function CategoryModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<category[]>([]);
  const [updateData, setUpdateData] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  //   const [clientData, setClientData] = useState<null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const handleOpen = (mode: "add" | "edit") => {
    setIsOpen(true);
    setModalMode(mode);
  };

  useEffect(() => {
    const getCategory = async () => {
      try {
        const category = await getData();
        if (category.data) {
          setCategoryData(category.data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    const updateCategory = async () => {
      try {
        const category = await getData();
        if (category.data) {
          setCategoryData(category.data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setUpdateData(false);
      }
    };

    getCategory();

    if (updateData) {
      updateCategory();
    }
  }, [updateData]);

  return (
    <>
      <AddCategory onOpen={() => handleOpen("add")} />
      <ModalForm
        isOpen={isOpen}
        // OnSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
        modalMode={modalMode}
        updateCategory={() => setUpdateData(true)}
        // clientData={clientData}
      />
      <div className="bg-slate-900/50 py-4 rounded-lg overflow-x-auto">
        <CategoryTable
          dataCategory={categoryData}
          setCategory={setCategoryData}
          loading={loading}
          updateCategory={() => setUpdateData(true)}
        />
      </div>
    </>
  );
}
