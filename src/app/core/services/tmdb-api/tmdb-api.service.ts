import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MovieTvBase } from '../../models/movie-tv-base';

//criando um tipo para a resposta que virá da api
type ApiResponse = {page: number, results: MovieTvBase[]}

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {

  baseUrl ='https://api.themoviedb.org/3'

  options = {
    api_key: '4b23782fe4b650a06a3c7f0edb6f2221',
    language: 'pt-BR'
  }

  constructor(private http: HttpClient) { }

  trending(): Observable<MovieTvBase[]> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/trending/all/week`, {
      params: this.options,
    })
    .pipe(map(data => data.results));
  }


  search(query: string): Observable<MovieTvBase[]> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/search/multi`, {
      params: {
        ...this.options,
        include_adult: false,
        query: query,
      }
    }).pipe(map((data) => data.results))
  }
}


  // requisito no endpoint
  // o objeto params é para pegar as informações que vem depois da ?
  // desestrutura o valor que já tem (api_key e language) para incluir informações novas.
  // Quando já tiver os dados, ele mapeia, retorna apenas o que foi solicitado.
