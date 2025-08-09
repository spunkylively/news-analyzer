import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const NEWS_API_KEY = process.env.VITE_NEWS_API_KEY;

  if (!NEWS_API_KEY) {
    return response.status(500).json({ error: 'API key is not configured' });
  }

  try {
    const newsResponse = await fetch(
      `https://newsapi.org/v2/everything?q=トランプ&language=jp&apiKey=${NEWS_API_KEY}`
    );

    if (!newsResponse.ok) {
      // NewsAPIからのエラーをそのままクライアントに返す
      return response.status(newsResponse.status).json({ error: `News API error: ${newsResponse.statusText}` });
    }

    const newsData = await newsResponse.json();
    return response.status(200).json(newsData);

  } catch (error: any) {
    return response.status(500).json({ error: error.message });
  }
}