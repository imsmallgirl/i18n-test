import "./global.css";

import { dir } from "i18next";
import { languages } from "../i18n/settings";
import { useTranslation } from "../i18n";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({ children, params: { lng } }) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body>{children}</body>
    </html>
  );
}
