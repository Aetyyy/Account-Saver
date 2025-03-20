"use client";

import React, { useEffect, useState } from "react";
import { CloseButton, SubmitButton } from "@/components/category/form/button";
import { insertData, updateData } from "@/lib/category";
import { useFormState } from "react-dom";
import { category } from "@prisma/client";

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  modalMode: "add" | "edit";
  updateCategory: () => void;
  initialData?: category | null;
}

interface FormState {
  message?: string;
  errors?: Record<string, string[]>;
  status: boolean;
}

export default function ModalForm({
  isOpen,
  onClose,
  modalMode,
  updateCategory,
  initialData,
}: ModalFormProps) {
  // Fungsi untuk memproses form (insert atau update)
  const handleFormAction = async (
    state: FormState,
    formData: FormData
  ): Promise<FormState> => {
    if (modalMode === "add") {
      const response = await insertData(state, formData);
      return { ...state, ...response } as FormState;
    } else {
      const response = await updateData(state, formData);
      return { ...state, ...response } as FormState;
    }
  };

  const [state, formAction] = useFormState<FormState, FormData>(
    handleFormAction,
    { status: false, message: undefined, errors: undefined }
  );

  const [formData, setFormData] = useState<Partial<category>>({
    name: "",
    description: "",
  });

  // Atur nilai form saat modal terbuka atau ketika ada initialData
  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || { name: "", description: "" });
    } else {
      setFormData({ name: "", description: "" });
    }
  }, [isOpen, initialData]);

  // Jika state berubah (misal: status true), panggil update dan tutup modal
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (state && state.status) {
      updateCategory();
      onClose();
      setIsSubmitting(false);
    } else if (state && !state.status) {
      setIsSubmitting(false);
    }
  }, [state, updateCategory, onClose]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formDataObj = new FormData(event.currentTarget);
    await formAction(formDataObj);
    // Perubahan state dari useFormState akan memicu useEffect untuk updateCategory dan onClose
  };

  return (
    <form
      id="categoryForm"
      onSubmit={handleSubmit}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-in-out ${
        isOpen ? "visible bg-black/30" : "invisible"
      }`}
      key={String(isOpen)}
    >
      <div
        className={`bg-slate-800 shadow-2xl p-8 rounded-md grid grid-cols-2 gap-6 w-[30rem] max-w-full transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="col-span-2 text-white text-2xl font-bold text-center">
          {modalMode === "add" ? "Add Category" : "Edit Category"}
        </div>

        {/* Input hidden untuk ID saat mode edit */}
        {modalMode === "edit" && (
          <input type="hidden" name="id" value={formData.id || ""} />
        )}

        <div className="col-span-2 flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-white font-semibold">
              Category Name
            </label>
            <input
              name="name"
              id="name"
              type="text"
              value={formData.name || ""}
              onChange={handleInputChange}
              placeholder="Enter category name"
              className="px-4 py-2 rounded-lg bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state && !state.status && state.errors && state.errors.name && (
              <span className="text-sm text-red-500 mt-2">
                {state.errors.name.join(", ")}
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
              value={formData.description || ""}
              onChange={handleInputChange}
              placeholder="Enter description"
              className="px-4 py-2 rounded-lg bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500 min-h-10 max-h-24 overflow-y-auto"
            />
          </div>
        </div>
        <div className="col-span-2 flex justify-end gap-4">
          <CloseButton close={onClose} />
          <SubmitButton disabled={isSubmitting} />
        </div>
      </div>
    </form>
  );
}
