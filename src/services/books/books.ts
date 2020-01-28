import axios from 'axios';

let service: BooksService;

class BooksService {
  public static SEARCH_BASE_URL = 'https://openlibrary.org';
  public static COVERS_BASE_URL = 'https://covers.openlibrary.org/b/ID';

  public search(query: string): Promise<any> {
    return axios.get(`${BooksService.SEARCH_BASE_URL}/search.json?q=${query}`)
    .then(function (response: any) {
      return response.data.docs;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
  }
}

const getBooksService = () => {
  if (service) {
    return service;
  }

  service = new BooksService();
  return service;
}

export {
  getBooksService,
  BooksService,
}
