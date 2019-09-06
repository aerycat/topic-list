import {SortType} from './types'

interface FetchRepositoriesParams {
  topic: string, sort: SortType, per_page: number
}
const queryRepositories = (params: FetchRepositoriesParams) => {
  const { topic, sort, per_page } = params;
  const sortStr = sort === 'default' ? '' : `&sort=${sort}`
  const uri = `https://api.github.com/search/repositories?q=topic:${topic}${sortStr}&per_page=${per_page}`;
  return fetch(uri)
    .then(res => res.json())
    .then(res => Array.isArray(res.items) ? res.items : [])
    .then(res => res.map((item: any) => {
      const { id = '', name = '', full_name = '', owner = {}, html_url = '', description = '', stargazers_count = 0, forks_count = 0 } = item
      const { avatar_url = '' } = owner
      return {
        id,
        name,
        full_name,
        avatar_url,
        html_url,
        description,
        stargazers_count,
        forks_count
      }
    }))
    .then(res => res.filter((item: any) => !!item['id']) )
    // .catch(err => Object.assign({}, FetchRepositoriesResult, { errorMsg: 'something wrong.' }));
};

export default queryRepositories
