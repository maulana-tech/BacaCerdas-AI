// PDF generation functions using jsPDF and html2canvas
import jsPDF from 'jspdf';
import { Editor } from '@tiptap/react';

/**
 * Generate PDF file from story content
 */
export const generateStoryPDF = (title: string, content: string) => {
  try {
    // Bersihkan konten HTML menjadi plain text
    const textContent = content
      .replace(/<[^>]*>/g, "") // Hapus semua tag HTML
      .replace(/&nbsp;/g, " ") // Ganti karakter html space
      .replace(/&amp;/g, "&")  // Ganti karakter html ampersand
      .replace(/&lt;/g, "<")   // Ganti karakter html less than
      .replace(/&gt;/g, ">")   // Ganti karakter html greater than
      .trim();

    // Buat PDF document dengan ukuran A4
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Set font
    pdf.setFont("helvetica");
    
    // Tambahkan judul
    pdf.setFontSize(24);
    pdf.text(title, 20, 20);

    // Tambahkan konten
    pdf.setFontSize(12);
    
    // Split text ke dalam lines dengan max width
    const textLines = pdf.splitTextToSize(textContent, 170); // 170mm adalah lebar yang aman untuk A4
    
    // Tambahkan text dengan line breaks, mulai dari y=40mm (dibawah judul)
    pdf.text(textLines, 20, 40);

    // Auto-page break akan ditangani oleh jsPDF
    
    // Save PDF dengan nama file yang sesuai
    pdf.save(`${title}.pdf`);
    
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Gagal mengunduh file. Silakan coba lagi.");
    return false;
  }
};

/**
 * Helper function untuk generate dari TipTap editor
 */
export const generateStoryPDFFromEditor = (title: string, editor: Editor) => {
  if (!editor) {
    throw new Error('Editor tidak tersedia');
  }
  return generateStoryPDF(title, editor.getHTML());
};

// Export fungsi lain yang masih digunakan
export const generateQuizPDF = (title: string, questions: any[]) => {
  try {
    let content = `${title}\n\n`;

    questions.forEach((question, index) => {
      content += `${index + 1}. ${question.question}\n`;
      question.options.forEach((option: string, optIndex: number) => {
        const marker = question.correct_answer === optIndex ? "✓" : "○";
        content += `${marker} ${String.fromCharCode(65 + optIndex)}. ${option}\n`;
      });
      if (question.explanation) {
        content += `Penjelasan: ${question.explanation}\n`;
      }
      content += "\n";
    });

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating text file:", error);
    alert("Gagal mengunduh file. Silakan coba lagi.");
  }
};

export const generateSummaryPDF = (title: string, content: string) => {
  try {
    const textContent = content
      .replace(/<[^>]*>/g, "\n")
      .replace(/\n+/g, "\n")
      .trim();
    const fullContent = `${title}\n\n${textContent}`;

    const blob = new Blob([fullContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating text file:", error);
    alert("Gagal mengunduh file. Silakan coba lagi.");
  }
};
