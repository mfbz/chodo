import i18n from 'i18next';
import Backend from 'i18next-http-backend';

let i18nInitialized = false;
const nsUrlMapping: { [key: string]: string } = {};

export async function defineLanguage(ns: string, urlPath: string) {
  // ns The namespace, urlPath Example: 'http://your-ip/locales/{{lng}}/{{ns}}.json'
  nsUrlMapping[ns] = urlPath;

  if (!i18nInitialized) {
    i18nInitialized = true;

    await i18n.use(Backend).init({
      backend: {
        loadPath(lngs: string[], namespace: string[]) {
          if (namespace.length) {
            return nsUrlMapping[namespace[0]];
          } else {
            return '';
          }
        },
      },

      fallbackLng: 'en',
      debug: false,

      ns: [ns],
      defaultNS: ns,

      react: {
        useSuspense: false,
      },

      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
    });
  } else {
    await i18n.loadNamespaces(ns);
  }

  return i18n;
}

export function resetLanguageInitialized() {
  i18nInitialized = false;
}
