import React from "react";
import { useFormStatus } from "react-dom";

function CloseButton({ close }: { close: () => void }) {
  return (
    <button
      className="bg-red-600 hover:bg-red-700 hover:scale-110 active:scale-95 active:bg-red-600 transition-transform duration-300 px-4 py-2 rounded-lg text-white font-semibold uppercase w-full"
      onClick={close}
      type="button"
    >
      Cancel
    </button>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-600 hover:bg-blue-700 hover:scale-110 active:scale-95 active:bg-blue-600 transition-transform duration-300 px-4 py-2 rounded-lg text-white font-semibold uppercase w-full"
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

export { CloseButton, SubmitButton };
