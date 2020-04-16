import React from 'react';

interface QRCodeProps {
  /**
   * Value of the QRCode
   */
  value: string;
  /**
   * Size of the qrcode / image.
   */
  size: number;
  /**
   * Background Color for the qrcode / image.
   */
  bgColor: string;
  /**
   * Foreground Color for the qrcode / image.
   */
  fgColor: string;
  onLoad?: () => void;
  onLoadEnd?: () => void;
  /**
   * Returns the base64 png image data
   */
  getImageOnLoad?: () => string;
}

declare class QRCode extends React.Component<QRCodeProps, any> {}

export default QRCode;
