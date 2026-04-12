const express = require("express");
const app = express();
const stripe = require("stripe")("YOUR_SECRET_KEY");

app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "United Traders EA",
          },
          unit_amount: 2900,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://your-site.vercel.app/success",
    cancel_url: "https://your-site.vercel.app/cancel",
  });

  res.json({ url: session.url });
});

app.listen(3000, () => console.log("Server running"));
