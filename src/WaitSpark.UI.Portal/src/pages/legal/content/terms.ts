import { ROUTES } from '@/utils/routes'
import type { LegalDocument } from './types'

export const terms: LegalDocument = {
  title: 'Terms of Service',
  updated: 'Last updated October 1, 2026  ·  Effective October 1, 2026',
  alsoSee: { label: 'Privacy Policy', to: ROUTES.privacy },
  summary: [
    'Wait Spark is a subscription service for showing playlists and trivia games on waiting-room screens.',
    'You keep ownership of your content. You confirm you have the right to use the website and social accounts you connect.',
    'Your free trial lasts 14 days. After that, a paid plan keeps your screens running. You can cancel anytime.',
  ],
  sections: [
    {
      id: 'accepting',
      title: 'Accepting these terms',
      paragraphs: [
        'These terms are an agreement between you and Bolder Code ("Bolder Code", "we", "us"), the company that operates Wait Spark (waitspark.com). By creating an account or using Wait Spark, you agree to them on behalf of yourself and the business you represent.',
      ],
    },
    {
      id: 'account',
      title: 'Your account',
      paragraphs: [
        'Keep your sign-in details safe and tell us if you think your account was accessed without permission. You are responsible for activity under your account.',
      ],
    },
    {
      id: 'trial',
      title: 'Free trial and subscriptions',
      paragraphs: [
        'New accounts get a 14-day free trial. Paid plans renew automatically each billing period until you cancel. Some features, such as more screens and announcements, are available only on the Pro plan.',
      ],
    },
    {
      id: 'content',
      title: 'Your content',
      paragraphs: [
        'You own the content you add or that we create from your website and social accounts. You give us permission to use it only to provide the service. Make sure you have the rights to any content you use.',
      ],
    },
    {
      id: 'library',
      title: 'Community library',
      paragraphs: [
        'You can add free games from the community library or buy paid ones. Purchased games are licensed for use on your screens and can’t be resold.',
      ],
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable use',
      paragraphs: [
        'Don’t use Wait Spark for anything illegal, harmful or misleading, and don’t try to disrupt the service or access other customers’ data.',
      ],
    },
    {
      id: 'screens-and-players',
      title: 'Screens and players',
      paragraphs: [
        'You are responsible for what appears on your screens and for telling visitors how games work. If you collect player contact details, you must follow the privacy laws that apply to you.',
      ],
    },
    {
      id: 'ending',
      title: 'Ending your account',
      paragraphs: [
        'You can cancel or delete your account at any time. We may suspend accounts that break these terms. You can export your content before your account is closed.',
      ],
    },
    {
      id: 'liability',
      title: 'Disclaimers and liability',
      paragraphs: [
        'The service is provided "as is". To the extent the law allows, our total liability is limited to the amount you paid us in the 12 months before a claim.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to these terms',
      paragraphs: [
        'We may update these terms. If changes are significant, we will tell you in advance. Continuing to use Wait Spark means you accept the updated terms.',
      ],
    },
  ],
}
