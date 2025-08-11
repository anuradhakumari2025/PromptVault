const { PDFDocument, StandardFonts } = require('pdf-lib');

/** JSON export */
function exportToJSON(prompts) {
  return prompts.map(p => ({
    title: p.title,
    content: p.content,
    tags: p.tags,
    visibility: p.visibility,
    createdAt: p.createdAt
  }));
}

/** PDF export (returns Buffer) */
async function exportToPDFBuffer(prompts) {
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  prompts.forEach(p => {
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();
    const fontSize = 12;
    page.drawText(`Title: ${p.title}`, { x: 30, y: height - 50, size: 14, font: timesRomanFont });
    page.drawText(`Tags: ${p.tags.join(', ')}`, { x: 30, y: height - 80, size: fontSize, font: timesRomanFont });
    page.drawText(`\n\n${p.content}`, { x: 30, y: height - 120, size: fontSize, font: timesRomanFont, maxWidth: 540 });
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

module.exports = { exportToJSON, exportToPDFBuffer };
