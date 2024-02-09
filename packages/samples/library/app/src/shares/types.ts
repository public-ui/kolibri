import { FC } from 'react';

export type Route = FC | Routes;
export type Routes = { [key: string]: Route };
