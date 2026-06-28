const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
require('dotenv').config();

const app = express();

// Configure CORS to allow requests from the frontend development server
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Enable JSON parsing middleware
app.use(express.json());

// In-Memory Data Model seeded with 3 mock objects representing generated text history
let descriptions = [
  {
    id: "1",
    title: "Gourmet Harvest Granola",
    promptInput: "artisan, gluten-free, sustainable",
    tags: ["artisan", "gluten-free", "sustainable"],
    selectedTone: "bold",
    generatedContent: "Introducing Gourmet Harvest Granola: a sensorial experience crafted for modern taste makers. With artisan, gluten-free, sustainable ingredients, every bite delivers a bold culinary story that celebrates texture, aroma, and unforgettable flavor. Perfect for product labels, category pages, and premium retail listings, this copy captures the craftsmanship behind your brand and invites shoppers to savor the difference.",
    createdAt: "2026-06-27T12:00:00.000Z"
  },
  {
    id: "2",
    title: "Sunshine Berry Crisp",
    promptInput: "vegan, hand-crafted, organic",
    tags: ["vegan", "hand-crafted", "organic"],
    selectedTone: "warm",
    generatedContent: "Savor the bright, sun-kissed sweetness of our Sunshine Berry Crisp. Meticulously hand-crafted with certified organic and fully vegan ingredients, this recipe offers a warm, comforting texture that reminds you of home. Every slice contains succulent summer berries nestled under a crunchy golden oat crumble, creating an authentic, wholesome snack for the entire family.",
    createdAt: "2026-06-27T15:30:00.000Z"
  },
  {
    id: "3",
    title: "Midnight Espresso Beans",
    promptInput: "dark roast, bold, energy boost",
    tags: ["dark roast", "bold", "energy boost"],
    selectedTone: "refined",
    generatedContent: "Awaken your senses with Midnight Espresso Beans—a refined, single-origin dark roast designed for true coffee connoisseurs. Carefully selected and slow-roasted to absolute perfection, these beans release an intense, full-bodied aroma with deep cocoa undertones. A powerful energy boost wrapped in a sophisticated taste profile, it is the ultimate companion for your early mornings and demanding days.",
    createdAt: "2026-06-27T18:45:00.000Z"
  }
];

// Core REST Endpoints

// 1. GET /api/descriptions/search
app.get('/api/descriptions/search', (req, res, next) => {
  try {
    const query = (req.query.q || '').trim().toLowerCase();
    if (!query) {
      return res.status(200).json(descriptions);
    }
    const filtered = descriptions.filter(item => {
      const matchTitle = item.title && item.title.toLowerCase().includes(query);
      const matchPrompt = item.promptInput && item.promptInput.toLowerCase().includes(query);
      const matchTags = item.tags && item.tags.some(tag => tag.toLowerCase().includes(query));
      return matchTitle || matchPrompt || matchTags;
    });
    res.status(200).json(filtered);
  } catch (error) {
    next(error);
  }
});

// 2. GET /api/descriptions
app.get('/api/descriptions', (req, res, next) => {
  try {
    res.status(200).json(descriptions);
  } catch (error) {
    next(error);
  }
});

// 3. GET /api/descriptions/:id
app.get('/api/descriptions/:id', (req, res, next) => {
  try {
    const item = descriptions.find(d => d.id === req.params.id);
    if (!item) {
      const error = new Error(`Description with ID ${req.params.id} not found`);
      error.status = 404;
      return next(error);
    }
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
});

// 4. POST /api/descriptions
app.post('/api/descriptions', (req, res, next) => {
  try {
    const { title, promptInput, tags, selectedTone, generatedContent } = req.body;
    
    // Validation: Ensure title and generatedContent exist
    if (!title || !generatedContent) {
      const error = new Error('Validation failed: title and generatedContent are required');
      error.status = 400;
      return next(error);
    }

    const newItem = {
      id: `desc-${crypto.randomUUID().slice(0, 8)}`,
      title,
      promptInput: promptInput || '',
      tags: Array.isArray(tags) ? tags : [],
      selectedTone: selectedTone || 'default',
      generatedContent,
      createdAt: new Date().toISOString()
    };

    descriptions.push(newItem);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
});

// 5. PUT /api/descriptions/:id
app.put('/api/descriptions/:id', (req, res, next) => {
  try {
    const index = descriptions.findIndex(d => d.id === req.params.id);
    if (index === -1) {
      const error = new Error(`Description with ID ${req.params.id} not found`);
      error.status = 404;
      return next(error);
    }

    const existingItem = descriptions[index];
    
    // Merge updated fields from request body, ensuring id and createdAt are immutable
    const updatedItem = {
      ...existingItem,
      ...req.body,
      id: existingItem.id,
      createdAt: existingItem.createdAt
    };

    descriptions[index] = updatedItem;
    res.status(200).json(updatedItem);
  } catch (error) {
    next(error);
  }
});

// 6. DELETE /api/descriptions/:id
app.delete('/api/descriptions/:id', (req, res, next) => {
  try {
    descriptions = descriptions.filter(d => d.id !== req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: status
    }
  });
});

// Port Binding & Server Activation
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
