import { enData } from "@/app/locales/en.js";
import { koData } from "@/app/locales/ko.js";

export function translateLanguage(type: string, value: string) {
  let translationData;

  switch (type) {
    case "ko":
      translationData = koData;
      break;
    case "en":
      translationData = enData;
      break;
    default:
      translationData = enData; // 기본값을 영어로 설정
  }

  const keys = value.split(".");
  let result = translationData;

  for (const key of keys) {
    if (result[key] !== undefined) {
      result = result[key];
    } else {
      return `Translation not found for key: ${value}`;
    }
  }

  return result;
}
