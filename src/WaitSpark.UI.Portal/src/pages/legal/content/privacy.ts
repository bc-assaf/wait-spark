import { ROUTES } from '@/utils/routes'
import type { LegalDocument } from './types'

export const privacy: LegalDocument = {
  title: 'Privacy Policy',
  updated: 'Last updated October 1, 2026  ·  Effective October 1, 2026',
  alsoSee: { label: 'Terms of Service', to: ROUTES.terms },
  summary: [
    'We collect what we need to run your waiting-room screens: your account details, your business website content, and the social accounts you choose to connect.',
    'Players join games anonymously with a nickname. Phone numbers or emails are collected only if you turn that on and the player agrees.',
    'We never sell personal information. You can export or delete your data at any time.',
  ],
  sections: [
    {
      id: 'who-we-are',
      title: 'Who we are',
      paragraphs: [
        'Wait Spark (waitspark.com) is a product of Bolder Code ("Bolder Code", "we", "us"). We provide personalized content and trivia games for waiting-room screens. This policy explains how we handle personal information when you use the Wait Spark website, dashboard, screen apps and games.',
      ],
    },
    {
      id: 'information-we-collect',
      title: 'Information we collect',
      paragraphs: [
        'Account information: your name, email address, password or Google sign-in details, and billing information processed by our payment provider.',
        'Business content: public content from the website you enter, such as your business name, logo, colors, fonts, images and text, and content from Instagram, Facebook or X accounts you connect.',
        'Screen and usage data: which screens are connected, when they are online, and how content and games perform.',
      ],
    },
    {
      id: 'players',
      title: 'Players on your screens',
      paragraphs: [
        'People in your waiting room can join a game by scanning a QR code. They play with a nickname and an avatar, and we store their answers and scores for the game session and leaderboards.',
        'If you turn on "Ask players for contact details", players may choose to share a phone number or email. They can skip this, and we only store it with their consent.',
      ],
    },
    {
      id: 'how-we-use-information',
      title: 'How we use information',
      paragraphs: [
        'To create and update your playlists and trivia games, run your screens, provide support, process payments, improve the product, and send service messages. We use marketing emails only if you agree.',
      ],
    },
    {
      id: 'sharing',
      title: 'Sharing',
      paragraphs: [
        'We share information with service providers who help us run Wait Spark, such as hosting, payments and email, under contracts that protect it. We may disclose information if the law requires it. We never sell personal information.',
      ],
    },
    {
      id: 'retention',
      title: 'Retention',
      paragraphs: [
        'We keep account data while your account is active. Player game data is kept for up to 90 days unless you delete it sooner. When you delete your account, we delete or anonymize your data within 30 days.',
      ],
    },
    {
      id: 'your-rights',
      title: 'Your rights',
      paragraphs: [
        'Depending on where you live, you can access, correct, export or delete your information, and object to some processing. Use the settings in your dashboard or contact us.',
      ],
    },
    {
      id: 'security',
      title: 'Security',
      paragraphs: [
        'We use encryption in transit, access controls and regular reviews to protect your data. No service is perfectly secure, so please use a strong password.',
      ],
    },
    {
      id: 'children',
      title: 'Children',
      paragraphs: [
        'Wait Spark is meant for businesses. Children may play games on screens in places like clinics, but we do not knowingly collect contact details from children.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      paragraphs: [
        'If we make important changes, we will notify you by email or in the dashboard before they take effect.',
      ],
    },
  ],
}
