import { useState, useEffect } from "react";
import { BarCodeScanner, PermissionStatus } from "expo-barcode-scanner";

export function useBarcodePermission() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    onRequestAsync();
  }, [])

  async function onRequestAsync() {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === PermissionStatus.GRANTED);
    return status === PermissionStatus.GRANTED;
  }

  return {
    onRequestAsync,
    hasPermission: !!hasPermission,
    isPermissionDenied: hasPermission === false,
    noHaveSelection: hasPermission === null,
  };
}
