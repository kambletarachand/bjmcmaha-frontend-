import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/languageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <button onClick={() => changeLanguage('en')}>EN</button>
      <button onClick={() => changeLanguage('hi')}>हिंदी</button>
      <button onClick={() => changeLanguage('mr')}>मराठी</button>
    </div>
  );
};

export default LanguageSwitcher;
