import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import { languages, fallbackLng } from "../i18n/settings";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { useTranslation } from "../i18n";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { lng: string };
  searchParam: any;
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { i18n } = await useTranslation(params.lng, "translation");
  const t = i18n.getFixedT(params.lng, null, "seo");

  const title = t("title"); // Assuming 'title' is the key for the SEO title in your translation files

  // Do something with title and description, such as setting meta tags in the HTML document

  // Example of returning metadata
  return {
    title: title,
    // ...other metadata fields
  };
}

export default async function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng);

  return (
    <>
      <main>
        <Header heading={t("h1")} />
        <h2>
          <Trans t={t} i18nKey="welcome">
            Welcome to Next.js v13 <small>appDir</small> and i18next
          </Trans>
        </h2>
        <div style={{ width: "100%" }}>
          <p>
            <Trans t={t} i18nKey="blog.text">
              Check out the corresponding <a href={t("blog.link")}>blog post</a>{" "}
              describing this example.
            </Trans>
          </p>
          <a href={t("blog.link")}>
            <img
              style={{ width: "50%" }}
              alt="next 13 blog post"
              src="https://locize.com/blog/next-13-app-dir-i18n/next-13-app-dir-i18n.jpg"
            />
          </a>
        </div>
        <hr style={{ marginTop: 20, width: "90%" }} />
        <div>
          <Link href={`/${lng}/second-page`}>
            <button type="button">{t("to-second-page")}</button>
          </Link>
          <Link href={`/${lng}/client-page`}>
            <button type="button">{t("to-client-page")}</button>
          </Link>
        </div>
      </main>
      <Footer lng={lng} />
    </>
  );
}
