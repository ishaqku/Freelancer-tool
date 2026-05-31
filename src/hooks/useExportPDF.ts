import { useState } from 'react';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

export function useExportPDF() {
  const [isExporting, setIsExporting] = useState(false);

  const exportPDF = async (elementId: string, filename: string) => {
    setIsExporting(true);
    try {
      const element = document.getElementById(elementId);
      if (!element) throw new Error('Element not found');

      // Add a class for print-specific styling if needed
      element.classList.add('pdf-exporting');

      // Suppress console.error/warn temporarily because html-to-image logs CORS errors 
      // when it tries to read external stylesheets, which triggers error boundaries.
      const originalConsoleError = console.error;
      const originalConsoleWarn = console.warn;
      console.error = (...args) => {
        if (args[0] && typeof args[0] === 'string' && args[0].includes('Error inlining remote css file')) return;
        originalConsoleError(...args);
      };
      console.warn = (...args) => {
        if (args[0] && typeof args[0] === 'string' && args[0].includes('Error while reading CSS rules')) return;
        originalConsoleWarn(...args);
      };

      let imgData = '';
      try {
        imgData = await toPng(element, {
          pixelRatio: 2,
          backgroundColor: '#ffffff',
        });
      } finally {
        console.error = originalConsoleError;
        console.warn = originalConsoleWarn;
      }
      
      element.classList.remove('pdf-exporting');

      // Create an image element to get the dimensions
      const img = new Image();
      img.src = imgData;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (img.height * imgWidth) / img.width;
      let heightLeft = imgHeight;

      const doc = new jsPDF('p', 'mm', 'a4');
      
      let position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      doc.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return { isExporting, exportPDF };
}
