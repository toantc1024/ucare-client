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
