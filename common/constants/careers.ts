export type CareerProps = {
  role: string;
  company: string;
  type: string;
  period: string;
  description: string;
  tags: string[];
};

export const CAREERS: CareerProps[] = [
  {
    role: "Afterclass Instructor",
    company: "SMK Taruna Bhakti",
    type: "Teaching",
    period: "2024",
    description:
      "Mengajarkan materi pemrograman kepada siswa kelas 10 dalam sesi afterclass. Materi yang diajarkan mencakup penggunaan GitHub untuk version control, konsep asynchronous & synchronous programming, callback function, serta setup dan penggunaan TypeScript dalam proyek JavaScript.",
    tags: ["GitHub", "TypeScript", "Async/Await", "Callback", "Teaching"],
  },
  {
    role: "Afterclass Instructor",
    company: "SMK Taruna Bhakti",
    type: "Teaching",
    period: "2023",
    description:
      "Sesi pertama mengajar afterclass untuk siswa kelas 10. Fokus pada pengenalan dasar GitHub, alur kerja version control, dan konsep-konsep fundamental JavaScript modern.",
    tags: ["GitHub", "JavaScript", "Version Control", "Teaching"],
  },
];