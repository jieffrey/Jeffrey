export type EducationProps = {
  school: string;
  level: string;
  location: string;
  period: string;
  logo?: string;
};

export const EDUCATION: EducationProps[] = [
  {
    school: "SMK Taruna Bhakti",
    level: "Sekolah Menengah Kejuruan",
    location: "Depok, Jawa Barat",
    period: "2023 - Sekarang",
  },
  {
    school: "SMPIT Raflesia",
    level: "Sekolah Menengah Pertama",
    location: "Depok, Jawa Barat",
    period: "2020 - 2023",
  },
  {
    school: "SDN Tugu 10",
    level: "Sekolah Dasar",
    location: "Depok, Jawa Barat",
    period: "2014 - 2020",
  },
  {
    school: "RA Assunbulah",
    level: "Taman Kanak-Kanak Islam",
    location: "Cimanggis, Depok, Jawa Barat",
    period: "2012 - 2014",
  },
];