interface ICategories {
  id: string;
  name: string;
  icon: any;
  subCategories: ISubCategories[];
}

interface ISubCategories {
  id: string;
  name: string;
}

import { GraduationCap } from "phosphor-react-native";
import React, { ReactNode } from "react";
export const categories: ICategories[] = [
  {
    id: "1",
    name: "Educação",
    icon: GraduationCap,
    subCategories: [
      {
        id: "2",
        name: "Escola",
      },
      {
        id: "3",
        name: "Universidade",
      },
      {
        id: "4",
        name: "Cursos",
      },
      {
        id: "5",
        name: "Outros",
      },
    ],
  },
  {
    id: "6",
    name: "Saúde",
    icon: GraduationCap,
    subCategories: [
      {
        id: "7",
        name: "Hospital",
      },
      {
        id: "8",
        name: "Veterinário",
      },
      {
        id: "9",
        name: "Plano de saúde",
      },
      {
        id: "10",
        name: "Farmácia",
      },
      {
        id: "11",
        name: "Outros",
      },
    ],
  },
  {
    id: "12",
    name: "Lazer",
    icon: GraduationCap,
    subCategories: [
      {
        id: "13",
        name: "Cinema",
      },
      {
        id: "13",
        name: "Teatro",
      },
      {
        id: "14",
        name: "Parque",
      },
      {
        id: "15",
        name: "Restaurante",
      },
      {
        id: "16",
        name: "Bar",
      },
      {
        id: "17",
        name: "Outros",
      },
    ],
  },
  {
    id: "18",
    name: "Automóvel",
    icon: GraduationCap,
    subCategories: [
      {
        id: "19",
        name: "Conserto",
      },
      {
        id: "20",
        name: "Oléo",
      },
      {
        id: "21",
        name: "Oficina",
      },
      {
        id: "22",
        name: "Combustível",
      },
      {
        id: "23",
        name: "Outros",
      },
    ],
  },
  {
    id: "24",
    name: "Moradia",
    icon: GraduationCap,
    subCategories: [
      {
        id: "25",
        name: "Aluguel",
      },
      {
        id: "26",
        name: "Condomínio",
      },
      {
        id: "27",
        name: "IPTU",
      },
      {
        id: "28",
        name: "Obra",
      },
      {
        id: "29",
        name: "Outros",
      },
    ],
  },
  {
    id: "30",
    name: "Contas",
    icon: GraduationCap,
    subCategories: [
      {
        id: "31",
        name: "Água",
      },
      {
        id: "32",
        name: "Luz",
      },
      {
        id: "33",
        name: "Telefone",
      },
      {
        id: "34",
        name: "Internet",
      },
      {
        id: "35",
        name: "Gás",
      },
      {
        id: "36",
        name: "Outros",
      },
    ],
  },
  {
    id: "37",
    name: "Alimentação",
    icon: GraduationCap,
    subCategories: [
      {
        id: "38",
        name: "Mercado",
      },
      {
        id: "39",
        name: "Restaurante",
      },
      {
        id: "40",
        name: "Aplicativo de comida",
      },
      {
        id: "41",
        name: "Outros",
      },
    ],
  },
];
