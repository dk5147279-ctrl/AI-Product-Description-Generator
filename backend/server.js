const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection setup with graceful fallback
let isDbConnected = false;
let ProductDescription;

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.log('⚠️ No MONGODB_URI found in environmental variables. Falling back to in-memory history storage.');
    return;
  }
  try {
    await mongoose.connect(mongoUri);
    isDbConnected = true;
    console.log('✅ Connected to MongoDB successfully.');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('⚠️ Falling back to in-memory history storage.');
  }
};

connectDB().then(() => {
  // Define Schema if DB connected
  const descriptionSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    category: String,
    tone: String,
    keywords: String,
    dietaryClaims: [String],
    keyIngredients: String,
    targetAudience: String,
    generatedText: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  });
  
  if (isDbConnected) {
    ProductDescription = mongoose.model('ProductDescription', descriptionSchema);
  }
});

// In-memory history fallback array
const inMemoryHistory = [];

// API: Generate Product Description using Google Gemini API
app.post('/api/generate', async (req, res) => {
  const { productName, category, tone, keywords, dietaryClaims, keyIngredients, targetAudience } = req.body;

  if (!productName) {
    return res.status(400).json({ error: 'Product name is required.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const isApiKeyConfigured = apiKey && apiKey !== 'your_gemini_api_key_here';

  let generatedText = '';
  let warningMessage = null;

  if (!isApiKeyConfigured) {
    warningMessage = '⚠️ Gemini API Key not configured. Showing mock response. Please add your GEMINI_API_KEY to the backend/.env file.';
    
    // Generate high quality mock copy tailored for food processing
    const cleanCategory = category || 'Food Product';
    const cleanTone = tone || 'Professional';
    const claimsStr = (dietaryClaims && dietaryClaims.length > 0) ? dietaryClaims.join(', ') : 'Standard Quality';
    const ingredsStr = keyIngredients || 'premium wholesome ingredients';
    const keywordText = keywords ? `targeting keywords like "${keywords}"` : '';

    generatedText = `### 🌟 The Ultimate ${productName} Experience
    
Discover the exquisite taste and premium quality of our new **${productName}**! Handcrafted specifically for the demanding standards of the modern food market, this product delivers exceptional flavor and texture in every single batch.

Made from ${ingredsStr}, it is the perfect fit for ${category || 'your product line'}. It is meticulously prepared in our state-of-the-art facilities, ensuring full safety, freshness, and quality control.

---

### 🔥 Key Highlights
* **Dietary/Certifications:** ${claimsStr}
* **Premium Ingredients:** Sourced responsibly to ensure the highest purity and taste profile.
* **Consistency:** Grade-A processing standards ideal for retail distribution and high-demand commercial kitchens.
* **Clean Label:** No artificial colors or harmful chemical preservatives.

---

### 🥗 Culinary & Serving Ideas
Excellent when used as a primary component or served alongside matching snacks and drinks. Keep refrigerated at 4°C for peak flavor retention and extended shelf stability.

---

### 📦 Wholesale & Packaging Information
* **Lead Time:** 5-7 business days for high-volume wholesale processing.
* **Bulk Packing:** Available in industrial food-grade bulk bags or custom retail canisters.
* **Storage:** Best kept in cool, dry conditions or cold-storage facilities.

*(Generated in a ${cleanTone.toLowerCase()} voice ${keywordText})*`;
  } else {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

      const claimsList = (dietaryClaims && dietaryClaims.length > 0) ? dietaryClaims.join(', ') : 'None specified';
      const prompt = `
You are an expert copywriting assistant specializing in food processing and manufacturing businesses.
Generate a captivating, professional, and SEO-optimized product listing description for a food product based on these specifications:

Product Name: ${productName}
Food Category: ${category || 'General Food/Beverage'}
Dietary Claims / Certifications: ${claimsList}
Key Ingredients / Core Features: ${keyIngredients || 'Premium wholesome ingredients'}
Tone of Voice: ${tone || 'Professional'}
Target Customer: ${targetAudience || 'Retail consumers and wholesale buyers'}
Keywords to target (integrate them naturally): ${keywords || 'None'}

Please format the description in clean, beautiful Markdown using the following structure:
1. A catchy, benefit-driven heading (e.g. starting with "###").
2. A compelling introductory paragraph highlighting taste, texture, quality, and consumer appeal.
3. A bulleted "Key Highlights" section (for certifications, dietary benefits, allergen safety, or processing standards).
4. A "Serving & Usage Suggestions" section.
5. A brief "Wholesale & Logistics Info" section (ideal package styles, shelf life, or shipping information).

Ensure the writing is enticing, appetizing, and fits a food processing brand.
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      generatedText = response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
      return res.status(500).json({ error: 'Failed to generate description from Gemini API. ' + error.message });
    }
  }

  // Create record for history
  const historyRecord = {
    productName,
    category,
    tone,
    keywords,
    dietaryClaims: dietaryClaims || [],
    keyIngredients,
    targetAudience,
    generatedText,
    createdAt: new Date()
  };

  // Save history
  if (isDbConnected && ProductDescription) {
    try {
      const savedDoc = await ProductDescription.create(historyRecord);
      historyRecord._id = savedDoc._id;
    } catch (dbError) {
      console.error('Failed to save to database history:', dbError);
    }
  } else {
    // Save to memory with 50 items cap
    historyRecord._id = 'mem_' + Date.now();
    inMemoryHistory.unshift(historyRecord);
    if (inMemoryHistory.length > 50) {
      inMemoryHistory.pop();
    }
  }

  return res.json({
    generatedText,
    warning: warningMessage,
    data: historyRecord
  });
});

// API: Get Generation History
app.get('/api/history', async (req, res) => {
  if (isDbConnected && ProductDescription) {
    try {
      const history = await ProductDescription.find().sort({ createdAt: -1 }).limit(20);
      return res.json(history);
    } catch (error) {
      console.error('Database history retrieval error:', error);
      return res.status(500).json({ error: 'Failed to fetch history from database.' });
    }
  } else {
    // Return in-memory history
    return res.json(inMemoryHistory);
  }
});

// App listener
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`👉 API Endpoint: http://localhost:${PORT}/api/generate`);
});
