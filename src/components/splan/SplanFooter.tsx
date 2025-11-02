"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SplanFooter() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-black dark:bg-gray-950 text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-xl font-black text-white">
                {language === 'zh' ? '汇' : 'FX'}
              </span>
              <span className="text-xl font-normal text-gray-400 ml-1">
                {language === 'zh' ? '刃' : 'Killer'}
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.about')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">{t('footer.nav.title')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/splan/join-us" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.training')}
                </Link>
              </li>
              <li>
                <Link href="/splan/faq" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.faq')}
                </Link>
              </li>
              <li>
                <Link href="/splan/psychology-test" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.psychology')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4">{t('footer.resources.title')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.dashboard')}
                </Link>
              </li>
              <li>
                <a href="https://www.bilibili.com/video/BV19a411X7eY" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-white transition-colors">
                  {t('video.doc1.title')}
                </a>
              </li>
              <li>
                <a href="https://www.bilibili.com/video/BV1FZ4y1o734" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-white transition-colors">
                  {t('video.doc2.title')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">{t('footer.contact.title')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{t('footer.contact.focus')}</li>
              <li>{t('footer.contact.cultivate')}</li>
              <li className="pt-2">
                <Link href="/splan/join-us"
                      className="inline-block px-4 py-2 bg-white text-black hover:bg-gray-200 transition-colors">
                  {t('footer.contact.apply')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>2024-2025 {t('footer.copyright')}</p>
          <p className="mt-2 text-xs">
            {t('footer.disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
}
