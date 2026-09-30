require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Pastry = require('./models/Pastry');
const Shop = require('./models/Shop');

const pastries = [
  {
    name: 'Pistachio Cloud',
    description: 'Flaky croissant, pistachio frangipane, and rose glaze.',
    price: 6.5,
    category: 'Viennoiserie',
    rating: 4.9,
    prepTime: '12 min',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85'
  },
  {
    name: 'Berry Chantilly',
    description: 'Vanilla sponge, whipped cream, and market berries.',
    price: 8.75,
    category: 'Cake',
    rating: 4.8,
    prepTime: '18 min',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85'
  },
  {
    name: 'Dark Chocolate Tart',
    description: 'Bittersweet ganache in a crisp cocoa pastry shell.',
    price: 7.25,
    category: 'Tart',
    rating: 5,
    prepTime: '15 min',
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=900&q=85'
  },
  {
    name: 'Salted Caramel Choux',
    description: 'Light choux, caramel diplomat cream, and sea salt.',
    price: 5.75,
    category: 'Choux',
    rating: 4.7,
    prepTime: '10 min',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85'
  },
  {
    name: 'Lemon Meringue Pie',
    description: 'Bright lemon curd crowned with toasted Italian meringue.',
    price: 7.5,
    category: 'Pie',
    rating: 4.9,
    prepTime: '20 min',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=900&q=85'
  },
  {
    name: 'Morning Kouign',
    description: 'Caramelized Breton pastry with a deeply crisp edge.',
    price: 5.25,
    category: 'Viennoiserie',
    rating: 4.8,
    prepTime: '10 min',
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=900&q=85'
  },
  {
    name: 'Vanilla Bean Éclair',
    description: 'Silky vanilla cream, choux pastry, and glossy fondant.',
    price: 6.75,
    category: 'Choux',
    rating: 4.9,
    prepTime: '14 min',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=900&q=85'
  }
];

const shops = [
  { name: 'Petal & Crumb · Nolita', address: '138 Kenmare Street, New York', phone: '(212) 555-0148', hours: 'Open until 8:00 PM', location: { type: 'Point', coordinates: [-73.9945, 40.7228] } },
  { name: 'Petal & Crumb · West Village', address: '54 Greenwich Avenue, New York', phone: '(212) 555-0192', hours: 'Open until 7:00 PM', location: { type: 'Point', coordinates: [-74.0018, 40.7352] } },
  { name: 'Petal & Crumb · Flatiron', address: '21 East 22nd Street, New York', phone: '(212) 555-0120', hours: 'Open until 8:30 PM', location: { type: 'Point', coordinates: [-73.9901, 40.7405] } },
  { name: 'Petal & Crumb · Brooklyn Heights', address: '89 Montague Street, Brooklyn', phone: '(718) 555-0167', hours: 'Open until 6:00 PM', location: { type: 'Point', coordinates: [-73.9935, 40.6947] } }
];

async function seed() {
  try {
    await connectDB();
    await Promise.all([Pastry.deleteMany({}), Shop.deleteMany({})]);
    await Promise.all([Pastry.insertMany(pastries), Shop.insertMany(shops)]);
    console.log(`Seeded ${pastries.length} pastries and ${shops.length} shops`);
  } finally {
    await mongoose.connection.close();
  }
}

seed().catch(error => {
  console.error(error);
  process.exit(1);
});
