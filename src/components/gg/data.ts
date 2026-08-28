import phone from "@/assets/product-phone.jpg";
import laptop from "@/assets/product-laptop.jpg";
import tablet from "@/assets/product-tablet.jpg";
import watch from "@/assets/product-watch.jpg";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: "Smartphones" | "Laptops" | "Tablets" | "Smartwatches";
  condition: "Like New" | "Excellent" | "Good";
  price: number;
  mrp: number;
  warranty: string;
  image: string;
  specs: string[];
};

export const products: Product[] = [
  {
    id: "gg-p1",
    name: "iPhone 13 (128 GB)",
    brand: "Apple",
    category: "Smartphones",
    condition: "Like New",
    price: 34999,
    mrp: 59900,
    warranty: "12 months",
    image: phone,
    specs: ["A15 Bionic", "Battery health 92%", "Midnight Black"],
  },
  {
    id: "gg-p2",
    name: "Galaxy S22 (256 GB)",
    brand: "Samsung",
    category: "Smartphones",
    condition: "Excellent",
    price: 27499,
    mrp: 72999,
    warranty: "6 months",
    image: phone,
    specs: ["Snapdragon 8 Gen 1", "Battery health 88%", "Phantom Green"],
  },
  {
    id: "gg-p3",
    name: "Redmi Note 12 Pro",
    brand: "Xiaomi",
    category: "Smartphones",
    condition: "Good",
    price: 11499,
    mrp: 24999,
    warranty: "6 months",
    image: phone,
    specs: ["120Hz AMOLED", "Battery health 85%", "Minor cosmetic marks"],
  },
  {
    id: "gg-p4",
    name: "MacBook Air M1 (8/256)",
    brand: "Apple",
    category: "Laptops",
    condition: "Like New",
    price: 52999,
    mrp: 99900,
    warranty: "12 months",
    image: laptop,
    specs: ["Apple M1", "Cycle count 112", "Silver"],
  },
  {
    id: "gg-p5",
    name: "ThinkPad E14 Gen 4",
    brand: "Lenovo",
    category: "Laptops",
    condition: "Excellent",
    price: 33499,
    mrp: 68000,
    warranty: "9 months",
    image: laptop,
    specs: ["Core i5 12th Gen", "16 GB RAM", "512 GB SSD"],
  },
  {
    id: "gg-p6",
    name: "HP Pavilion 15",
    brand: "HP",
    category: "Laptops",
    condition: "Good",
    price: 24999,
    mrp: 56999,
    warranty: "6 months",
    image: laptop,
    specs: ["Ryzen 5 5600H", "8 GB RAM", "New battery installed"],
  },
  {
    id: "gg-p7",
    name: "iPad 9th Gen (64 GB)",
    brand: "Apple",
    category: "Tablets",
    condition: "Excellent",
    price: 18999,
    mrp: 32900,
    warranty: "9 months",
    image: tablet,
    specs: ["10.2-inch Retina", "Wi-Fi", "Includes stylus"],
  },
  {
    id: "gg-p8",
    name: "Galaxy Tab S6 Lite",
    brand: "Samsung",
    category: "Tablets",
    condition: "Good",
    price: 12499,
    mrp: 27999,
    warranty: "6 months",
    image: tablet,
    specs: ["S Pen included", "64 GB storage", "Oxford Grey"],
  },
  {
    id: "gg-p9",
    name: "Apple Watch SE (44mm)",
    brand: "Apple",
    category: "Smartwatches",
    condition: "Like New",
    price: 14999,
    mrp: 29900,
    warranty: "9 months",
    image: watch,
    specs: ["GPS", "Battery health 94%", "Sport band"],
  },
  {
    id: "gg-p10",
    name: "Galaxy Watch 5",
    brand: "Samsung",
    category: "Smartwatches",
    condition: "Excellent",
    price: 9999,
    mrp: 24999,
    warranty: "6 months",
    image: watch,
    specs: ["40mm", "BioActive sensor", "Green strap"],
  },
  {
    id: "gg-p11",
    name: "Noise ColorFit Ultra 3",
    brand: "Noise",
    category: "Smartwatches",
    condition: "Good",
    price: 2299,
    mrp: 5999,
    warranty: "3 months",
    image: watch,
    specs: ["AMOLED display", "Bluetooth calling", "New strap"],
  },
  {
    id: "gg-p12",
    name: "OnePlus 11R (256 GB)",
    brand: "OnePlus",
    category: "Smartphones",
    condition: "Excellent",
    price: 25999,
    mrp: 44999,
    warranty: "9 months",
    image: phone,
    specs: ["100W SuperVOOC", "Battery health 90%", "Sonic Black"],
  },
];

export const inr = (n: number) =>
  "₹" + Math.round(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });
