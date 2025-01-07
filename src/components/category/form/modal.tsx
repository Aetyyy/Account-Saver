"use client";

import React, { useState } from "react";
import { CloseButton, SubmitButton } from "@/components/category/form/button";
import { insertData } from "@/lib/category";
import { useFormState } from "react-dom";
import { set } from "zod";

interface ModalAddProps {
  isOpen: boolean;
  onClose: () => void;
  modalMode: "add" | "edit";
  updateCategory: () => void;
}

export default function ModalAdd({
  isOpen,
  onClose,
  modalMode,
  updateCategory,
}: ModalAddProps) {
  const [state, formAction] = useFormState(insertData, null);
  const [formData, setFormData] = useState<Record<string, string>>({
    name: "",
    description: "",
  });
  const [error, setError] = useState<boolean>(true);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (e.target.name === "name") {
      setError(!value);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAction = async (formData: FormData) => {
    await formAction(formData);
    if (!error) {
      setError(true);
      setFormData({
        name: "",
        description: "",
      });
      updateCategory();
      onClose();
    }

    console.log(error);
  };

  return (
    <form
      id="addForm"
      action={handleAction}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-in-out ${
        isOpen ? "visible bg-black/30" : "invisible"
      }`}
    >
      {state?.message && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
          role="alert"
        >
          <span className="font-medium">{state?.message}</span>
        </div>
      )}
      <div
        className={`bg-slate-800 shadow-2xl p-8 rounded-md grid grid-cols-2 gap-6 w-[30rem] max-w-full transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="col-span-2 text-white text-2xl font-bold text-center">
          {modalMode === "add" ? "Add Category" : "Edit Category"}
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-white font-semibold">
              Category Name
            </label>
            <input
              name="name"
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter category name"
              className="px-4 py-2 rounded-lg bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state?.error?.name && (
              <span className="text-sm text-red-500 mt-2">
                {state.error.name.join(", ")}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-white font-semibold">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={2}
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              className="px-4 py-2 rounded-lg bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500 min-h-10 max-h-24 overflow-y-auto"
            />
          </div>
        </div>
        <div className="col-span-2 flex justify-end gap-4">
          <CloseButton close={onClose} />
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}
