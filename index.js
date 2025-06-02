const express = require('express');
const app = express();
app.use(express.json());


const db = require('./db.json');


let reviews = [];


app.post("/restaurants/:id/reviews", (req, res) => {
  const restaurantId = parseInt(req.params.id);
  const { review } = req.body;

  
  const restaurant = db.restaurants.find(r => r.id === restaurantId);
  if (!restaurant) {
    return res.status(404).json({ error: "Restaurant not found" });
  }

 
  reviews.push({
    restaurantId,
    text: review,
    createdAt: new Date().toISOString()
  });

  res.json({ success: true, review });
});


app.get("/restaurants/:id/reviews", (req, res) => {
  const restaurantId = parseInt(req.params.id);
  const restaurantReviews = reviews.filter(r => r.restaurantId === restaurantId);
  res.json(restaurantReviews);
});


app.get("/restaurants", (req, res) => {
  res.json(db.restaurants);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));