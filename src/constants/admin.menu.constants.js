import {
  DocumentAddIcon,
  PresentationChartBarIcon,
  KeyIcon,
  ReceiptTaxIcon,
  DatabaseIcon,
  MenuIcon,
  MenuAlt2Icon,
} from '@heroicons/react/outline';

export const ADMIN_NAVIGATION = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: PresentationChartBarIcon,
  },
  {
    name: 'Ajouter un produit',
    href: '/admin/products/add',
    icon: DocumentAddIcon,
  },
  {
    name: 'Vos Produits',
    href: '/admin/products',
    icon: DatabaseIcon,
  },
  {
    name: 'Catégories',
    href: '/admin/products/categories',
    icon: MenuIcon,
  },
  {
    name: 'Sous Catégories',
    href: '/admin/products/scategories',
    icon: MenuAlt2Icon,
  },
  {
    name: 'Coupons',
    href: '/admin/products/coupons',
    icon: ReceiptTaxIcon,
  },
  {
    name: 'Mot de passe',
    href: '/me/password/update',
    icon: KeyIcon,
  },
];

export const ADMIN_NAVIGATION_COLORS = {
  sideNavPrimaryBgColor: 'bg-blue-gray-700',
  sideNavActiveLinkBgColor: 'bg-blue-gray-800',
  sideNavActiveLinkTextColor: 'text-white',
  sideNavLinkTextColor: 'text-blue-gray-100',
  sideNavLinkTextHoverColor: 'bg-blue-gray-600',
  sideNavLinkIconColor: 'text-blue-gray-300',
  sideMobileNavButtonBgColor: 'bg-blue-gray-800',
  sideMobileNavButtonTextColor: ' text-blue-gray-300',
  sideMobileNavButtonBorderColor: 'border-blue-gray-200',
};

export const CATEGORY_HEADLINE = 'Catégories'
export const CATEGORY_DESCRIPTION = 'Créer et modifier vos différentes catégories'