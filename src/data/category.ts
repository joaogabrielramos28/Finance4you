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
        id: "14",
        name: "Teatro",
      },
      {
        id: "15",
        name: "Parque",
      },
      {
        id: "16",
        name: "Restaurante",
      },
      {
        id: "17",
        name: "Bar",
      },
      {
        id: "18",
        name: "Outros",
      },
    ],
  },
  {
    id: "19",
    name: "Automóvel",
    icon: GraduationCap,
    subCategories: [
      {
        id: "20",
        name: "Conserto",
      },
      {
        id: "21",
        name: "Oléo",
      },
      {
        id: "22",
        name: "Oficina",
      },
      {
        id: "23",
        name: "Combustível",
      },
      {
        id: "24",
        name: "Outros",
      },
    ],
  },
  {
    id: "25",
    name: "Moradia",
    icon: GraduationCap,
    subCategories: [
      {
        id: "26",
        name: "Aluguel",
      },
      {
        id: "27",
        name: "Condomínio",
      },
      {
        id: "28",
        name: "IPTU",
      },
      {
        id: "29",
        name: "Obra",
      },
      {
        id: "30",
        name: "Outros",
      },
    ],
  },
  {
    id: "31",
    name: "Contas",
    icon: GraduationCap,
    subCategories: [
      {
        id: "32",
        name: "Água",
      },
      {
        id: "33",
        name: "Luz",
      },
      {
        id: "34",
        name: "Telefone",
      },
      {
        id: "35",
        name: "Internet",
      },
      {
        id: "36",
        name: "Gás",
      },
      {
        id: "37",
        name: "Outros",
      },
    ],
  },
  {
    id: "38",
    name: "Alimentação",
    icon: GraduationCap,
    subCategories: [
      {
        id: "39",
        name: "Mercado",
      },
      {
        id: "40",
        name: "Restaurante",
      },
      {
        id: "41",
        name: "Aplicativo de comida",
      },
      {
        id: "42",
        name: "Outros",
      },
    ],
  },
];
