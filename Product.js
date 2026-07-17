export const CATEGORIES = [
  { id: 'shirts', name: 'Shirts', img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=500&q=70' },
  { id: 'tshirts', name: 'T-Shirts', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=70' },
  { id: 'jeans', name: 'Jeans', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=500&q=70' },
  { id: 'trousers', name: 'Trousers', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=500&q=70' },
  { id: 'hoodies', name: 'Hoodies', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=70' },
  { id: 'jackets', name: 'Jackets', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=70' },
  { id: 'ethnic', name: 'Ethnic Wear', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=70' },
  { id: 'accessories', name: 'Accessories', img: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=500&q=70' },
];

export const PRODUCTS = [
  { id: 'p1', name: 'Charcoal Slim-Fit Shirt', category: 'shirts', price: 1699, mrp: 2399, rating: 4.6, sizes: ['S','M','L','XL'], color: 'Black', brand: 'Fashion Point', img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=75', isNew: true, bestSeller: true, discount: 29, stock: 24 },
  { id: 'p2', name: 'Classic White Oxford Shirt', category: 'shirts', price: 1499, mrp: 1899, rating: 4.7, sizes: ['M','L','XL'], color: 'White', brand: 'Urbane', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=75', isNew: true, bestSeller: false, discount: 21, stock: 40 },
  { id: 'p3', name: 'Premium Cotton T-Shirt', category: 'tshirts', price: 899, mrp: 1199, rating: 4.5, sizes: ['S','M','L','XL','XXL'], color: 'Gray', brand: 'Fashion Point', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=75', isNew: false, bestSeller: true, discount: 25, stock: 60 },
  { id: 'p4', name: 'Graphic Print Tee', category: 'tshirts', price: 799, mrp: 999, rating: 4.3, sizes: ['S','M','L'], color: 'Black', brand: 'Streetline', img: 'https://images.unsplash.com/photo-1622445275576-721325763afe?auto=format&fit=crop&w=600&q=75', isNew: true, bestSeller: false, discount: 20, stock: 35 },
  { id: 'p5', name: 'Slim Tapered Denim Jeans', category: 'jeans', price: 2199, mrp: 2999, rating: 4.6, sizes: ['30','32','34','36'], color: 'Blue', brand: 'Denimo', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=75', isNew: false, bestSeller: true, discount: 27, stock: 18 },
  { id: 'p6', name: 'Black Distressed Jeans', category: 'jeans', price: 2399, mrp: 3199, rating: 4.4, sizes: ['30','32','34'], color: 'Black', brand: 'Denimo', img: 'https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&w=600&q=75', isNew: true, bestSeller: false, discount: 25, stock: 22 },
  { id: 'p7', name: 'Formal Wool-Blend Trousers', category: 'trousers', price: 1999, mrp: 2599, rating: 4.5, sizes: ['30','32','34','36'], color: 'Charcoal', brand: 'Fashion Point', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=75', isNew: false, bestSeller: false, discount: 23, stock: 30 },
  { id: 'p8', name: 'Chino Casual Trousers', category: 'trousers', price: 1599, mrp: 1999, rating: 4.4, sizes: ['30','32','34'], color: 'Beige', brand: 'Urbane', img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=75', isNew: false, bestSeller: false, discount: 20, stock: 28 },
  { id: 'p9', name: 'Fleece Pullover Hoodie', category: 'hoodies', price: 1799, mrp: 2299, rating: 4.6, sizes: ['S','M','L','XL'], color: 'Gray', brand: 'Streetline', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=75', isNew: true, bestSeller: true, discount: 22, stock: 33 },
  { id: 'p10', name: 'Zip-Up Hoodie Jacket', category: 'hoodies', price: 1899, mrp: 2499, rating: 4.3, sizes: ['M','L','XL'], color: 'Black', brand: 'Streetline', img: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?auto=format&fit=crop&w=600&q=75', isNew: false, bestSeller: false, discount: 24, stock: 19 },
  { id: 'p11', name: 'Leather Biker Jacket', category: 'jackets', price: 4999, mrp: 6999, rating: 4.8, sizes: ['M','L','XL'], color: 'Black', brand: 'Fashion Point', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=75', isNew: true, bestSeller: true, discount: 29, stock: 12 },
  { id: 'p12', name: 'Quilted Bomber Jacket', category: 'jackets', price: 3299, mrp: 4299, rating: 4.5, sizes: ['S','M','L','XL'], color: 'Navy', brand: 'Urbane', img: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=600&q=75', isNew: false, bestSeller: true, discount: 23, stock: 15 },
  { id: 'p13', name: 'Nehru Collar Ethnic Kurta', category: 'ethnic', price: 1999, mrp: 2699, rating: 4.7, sizes: ['M','L','XL'], color: 'Maroon', brand: 'Fashion Point', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=75', isNew: true, bestSeller: false, discount: 26, stock: 20 },
  { id: 'p14', name: 'Embroidered Sherwani', category: 'ethnic', price: 5999, mrp: 7999, rating: 4.8, sizes: ['M','L','XL'], color: 'Gold', brand: 'Fashion Point', img: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=600&q=75', isNew: false, bestSeller: false, discount: 25, stock: 8 },
  { id: 'p15', name: 'Leather Analog Watch', category: 'accessories', price: 1499, mrp: 1999, rating: 4.5, sizes: ['One Size'], color: 'Brown', brand: 'Fashion Point', img: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=600&q=75', isNew: true, bestSeller: true, discount: 25, stock: 45 },
  { id: 'p16', name: 'Classic Leather Belt', category: 'accessories', price: 699, mrp: 999, rating: 4.4, sizes: ['One Size'], color: 'Black', brand: 'Urbane', img: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=600&q=75', isNew: false, bestSeller: false, discount: 30, stock: 50 },
];

export const REVIEWS = [
  { name: 'Arjun Mehta', text: 'The fabric quality is outstanding and the fit is exactly as described. My go-to for formal shirts now.', rating: 5 },
  { name: 'Rohan Kapoor', text: 'Fast delivery and the jacket looks even better in person — feels like a genuine boutique purchase.', rating: 5 },
  { name: 'Vikram Singh', text: 'Great value for the price point. The ethnic wear collection saved me for a family wedding.', rating: 4 },
];
