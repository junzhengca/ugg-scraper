module.exports.getJsonResponse = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {},
    });
    return await response.json();
  } catch (e) {
    return null;
  }
};
