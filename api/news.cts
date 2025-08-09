// CommonJSの書き方では、module.exports を使う
module.exports = async (req, res) => {
  const NEWS_API_KEY = process.env.NEWS_API_KEY;

  if (!NEWS_API_KEY) {
    return res.status(500).json({ error: 'API key is not configured' });
  }

  try {
    // fetchはNode.jsのグローバル関数なので、そのまま使える
    const newsResponse = await fetch(
      `https://newsapi.org/v2/everything?q=トランプ&language=jp&apiKey=${NEWS_API_KEY}`
    );

    if (!newsResponse.ok) {
      return res.status(newsResponse.status).json({ error: `News API error: ${newsResponse.statusText}` });
    }

    const newsData = await newsResponse.json();
    return res.status(200).json(newsData);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};