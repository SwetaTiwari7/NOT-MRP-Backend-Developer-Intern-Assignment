import { Router } from 'express';
import { MatchFunction } from 'path-to-regexp';
import { z } from 'zod';

//Here we'll match the path
export interface excludedRoutes {
  path: MatchFunction<Partial<Record<string, string | string[]>>>;
  method: string;
}

export class Route {
  private static registeredPath: string[] = [];
  constructor(
    public path: string,
    public router: Router,
  ) {
    if (!this.path.startsWith('/')) throw `Path ${this.path} entered is invalid`;

    if (Route.registeredPath.includes(this.path)) throw `This path ${this.path} already exists`;

    Route.registeredPath.push(this.path);
  }
}
