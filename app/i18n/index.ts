import {
  createInstance,
  Namespace,
  FlatNamespace,
  KeyPrefix,
  i18n,
} from "i18next"; // i18n 추가
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { FallbackNs } from "react-i18next";
import { getOptions } from "./settings";

// i18n 초기화 함수
const initI18next = async (lng: string, ns: string | string[]) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

// 다국어 번역을 사용하기 위한 훅
export async function useTranslation<
  Ns extends FlatNamespace = "transition", // 네임스페이스의 기본값 설정
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined
>(lng: string, ns?: Ns, options: { keyPrefix?: KPrefix } = {}) {
  const i18nextInstance = await initI18next(
    lng,
    Array.isArray(ns) ? (ns as string[]) : (ns as string)
  );
  return {
    t: i18nextInstance.getFixedT(lng, ns, options.keyPrefix),
    i18n: i18nextInstance as i18n, // 타입 단언을 사용하여 i18n 타입으로 형변환
  };
}
