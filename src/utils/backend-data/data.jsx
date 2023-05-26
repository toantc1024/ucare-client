export const chatQuery = async (text) => {
  try {
    const response = await fetch("http://localhost:8888/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
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
