const chatQuery = async (text) => {
  const response = await fetch("http://localhost:8888/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  const data = await response.json();
  return data;
};
