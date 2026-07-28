export default async function handler(req, res) {
  const { path } = req.query;
  const urlPath = Array.isArray(path) ? path.join('/') : path;
  
  const searchParams = new URLSearchParams(req.query);
  searchParams.delete('path');
  const queryString = searchParams.toString();
  
  const targetUrl = `https://generativelanguage.googleapis.com/${urlPath}${queryString ? '?' + queryString : ''}`;
  
  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined
    });
    
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
