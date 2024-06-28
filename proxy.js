addEventListener('fetch', event => {
    event.respondWith(fetchAndApply(event.request));
  });
  
  async function fetchAndApply(request) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');
  
    if (!targetUrl) {
      return new Response('URL parameter is missing', { status: 400 });
    }
  
    const response = await fetch(targetUrl);
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Access-Control-Allow-Origin', '*');
  
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  }
  