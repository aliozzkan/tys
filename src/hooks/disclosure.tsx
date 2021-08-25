import React from "react";
import { useState } from "react";

export const useDisclosure = (isDefaultOpen: boolean = false) => {
  const [isOpen, setOpen] = useState<boolean>(isDefaultOpen);

  function onOpen() {
    setOpen(true);
  }

  function onClose() {
    setOpen(false);
  }

  function onToggle() {
    setOpen((state) => !state);
  }

  return { isOpen, onOpen, onClose, onToggle };
};
