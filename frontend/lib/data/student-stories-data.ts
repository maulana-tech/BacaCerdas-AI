import { Story } from "@/lib/types";

type StoryWithThumbnail = Story & { thumbnailUrl: string };

export const studentStories: StoryWithThumbnail[] = [
  {
    id: 'story-001',
    title: 'Kancil dan Buaya yang Cerdik',
    content: 'Pada suatu hari yang cerah, di tepi sebuah sungai yang jernih, hiduplah seekor kancil yang terkenal dengan kecerdikannya. Sungai itu dipenuhi oleh buaya-buaya lapar yang selalu mengintai mangsa. Kancil ingin menyeberangi sungai untuk mencari makanan di hutan seberang yang penuh dengan buah-buahan segar, tetapi ia tahu bahwa buaya-buaya itu tidak akan membiarkannya lewat begitu saja. Dengan pikiran yang cerdas, Kancil mulai merancang sebuah rencana. Ia mendekati tepi sungai dan berteriak kepada para buaya, "Hai, para buaya! Raja Hutan ingin mengadakan pesta besar dan membutuhkan jumlah kalian untuk dihitung!" Buaya-buaya yang penasaran segera berbaris di permukaan air, membentuk jembatan hidup. Dengan lincah, Kancil melompat dari punggung satu buaya ke buaya lainnya sambil menghitung, "Satu, dua, tiga..." hingga ia sampai di seberang sungai. Setelah sampai, Kancil tertawa kecil dan berkata, "Terima kasih atas bantuan kalian, tapi saya hanya ingin menyeberang!" Para buaya marah karena tertipu, tetapi Kancil sudah jauh berlari ke dalam hutan dengan aman. Cerita ini mengajarkan bahwa kecerdasan dan kecerdikan dapat mengatasi kekuatan fisik yang besar.',
    type: 'Fabel',
    userId: 'user-guru-alpha',
    tagId: 'tag-01',
    createdAt: new Date('2025-06-10T09:00:00Z'),
    updatedAt: new Date('2025-06-10T09:00:00Z'),
    thumbnailUrl: '/images/thumbnails/kancil-dan-buaya.jpg',
  },
  {
    id: 'story-002',
    title: 'Malin Kundang, Anak Durhaka',
    content: 'Di sebuah desa di pesisir Sumatra Barat, hiduplah seorang janda miskin bernama Mande Rubayah bersama anak semata wayangnya, Malin. Meski hidup serba kekurangan, Mande mencurahkan kasih sayangnya untuk membesarkan Malin. Ketika beranjak dewasa, Malin meminta izin untuk merantau ke kota demi mengubah nasib mereka. Dengan berat hati, Mande melepas kepergian anaknya, berdoa agar Malin selalu selamat. Di negeri rantau, Malin bekerja keras dan akhirnya menjadi saudagar kaya raya. Ia menikah dengan seorang gadis dari keluarga terpandang dan hidup dalam kemewahan. Suatu hari, Malin kembali ke desanya dengan kapal besar, ditemani oleh istrinya. Mande yang rindu berlari ke pelabuhan untuk menyambut anaknya, tetapi Malin, malu dengan ibunya yang miskin dan berpakaian compang-camping, menolak mengakuinya. Ia bahkan mengusir Mande dan berkata bahwa ia tidak punya ibu seperti itu. Hati Mande hancur, dan dalam kepedihan, ia berdoa kepada Tuhan untuk memberikan pelajaran kepada anaknya yang durhaka. Tak lama kemudian, badai besar melanda, dan kapal Malin hancur. Malin sendiri dikutuk menjadi batu di tepi pantai. Cerita ini mengajarkan bahwa seorang anak harus selalu menghormati orang tua, apa pun keadaannya.',
    type: 'Legenda',
    userId: 'user-guru-alpha',
    tagId: 'tag-02',
    createdAt: new Date('2025-06-11T14:00:00Z'),
    updatedAt: new Date('2025-06-11T14:00:00Z'),
    thumbnailUrl: '/images/thumbnails/malin-kundang.jpg',
  },
  {
    id: 'story-003',
    title: 'Bawang Merah dan Bawang Putih',
    content: 'Di sebuah kampung kecil, hiduplah dua saudara tiri, Bawang Merah dan Bawang Putih. Bawang Putih adalah gadis yang baik hati, rajin, dan selalu membantu ibu tirinya serta Bawang Merah, saudara tirinya. Sebaliknya, Bawang Merah dan ibu tirinya bersikap jahat dan sering menyiksa Bawang Putih dengan memberikan pekerjaan berat. Suatu hari, pakaian ibu tiri terseret arus sungai saat Bawang Putih sedang mencuci. Dengan berani, Bawang Putih mengikuti arus sungai dan tiba di sebuah gua tempat tinggal seorang nenek tua yang baik hati. Nenek itu meminta Bawang Putih untuk tinggal beberapa hari dan membantu membersihkan rumahnya. Sebagai imbalan, Bawang Putih diberi hadiah sebuah labu besar untuk dibawa pulang. Ketika labu itu dibuka, isinya adalah emas dan permata. Melihat hal itu, Bawang Merah menjadi iri dan sengaja membiarkan pakaian ibunya hanyut agar bisa pergi ke gua yang sama. Namun, karena sifatnya yang malas dan kasar, nenek itu hanya memberinya labu yang berisi ular dan serangga berbisa. Cerita ini mengajarkan bahwa kebaikan hati dan kerja keras akan selalu mendapat balasan yang setimpal, sementara sifat iri dan jahat akan membawa kesengsaraan.',
    type: 'Dongeng',
    userId: 'user-guru-bravo',
    tagId: 'tag-03',
    createdAt: new Date('2025-06-12T11:00:00Z'),
    updatedAt: new Date('2025-06-12T11:00:00Z'),
    thumbnailUrl: '/images/thumbnails/bawang-merah-putih.jpg',
  },
];