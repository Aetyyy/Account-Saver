"use client";

import { memo, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ClientNavbarControl = memo(function ClientNavbarControl({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Tambahkan /forgot-password/ untuk menutupi route dinamis
  const hideNavbarPaths = ["/login", "/register", "/forgot-password"];

  const shouldHideNavbar = () => {
    // 1. Cek apakah path persis "/forgot-password"
    // 2. Atau path dimulai dengan "/forgot-password/" (dinamis)
    if (
      pathname === "/forgot-password" ||
      pathname.startsWith("/forgot-password/")
    ) {
      return true;
    }

    // 3. Atau cek path lain yang ingin disembunyikan
    return hideNavbarPaths.includes(pathname);
  };

  const [showNavbar, setShowNavbar] = useState(!shouldHideNavbar());

  useEffect(() => {
    setShowNavbar(!shouldHideNavbar());
  }, [pathname]);

  // Mengatur padding top agar konten tidak tertutup navbar
  useEffect(() => {
    document.body.style.paddingTop = showNavbar ? "4rem" : "0";
  }, [showNavbar]);

  if (!showNavbar) return null;

  return <>{children}</>;
});

export default ClientNavbarControl;
