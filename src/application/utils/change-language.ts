import i18n from 'i18next';

export async function changeLanguage(language: string) {
  await i18n.changeLanguage(language);
}
