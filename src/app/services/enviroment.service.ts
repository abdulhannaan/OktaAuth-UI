import { Injectable } from '@angular/core';

@Injectable()
export class EnvService {
  // The values that are defined here are the default values that can
  // be overridden by env.js

  // Dev URL
  public baseUrl = 'https://localhost:44389/'; 
}