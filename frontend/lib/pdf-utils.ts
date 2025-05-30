// Simple PDF generation functions that work without external dependencies
export const generateStoryPDF = (title: string, content: string) => {
    try {
      // Create a simple text version for download
      const textContent = content
        .replace(/<[^>]*>/g, "\n")
        .replace(/\n+/g, "\n")
        .trim()
      const fullContent = `${title}\n\n${textContent}`
  
      // Create a blob and download
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
  }
  
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
  }
  
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
  }
  