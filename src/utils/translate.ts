import { enData } from "@/app/locales/en";
import { koData } from "@/app/locales/ko";
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
