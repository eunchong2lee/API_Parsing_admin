interface MenuItemsProps {
  id: number;
  novidade?: any;
  label: string;
  icon?: string;
  link?: string;
  badge?: string;
  badgecolor?: string;
  subItems?: any;
  isHeader?: boolean;
}

const menuItems: Array<MenuItemsProps> = [
  {
    id: 144,
    novidade: false,
    label: "건강식품",
    icon: "archive",
    link: "/#",
    subItems: [
      {
        id: 145,
        label: "건강식품 관리",
        link: "/HealthFoodData",
        parentId: 141,
      },
      {
        id: 146,
        label: "건강식품 등록",
        link: "/HealthFoodDataRegister",
        parentId: 141,
      },
    ],
  },
  {
    id: 147,
    label: "통계",
    icon: "pie-chart",
    link: "/analytics",
  },
];

export { menuItems };
