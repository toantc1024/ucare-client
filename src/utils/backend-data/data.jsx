export const chatQuery = async (text) => {
  try {
    console.log(
      process.env.REACT_APP_PRODUCTION,
      `${
        process.env.REACT_APP_PRODUCTION
          ? "https://ucare.onrender.com"
          : "http://localhost:8888"
      }/message`
    );
    const response = await fetch(
      `${
        process.env.REACT_APP_PRODUCTION
          ? "https://ucare.onrender.com"
          : "http://localhost:8888"
      }/message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }
    );
    const message = await response.json();
    return message;
  } catch (error) {
    console.log(error);
  }
};

const keyword = [
  "lập lịch uống nước",
  "tập thể dục",
  "food",
  "mediation",
  "thiền",
  "nước",
  "chạy",
  "thể dục",
  "fit",
];

export const getRecommendations = (text) => {
  const words = text.split(" ");
  const recommendations = [];

  words.forEach((word) => {
    keyword.forEach((key) => {
      const keys = key.split(" ");
      if (keys.includes(word.toLowerCase()) && !recommendations.includes(key)) {
        recommendations.push(key);
      }
    });
  });

  return recommendations;
};

export const healthQuotes = [
  {
    quote:
      "Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship.",
    author: "Buddha",
  },
  {
    quote: "The greatest wealth is health.",
    author: "Virgil",
  },
  {
    quote: "Take care of your body. It's the only place you have to live.",
    author: "Jim Rohn",
  },
  {
    quote: "A healthy outside starts from the inside.",
    author: "Robert Urich",
  },
  {
    quote:
      "The power of love to change bodies is legendary, built into folklore, common sense, and everyday experience. Love moves the flesh, it pushes matter around.",
    author: "Louise Erdrich",
  },
  {
    quote: "Health is not valued until sickness comes.",
    author: "Thomas Fuller",
  },
  {
    quote:
      "A healthy body is a guest chamber for the soul: a sick body is a prison.",
    author: "Francis Bacon",
  },
  {
    quote:
      "A fit body, a calm mind, a house full of love. These things cannot be bought - they must be earned.",
    author: "Naval Ravikant",
  },
  {
    quote: "The groundwork of all happiness is health.",
    author: "Leigh Hunt",
  },
  {
    quote: "The human body is the best picture of the human soul.",
    author: "Ludwig Wittgenstein",
  },
  {
    quote: "Your body hears everything your mind says.",
    author: "Naomi Judd",
  },
  {
    quote:
      "To keep the body in good health is a duty... otherwise we shall not be able to keep the mind strong and clear.",
    author: "Buddha",
  },
  {
    quote:
      "Physical fitness is not only one of the most important keys to a healthy body, it is the basis of dynamic and creative intellectual activity.",
    author: "John F. Kennedy",
  },
  {
    quote: "The first wealth is health.",
    author: "Ralph Waldo Emerson",
  },
];
