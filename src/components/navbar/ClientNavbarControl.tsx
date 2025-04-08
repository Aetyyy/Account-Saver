"use client";

import { memo, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ClientNavbarControl = memo(function ClientNavbarControl({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Daftar path untuk menyembunyikan navbar
  const hideNavbarPaths = ["/login", "/register", "/forgot-password"];

  // Hitung apakah navbar harus disembunyikan berdasarkan pathname
  const shouldHideNavbar =
    pathname === "/forgot-password" ||
    pathname.startsWith("/forgot-password/") ||
    hideNavbarPaths.includes(pathname);

  // Gunakan nilai computed ini untuk state
  const [showNavbar, setShowNavbar] = useState(!shouldHideNavbar);

  useEffect(() => {
    // Update state berdasarkan perubahan pathname
    setShowNavbar(!shouldHideNavbar);
  }, [pathname, shouldHideNavbar]);

  // Mengatur padding atas pada body agar konten tidak tertutup oleh navbar
  useEffect(() => {
    document.body.style.paddingTop = showNavbar ? "4rem" : "0";
  }, [showNavbar]);

  if (!showNavbar) return null;

  return <>{children}</>;
});

export default ClientNavbarControl;
