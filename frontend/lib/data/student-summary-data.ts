import type { SummarizedCourse, Course } from "@/lib/types"

export const dummyCourses: Course[] = [
  {
    id: "course_001",
    slug: "algoritma-struktur-data",
    teacherId: "teacher_001",
    courseAssetId: "asset_001",
    name: "Algoritma dan Struktur Data",
    description: "Mempelajari konsep dasar algoritma dan struktur data untuk pengembangan software",
    type: "programming",
    tags: ["algoritma", "struktur-data", "programming"],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "course_002",
    slug: "basis-data",
    teacherId: "teacher_002",
    courseAssetId: "asset_002",
    name: "Basis Data",
    description: "Konsep database relasional dan SQL untuk pengelolaan data",
    type: "database",
    tags: ["database", "sql", "relational"],
    createdAt: "2024-01-20T09:00:00Z",
    updatedAt: "2024-01-20T09:00:00Z"
  },
  {
    id: "course_003",
    slug: "pemrograman-web",
    teacherId: "teacher_003",
    courseAssetId: "asset_003",
    name: "Pemrograman Web",
    description: "Pengembangan aplikasi web dengan HTML, CSS, JavaScript, dan framework modern",
    type: "web-development",
    tags: ["web", "html", "css", "javascript"],
    createdAt: "2024-02-01T08:00:00Z",
    updatedAt: "2024-02-01T08:00:00Z"
  },
  {
    id: "course_004",
    slug: "jaringan-komputer",
    teacherId: "teacher_004",
    courseAssetId: "asset_004",
    name: "Jaringan Komputer",
    description: "Konsep dasar networking, protokol, dan keamanan jaringan",
    type: "networking",
    tags: ["networking", "protocol", "security"],
    createdAt: "2024-02-10T07:30:00Z",
    updatedAt: "2024-02-10T07:30:00Z"
  },
  {
    id: "course_005",
    slug: "machine-learning",
    teacherId: "teacher_005",
    courseAssetId: "asset_005",
    name: "Machine Learning",
    description: "Pengenalan machine learning dan artificial intelligence",
    type: "ai-ml",
    tags: ["machine-learning", "ai", "data-science"],
    createdAt: "2024-02-15T11:00:00Z",
    updatedAt: "2024-02-15T11:00:00Z"
  },
  {
    id: "course_006",
    slug: "mobile-development",
    teacherId: "teacher_006",
    courseAssetId: "asset_006",
    name: "Pengembangan Aplikasi Mobile",
    description: "Membuat aplikasi mobile dengan React Native dan Flutter",
    type: "mobile",
    tags: ["mobile", "react-native", "flutter"],
    createdAt: "2024-03-01T12:00:00Z",
    updatedAt: "2024-03-01T12:00:00Z"
  },
  {
    id: "course_007",
    slug: "cloud-computing",
    teacherId: "teacher_007",
    courseAssetId: "asset_007",
    name: "Cloud Computing",
    description: "Konsep cloud computing dan deployment dengan AWS, Azure, GCP",
    type: "cloud",
    tags: ["cloud", "aws", "azure", "deployment"],
    createdAt: "2024-03-10T14:30:00Z",
    updatedAt: "2024-03-10T14:30:00Z"
  },
  {
    id: "course_008",
    slug: "cyber-security",
    teacherId: "teacher_008",
    courseAssetId: "asset_008",
    name: "Keamanan Siber",
    description: "Fundamental cybersecurity, ethical hacking, dan penetration testing",
    type: "security",
    tags: ["security", "ethical-hacking", "penetration-testing"],
    createdAt: "2024-03-15T09:45:00Z",
    updatedAt: "2024-03-15T09:45:00Z"
  }
];

export const dummySummarizedCourses: SummarizedCourse[] = [
  {
    id: "summary_001",
    courseId: "course_001",
    userId: "user_001",
    summary: `<h2>Pengantar Algoritma dan Struktur Data</h2>
    <p><strong>Algoritma</strong> adalah langkah-langkah sistematis untuk menyelesaikan masalah. Struktur data merupakan cara mengorganisir dan menyimpan data agar dapat diakses secara efisien.</p>
    
    <h3>Konsep Dasar:</h3>
    <ul>
      <li><strong>Kompleksitas Waktu (Big O):</strong> Mengukur efisiensi algoritma</li>
      <li><strong>Array:</strong> Struktur data linear dengan akses random</li>
      <li><strong>Linked List:</strong> Struktur data linear dengan akses sequential</li>
      <li><strong>Stack:</strong> LIFO (Last In First Out) struktur</li>
      <li><strong>Queue:</strong> FIFO (First In First Out) struktur</li>
    </ul>
    
    <h3>Algoritma Sorting:</h3>
    <p>Algoritma sorting seperti <em>bubble sort</em>, <em>selection sort</em>, dan <em>quick sort</em> dijelaskan dengan contoh implementasi. Pemahaman yang baik tentang struktur data sangat penting untuk pengembangan software yang efisien.</p>
    
    <blockquote>
      <p>"Algoritma yang baik adalah fondasi dari software yang berkualitas"</p>
    </blockquote>`,
    rating: 5,
    feedback: "Materi sangat membantu untuk memahami konsep dasar algoritma",
    createdAt: "2024-06-10T08:30:00Z",
    updatedAt: "2024-06-10T08:30:00Z",
    Course: dummyCourses[0]
  },
  {
    id: "summary_002",
    courseId: "course_002",
    userId: "user_001",
    summary: `<h2>Basis Data Relasional dan SQL</h2>
    <p>Database relasional menggunakan tabel untuk menyimpan data dengan relasi antar tabel. Konsep <strong>normalisasi</strong> (1NF, 2NF, 3NF) penting untuk menghindari redundansi data.</p>
    
    <h3>SQL Fundamentals:</h3>
    <ul>
      <li><strong>SELECT:</strong> Mengambil data dari database</li>
      <li><strong>INSERT:</strong> Menambah data baru</li>
      <li><strong>UPDATE:</strong> Mengubah data yang ada</li>
      <li><strong>DELETE:</strong> Menghapus data</li>
    </ul>
    
    <h3>Advanced Concepts:</h3>
    <p><strong>JOIN operations</strong> memungkinkan penggabungan data dari multiple tables:</p>
    <ul>
      <li><em>INNER JOIN:</em> Menggabungkan data yang cocok di kedua tabel</li>
      <li><em>LEFT JOIN:</em> Mengambil semua data dari tabel kiri</li>
      <li><em>RIGHT JOIN:</em> Mengambil semua data dari tabel kanan</li>
    </ul>
    
    <p><em>Indexing</em> meningkatkan performa query, sementara <em>transactions</em> memastikan konsistensi data dengan ACID properties.</p>`,
    rating: 4,
    feedback: "Penjelasan SQL sangat detail dan mudah dipahami",
    createdAt: "2024-06-05T10:45:00Z",
    updatedAt: "2024-06-05T10:45:00Z",
    Course: dummyCourses[1]
  },
  {
    id: "summary_003",
    courseId: "course_003",
    userId: "user_001",
    summary: `<h2>Pengembangan Web Modern</h2>
    <p>Web development melibatkan tiga teknologi utama: <strong>HTML</strong> untuk struktur, <strong>CSS</strong> untuk styling, dan <strong>JavaScript</strong> untuk interaktivitas.</p>
    
    <h3>Frontend Technologies:</h3>
    <ul>
      <li><strong>HTML5:</strong> Semantic elements dan multimedia support</li>
      <li><strong>CSS3:</strong> Flexbox, Grid, dan responsive design</li>
      <li><strong>JavaScript ES6+:</strong> Arrow functions, promises, async/await</li>
    </ul>
    
    <h3>Modern Frameworks:</h3>
    <p>Framework seperti <em>React</em>, <em>Vue</em>, dan <em>Angular</em> memudahkan pengembangan aplikasi web yang kompleks. Konsep <strong>component-based architecture</strong> dan <strong>state management</strong> menjadi fundamental dalam pengembangan modern.</p>
    
    <h3>Best Practices:</h3>
    <ol>
      <li>Responsive Design untuk berbagai ukuran layar</li>
      <li>Performance optimization dengan lazy loading</li>
      <li>SEO optimization untuk search engines</li>
      <li>Accessibility untuk semua pengguna</li>
    </ol>`,
    rating: 5,
    feedback: "Sangat membantu untuk memahami teknologi web terkini",
    createdAt: "2024-06-02T16:20:00Z",
    updatedAt: "2024-06-02T16:20:00Z",
    Course: dummyCourses[2]
  },
  {
    id: "summary_004",
    courseId: "course_004",
    userId: "user_001",
    summary: `<h2>Jaringan Komputer - Model OSI dan TCP/IP</h2>
    <p>Model <strong>OSI</strong> (Open Systems Interconnection) terdiri dari 7 layer: Physical, Data Link, Network, Transport, Session, Presentation, dan Application.</p>
    
    <h3>TCP/IP Protocol Suite:</h3>
    <ul>
      <li><strong>Application Layer:</strong> HTTP/HTTPS, FTP, SMTP</li>
      <li><strong>Transport Layer:</strong> TCP dan UDP</li>
      <li><strong>Internet Layer:</strong> IP, ICMP</li>
      <li><strong>Network Access Layer:</strong> Ethernet, WiFi</li>
    </ul>
    
    <h3>Network Components:</h3>
    <p><strong>Routing</strong> dan <strong>switching</strong> adalah proses forwarding data dalam network. Router bekerja di layer 3 (Network), sementara switch bekerja di layer 2 (Data Link).</p>
    
    <h3>Network Security:</h3>
    <p>Keamanan jaringan meliputi:</p>
    <ul>
      <li><em>Firewall:</em> Filtering traffic berdasarkan rules</li>
      <li><em>VPN:</em> Secure tunnel untuk remote access</li>
      <li><em>Enkripsi:</em> Melindungi data dalam transit</li>
    </ul>
    
    <p><strong>Quality of Service (QoS)</strong> mengatur prioritas traffic untuk memastikan performa aplikasi kritikal.</p>`,
    rating: 4,
    feedback: "Materi networking dijelaskan dengan sangat sistematis",
    createdAt: "2024-05-28T09:10:00Z",
    updatedAt: "2024-05-28T09:10:00Z",
    Course: dummyCourses[3]
  },
  {
    id: "summary_005",
    courseId: "course_005",
    userId: "user_001",
    summary: `<h2>Machine Learning - Supervised Learning</h2>
    <p><strong>Supervised learning</strong> menggunakan labeled training data untuk memprediksi output. Terdapat dua kategori utama: klasifikasi dan regresi.</p>
    
    <h3>Algoritma Klasifikasi:</h3>
    <ul>
      <li><strong>Decision Tree:</strong> Mudah diinterpretasi dan visualisasi</li>
      <li><strong>Random Forest:</strong> Ensemble method yang robust</li>
      <li><strong>SVM:</strong> Effective untuk high-dimensional data</li>
      <li><strong>Naive Bayes:</strong> Baik untuk text classification</li>
    </ul>
    
    <h3>Algoritma Regresi:</h3>
    <p><em>Linear Regression</em> dan <em>Polynomial Regression</em> untuk numerical prediction. <strong>Feature engineering</strong> dan data preprocessing sangat penting untuk model performance.</p>
    
    <h3>Model Evaluation:</h3>
    <p><strong>Cross-validation</strong> membantu evaluasi model generalization. Metrics yang umum digunakan:</p>
    <ul>
      <li><em>Accuracy:</em> Persentase prediksi yang benar</li>
      <li><em>Precision:</em> True positive rate</li>
      <li><em>Recall:</em> Sensitivitas model</li>
      <li><em>F1-Score:</em> Harmonic mean dari precision dan recall</li>
    </ul>
    
    <p><em>Overfitting</em> dan <em>underfitting</em> adalah challenge utama yang diatasi dengan regularization techniques.</p>`,
    rating: 5,
    feedback: "Penjelasan ML sangat komprehensif untuk pemula",
    createdAt: "2024-05-25T13:40:00Z",
    updatedAt: "2024-05-25T13:40:00Z",
    Course: dummyCourses[4]
  },
  {
    id: "summary_006",
    courseId: "course_006",
    userId: "user_001",
    summary: `<h2>Pengembangan Aplikasi Mobile</h2>
    <p>Mobile development mencakup pengembangan aplikasi untuk <strong>iOS</strong> dan <strong>Android</strong>. Ada beberapa pendekatan: native, hybrid, dan cross-platform.</p>
    
    <h3>Cross-Platform Frameworks:</h3>
    <ul>
      <li><strong>React Native:</strong> Menggunakan JavaScript dan React</li>
      <li><strong>Flutter:</strong> Menggunakan Dart dan widget-based UI</li>
      <li><strong>Xamarin:</strong> Menggunakan C# untuk shared business logic</li>
    </ul>
    
    <h3>Key Concepts:</h3>
    <p>Mobile development memiliki beberapa konsep khusus:</p>
    <ol>
      <li><strong>Responsive UI:</strong> Adaptasi dengan berbagai screen sizes</li>
      <li><strong>State Management:</strong> Mengelola data aplikasi</li>
      <li><strong>Navigation:</strong> Perpindahan antar screens</li>
      <li><strong>API Integration:</strong> Komunikasi dengan backend services</li>
    </ol>
    
    <h3>Performance Optimization:</h3>
    <p>Optimasi performa aplikasi mobile meliputi <em>lazy loading</em>, <em>image optimization</em>, dan <em>efficient state updates</em>.</p>`,
    rating: 4,
    feedback: "Sangat berguna untuk memulai mobile development",
    createdAt: "2024-05-20T11:25:00Z",
    updatedAt: "2024-05-20T11:25:00Z",
    Course: dummyCourses[5]
  },
  {
    id: "summary_007",
    courseId: "course_007",
    userId: "user_001",
    summary: `<h2>Cloud Computing Fundamentals</h2>
    <p><strong>Cloud computing</strong> menyediakan computing resources on-demand melalui internet. Tiga model layanan utama: IaaS, PaaS, dan SaaS.</p>
    
    <h3>Service Models:</h3>
    <ul>
      <li><strong>IaaS (Infrastructure as a Service):</strong> Virtual machines, storage, networking</li>
      <li><strong>PaaS (Platform as a Service):</strong> Development platform dan tools</li>
      <li><strong>SaaS (Software as a Service):</strong> Ready-to-use applications</li>
    </ul>
    
    <h3>Major Cloud Providers:</h3>
    <p><strong>AWS (Amazon Web Services)</strong> adalah leading cloud provider dengan services seperti:</p>
    <ul>
      <li><em>EC2:</em> Elastic Compute Cloud untuk virtual servers</li>
      <li><em>S3:</em> Simple Storage Service untuk object storage</li>
      <li><em>RDS:</em> Relational Database Service</li>
      <li><em>Lambda:</em> Serverless computing platform</li>
    </ul>
    
    <h3>Cloud Benefits:</h3>
    <ol>
      <li>Scalability dan flexibility</li>
      <li>Cost efficiency dengan pay-as-you-use</li>
      <li>High availability dan disaster recovery</li>
      <li>Global reach dan fast deployment</li>
    </ol>`,
    rating: 5,
    feedback: "Pengenalan cloud computing yang sangat baik",
    createdAt: "2024-05-15T15:50:00Z",
    updatedAt: "2024-05-15T15:50:00Z",
    Course: dummyCourses[6]
  }
];

// Helper functions untuk data dummy
export const getDummyCourseById = (id: string): Course | undefined => {
  return dummyCourses.find(course => course.id === id);
};

export const getDummySummaryById = (id: string): SummarizedCourse | undefined => {
  return dummySummarizedCourses.find(summary => summary.id === id);
};

export const getDummySummariesByCourseId = (courseId: string): SummarizedCourse[] => {
  return dummySummarizedCourses.filter(summary => summary.courseId === courseId);
};

export const searchDummySummaries = (keyword: string): SummarizedCourse[] => {
  const lowercaseKeyword = keyword.toLowerCase();
  return dummySummarizedCourses.filter(summary => 
    summary.Course?.name.toLowerCase().includes(lowercaseKeyword) ||
    summary.summary.toLowerCase().includes(lowercaseKeyword)
  );
};

// Simulasi API calls dengan delay
export const simulateApiDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};