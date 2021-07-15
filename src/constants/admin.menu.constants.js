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
    href: '/admin/products/subcategories',
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

export const ORDER_STATUS_OPTIONS = [
  {
    title: 'Non traitée',
    description: "La commande vient juste d'être passée par l'utilisateur.",
  },
  {
    title: 'Pris en charge',
    description:
      "La commande est en cours de réalisation par l'équipe Keke Cook.",
  },
  {
    title: 'Annulée',
    description: 'La commande passée a été annulée pour des raison diverses.',
  },
  {
    title: 'Traitée',
    description: 'La commande a été réalisée et livrée.',
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

export const CATEGORY_HEADLINE = 'Catégories';
export const CATEGORY_DESCRIPTION =
  'Créer, modifier et supprimer vos différentes catégories';
export const ADMIN_DASHBOARD_HEADLINE = 'Dashboard';
export const ADMIN_DASHBOARD_DESCRIPTION =
  "Ayez un visuel complèt sur l'état de vos comptes et commandes";
export const WISHLIST_HEADLINE = 'Liste de souhaits';
export const WISHLIST_DESCRIPTION = 'Gérez vos produits favoris';
export const COUPON_HEADLINE = 'Codes Promo';
export const COUPON_DESCRIPTION =
  'Créer, et supprimer vos différents codes promo';
export const SUBCATEGORY_HEADLINE = 'Sous Catégories';
export const SUBCATEGORY_DESCRIPTION =
  'Créer, modifier et supprimer vos différentes sous catégories';
export const PRODUCT_HEADLINE = 'Ajouter un Produit';
export const PRODUCT_DESCRIPTION =
  'Remplisser le formulaire ci-dessous pour créer ou enregistrer un nouveau produit';
export const PRODUCTS_HEADLINE = 'Produits';
export const PRODUCTS_DESCRIPTION = 'Modifier et supprimer vos produits';

export const CATEGORY_DELETE_ALERT_MESSAGE =
  'Êtes vous sûr de vouloir supprimer cette catégorie? Toutes les données liées à cette catégorie seront définitivement supprimées de nos servveurs. Cette action est irreversible.';
export const COUPON_DELETE_ALERT_MESSAGE =
  'Êtes vous sûr de vouloir supprimer ce code promo? Toutes les données liées à ce code promo seront définitivement supprimées de nos servveurs. Cette action est irreversible.';
export const SUBCATEGORY_DELETE_ALERT_MESSAGE =
  'Êtes vous sûr de vouloir supprimer cette sous ccatégorie? Toutes les données liées à cette sous catégorie seront définitivement supprimées de nos servveurs. Cette action est irreversible.';
export const PRODUCT_DELETE_ALERT_MESSAGE =
  'Êtes vous sûr de vouloir supprimer ce produit? Toutes les données liées à ce produit seront définitivement supprimées de nos servveurs. Cette action est irreversible.';
