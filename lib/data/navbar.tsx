type NavLinkChild = {
  label: string;
  path: string;
};

export type NavLink = {
  label: string;
  path: string;
  children?: NavLinkChild[];
};

export const navLinks: NavLink[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Services",
    path: "/services",
    children: [
      {
        label: "Consultation",
        path: "/consultation",
      },
      {
        label: "Medication",
        path: "/medication",
      },
      {
        label: "Lab Tests",
        path: "/lab-tests",
      },
    ],
  },
  {
    label: "Contact",
    path: "/contact",
  },
];
