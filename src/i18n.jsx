import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import translations from './translations.json';

const LanguageContext = createContext(null);
export function translate(value, language) {
  if (Array.isArray(value)) return value.map(item => translate(item, language));
  if (typeof value !== 'string') return value;
  const key = value.trim();
  const result = translations[language][key];
  if (result !== undefined) return value.replace(key, result);
  if (language === 'cs' && /^Age \d+$/.test(key)) return value.replace('Age', 'Věk');
  if (language === 'cs' && /^\$?-?\d+(?:\.\d+)?[KM%]$/.test(key)) {
    return value.replace('.', ',').replace(/K$/, ' tis.').replace(/M$/, ' mil.').replace(/%$/, ' %');
  }
  return value;
}
export function LanguageProvider({children}) {
  const [language, setLanguage] = useState(() => {
    try { return localStorage.getItem('david-hub-language') === 'en' ? 'en' : 'cs'; }
    catch { return 'cs'; }
  });
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === 'cs' ? 'David Hub - Osobní zápisník' : 'David Hub - Personal notebook';
    document.querySelector('meta[name="description"]')?.setAttribute('content', language === 'cs'
      ? 'Davidovy poznámky k ultimate frisbee, zdraví a financím. Videa, knihovna a kalkulačky pro plánování úspor.'
      : 'David’s notes on ultimate frisbee, health, and finance. Videos, books, and savings calculators.');
    try { localStorage.setItem('david-hub-language', language); } catch { /* Optional persistence. */ }
  }, [language]);
  const value = useMemo(() => ({language, setLanguage, tr: value => translate(value, language)}), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
export function useLanguage() { return useContext(LanguageContext); }
export function LanguageSwitcher() {
  const {language, setLanguage} = useLanguage();
  return <div className="language-switch" role="group" aria-label={language === 'cs' ? 'Jazyk stránky' : 'Site language'}>
    <button type="button" lang="cs" aria-label="Čeština" aria-pressed={language === 'cs'} onClick={() => setLanguage('cs')}>CZ</button>
    <button type="button" lang="en" aria-label="English" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
  </div>;
}
