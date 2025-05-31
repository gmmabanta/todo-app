"use client";

import { useEffect, useRef, ReactElement } from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";

interface ActionButton {
  text: string;
  type: "cancel" | "delete" | "save";
  fn: () => void;
}
interface ModalProps {
  open: boolean;
  toggle: (value: boolean) => void;
  title: string;
  body: ReactElement;
  actionButtons: Array<ActionButton>;
}

export default function Modal({
  open,
  toggle,
  title,
  body,
  actionButtons,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggle(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggle]);

  // Close on outside click
  const handleClickOutside = () => toggle(false);

  return (
    open && (
      <div
        className="z-50 fixed inset-0 flex justify-center items-center bg-gray-900/50"
        onClick={handleClickOutside}
      >
        {/* Modal Card */}
        <div
          ref={modalRef}
          className="relative bg-white shadow-lg mx-4 px-4 py-6 rounded-lg w-full max-w-md animate-fade-in-up"
        >
          {/* Modal Header */}
          <div className="flex flex-row justify-between">
            <h2 className="mb-2 font-semibold text-xl">{title}</h2>
            <XMarkIcon
              className="size-6 text-gray-600 hover:text-gray-800"
              onClick={() => toggle(false)}
            />
          </div>

          {/* Modal Contents */}
          {body}

          {/* Modal Footer */}
          <div className="flex justify-end gap-2">
            {actionButtons.map((b) => (
              <button
                key={b.text}
                onClick={() => b.fn()}
                className={`mt-4 px-4 py-2 border-1 rounded bg-white ${
                  b.type == "delete"
                    ? " hover:bg-red-600 hover:text-white border-red-600 text-red-600"
                    : " hover:bg-blue-600 border-blue-600 rounded text-blue-600 hover:text-white"
                }`}
              >
                {b.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  );
}
