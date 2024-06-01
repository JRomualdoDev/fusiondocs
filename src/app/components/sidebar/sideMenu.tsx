import { NavItems } from "./sidebar";
export const sideMenu: NavItems[] = [
  {
    label: "teste",
    link: "/teste",
    isParent: true,
    subMenu: [],
  },
  {
    label: "texto",
    link: "/texto",
    isParent: true,
    subMenu: [
      {
        label: "teste",
        link: "/http/show/teste",
      },
    ],
  },
  {
    label: "branco",
    link: "/branco",
    isParent: true,
    subMenu: [
      {
        label: "vermelho",
        link: "/http/show/vermelho",
      },
      {
        label: "verde",
        link: "/http/show/verde",
      },
    ],
  },
  {
    label: "carro",
    link: "/carro",
    isParent: true,
    subMenu: [
      {
        label: "carro1",
        link: "/http/show/carro1",
      },
    ],
  },
  {
    label: "junior",
    link: "/junior",
    isParent: true,
    subMenu: [
      {
        label: "teste1",
        link: "/http/show/teste1",
      },
    ],
  },
];
