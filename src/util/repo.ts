import get from "./get";
import getColors from "./colors";

export interface Repo {
  colors: any;

  name: string;
  url: string;
  isFork: boolean;
  description?: string;
  sourceUrl?: string;
  sourceName?: string;
  language?: string;
  langColor?: string;
  stars: number;
  forks: number;
}

type AnyObject = { [key: string]: any };
export default async function getRepo(slug: string): Promise<Repo> {
  const repo: AnyObject = await get(`https://api.github.com/repos/${slug}`);
  const colors = await getColors();

  // Extract out only the props we need, and give them better names.
  return {
    colors,

    name: repo.name,
    url: repo.html_url,
    description: repo.description,
    language: repo.language,
    langColor: repo.language && colors[repo.language].color,
    isFork: repo.fork,
    sourceUrl: repo.fork && repo.source.html_url,
    sourceName: repo.fork && repo.source.full_name,
    stars: repo.stargazers_count,
    forks: repo.forks,
  };
}