exports.handler = async (event, context) => {
  if (event.httpMethod === "POST") {
    const body = JSON.parse(event.body);
    console.log("Received from Typebot:", body);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  }

  return {
    statusCode: 405,
    body: "Method Not Allowed",
  };
};
