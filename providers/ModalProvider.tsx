"use client";

import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [contentHydrated, setContentHydrated] = useState<boolean>(false);

  useEffect(() => {
    setContentHydrated(true);
  }, []);

  if (!contentHydrated) return null;

  return <></>;
};
export default ModalProvider;
