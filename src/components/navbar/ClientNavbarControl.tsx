// components/navbar/ClientNavbarControl.tsx
"use client";

import { memo } from "react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ClientNavbarControl = memo(function ClientNavbarControl({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showNavbar, setShowNavbar] = useState(
    !["/login", "/register", "/forgot-password"].includes(pathname)
  );

  useEffect(() => {
    setShowNavbar(
      !["/login", "/register", "/forgot-password"].includes(pathname)
    );
  }, [pathname]);

  useEffect(() => {
    document.body.style.paddingTop = showNavbar ? "4rem" : "0";
  }, [showNavbar]);

  if (!showNavbar) return null;

  return children;
});

export default ClientNavbarControl;
