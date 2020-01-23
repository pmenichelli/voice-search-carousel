import axios from 'axios';

let service: BooksService;

class BooksService {
  private static SEARCH_BASE_URL = 'http://openlibrary.org';
  private static COVERS_BASE_URL = 'http://http://covers.openlibrary.org/b/isbn';

  public search(query: string): Promise<any> {
    return axios.get(`${BooksService.SEARCH_BASE_URL}/search.json?q=${query}`)
    .then(function (response: any) {
      // handle success
      // console.log({response});
      return response.data.docs.slice(0, 15);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return error;
    });
  }

  public getCover(isbn: string, size: 'S' | 'M' | 'L'): Promise<any> {
    return axios.get(`${BooksService.COVERS_BASE_URL}/${isbn}-${size}.jpg`)
    .then(function (response) {
      // handle success
      console.log(response);
      return response;
    })
    .catch(function (error) {
      // handle error
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
  getBooksService
}
