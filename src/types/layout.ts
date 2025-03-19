export interface LayoutProps {
    children: React.ReactNode;
}
export interface HeaderProps{
  displayNavbar: boolean
  navbarOpened: boolean;
  onNavbarToggle: () => void;
}

export interface NavbarProps{
  navbarOpened: boolean;
}

export interface NavbarItemProps{
  icon: React.ReactNode;
  label: string; 
  href: string; 
  active: boolean; 
  navbarOpened: boolean;
}