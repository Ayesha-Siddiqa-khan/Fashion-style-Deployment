export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  description: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Silk Evening Dress",
    category: "Dresses",
    price: 299,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
    rating: 4.8,
    description: "Elegant silk evening dress with flowing silhouette"
  },
  {
    id: "2",
    name: "Classic Leather Jacket",
    category: "Outerwear",
    price: 449,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop",
    rating: 4.9,
    description: "Premium leather jacket with timeless design"
  },
  {
    id: "3",
    name: "Cashmere Sweater",
    category: "Tops",
    price: 189,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=600&fit=crop",
    rating: 4.7,
    description: "Soft cashmere sweater for everyday luxury"
  },
  {
    id: "4",
    name: "Tailored Blazer",
    category: "Outerwear",
    price: 359,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=600&fit=crop",
    rating: 4.6,
    description: "Perfectly tailored blazer for professional look"
  },
  {
    id: "5",
    name: "Designer Handbag",
    category: "Accessories",
    price: 599,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=600&fit=crop",
    rating: 4.9,
    description: "Luxurious designer handbag with premium finish"
  },
  {
    id: "6",
    name: "High-Waist Jeans",
    category: "Bottoms",
    price: 129,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=600&fit=crop",
    rating: 4.5,
    description: "Classic high-waist jeans with perfect fit"
  },
  {
    id: "7",
    name: "Linen Summer Dress",
    category: "Dresses",
    price: 179,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=600&fit=crop",
    rating: 4.7,
    description: "Light linen dress perfect for summer days"
  },
  {
    id: "8",
    name: "Oxford Shirt",
    category: "Tops",
    price: 89,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=600&fit=crop",
    rating: 4.6,
    description: "Classic oxford shirt for casual sophistication"
  }
];

export const categories = [
  "All",
  "Dresses",
  "Outerwear",
  "Tops",
  "Bottoms",
  "Accessories"
];

export const featuredProducts = products.slice(0, 4);