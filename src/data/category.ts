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
import {
  GraduationCap,
  Heartbeat,
  Popcorn,
  Car,
  House,
  Money,
  Hamburger,
} from "phosphor-react-native";
export const categories: ICategories[] = [
  {
    id: "education",
    name: "Educação",
    icon: GraduationCap,
    subCategories: [
      {
        id: "education-1",
        name: "Escola",
      },
      {
        id: "education-2",
        name: "Universidade",
      },
      {
        id: "education-3",
        name: "Cursos",
      },
      {
        id: "education-4",
        name: "Outros",
      },
    ],
  },
  {
    id: "health",
    name: "Saúde",
    icon: Heartbeat,
    subCategories: [
      {
        id: "health-1",
        name: "Hospital",
      },
      {
        id: "health-2",
        name: "Veterinário",
      },
      {
        id: "health-3",
        name: "Plano de saúde",
      },
      {
        id: "health-4",
        name: "Farmácia",
      },
      {
        id: "health-5",
        name: "Outros",
      },
    ],
  },
  {
    id: "leisure",
    name: "Lazer",
    icon: Popcorn,
    subCategories: [
      {
        id: "leisure-1",
        name: "Cinema",
      },
      {
        id: "leisure-2",
        name: "Teatro",
      },
      {
        id: "leisure-4",
        name: "Parque",
      },
      {
        id: "leisure-5",
        name: "Restaurante",
      },
      {
        id: "leisure-6",
        name: "Bar",
      },
      {
        id: "leisure-7",
        name: "Outros",
      },
    ],
  },
  {
    id: "vehicle",
    name: "Automóvel",
    icon: Car,
    subCategories: [
      {
        id: "vehicle-1",
        name: "Conserto",
      },
      {
        id: "vehicle-2",
        name: "Oléo",
      },
      {
        id: "vehicle-3",
        name: "Oficina",
      },
      {
        id: "vehicle-4",
        name: "Combustível",
      },
      {
        id: "vehicle-5",
        name: "Outros",
      },
    ],
  },
  {
    id: "home",
    name: "Moradia",
    icon: House,
    subCategories: [
      {
        id: "home-1",
        name: "Aluguel",
      },
      {
        id: "home-2",
        name: "Condomínio",
      },
      {
        id: "home-3",
        name: "IPTU",
      },
      {
        id: "home-4",
        name: "Obra",
      },
      {
        id: "home-5",
        name: "Outros",
      },
    ],
  },
  {
    id: "billing",
    name: "Contas",
    icon: Money,
    subCategories: [
      {
        id: "billing-1",
        name: "Água",
      },
      {
        id: "billing-2",
        name: "Luz",
      },
      {
        id: "billing-3",
        name: "Telefone",
      },
      {
        id: "billing-4",
        name: "Internet",
      },
      {
        id: "billing-5",
        name: "Gás",
      },
      {
        id: "billing-6",
        name: "Salário",
      },
      {
        id: "billing-7",
        name: "Investimentos",
      },
      {
        id: "billing-9",
        name: "Fatura cartão",
      },
      {
        id: "billing-8",
        name: "Outros",
      },
    ],
  },
  {
    id: "food",
    name: "Alimentação",
    icon: Hamburger,
    subCategories: [
      {
        id: "food-1",
        name: "Mercado",
      },
      {
        id: "food-2",
        name: "Restaurante",
      },
      {
        id: "food-3",
        name: "Aplicativo de comida",
      },
      {
        id: "food-4",
        name: "Outros",
      },
    ],
  },
];
