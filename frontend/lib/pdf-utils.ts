// PDF generation functions using jsPDF and html2canvas
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Editor } from '@tiptap/react';

// Fungsi untuk menghasilkan PDF dari konten TipTap Editor
export const generateStoryPDF = (title: string, content: string) => {
  try {
    // Buat elemen div sementara untuk menampung konten HTML
    const tempDiv = document.createElement('div');
    tempDiv.className = 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto p-4';
    tempDiv.innerHTML = `<h1 class="text-2xl font-bold mb-4">${title}</h1>${content}`;
    tempDiv.style.width = '210mm'; // Ukuran kertas A4
    tempDiv.style.padding = '10mm';
    tempDiv.style.fontFamily = 'var(--font-plus-jakarta-sans), sans-serif';
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    document.body.appendChild(tempDiv);

    // Gunakan html2canvas untuk mengubah div menjadi canvas
    html2canvas(tempDiv, {
      scale: 2, // Meningkatkan kualitas
      useCORS: true,
      logging: false,
    }).then(canvas => {
      // Hapus div sementara
      document.body.removeChild(tempDiv);

      // Buat PDF dengan jsPDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Tambahkan gambar ke PDF
      const imgWidth = 190; // Lebar gambar dalam PDF (mm)
      const pageHeight = 297; // Tinggi halaman A4 (mm)
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      // Jika konten terlalu panjang, buat halaman tambahan
      let heightLeft = imgHeight;
      let position = 10; // Posisi awal (mm)
      let pageNumber = 1;
      
      // Tambahkan halaman pertama
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Tambahkan halaman tambahan jika diperlukan
      while (heightLeft > 0) {
        position = 10 - pageHeight * pageNumber;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        pageNumber++;
      }

      // Simpan PDF
      pdf.save(`${title}.pdf`);
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Gagal mengunduh file. Silakan coba lagi.");
  }
};

// Fungsi alternatif yang menerima instance Editor langsung
export const generateStoryPDFFromEditor = (title: string, editor: Editor) => {
  try {
    const content = editor.getHTML();
    generateStoryPDF(title, content);
  } catch (error) {
    console.error("Error generating PDF from editor:", error);
    alert("Gagal mengunduh file. Silakan coba lagi.");
  }
};

export const generateQuizPDF = (title: string, questions: any[]) => {
  try {
    let content = `${title}\n\n`

    questions.forEach((question, index) => {
      content += `${index + 1}. ${question.question}\n`
      question.options.forEach((option: string, optIndex: number) => {
        const marker = question.correct_answer === optIndex ? "✓" : "○"
        content += `${marker} ${String.fromCharCode(65 + optIndex)}. ${option}\n`
      })
      if (question.explanation) {
        content += `Penjelasan: ${question.explanation}\n`
      }
      content += "\n"
    })

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${title}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Error generating PDF:", error)
    alert("Gagal mengunduh file. Silakan coba lagi.")
  }
};

export const generateSummaryPDF = (title: string, content: string) => {
  try {
    const textContent = content
      .replace(/<[^>]*>/g, "\n")
      .replace(/\n+/g, "\n")
      .trim()
    const fullContent = `${title}\n\n${textContent}`

    const blob = new Blob([fullContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${title}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Error generating PDF:", error)
    alert("Gagal mengunduh file. Silakan coba lagi.")
  }
};
  