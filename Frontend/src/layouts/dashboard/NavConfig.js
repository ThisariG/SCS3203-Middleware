// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: getIcon('eva:pie-chart-2-fill'),
  // },
 
  {
    title: 'product',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
    role: 'buyer'
  },
 
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill'),
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
  {
    title: 'checkout',
    path: '/dashboard/payments',
    icon: getIcon('ic:baseline-payments'),
    role: 'buyer'
  },
  {
    title: 'cart',
    path: '/dashboard/cart',
    icon: getIcon('akar-icons:cart'),
    role: 'buyer'

  },
  {
    title: 'seller add products',
    path: '/dashboard/sellerAddProduct',
    icon: getIcon('akar-icons:cart'),
    role: 'seller'

  },
];

export default navConfig;
