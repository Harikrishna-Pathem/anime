// Mock data for admin dashboard
export const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer',
    phone: '+91 9876543210',
    address: '123 Main St, Mumbai, Maharashtra',
    createdAt: '2024-01-15T10:30:00Z',
    lastLogin: '2024-01-20T14:45:00Z',
    isActive: true,
    totalOrders: 12,
    totalSpent: 28500
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'customer',
    phone: '+91 9876543211',
    address: '456 Oak Ave, Delhi, Delhi',
    createdAt: '2024-01-10T09:15:00Z',
    lastLogin: '2024-01-21T11:30:00Z',
    isActive: true,
    totalOrders: 8,
    totalSpent: 15600
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@mrsприyapickles.com',
    role: 'admin',
    phone: '+91 9876543212',
    address: '789 Admin St, Bangalore, Karnataka',
    createdAt: '2024-01-01T08:00:00Z',
    lastLogin: '2024-01-21T16:00:00Z',
    isActive: true,
    totalOrders: 0,
    totalSpent: 0
  }
];

export const mockProducts = [
  {
    id: '1',
    name: 'Mango Pickle',
    description: 'Traditional homemade mango pickle with authentic spices',
    category: 'Pickles',
    basePrice: 250,
    image: 'https://images.pexels.com/photos/4198110/pexels-photo-4198110.jpeg?auto=compress&cs=tinysrgb&w=400',
    ingredients: ['Mango', 'Mustard Oil', 'Turmeric', 'Red Chili', 'Salt', 'Mustard Seeds'],
    weights: [
      { weight: '250g', price: 250, stock: 50 },
      { weight: '500g', price: 450, stock: 30 },
      { weight: '1kg', price: 850, stock: 20 }
    ],
    stock: 100,
    isActive: true,
    createdAt: '2024-01-10T10:00:00Z',
    rating: 4.5,
    reviewCount: 28
  },
  {
    id: '2',
    name: 'Mixed Vegetable Pickle',
    description: 'Delicious mix of seasonal vegetables in aromatic spices',
    category: 'Pickles',
    basePrice: 280,
    image: 'https://images.pexels.com/photos/4198883/pexels-photo-4198883.jpeg?auto=compress&cs=tinysrgb&w=400',
    ingredients: ['Carrot', 'Cauliflower', 'Green Beans', 'Mustard Oil', 'Spices'],
    weights: [
      { weight: '250g', price: 280, stock: 40 },
      { weight: '500g', price: 520, stock: 25 },
      { weight: '1kg', price: 980, stock: 15 }
    ],
    stock: 80,
    isActive: true,
    createdAt: '2024-01-12T11:30:00Z',
    rating: 4.3,
    reviewCount: 19
  },
  {
    id: '3',
    name: 'Lemon Pickle',
    description: 'Tangy lemon pickle with perfect balance of spices',
    category: 'Pickles',
    basePrice: 220,
    image: 'https://images.pexels.com/photos/4198063/pexels-photo-4198063.jpeg?auto=compress&cs=tinysrgb&w=400',
    ingredients: ['Lemon', 'Mustard Oil', 'Turmeric', 'Red Chili', 'Salt'],
    weights: [
      { weight: '250g', price: 220, stock: 60 },
      { weight: '500g', price: 400, stock: 35 }
    ],
    stock: 95,
    isActive: true,
    createdAt: '2024-01-08T09:45:00Z',
    rating: 4.7,
    reviewCount: 35
  }
];

export const mockOrders = [
  {
    id: 'ORD001',
    userId: '1',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    items: [
      { productId: '1', productName: 'Mango Pickle', weight: '500g', quantity: 2, price: 450 },
      { productId: '3', productName: 'Lemon Pickle', weight: '250g', quantity: 1, price: 220 }
    ],
    totalAmount: 1120,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'UPI',
    shippingAddress: '123 Main St, Mumbai, Maharashtra',
    createdAt: '2024-01-20T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z'
  },
  {
    id: 'ORD002',
    userId: '2',
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    items: [
      { productId: '2', productName: 'Mixed Vegetable Pickle', weight: '1kg', quantity: 1, price: 980 }
    ],
    totalAmount: 1080,
    status: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    shippingAddress: '456 Oak Ave, Delhi, Delhi',
    createdAt: '2024-01-19T15:20:00Z',
    updatedAt: '2024-01-20T09:15:00Z'
  },
  {
    id: 'ORD003',
    userId: '1',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    items: [
      { productId: '1', productName: 'Mango Pickle', weight: '250g', quantity: 3, price: 250 }
    ],
    totalAmount: 850,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'COD',
    shippingAddress: '123 Main St, Mumbai, Maharashtra',
    createdAt: '2024-01-21T12:00:00Z',
    updatedAt: '2024-01-21T12:00:00Z'
  }
];

export const mockReviews = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    productId: '1',
    productName: 'Mango Pickle',
    rating: 5,
    comment: 'Absolutely delicious! Tastes just like homemade. Will definitely order again.',
    isApproved: true,
    createdAt: '2024-01-18T16:30:00Z'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Jane Smith',
    productId: '3',
    productName: 'Lemon Pickle',
    rating: 4,
    comment: 'Great tangy flavor, perfect with meals. Packaging was excellent.',
    isApproved: false,
    createdAt: '2024-01-19T10:15:00Z'
  },
  {
    id: '3',
    userId: '1',
    userName: 'John Doe',
    productId: '2',
    productName: 'Mixed Vegetable Pickle',
    rating: 5,
    comment: 'Love the variety of vegetables. Fresh and flavorful!',
    isApproved: true,
    createdAt: '2024-01-20T14:20:00Z'
  }
];

export const mockContactMessages = [
  {
    id: '1',
    name: 'Rahul Kumar',
    email: 'rahul@example.com',
    phone: '+91 9876543213',
    subject: 'Bulk Order Inquiry',
    message: 'Hi, I am interested in placing a bulk order for my restaurant. Can you please provide wholesale pricing?',
    status: 'pending',
    createdAt: '2024-01-21T09:30:00Z'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 9876543214',
    subject: 'Custom Pickle Request',
    message: 'Do you make custom pickles? I have a family recipe I would like to get made.',
    status: 'responded',
    createdAt: '2024-01-20T14:15:00Z',
    respondedAt: '2024-01-20T16:30:00Z',
    response: 'Thank you for your inquiry. We do offer custom pickle services...'
  },
  {
    id: '3',
    name: 'Amit Patel',
    email: 'amit@example.com',
    subject: 'Delivery Issue',
    message: 'My order was supposed to arrive yesterday but I haven\'t received it yet. Order ID: ORD001',
    status: 'resolved',
    createdAt: '2024-01-19T11:45:00Z',
    respondedAt: '2024-01-19T13:00:00Z',
    response: 'We apologize for the delay. Your order has been expedited...'
  }
];

export const mockDashboardStats = {
  totalUsers: 156,
  totalProducts: 24,
  totalOrders: 89,
  totalRevenue: 245680,
  pendingOrders: 12,
  pendingReviews: 8,
  pendingMessages: 3,
  monthlyRevenue: [18500, 22300, 19800, 25600, 24100, 28900, 31200, 27800, 29500, 32100, 28700, 35600],
  topProducts: [
    { name: 'Mango Pickle', sales: 45, revenue: 22500 },
    { name: 'Mixed Vegetable Pickle', sales: 38, revenue: 19800 },
    { name: 'Lemon Pickle', sales: 52, revenue: 18200 },
    { name: 'Garlic Pickle', sales: 31, revenue: 15600 }
  ]
};

// Admin credentials for demo
export const adminCredentials = {
  email: 'admin@mrspriyapickles.com',
  password: 'admin123'
};