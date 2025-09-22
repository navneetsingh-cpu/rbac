import { SetMetadata } from '@nestjs/common';

//mark API endpoints as publicly accessible, bypassing authentication checks.
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
