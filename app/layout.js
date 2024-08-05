'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@fontsource/roboto';

const inter = Inter({ subsets: ["latin"] });
const theme = createTheme();

// Metadata information
const metadata = {
  title: "Inventory Management App",
  description: "An app to manage your inventory efficiently."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
