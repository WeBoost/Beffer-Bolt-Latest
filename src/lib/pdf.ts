import { jsPDF } from 'jspdf';
import { DoorConfiguration } from '../types/door';

export const generateDoorPDF = async (
  config: DoorConfiguration,
  previewImage: string
): Promise<string> => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;

  // Add header
  doc.setFontSize(20);
  doc.text('Door Configuration', margin, margin);

  // Add preview image
  if (previewImage) {
    const imgWidth = pageWidth - (margin * 2);
    const imgHeight = (imgWidth * 3) / 4; // Maintain aspect ratio
    doc.addImage(previewImage, 'PNG', margin, margin + 10, imgWidth, imgHeight);
  }

  // Add specifications
  doc.setFontSize(14);
  doc.text('Specifications', margin, 120);
  
  doc.setFontSize(12);
  let y = 130;
  const lineHeight = 7;

  // Door type and installation
  doc.text(`Door Type: ${config.doorType === 'single' ? 'Single Door' : 'Double Door'}`, margin, y);
  y += lineHeight;
  doc.text(`Installation Required: ${config.requiresInstallation ? 'Yes' : 'No'}`, margin, y);
  y += lineHeight;

  if (config.requiresInstallation && config.installationLocation) {
    doc.text(`Installation Location: ${config.installationLocation.what3words}`, margin, y);
    y += lineHeight;
  }

  // Dimensions
  y += lineHeight;
  doc.text('Dimensions:', margin, y);
  y += lineHeight;
  doc.text(`Width: ${config.width} inches`, margin + 10, y);
  y += lineHeight;
  doc.text(`Height: ${config.height} inches`, margin + 10, y);
  y += lineHeight;
  doc.text(`Thickness: ${config.thickness} inches`, margin + 10, y);
  y += lineHeight;

  // Materials and finish
  y += lineHeight;
  doc.text('Materials & Finish:', margin, y);
  y += lineHeight;
  doc.text(`Material: ${config.material}`, margin + 10, y);
  y += lineHeight;
  doc.text(`Finish: ${config.finish}`, margin + 10, y);
  y += lineHeight;

  // Hardware
  y += lineHeight;
  doc.text('Hardware:', margin, y);
  y += lineHeight;
  doc.text(`Type: ${config.hardware}`, margin + 10, y);
  y += lineHeight;

  // Glass (if applicable)
  if (config.glass) {
    y += lineHeight;
    doc.text('Glass:', margin, y);
    y += lineHeight;
    doc.text(`Type: ${config.glass}`, margin + 10, y);
    y += lineHeight;
  }

  // Extra features
  if (config.extras.length > 0) {
    y += lineHeight;
    doc.text('Extra Features:', margin, y);
    y += lineHeight;
    config.extras.forEach(extra => {
      doc.text(`• ${extra}`, margin + 10, y);
      y += lineHeight;
    });
  }

  // Add footer
  const today = new Date().toLocaleDateString();
  doc.setFontSize(10);
  doc.text(`Generated on ${today}`, margin, doc.internal.pageSize.getHeight() - margin);

  // Return as base64 string
  return doc.output('datauristring');
};

export const generateMultiDoorPDF = async (
  configurations: DoorConfiguration[],
  previewImages: string[]
): Promise<string> => {
  const doc = new jsPDF();
  
  configurations.forEach((config, index) => {
    if (index > 0) {
      doc.addPage();
    }
    
    // Add door configuration to page
    const previewImage = previewImages[index];
    doc.setPage(index + 1);
    
    // Add header with door number
    doc.setFontSize(20);
    doc.text(`Door ${index + 1} Configuration`, 20, 20);
    
    // Add preview image
    if (previewImage) {
      const imgWidth = doc.internal.pageSize.getWidth() - 40;
      const imgHeight = (imgWidth * 3) / 4;
      doc.addImage(previewImage, 'PNG', 20, 30, imgWidth, imgHeight);
    }
    
    // Add specifications (similar to single door PDF)
    // ... (rest of the code is similar to generateDoorPDF)
  });

  return doc.output('datauristring');
};