'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children, ...props }: any) { //TODO: fix types later
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}