const SampleProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "Premium noise-cancelling wireless headphones with 30-hour battery life",
      price: 149.99,
      image: "https://images.pexels.com/photos/610945/pexels-photo-610945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      discount: 15,
      rating: 4,
      stock: 23,
      isNew: true,
      category: "Electronics"
    },
    {
      id: 2,
      name: "Smart Watch",
      description: "Advanced fitness tracker with heart rate monitoring and sleep analysis",
      price: 199.99,
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      discount: 0,
      rating: 5,
      stock: 12,
      isNew: true,
      category: "Electronics"
    },
    {
      id: 3,
      name: "Premium Coffee Maker",
      description: "Programmable coffee machine with built-in grinder and milk frother",
      price: 129.99,
      image: "https://images.pexels.com/photos/28495590/pexels-photo-28495590/free-photo-of-professional-coffee-grinding-machine-in-use.jpeg?auto=compress&cs=tinysrgb&w=600",
      discount: 10,
      rating: 4,
      stock: 8,
      isNew: false,
      category: "Kitchen"
    },
    {
      id: 4,
      name: "Leather Wallet",
      description: "Handcrafted genuine leather wallet with RFID protection",
      price: 59.95,
      image: "https://images.pexels.com/photos/5863645/pexels-photo-5863645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      discount: 0,
      rating: 5,
      stock: 32,
      isNew: false,
      category: "Accessories"
    },
    {
      id: 5,
      name: "Wireless Charging Pad",
      description: "Fast-charging wireless pad compatible with all Qi-enabled devices",
      price: 39.99,
      image: "https://images.pexels.com/photos/7742585/pexels-photo-7742585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      discount: 20,
      rating: 3,
      stock: 5,
      isNew: false,
      category: "Electronics"
    },
    {
      id: 6,
      name: "Portable Bluetooth Speaker",
      description: "Waterproof portable speaker with 24-hour playtime and deep bass",
      price: 89.99,
      image: "https://images.pexels.com/photos/31683433/pexels-photo-31683433/free-photo-of-marshall-portable-bluetooth-speaker-close-up.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      discount: 0,
      rating: 4,
      stock: 17,
      isNew: true,
      category: "Electronics"
    },
    {
      id: 7,
      name: "Stainless Steel Water Bottle",
      description: "Vacuum insulated bottle that keeps drinks hot for 12 hours or cold for 24 hours",
      price: 34.95,
      image: "https://images.pexels.com/photos/2832062/pexels-photo-2832062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      discount: 0,
      rating: 5,
      stock: 41,
      isNew: false,
      category: "Kitchen"
    },
    {
      id: 8,
      name: "Backpack",
      description: "Water-resistant backpack with laptop compartment and USB charging port",
      price: 79.99,
      image: "https://images.pexels.com/photos/732632/pexels-photo-732632.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      discount: 25,
      rating: 4,
      stock: 0,
      isNew: false,
      category: "Accessories"
    },
    {
      id: 9,
      name: "Smart Home Hub",
      description: "Central control system for connected home devices with voice assistant",
      price: 129.99,
      image: "https://images.pexels.com/photos/29292011/pexels-photo-29292011/free-photo-of-smart-home-devices-in-minimalist-setup.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      discount: 0,
      rating: 4,
      stock: 7,
      isNew: true,
      category: "Electronics"
    },
    {
    id: 10,
    name: "Yoga Mat",
    description: "Eco-friendly non-slip yoga mat with carrying strap",
    price: 42.99,
    image: "https://images.pexels.com/photos/4327014/pexels-photo-4327014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    discount: 5,
    rating: 4,
    stock: 15,
    isNew: false,
    category: "Fitness"
    },
    {
      id: 11,
      name: "Air Purifier",
      description: "HEPA filter air purifier for rooms up to 500 sq ft with air quality monitor",
      price: 199.95,
      image: "https://images.pexels.com/photos/6915312/pexels-photo-6915312.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      discount: 0,
      rating: 5,
      stock: 6,
      isNew: true,
      category: "Home"
    },
    {
      id: 12,
      name: "Cookbook Stand",
      description: "Bamboo cookbook stand with adjustable angles and page holders",
      price: 29.99,
      image: "https://images.pexels.com/photos/11652830/pexels-photo-11652830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      discount: 0,
      rating: 4,
      stock: 19,
      isNew: false,
      category: "Kitchen"
    },
    {
      id: 13,
      name: "Wireless Earbuds",
      description: "True wireless earbuds with noise isolation and touch controls",
      price: 89.99,
      image: "https://images.pexels.com/photos/3250815/pexels-photo-3250815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      discount: 10,
      rating: 4,
      stock: 14,
      isNew: true,
      category: "Electronics"
    },
    {
      id: 14,
      name: "Desk Lamp",
      description: "LED desk lamp with adjustable brightness and color temperature",
      price: 49.95,
      image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      discount: 15,
      rating: 4,
      stock: 22,
      isNew: false,
      category: "Home"
    },
    {
      id: 15,
      name: "Plant Pot Set",
      description: "Set of 3 ceramic plant pots with bamboo stands for indoor plants",
      price: 59.99,
      image: "https://images.pexels.com/photos/6231715/pexels-photo-6231715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      discount: 0,
      rating: 5,
      stock: 9,
      isNew: false,
      category: "Home"
    },
    {
      id: 16,
      name: "Fitness Tracker Band",
      description: "Waterproof fitness band with heart rate and sleep monitoring",
      price: 79.95,
      image: "https://images.pexels.com/photos/4498483/pexels-photo-4498483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      discount: 20,
      rating: 4,
      stock: 28,
      isNew: true,
      category: "Fitness"
    },
    {
      id: 17,
      name: "Laptop Sleeve",
      description: "Slim protective laptop sleeve with water-resistant exterior",
      price: 24.99,
      image: "https://images.pexels.com/photos/20462226/pexels-photo-20462226/free-photo-of-a-red-leather-bag-with-a-laptop-inside.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      discount: 0,
      rating: 4,
      stock: 36,
      isNew: false,
      category: "Accessories"
    }
  ];

export default SampleProducts;