export function getImage(name: string) {
  return `https://avatars.spaceui.one/v1?name=${encodeURIComponent(name)}&variant=lumina&size=2000&format=svg`
}

export const productFamilies = [
  {
    id: 'creative',
    label: 'ElevenCreative',
    shortLabel: 'Creative',
    icon: getImage('elevencreative'),
  },
  {
    id: 'agents',
    label: 'ElevenAgents',
    shortLabel: 'Agents',
    icon: getImage('elevenagents'),
  },
  {
    id: 'api',
    label: 'ElevenAPI',
    shortLabel: 'API',
    icon: getImage('elevenapi'),
  },
] as const

export const products = [
  {
    id: 'voice-generator',
    title: 'AI Voice Generator',
  },
  {
    id: 'text-to-speech',
    title: 'Text to Speech',
  },
  {
    id: 'music',
    title: 'Music',
  },
  {
    id: 'speech-to-text',
    title: 'Speech to Text',
  },
  {
    id: 'voice-cloning',
    title: 'Voice Cloning',
  },
  {
    id: 'dubbing',
    title: 'Dubbing',
  },
] as const

export const agentProducts = [
  { id: 'voice', title: 'Voice' },
  { id: 'chat', title: 'Chat' },
] as const

export const apiProducts = [
  { id: 'text-to-speech', title: 'Text to Speech' },
  { id: 'speech-to-text', title: 'Speech to Text' },
  { id: 'music', title: 'Music' },
  { id: 'sound-effects', title: 'Sound Effects' },
] as const

export const voices = [
  {
    name: 'Nassim - Corporate Narrator',
    category: 'Educational',
    description: 'Clear, authoritative voices for tutorials and e-learning.',
    image: getImage('Nassim'),
    preview:
      'https://storage.googleapis.com/eleven-public-prod/database/workspace/e2f30b97a1054e3da83a771cef30028b/voices/repzAAjoKlgcT2oOAIWt/5YNZnGKBIasQeRAM2nc3.mp3',
  },
  {
    name: 'Christopher - Smooth, Deep and Engaging',
    category: 'Advertisement',
    description: 'Persuasive voices that drive action and brand recall.',
    image: getImage('Christopher'),
    preview:
      'https://storage.googleapis.com/eleven-public-prod/database/workspace/2dc1073fcb2d4590894250b5466ae19c/voices/SSfU0eLfP3qeuR4j2bwD/FK8rhyz053kOAdg7BQ0B.mp3',
  },
  {
    name: 'Jessica Anne Bogart - Eloquent Villain',
    category: 'Characters',
    description: 'Playful and engaging voices for cartoons or video games.',
    image: getImage('Jessica Anne Bogart'),
    preview:
      'https://storage.googleapis.com/eleven-public-prod/database/user/yA8yDNUx4dZ4gwL9ztbTpUEIyR12/voices/flHkNRp1BlvT73UL6gyz/Wi2FL0vNQp7bJAeSrJaz.mp3',
  },
  {
    name: 'James - Husky Storyteller',
    category: 'Narration',
    description: 'Expressive voices that bring audiobooks and podcasts to life.',
    image: getImage('James'),
    preview:
      'https://storage.googleapis.com/eleven-public-prod/database/workspace/48ab3aae468d4e9baded4b1693820088/voices/EkK5I93UQWFDigLMpZcX/xvjT3EK4vD3zlwfawHeV.mp3',
  },
  {
    name: 'Mark - Natural Conversations',
    category: 'Conversational',
    description: 'Natural voices perfect for informal scenarios.',
    image: getImage('Mark'),
    preview:
      'https://storage.googleapis.com/eleven-public-prod/database/workspace/f94e260200764678babc807b935bfb0b/voices/UgBBYS2sOqTuMpoF3BR0/0Oc7jiXwWN9kRTXfQsmw.mp3',
  },
  {
    name: 'Hope - Social Media',
    category: 'Social Media',
    description: 'Trendy, attention-grabbing voices for short-form content.',
    image: getImage('Hope'),
    preview:
      'https://storage.googleapis.com/eleven-public-prod/custom/voices/tnSpp4vdxKPjI9w0GnoV/LiIyxRT1qFJ1QJPr8sWl.mp3',
  },
] as const

export const speechVoices = [
  {
    id: 'NOpBlnGInO9m6vDvFkFC',
    label: 'Spuds Oxley',
    description: 'Old Storyteller',
    image: getImage('Spuds Oxley'),
    preview:
      'https://storage.googleapis.com/eleven-public-prod/database/user/Bi4YhYxPTDRSUfiEpED4qyJ0biq2/voices/NOpBlnGInO9m6vDvFkFC/M4xySW4rr1SbAKKwMAtI.mp3',
  },
  {
    id: 'EkK5I93UQWFDigLMpZcX',
    label: 'James',
    description: 'Husky Storyteller',
    image: getImage('James'),
    preview:
      'https://storage.googleapis.com/eleven-public-prod/database/workspace/48ab3aae468d4e9baded4b1693820088/voices/EkK5I93UQWFDigLMpZcX/xvjT3EK4vD3zlwfawHeV.mp3',
  },
  {
    id: '56AoDkrOh6qfVPDXZ7Pt',
    label: 'Cassidy',
    description: 'Crisp Podcaster',
    image: getImage('Cassidy'),
    preview:
      'https://storage.googleapis.com/eleven-public-prod/database/workspace/1da06ea679a54975ad96a2221fe6530d/voices/56AoDkrOh6qfVPDXZ7Pt/oEgVi6mikkKcpVcTFfj5.mp3',
  },
  {
    id: 'tnSpp4vdxKPjI9w0GnoV',
    label: 'Hope',
    description: 'Social Media',
    image: getImage('Hope'),
    preview:
      'https://storage.googleapis.com/eleven-public-prod/custom/voices/tnSpp4vdxKPjI9w0GnoV/LiIyxRT1qFJ1QJPr8sWl.mp3',
  },
  {
    id: 'uju3wxzG5OhpWcoi3SMy',
    label: 'Michael C. Vincent',
    description: 'Suspenseful Storyteller',
    image: getImage('Michael C. Vincent'),
    preview:
      'https://storage.googleapis.com/eleven-public-prod/custom/voices/uju3wxzG5OhpWcoi3SMy/ixYUu11jiy8LIVZidnvA.mp3',
  },
  {
    id: 'G17SuINrv2H9FC6nvetn',
    label: 'Christopher',
    description: 'British Storyteller',
    image: getImage('Christopher'),
    preview:
      'https://storage.googleapis.com/eleven-public-prod/custom/voices/G17SuINrv2H9FC6nvetn/ofEmJDtVvrmeL3OEs0ig.mp3',
  },
  {
    id: 'IRHApOXLvnW57QJPQH2P',
    label: 'Adam',
    description: 'Dark Storyteller',
    image: getImage('Adam'),
    preview:
      'https://api.us.elevenlabs.io/v1/voices/IRHApOXLvnW57QJPQH2P/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoiNEdXZzBVd1FLWGJpVkZPMFRybDRqTURTVGI4MiIsImZpbGVuYW1lIjoiNzc1ODgyMmYtYzk4Yy00ZGI5LWFiMGEtMTg2YjZhMTNiZTFhLm1wMyIsInRpbWVzdGFtcCI6MTc4MzQ4NjgwMDAwMDAwMH0%3D',
  },
  {
    id: 'EiNlNiXeDU1pqqOPrYMO',
    label: 'John Doe',
    description: 'Gravely Storyteller',
    image: getImage('John Doe'),
    preview:
      'https://storage.googleapis.com/eleven-public-prod/database/user/8RYUsFHsalUXjwVG0LjhNwH1j022/voices/EiNlNiXeDU1pqqOPrYMO/DyICRR04KQnCeB7Y9B7K.mp3',
  },
  {
    id: '1SM7GgM6IMuvQlz2BwM3',
    label: 'Mark',
    description: 'Friendly Companion',
    image: getImage('Mark'),
    preview:
      'https://api.us.elevenlabs.io/v1/voices/1SM7GgM6IMuvQlz2BwM3/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiJmOTRlMjYwMjAwNzY0Njc4YmFiYzgwN2I5MzViZmIwYiIsImZpbGVuYW1lIjoieTk0RzFyR2l4YXFMMkZ2UDNUdGUubXAzIiwidGltZXN0YW1wIjoxNzgzNDg2ODAwMDAwMDAwfQ%3D%3D',
  },
  {
    id: 'ZthjuvLPty3kTMaNKVKb',
    label: 'Peter',
    description: 'Confident Storyteller',
    image: getImage('Peter'),
    preview:
      'https://storage.googleapis.com/eleven-public-prod/database/user/T05GPpk2fvSBb625DXd4BJHZtu22/voices/ZthjuvLPty3kTMaNKVKb/2nBO0beUcX6fsrvPZbcE.mp3',
  },
  {
    id: 'Z3R5wn05IrDiVCyEkUrK',
    label: 'Arabella',
    description: 'Romance Storyteller',
    image: getImage('Arabella'),
    preview:
      'https://api.us.elevenlabs.io/v1/voices/Z3R5wn05IrDiVCyEkUrK/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ3b3Jrc3BhY2VfaWQiOiI2N2FkYWRiN2QyYTk0ZjZlYWQ2NGU5NWY0NWJlMjI1NCIsImZpbGVuYW1lIjoiQ0JZS2FmbzVvbkllNTIzNHJBR1MubXAzIiwidGltZXN0YW1wIjoxNzgzNDg2ODAwMDAwMDAwfQ%3D%3D',
  },
  {
    id: 'lxYfHSkYm1EzQzGhdbfc',
    label: 'Jessica Anne Bogart',
    description: 'Romance Storyteller',
    image: getImage('Jessica Anne Bogart'),
    preview:
      'https://storage.googleapis.com/eleven-public-prod/database/workspace/fb1bd18708014d8d80e770df5ea11bb7/voices/lxYfHSkYm1EzQzGhdbfc/JZDpsUoP3T2VAnEEmj4l.mp3',
  },
  {
    id: 'e5WNhrdI30aXpS2RSGm1',
    label: 'Ian Cartwell',
    description: 'Mystery Storyteller',
    image: getImage('Ian Cartwell'),
    preview:
      'https://api.us.elevenlabs.io/v1/voices/e5WNhrdI30aXpS2RSGm1/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoiVDdiaHF4THlFTmdSYVNnZm5xaFBhNnZQU0lEMiIsImZpbGVuYW1lIjoiaXJaNlpUYkdWQTVXalZBd25aY0oubXAzIiwidGltZXN0YW1wIjoxNzgzNDg2ODAwMDAwMDAwfQ%3D%3D',
  },
  {
    id: 'yl2ZDV1MzN4HbQJbMihG',
    label: 'Alex',
    description: 'Social Media',
    image: getImage('Alex'),
    preview:
      'https://storage.googleapis.com/eleven-public-prod/custom/voices/yl2ZDV1MzN4HbQJbMihG/TxJIOexqYqCv1Dzexs6Y.mp3',
  },
  {
    id: 'kqVT88a5QfII1HNAEPTJ',
    label: 'Declan Sage',
    description: 'Authoritative Storyteller',
    image: getImage('Declan Sage'),
    preview:
      'https://storage.googleapis.com/eleven-public-prod/database/workspace/5d6438deeb7d443ca0a6fc6309d5bb8a/voices/kqVT88a5QfII1HNAEPTJ/Hex3MZnpQ3dCbdgTkKyr.mp3',
  },
  {
    id: 'NNl6r8mD7vthiJatiJt1',
    label: 'Bradford',
    description: 'Articulated Storyteller',
    image: getImage('Bradford'),
    preview:
      'https://api.us.elevenlabs.io/v1/voices/NNl6r8mD7vthiJatiJt1/previews/audio?payload=eyJ2b2ljZV9zb3VyY2UiOiJjdXN0b20iLCJ1c2VyX2lkIjoiQ0VaWHhmZENmRWZ5WEQ3eVVOS0lQY3VDS2FCMyIsImZpbGVuYW1lIjoiNmFkY2E0ZTItMGJjMS00ZWNlLWFjMDItZmYwYmNlYWM5YzM2Lm1wMyIsInRpbWVzdGFtcCI6MTc4MzQ4NjgwMDAwMDAwMH0%3D',
  },
  {
    id: 'XjLkpWUlnhS8i7gGz3lZ',
    label: 'David Castlemore',
    description: 'Newsreader',
    image: getImage('David Castlemore'),
    preview:
      'https://storage.googleapis.com/eleven-public-prod/database/user/T7bhqxLyENgRaSgfnqhPa6vPSID2/voices/XjLkpWUlnhS8i7gGz3lZ/2foqwf4lPNBPWW27H6du.mp3',
  },
  {
    id: 'j9jfwdrw7BRfcR43Qohk',
    label: 'Frederick Surrey',
    description: 'Science Storyteller',
    image: getImage('Frederick Surrey'),
    preview:
      'https://storage.googleapis.com/eleven-public-prod/custom/voices/j9jfwdrw7BRfcR43Qohk/Vyj86dr4NJ1Tr82nEPdw.mp3',
  },
  {
    id: 'MFZUKuGQUsGJPQjTS4wC',
    label: 'Jon',
    description: 'Support Agent',
    image: getImage('Jon'),
    preview:
      'https://storage.googleapis.com/eleven-public-prod/database/workspace/7bdd69d9e581481a8ea5216493271f81/voices/MFZUKuGQUsGJPQjTS4wC/xEoCh0QqT3VPBukUnnNT.mp3',
  },
] as const

export const speechInitialText =
  'In the ancient land of Eldoria, where skies shimmered and forests, whispered secrets to the wind, lived a dragon named Zephyros. [sarcastically] Not the “burn it all down” kind... [giggles] but he was gentle, wise, with eyes like old stars. [whispers] Even the birds fell silent when he passed.'

export const initialAgentMessages = [
  {
    id: 1,
    from: 'agent' as const,
    text: "Hi there! I'm a support technician from LaptopCare Solutions. How can I help you today?",
  },
  { id: 2, from: 'user' as const, text: 'hi' },
  {
    id: 3,
    from: 'agent' as const,
    text: "Hi! My name is River, and I'm here to help you with your computer issue today. To start, could you please tell me a little bit about what's going on?",
  },
]

export const demoAgents = [
  {
    id: 'support',
    label: 'Support Agent',
    image: getImage('Support Agent'),
  },
  {
    id: 'food',
    label: 'Food Order Agent',
    image: getImage('Food Order Agent'),
  },
  {
    id: 'math',
    label: 'Math Teacher',
    image: getImage('Math Teacher'),
  },
] as const
