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
      translationData = koData;
  }

  const keys = value.split(".");

  for (const key of keys) {
    if (translationData[key] !== undefined) {
      translationData = translationData[key];
    }
  }

  let result = translationData;

  return result;
}
