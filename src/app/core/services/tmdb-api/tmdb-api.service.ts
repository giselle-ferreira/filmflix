import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {

  baseUrl ='https://api.themoviedb.org/3/'

  options = {
    api_key: '4b23782fe4b650a06a3c7f0edb6f2221',
    language: 'pt-BR'
  }

  constructor() { }
}
