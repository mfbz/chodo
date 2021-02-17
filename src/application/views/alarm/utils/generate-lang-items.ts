// The list of languages allowed to be retrieved
const allowedLanguages: string[] = ['De', 'En', 'It', 'Fr', 'Es'];

export function generateLangItems(item: string) {
  return [item, ...allowedLanguages.map(lang => `${item}${lang}`)];
}
