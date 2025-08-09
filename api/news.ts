// VercelRequest, VercelResponseはもう不要
// import type { VercelRequest, VercelResponse } from '@vercel/node';

// GETリクエストを処理する関数をexportする
export async function GET(request: Request) {
  const NEWS_API_KEY = process.env.NEWS_API_KEY;

  if (!NEWS_API_KEY) {
    return new Response(JSON.stringify({ error: 'API key is not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const newsResponse = await fetch(
      `https://newsapi.org/v2/everything?q=トランプ&language=jp&apiKey=${NEWS_API_KEY}`
    );

    if (!newsResponse.ok) {
      return new Response(JSON.stringify({ error: `News API error: ${newsResponse.statusText}` }), {
        status: newsResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newsData = await newsResponse.json();
    
    // 成功した場合、JSONデータをResponseオブジェクトで返す
    return new Response(JSON.stringify(newsData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}