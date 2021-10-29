import type { TInterviewType } from './types';

export const BOT_LINK = 'https://t.me/spaceduke_bot';

export const INTERVIEW_TYPES: TInterviewType[] = [{
  id: 'alcho',
  image: '🍺',
  title: 'Алко-собеседование',
  description: 'Для тех, кто предпочитает собеседования покрепче.',
}, {
  id: 'review',
  image: '🔍',
  title: 'Собеседование-ревью',
  description: 'Найдем сильные и слабые стороны, и расскажем о них.',
}, {
  id: 'true-or-action',
  image: '🎭',
  title: 'Правда или действие',
  description: 'Старое доброе развлечение, когда скучно просто говорить.',
}, {
  id: 'reverse',
  image: '🗯',
  title: 'Реверс-собеседование',
  description: 'Ты собеседуешь нас. Мы краснеем и тупим.',
}, {
  id: 'stress',
  image: '💣',
  title: 'Стресс-собеседование',
  description: 'Твоё стоп-слово должно быть не менее восьми знаков, содержать цифры и заглавные буквы.',
}, {
  id: 'minecraft',
  image: '🕹',
  title: 'Майнкрафт',
  description: 'Строим вместе дом, спасаемся от гриферов.',
}, {
  id: 'blitz',
  image: '⚡️',
  title: 'Блиц-собеседование',
  description: 'Фанат Флеша? Вопросы быстры, ответы еще быстрее.',
}, {
  id: 'squid',
  image: '🦑',
  title: 'Игра в кальмара',
  description: 'Тут без сноровки не обойтись. Ты готов сразиться за оффер?',
}];
