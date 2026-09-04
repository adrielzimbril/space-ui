export interface GameItem {
  id: number
  emoji: string
  title: string
  description: string
  subtitle: string
  isTrue: boolean
  funFact?: string
  funnyTruthMessage?: string
  funnyLieMessage?: string
}

export type Question = GameItem

export const questionsLocale: Question[] = [
  {
    id: 1,
    emoji: '🐛',
    title: 'The first computer bug was an actual insect',
    description: 'A physical moth was trapped in a relay of the Harvard Mark II in 1947.',
    subtitle: 'Literal debugging.',
    isTrue: true,
    funFact: 'Grace Hopper taped the moth into the logbook.',
    funnyTruthMessage: 'A real moth taped in the logbook!',
    funnyLieMessage: 'It was a real moth trapped inside the machine.',
  },
  {
    id: 2,
    emoji: '☕',
    title: 'JavaScript was created to be Java for the web',
    description: 'Netscape rebranded Mocha to JavaScript purely to ride Java’s hype in 1995.',
    subtitle: 'Ham is to hamster as Java is to JavaScript.',
    isTrue: false,
    funFact: 'Brendan Eich built it in 10 days. They share zero code.',
    funnyTruthMessage: 'Zero shared code—pure 90s marketing hype!',
    funnyLieMessage: 'They share no architecture at all.',
  },
  {
    id: 3,
    emoji: '🍓',
    title: 'AI models can easily count letters in words',
    description: 'LLMs often fail simple letter counts like the "r"s in "strawberry".',
    subtitle: 'How many "r"s in strawberry?',
    isTrue: false,
    funFact: 'Tokenizers process word chunks, not individual letters.',
    funnyTruthMessage: 'Tokenizers see chunks, not letters!',
    funnyLieMessage: 'Tokenizers process chunks, so letter counting trips them up.',
  },
  {
    id: 4,
    emoji: '🎮',
    title: 'Nvidia GPUs were originally made only for video games',
    description: 'Founded in 1993, Nvidia built chips strictly for 3D PC gaming graphics.',
    subtitle: 'From Doom to Deep Learning.',
    isTrue: true,
    funFact: 'Jensen Huang bet on CUDA in 2006, years before the AI boom.',
    funnyTruthMessage: 'Built for gamers long before modern AI.',
    funnyLieMessage: '100% true—designed strictly for PC gaming.',
  },
  {
    id: 5,
    emoji: '💾',
    title: 'A 3.5-inch floppy disk held less than 2 MB',
    description: 'The universal physical save icon held a grand total of only 1.44 MB.',
    subtitle: 'Less than one smartphone photo.',
    isTrue: true,
    funFact: 'A modern smartphone photo needs at least 3 floppy disks.',
    funnyTruthMessage: '1.44 MB max—not even one modern song!',
    funnyLieMessage: '1.44 MB was all you had for entire games.',
  },
  {
    id: 6,
    emoji: '🔄',
    title: 'Training AI on AI-generated data makes it smarter',
    description: 'Feeding models synthetic text from other AIs improves accuracy.',
    subtitle: 'The synthetic data paradox.',
    isTrue: false,
    funFact: 'It causes "Model Collapse", degrading outputs into gibberish.',
    funnyTruthMessage: 'It causes Model Collapse—AI needs fresh human data.',
    funnyLieMessage: 'Recursive AI data causes Model Collapse.',
  },
  {
    id: 7,
    emoji: '🕹️',
    title: 'Nintendo was founded in 1889 as a card company',
    description: 'Nintendo began in Kyoto over 135 years ago making Hanafuda playing cards.',
    subtitle: 'Over 135 years of history.',
    isTrue: true,
    funFact: 'They made playing cards for 80 years before their first arcade game.',
    funnyTruthMessage: 'Started in 1889 with handmade flower cards!',
    funnyLieMessage: 'Founded in 1889—long before video games existed.',
  },
  {
    id: 8,
    emoji: '🧠',
    title: 'The term "Artificial Intelligence" was coined in 1956',
    description: 'John McCarthy proposed the term at the historic Dartmouth conference.',
    subtitle: 'Decades before the personal computer.',
    isTrue: true,
    funFact: 'Researchers gathered in 1956 to explore machine thinking.',
    funnyTruthMessage: 'Coined at Dartmouth in 1956!',
    funnyLieMessage: 'AI research officially started in 1956.',
  },
  {
    id: 9,
    emoji: '🌐',
    title: 'The first .com domain was registered before the Web existed',
    description: 'Symbolics.com was registered in 1985, four years before the World Wide Web.',
    subtitle: 'Pre-web internet history.',
    isTrue: true,
    funFact: 'Tim Berners-Lee invented the web in 1989, years after symbolics.com.',
    funnyTruthMessage: 'Registered in 1985—years before the World Wide Web!',
    funnyLieMessage: 'Symbolics.com was registered 4 years before the web.',
  },
  {
    id: 10,
    emoji: '📄',
    title: 'The Transformer paper was rejected twice by NeurIPS',
    description: 'Google’s 2017 "Attention Is All You Need" paper was initially turned down.',
    subtitle: 'The foundation of ChatGPT.',
    isTrue: false,
    funFact: 'NeurIPS accepted it on its very first submission in 2017.',
    funnyTruthMessage: 'Accepted on the first try with zero rejections!',
    funnyLieMessage: 'Accepted on the first try in 2017.',
  },
]
