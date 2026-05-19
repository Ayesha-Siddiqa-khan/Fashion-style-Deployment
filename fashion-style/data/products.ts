export interface Product {
  id: string;
  name: string;
  category: string;
  gender: "men" | "women" | "unisex";
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
    gender: "women",
    price: 299,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
    rating: 4.8,
    description: "Elegant silk evening dress with flowing silhouette"
  },
  {
    id: "2",
    name: "Classic Leather Jacket",
    category: "Outerwear",
    gender: "men",
    price: 449,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop",
    rating: 4.9,
    description: "Premium leather jacket with timeless design"
  },
  {
    id: "3",
    name: "Cashmere Sweater",
    category: "Tops",
    gender: "women",
    price: 189,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=600&fit=crop",
    rating: 4.7,
    description: "Soft cashmere sweater for everyday luxury"
  },
  {
    id: "4",
    name: "Tailored Blazer",
    category: "Outerwear",
    gender: "men",
    price: 359,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=600&fit=crop",
    rating: 4.6,
    description: "Perfectly tailored blazer for professional look"
  },
  {
    id: "5",
    name: "Designer Handbag",
    category: "Accessories",
    gender: "women",
    price: 599,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=600&fit=crop",
    rating: 4.9,
    description: "Luxurious designer handbag with premium finish"
  },
  {
    id: "6",
    name: "High-Waist Jeans",
    category: "Bottoms",
    gender: "women",
    price: 129,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=600&fit=crop",
    rating: 4.5,
    description: "Classic high-waist jeans with perfect fit"
  },
  {
    id: "7",
    name: "Linen Summer Dress",
    category: "Dresses",
    gender: "women",
    price: 179,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=600&fit=crop",
    rating: 4.7,
    description: "Light linen dress perfect for summer days"
  },
  {
    id: "8",
    name: "Oxford Shirt",
    category: "Tops",
    gender: "men",
    price: 89,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=600&fit=crop",
    rating: 4.6,
    description: "Classic oxford shirt for casual sophistication"
  },
  {
    id: "9",
    name: "Floral Maxi Dress",
    category: "Dresses",
    gender: "women",
    price: 249,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=600&fit=crop",
    rating: 4.8,
    description: "Beautiful floral print maxi dress for special occasions"
  },
  {
    id: "10",
    name: "Slim Fit Chinos",
    category: "Bottoms",
    gender: "men",
    price: 99,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=600&fit=crop",
    rating: 4.5,
    description: "Versatile slim fit chinos for any occasion"
  },
  {
    id: "11",
    name: "Denim Jacket",
    category: "Outerwear",
    gender: "women",
    price: 189,
    image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=400&h=600&fit=crop",
    rating: 4.7,
    description: "Classic denim jacket with modern fit"
  },
  {
    id: "12",
    name: "Wool Overcoat",
    category: "Outerwear",
    gender: "men",
    price: 499,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=600&fit=crop",
    rating: 4.9,
    description: "Premium wool overcoat for winter elegance"
  },
  {
    id: "13",
    name: "Silk Blouse",
    category: "Tops",
    gender: "women",
    price: 159,
    image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=400&h=600&fit=crop",
    rating: 4.6,
    description: "Elegant silk blouse for professional and casual wear"
  },
  {
    id: "14",
    name: "Henley Shirt",
    category: "Tops",
    gender: "men",
    price: 69,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=600&fit=crop",
    rating: 4.4,
    description: "Comfortable cotton henley for everyday wear"
  },
  {
    id: "15",
    name: "Pencil Skirt",
    category: "Bottoms",
    gender: "women",
    price: 119,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaa0?w=400&h=600&fit=crop",
    rating: 4.5,
    description: "Classic pencil skirt for professional look"
  },
  {
    id: "16",
    name: "Leather Belt",
    category: "Accessories",
    gender: "men",
    price: 79,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=600&fit=crop",
    rating: 4.7,
    description: "Genuine leather belt with classic buckle"
  },
  {
    id: "17",
    name: "Scarf",
    category: "Accessories",
    gender: "women",
    price: 89,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=600&fit=crop",
    rating: 4.6,
    description: "Luxurious cashmere scarf for all seasons"
  },
  {
    id: "18",
    name: "Running Shoes",
    category: "Shoes",
    gender: "men",
    price: 149,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=600&fit=crop",
    rating: 4.8,
    description: "Lightweight running shoes with superior cushioning"
  },
  {
    id: "19",
    name: "High Heels",
    category: "Shoes",
    gender: "women",
    price: 199,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=600&fit=crop",
    rating: 4.5,
    description: "Elegant stiletto heels for special occasions"
  },
  {
    id: "20",
    name: "Canvas Sneakers",
    category: "Shoes",
    gender: "unisex",
    price: 79,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=600&fit=crop",
    rating: 4.6,
    description: "Classic canvas sneakers for casual style"
  },
  {
    id: "21",
    name: "Leather Chelsea Boots",
    category: "Shoes",
    gender: "men",
    price: 249,
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400&h=600&fit=crop",
    rating: 4.8,
    description: "Premium leather chelsea boots for sophisticated look"
  },
  {
    id: "22",
    name: "Ankle Boots",
    category: "Shoes",
    gender: "women",
    price: 179,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=600&fit=crop",
    rating: 4.7,
    description: "Trendy ankle boots for fall and winter"
  },
  {
    id: "23",
    name: "Winter Coat",
    category: "Outerwear",
    gender: "women",
    price: 399,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=600&fit=crop",
    rating: 4.8,
    description: "Warm and stylish winter coat for cold days"
  },
  {
    id: "24",
    name: "Polo Shirt",
    category: "Tops",
    gender: "men",
    price: 59,
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&h=600&fit=crop",
    rating: 4.5,
    description: "Classic cotton polo shirt for casual elegance"
  },
  {
    id: "25",
    name: "Wrap Dress",
    category: "Dresses",
    gender: "women",
    price: 169,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=600&fit=crop",
    rating: 4.7,
    description: "Flattering wrap dress suitable for work and events"
  },
  {
    id: "26",
    name: "Cargo Pants",
    category: "Bottoms",
    gender: "men",
    price: 89,
    image: "https://images.unsplash.com/photo-1517445312881-5a11b80c3c79?w=400&h=600&fit=crop",
    rating: 4.4,
    description: "Practical cargo pants with multiple pockets"
  },
  {
    id: "27",
    name: "Aviator Sunglasses",
    category: "Accessories",
    gender: "unisex",
    price: 129,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=600&fit=crop",
    rating: 4.6,
    description: "Classic aviator sunglasses with UV protection"
  },
  {
    id: "28",
    name: "Leather Watch",
    category: "Accessories",
    gender: "men",
    price: 249,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=600&fit=crop",
    rating: 4.8,
    description: "Elegant leather watch with minimalist design"
  }
];

export const categories = [
  "All",
  "Dresses",
  "Outerwear",
  "Tops",
  "Bottoms",
  "Accessories",
  "Shoes"
];

export const genderCategories = [
  { id: "all", name: "All", label: "All Products" },
  { id: "women", name: "Women", label: "Women's Collection" },
  { id: "men", name: "Men", label: "Men's Collection" }
];

export const featuredProducts = products.slice(0, 4);