// The AI dataset: each entry has the keywords to look for and the answer to give.
// The first 6 are the exact questions and answers from the assignment.
const aiData = [
  { question: "What are today's specials?", keywords: ['special'], answer: "Today's special is Chicken Alfredo for $18.99." },
  { question: 'What vegetarian meals do you have?', keywords: ['vegetarian', 'vegan', 'veggie'], answer: 'We offer Vegetable Pasta, Margherita Pizza, and Garden Salad.' },
  { question: 'What do you recommend?', keywords: ['recommend', 'suggest'], answer: 'Based on popular orders, we recommend our Chicken Alfredo.' },
  { question: 'Do you have gluten-free options?', keywords: ['gluten'], answer: 'Yes. We offer gluten-free pasta and selected salads.' },
  { question: 'What is the most popular dessert?', keywords: ['dessert', 'sweet'], answer: 'Our Chocolate Lava Cake is our most popular dessert.' },
  { question: 'What did I order last time?', keywords: ['last time', 'last order', 'previous'], answer: 'Your previous order was Chicken Alfredo and Chocolate Lava Cake.' },
  { question: 'What are your opening hours?', keywords: ['hour', 'open'], answer: "We're open Tuesday to Sunday, 11 AM to 10 PM. Closed on Mondays." },
];

export default aiData;