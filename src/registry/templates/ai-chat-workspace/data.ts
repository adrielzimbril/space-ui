import type { ChatMessage, ChatSection, ModelOption, ToolOption, UserProfile } from './types'

export const CURRENT_USER: UserProfile = {
  name: 'Adriel Zimbril',
  email: 'adriel@spaceui.one',
  initials: 'AZ',
  plan: 'PRO',
}

export const AI_MODELS: ModelOption[] = [
  {
    value: 'claude-3-7-sonnet',
    label: 'Claude 3.7 Sonnet',
    provider: 'Anthropic',
    badge: 'Hybrid Reasoning',
    description: 'Deep reasoning, creative synthesis & code',
  },
  {
    value: 'gpt-4-5',
    label: 'GPT-4.5 Preview',
    provider: 'OpenAI',
    badge: 'Flagship',
    description: 'Broad world knowledge & nuanced answers',
  },
  {
    value: 'o3-mini',
    label: 'o3-mini',
    provider: 'OpenAI',
    badge: 'High Reasoning',
    description: 'Fast math, logic & algorithmic problem solving',
  },
  {
    value: 'claude-3-5-sonnet',
    label: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    badge: 'Fast & Smart',
    description: 'Reliable everyday companion for complex tasks',
  },
  {
    value: 'gemini-2-0-flash',
    label: 'Gemini 2.0 Flash',
    provider: 'Google',
    badge: 'Multimodal',
    description: 'Sub-second real-time multimodal processing',
  },
  {
    value: 'deepseek-r1',
    label: 'DeepSeek R1',
    provider: 'DeepSeek',
    badge: 'Open Reasoning',
    description: 'Transparent chain-of-thought analysis',
  },
  {
    value: 'gpt-4o',
    label: 'GPT-4o',
    provider: 'OpenAI',
    badge: 'Omni',
    description: 'Versatile conversational assistant',
  },
]

export const AI_TOOLS: ToolOption[] = [
  { value: 'artifacts', label: 'Canvas / Artifacts' },
  { value: 'deep-research', label: 'Deep Web Research' },
  { value: 'creative-studio', label: 'Creative Studio' },
  { value: 'data-analysis', label: 'Data Analysis' },
  { value: 'file-upload', label: 'Upload Documents' },
]

export const PROJECT_OPTIONS = [
  { value: 'culinary-lab', label: 'Culinary Lab' },
  { value: 'travel-planning', label: 'Travel & Exploration' },
  { value: 'creative-writing', label: 'Creative Writing' },
  { value: 'design-architecture', label: 'Design & Architecture' },
  { value: 'science-astronomy', label: 'Science & Astronomy' },
  { value: 'productivity-engineering', label: 'Productivity & Engineering' },
]

export interface CategoryAgentConfig {
  name: string
  seed: string
  shape: 'cat' | 'lion' | 'ghost' | 'mecha' | 'ufo' | 'bot'
  expression: 'happy' | 'amazed' | 'loving' | 'attentive' | 'curious' | 'determined'
}

export const CATEGORY_AGENTS: Record<string, CategoryAgentConfig> = {
  'Culinary Lab': {
    name: 'Culinary Sage',
    seed: 'chef-cat',
    shape: 'cat',
    expression: 'happy',
  },
  'Travel & Exploration': {
    name: 'Atlas Rover',
    seed: 'safari-lion',
    shape: 'lion',
    expression: 'amazed',
  },
  'Creative Writing': {
    name: 'Muse Quill',
    seed: 'muse-ghost',
    shape: 'ghost',
    expression: 'loving',
  },
  'Design & Architecture': {
    name: 'Form & Grid',
    seed: 'bauhaus-mecha',
    shape: 'mecha',
    expression: 'attentive',
  },
  'Science & Astronomy': {
    name: 'Cosmic Sight',
    seed: 'deep-ufo',
    shape: 'ufo',
    expression: 'curious',
  },
  'Productivity & Engineering': {
    name: 'Code Core',
    seed: 'core-bot',
    shape: 'bot',
    expression: 'determined',
  },
}

export function getCategoryAgent(category?: string): CategoryAgentConfig {
  if (category && CATEGORY_AGENTS[category]) {
    return CATEGORY_AGENTS[category]
  }
  return {
    name: 'Space Intelligence',
    seed: 'space-bot',
    shape: 'bot',
    expression: 'attentive',
  }
}

export const DEFAULT_CHAT_SECTIONS: ChatSection[] = [
  {
    title: 'Pinned',
    items: [
      {
        id: 'coffee-brewing',
        label: 'Pour-Over Coffee Ratios',
        project: 'Culinary Lab',
      },
      {
        id: 'kyoto-itinerary',
        label: '48h Walking Tour in Kyoto',
        project: 'Travel & Exploration',
      },
      {
        id: 'novel-character-arc',
        label: 'Protagonist Pacing & Conflict',
        project: 'Creative Writing',
      },
      {
        id: 'bauhaus-grid-system',
        label: 'Modern Bauhaus Grid Systems',
        project: 'Design & Architecture',
      },
      {
        id: 'quantum-computing-intro',
        label: 'Qubits & Superposition Concepts',
        project: 'Science & Astronomy',
      },
      {
        id: 'mechanical-keyboard-tuning',
        label: 'Switch Stem & Housing Acoustics',
        project: 'Productivity & Engineering',
      },
    ],
  },
  {
    title: 'Today',
    items: [
      {
        id: 'indoor-botany',
        label: 'Tropical Foliage Care Guide',
        project: 'Culinary Lab',
      },
      {
        id: 'astrophotography',
        label: 'Milky Way Long Exposure Tips',
        project: 'Science & Astronomy',
      },
      {
        id: 'dialogue-editing',
        label: 'Subtext & Character Voice',
        project: 'Creative Writing',
      },
      {
        id: 'minimalist-interior',
        label: 'Acoustic Wall Treatment',
        project: 'Design & Architecture',
      },
    ],
  },
  {
    title: 'Yesterday',
    items: [
      {
        id: 'sourdough-hydration',
        label: 'High-Hydration Country Loaf',
        project: 'Culinary Lab',
      },
      {
        id: 'patagonia-trek',
        label: 'W-Trek Gear & Shelters Checklist',
        project: 'Travel & Exploration',
      },
      {
        id: 'classical-music-theory',
        label: 'Modal Interchange & Cadences',
        project: 'Creative Writing',
      },
      {
        id: 'ergonomics-lighting',
        label: 'Circadian Lighting & Color Temp',
        project: 'Design & Architecture',
      },
    ],
  },
  {
    title: 'Previous 7 Days',
    items: [
      {
        id: 'fermentation-temperature',
        label: 'Kombucha First & Second Ferment',
        project: 'Culinary Lab',
      },
      {
        id: 'nordic-cabin-retreat',
        label: 'Lofoten Winter Itinerary',
        project: 'Travel & Exploration',
      },
      {
        id: 'screenplay-structure',
        label: 'Structuring Multi-Protagonist Plots',
        project: 'Creative Writing',
      },
      {
        id: 'optics-telescope-collimation',
        label: 'Reflector Laser Collimation',
        project: 'Science & Astronomy',
      },
    ],
  },
]

export const DEFAULT_CONVERSATIONS: Record<string, ChatMessage[]> = {
  'coffee-brewing': [
    {
      id: 'cb-1',
      role: 'user',
      content:
        'What water-to-coffee ratio do you recommend for an Ethiopian light roast on a V60 to bring out floral and citrus notes?',
    },
    {
      id: 'cb-2',
      role: 'assistant',
      content:
        'For high-altitude washed Ethiopian coffees (like Yirgacheffe or Guji), a 1:16.5 brew ratio (15g coffee to 247g water) works wonderfully.\n\nKey parameters:\n- Water temperature: 93-94°C (hot enough to extract dense floral aromatics without astringency)\n- Grind size: Medium-fine, similar to coarse sea salt\n- Pour structure: 45g bloom for 45 seconds, followed by two concentric circular pours of ~100g each.\n\nKeep the total brew time around 2m45s to 3m00s.',
      attachments: [{ type: 'code', name: 'v60-recipe.txt', size: '1.2 KB' }],
    },
  ],
  'kyoto-itinerary': [
    {
      id: 'ki-1',
      role: 'user',
      content:
        'Can you sketch a relaxed 48-hour itinerary for Kyoto focusing on Zen gardens, pottery shops, and tea houses?',
    },
    {
      id: 'ki-2',
      role: 'assistant',
      content:
        'Here is a thoughtful 48-hour walking plan that avoids peak crowds and showcases tranquil craft spaces:\n\nDay 1: Northern Higashiyama\n- 08:00: Early stroll at Honen-in (moss gates, gravel gardens)\n- 10:30: Ceramics and woodblock print ateliers along Philosopher’s Path\n- 14:00: Matcha pairing at an intimate traditional machiya\n\nDay 2: Arashiyama & Daitoku-ji\n- 08:30: Zen stone contemplation at Daitoku-ji sub-temples (Zuiho-in)\n- 13:00: Bamboo craft studio visits and seasonal kaiseki lunch.',
    },
  ],
  'novel-character-arc': [
    {
      id: 'nc-1',
      role: 'user',
      content:
        'How can I ensure my protagonist’s internal belief change is reflected through external choices in act two?',
    },
    {
      id: 'nc-2',
      role: 'assistant',
      content:
        'A powerful way to link internal transformation with plot momentum is the "Cost of the Lie" principle:\n\n1. Establish the Flawed Coping Mechanism: In early Act Two, the protagonist attempts to solve new external challenges using their old, safe worldview. It fails catastrophically.\n2. The Midpoint Revelation: Force a choice where self-preservation demands the old habit, but saving someone else requires stepping into the truth.\n3. Irreversible Action: Make them sacrifice something tangible (status, comfort, a safety net) to prove their new convictions.',
    },
  ],
  'bauhaus-grid-system': [
    {
      id: 'bg-1',
      role: 'user',
      content: 'How did Bauhaus typography and asymmetric grid structures redefine modern poster composition?',
    },
    {
      id: 'bg-2',
      role: 'assistant',
      content:
        'Bauhaus masters like Herbert Bayer and Jan Tschichold dismantled symmetrical, centered typesetting in favor of functional dynamism:\n\n- Asymmetric Equilibrium: Elements are balanced not by mirroring, but by contrasting visual weights, scales, and tensions.\n- Functional Hierarchy: Type size and weight directly communicate urgency rather than ornamental flourish.\n- Unapologetic Negative Space: Whitespace ceased being "empty leftover area" and became an active structural force guiding the eye across strict diagonal or rectilinear axes.',
    },
  ],
  'quantum-computing-intro': [
    {
      id: 'qc-1',
      role: 'user',
      content:
        'Explain how quantum superposition differs from simple probabilistic classical bits without using complex equations.',
    },
    {
      id: 'qc-2',
      role: 'assistant',
      content:
        'Imagine a standard coin:\n- When resting flat on a table, it is either definitively Heads or Tails (classical 0 or 1).\n- If you flip it into the air, while spinning, it has a probability of landing on either—but it is still fundamentally a rigid physical state awaiting measurement.\n\nA quantum bit in superposition is radically different: it is not merely an unknown coin flipping. The qubit simultaneously explores continuous mathematical coordinates on a sphere (the Bloch sphere). Interference between these possible paths can constructively amplify correct calculation outcomes while destructively cancelling incorrect paths.',
    },
  ],
  'mechanical-keyboard-tuning': [
    {
      id: 'mk-1',
      role: 'user',
      content:
        'What is the best approach to balance smooth switch travel with clean acoustic feedback on linear switches?',
    },
    {
      id: 'mk-2',
      role: 'assistant',
      content:
        'For an optimal balance of smoothness and clean acoustic return:\n\n1. Stem Lubing: Use Krytox 205g0 sparingly on the slider rails and cylindrical stem poles. A translucent haze is sufficient; excess creates sluggish mushiness.\n2. Spring Conditioning: Bag-lube or brush springs with Krytox 105 high-viscosity oil to eliminate ping without adding friction.\n3. Film Thickness: Add 0.125mm polycarbonate films if the switch housing tolerance exhibits lateral play, tightening the acoustic profile to a deep, satisfying clack.',
    },
  ],
  'indoor-botany': [
    {
      id: 'ib-1',
      role: 'user',
      content:
        'My Monstera Deliciosa has healthy new leaves, but older bottom leaves are slightly yellowing. What should I check first?',
    },
    {
      id: 'ib-2',
      role: 'assistant',
      content:
        'Check these three diagnostic points in order:\n\n1. Soil Moisture Gradient: Probe 2-3 inches deep. If wet, prolonged moisture retention is likely suffocating root tips. If dry, the plant is withdrawing nutrients from oldest foliage to sustain new growth.\n2. Light Intensity: Low indirect light causes plants to shed inefficient lower leaves.\n3. Natural Senescence: If it is only 1-2 oldest bottom leaves while new growth emerges vigorous and fenestrated, it may simply be natural shedding.',
    },
  ],
  astrophotography: [
    {
      id: 'ap-1',
      role: 'user',
      content:
        'What exposure settings and shutter speed rule should I use with a 24mm f/1.4 lens on a full-frame sensor for starscapes?',
    },
    {
      id: 'ap-2',
      role: 'assistant',
      content:
        'With a 24mm full-frame setup:\n\n- The NPF Rule recommends ~10 to 12 seconds to prevent star trailing, rather than the older 500-rule (which would give 20s and produce noticeable star streaks on modern high-megapixel sensors).\n- Aperture: Stop down slightly to f/1.8 or f/2.0 to dramatically reduce coma aberration and vignetting at the corners.\n- ISO: 1600 to 3200 depending on sensor ISO-invariance.\n- White Balance: Set manually around 3800K to 4200K for neutral deep-sky hues.',
    },
  ],
  'dialogue-editing': [
    {
      id: 'de-1',
      role: 'user',
      content:
        'How do you cut dialogue on the page so characters speak with distinct subtext without sounding overly cryptic?',
    },
    {
      id: 'de-2',
      role: 'assistant',
      content:
        'Three techniques to cultivate believable dialogue with subtext:\n\n1. Cross-Purposes: Ensure both characters enter the conversation with competing, unstated objectives. They answer each other’s unspoken intentions rather than literal words.\n2. Tactile Anchoring: Have characters interact with everyday objects (unwrapping tea, sorting keys) while talking. Physical tension mirrors emotional conflict.\n3. The Cut-Off: Cut greetings, polite sign-offs, and explanatory backstory. Begin the scene at the moment of friction and leave as soon as the power dynamic shifts.',
    },
  ],
  'minimalist-interior': [
    {
      id: 'mi-1',
      role: 'user',
      content:
        'What materials provide sound absorption in a minimalist concrete and wood studio without looking like studio foam?',
    },
    {
      id: 'mi-2',
      role: 'assistant',
      content:
        'For high acoustic damping that elevates Scandinavian or minimalist interiors:\n\n- Slatted Oak Felt Panels: Wood veneer slats mounted on high-density recycled acoustic felt (NRC rating ~0.85).\n- Heavy Linen Drapery: Floor-to-ceiling unbleached linen with 2.5x fullness absorbs high and mid-frequency flutter echoes.\n- Wool Felt Rugs & Bookshelves: Asymmetric open wood shelving filled with books acts as a natural quadratic residue diffuser.',
    },
  ],
  'sourdough-hydration': [
    {
      id: 'sh-1',
      role: 'user',
      content:
        'I want to move from 70% to 80% hydration on my country sourdough loaf. How should I adjust dough handling?',
    },
    {
      id: 'sh-2',
      role: 'assistant',
      content:
        'When jumping to 80% hydration, gluten development timing is crucial:\n\n- Hold Back Water (Bassinage): Mix at 72% initially. Once gluten develops during autolyse and initial folds, slowly drizzle in the remaining 8% water with the salt.\n- Coil Folds instead of Stretch & Folds: Coil folds preserve delicate aeration and prevent tearing the wet gluten matrix.\n- Cold Retard: A 14-hour fridge proof at 3°C stiffens the dough, making scoring and oven transfer significantly easier.',
    },
  ],
  'patagonia-trek': [
    {
      id: 'pt-1',
      role: 'user',
      content: 'What wind protection and layering strategy is required for Torres del Paine in late autumn?',
    },
    {
      id: 'pt-2',
      role: 'assistant',
      content:
        'Patagonian wind regularly exceeds 80 km/h with sudden sleet. Layering strategy:\n\n- Base Layer: 200g/m² Merino wool (temperature regulating, odor-resistant).\n- Active Mid Layer: Breathable fleece or Alpha Direct vest that vents during steep climbs.\n- Static Warmth: 800-fill down or synthetic hooded jacket for camp and summit passes.\n- Hard Shell: 3-layer Gore-Tex or Pertex Shield with helmet-compatible stiffened hood visor and pit zips.',
    },
  ],
  'classical-music-theory': [
    {
      id: 'cm-1',
      role: 'user',
      content:
        'Can you give an example of modal interchange in a C Major progression that creates an evocative, melancholic lift?',
    },
    {
      id: 'cm-2',
      role: 'assistant',
      content:
        'One of the most evocative borrowed chords is the minor iv from the parallel C Aeolian (natural minor):\n\nProgression: Cmaj7 → Em7 → Fmaj7 → Fm6 → Cmaj7\n\nWhy it works emotionally:\nThe voice leading from the A natural in Fmaj7 moving down by half-step to the Ab in Fm6, then resolving gracefully down to the G in Cmaj7, produces that bittersweet, nostalgic harmonic color frequently used in cinematic scoring.',
    },
  ],
  'ergonomics-lighting': [
    {
      id: 'el-1',
      role: 'user',
      content:
        'What is the optimal color temperature and lux ratio between screen brightness and workspace ambient light?',
    },
    {
      id: 'el-2',
      role: 'assistant',
      content:
        'To minimize pupil contraction fatigue and circadian disruption:\n\n- Ambient to Task Ratio: Ambient room light should be within 1:3 ratio of monitor brightness (approx 300-500 lux on desktop).\n- Daytime: 4500K - 5000K crisp neutral white to stimulate focus.\n- Evening: Gradually taper down to 2700K - 3000K warm incandescent glow.\n- Asymmetrical Screenbar: Mount an asymmetrical light bar over the monitor to illuminate the desk surface without causing glare on the screen glass.',
    },
  ],
  'fermentation-temperature': [
    {
      id: 'ft-1',
      role: 'user',
      content:
        'How does ambient temperature between 20°C and 26°C affect yeast vs bacteria balance during kombucha primary ferment?',
    },
    {
      id: 'ft-2',
      role: 'assistant',
      content:
        'Temperature shifts the microbial tug-of-war:\n\n- At 20°C - 22°C: Acetic acid bacteria slow down; yeast activity dominates, producing more ethanol and subtle floral notes with a prolonged 14-18 day brew cycle.\n- At 24°C - 26°C: Optimum sweet spot for balanced acetic and gluconic acid production. Acidity builds cleanly within 7-9 days.\n- Above 28°C: Bacterial overgrowth produces harsh vinegar and yeast stress.',
    },
  ],
  'nordic-cabin-retreat': [
    {
      id: 'nc-1',
      role: 'user',
      content: 'What are the essential photography locations for polar night and blue hour in the Lofoten archipelago?',
    },
    {
      id: 'nc-2',
      role: 'assistant',
      content:
        'Key coastal locations for dramatic winter lighting:\n\n1. Reine & Hamnøy: Iconic red rorbuer cabins backed by jagged Olstinden peak under twilight.\n2. Uttakleiv Beach: Smooth ocean-polished boulders contrasting with turquoise arctic surf and dramatic aurora reflections.\n3. Haukland Beach: Sheltered white sand framed by snow-covered mountain ridges.',
    },
  ],
  'screenplay-structure': [
    {
      id: 'ss-1',
      role: 'user',
      content:
        'How do ensemble dramas like Magnolia or Crash connect separate protagonist storylines without feeling fragmented?',
    },
    {
      id: 'ss-2',
      role: 'assistant',
      content:
        'Ensemble films weave divergent threads using thematic unifiers rather than purely linear causal chains:\n\n1. Thematic Spine: Every character explores a different facet of the exact same moral proposition (e.g. guilt, forgiveness, or systemic alienation).\n2. Ripple Catalysts: An event in one narrative subtly changes conditions in another without direct confrontation.\n3. Rhythmic Climax: Synchronizing emotional low points across storylines right before the third act culmination.',
    },
  ],
  'optics-telescope-collimation': [
    {
      id: 'ot-1',
      role: 'user',
      content:
        'What is the step-by-step procedure to collimate a Newtonian reflector using a Cheshire eyepiece and laser?',
    },
    {
      id: 'ot-2',
      role: 'assistant',
      content:
        'Three-step collimation sequence:\n\n1. Secondary Mirror Alignment: Center the secondary directly under the focuser drawtube so it appears as a concentric circle.\n2. Secondary Tilt: Use the laser to hit the exact center donut mark on the primary mirror.\n3. Primary Mirror Tilt: Adjust the primary mirror thumbscrews until the reflected beam returns into the central target aperture of the collimator tool.',
    },
  ],
}
