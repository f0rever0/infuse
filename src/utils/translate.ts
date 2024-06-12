import { enData } from "@/app/locales/en.js";
import { koData } from "@/app/locales/ko.js";
import { TranslationDataType } from "@/types/data";

export function translateLanguage(
  type: string,
  value: keyof TranslationDataType
) {
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

  let result = translationData[value];

  return result;
}
