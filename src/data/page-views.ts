export async function getPageViews(path: string) {
  const res = await fetch(
    `https://page-views-api.ratneshc.com/api/v1/views?site=page-views-api.ratneshc.com&path=${path}`
  );
  const data = (await res.json()) as { views: number };

  return data.views;
}
