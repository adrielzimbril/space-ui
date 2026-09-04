'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/registry/lib/utils'
import { IconWorld, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

export const TEAMS = {
  southAfrica: { name: 'South Africa', code: 'za' },
  netherlands: { name: 'Netherlands', code: 'nl' },
  germany: { name: 'Germany', code: 'de' },
  sweden: { name: 'Sweden', code: 'se' },
  senegal: { name: 'Senegal', code: 'sn' },
  bosnia: { name: 'Bosnia and Herzegovina', code: 'ba' },
  austria: { name: 'Austria', code: 'at' },
  croatia: { name: 'Croatia', code: 'hr' },
  ivoryCoast: { name: "Côte d'Ivoire", code: 'ci' },
  ecuador: { name: 'Ecuador', code: 'ec' },
  drCongo: { name: 'DR Congo', code: 'cd' },
  algeria: { name: 'Algeria', code: 'dz' },
  ghana: { name: 'Ghana', code: 'gh' },
  australia: { name: 'Australia', code: 'au' },
  egypt: { name: 'Egypt', code: 'eg' },
  caboVerde: { name: 'Cabo Verde', code: 'cv' },
  canada: { name: 'Canada', code: 'ca' },
  morocco: { name: 'Morocco', code: 'ma' },
  paraguay: { name: 'Paraguay', code: 'py' },
  france: { name: 'France', code: 'fr' },
  usa: { name: 'USA', code: 'us' },
  belgium: { name: 'Belgium', code: 'be' },
  portugal: { name: 'Portugal', code: 'pt' },
  spain: { name: 'Spain', code: 'es' },
  brazil: { name: 'Brazil', code: 'br' },
  norway: { name: 'Norway', code: 'no' },
  mexico: { name: 'Mexico', code: 'mx' },
  england: { name: 'England', code: 'gb-eng' },
  switzerland: { name: 'Switzerland', code: 'ch' },
  colombia: { name: 'Colombia', code: 'co' },
  argentina: { name: 'Argentina', code: 'ar' },
  japan: { name: 'Japan', code: 'jp' },
} as const

type Team = (typeof TEAMS)[keyof typeof TEAMS]

type MatchStatus = 'upcoming' | 'live' | 'finished'
type MatchWinner = 'home' | 'away'

interface MatchTeam {
  team: Team
  score: number | null
  penalties?: number
}

interface Match {
  id: string
  date: string
  time?: string
  status: MatchStatus
  home: MatchTeam
  away: MatchTeam
  winner?: MatchWinner
}

interface Round {
  name: string
  matches: Match[]
}

const rounds: Round[] = [
  {
    name: 'Round of 32',
    matches: [
      {
        id: 'r32-1',
        date: 'Mon, 29 Jun',
        status: 'finished',
        home: { team: TEAMS.southAfrica, score: 0 },
        away: { team: TEAMS.canada, score: 1 },
        winner: 'away',
      },
      {
        id: 'r32-2',
        date: 'Tue, 30 Jun',
        status: 'finished',
        home: { team: TEAMS.netherlands, score: 1, penalties: 2 },
        away: { team: TEAMS.morocco, score: 1, penalties: 3 },
        winner: 'away',
      },
      {
        id: 'r32-3',
        date: 'Tue, 30 Jun',
        status: 'finished',
        home: { team: TEAMS.germany, score: 1, penalties: 3 },
        away: { team: TEAMS.paraguay, score: 1, penalties: 4 },
        winner: 'away',
      },
      {
        id: 'r32-4',
        date: 'Wed, 1 Jul',
        status: 'finished',
        home: { team: TEAMS.france, score: 3 },
        away: { team: TEAMS.sweden, score: 0 },
        winner: 'home',
      },
      {
        id: 'r32-5',
        date: 'Thu, 2 Jul',
        status: 'finished',
        home: { team: TEAMS.belgium, score: 3 },
        away: { team: TEAMS.senegal, score: 2 },
        winner: 'home',
      },
      {
        id: 'r32-6',
        date: 'Thu, 2 Jul',
        status: 'finished',
        home: { team: TEAMS.usa, score: 2 },
        away: { team: TEAMS.bosnia, score: 0 },
        winner: 'home',
      },
      {
        id: 'r32-7',
        date: 'Fri, 3 Jul',
        status: 'finished',
        home: { team: TEAMS.spain, score: 3 },
        away: { team: TEAMS.austria, score: 0 },
        winner: 'home',
      },
      {
        id: 'r32-8',
        date: 'Fri, 3 Jul',
        status: 'finished',
        home: { team: TEAMS.portugal, score: 2 },
        away: { team: TEAMS.croatia, score: 1 },
        winner: 'home',
      },
      {
        id: 'r32-9',
        date: 'Mon, 29 Jun',
        status: 'finished',
        home: { team: TEAMS.brazil, score: 2 },
        away: { team: TEAMS.japan, score: 1 },
        winner: 'home',
      },
      {
        id: 'r32-10',
        date: 'Tue, 30 Jun',
        status: 'finished',
        home: { team: TEAMS.ivoryCoast, score: 1 },
        away: { team: TEAMS.norway, score: 2 },
        winner: 'away',
      },
      {
        id: 'r32-11',
        date: 'Wed, 1 Jul',
        status: 'finished',
        home: { team: TEAMS.mexico, score: 2 },
        away: { team: TEAMS.ecuador, score: 0 },
        winner: 'home',
      },
      {
        id: 'r32-12',
        date: 'Wed, 1 Jul',
        status: 'finished',
        home: { team: TEAMS.england, score: 2 },
        away: { team: TEAMS.drCongo, score: 1 },
        winner: 'home',
      },
      {
        id: 'r32-13',
        date: 'Fri, 3 Jul',
        status: 'finished',
        home: { team: TEAMS.switzerland, score: 2 },
        away: { team: TEAMS.algeria, score: 0 },
        winner: 'home',
      },
      {
        id: 'r32-14',
        date: 'Sat, 4 Jul',
        status: 'finished',
        home: { team: TEAMS.colombia, score: 1 },
        away: { team: TEAMS.ghana, score: 0 },
        winner: 'home',
      },
      {
        id: 'r32-15',
        date: 'Fri, 3 Jul',
        status: 'finished',
        home: { team: TEAMS.australia, score: 1, penalties: 2 },
        away: { team: TEAMS.egypt, score: 1, penalties: 4 },
        winner: 'away',
      },
      {
        id: 'r32-16',
        date: 'Sat, 4 Jul',
        status: 'finished',
        home: { team: TEAMS.argentina, score: 3 },
        away: { team: TEAMS.caboVerde, score: 2 },
        winner: 'home',
      },
    ],
  },
  {
    name: 'Round of 16',
    matches: [
      {
        id: 'r16-1',
        date: 'Sat, 4 Jul',
        status: 'finished',
        home: { team: TEAMS.canada, score: 0 },
        away: { team: TEAMS.morocco, score: 3 },
        winner: 'away',
      },
      {
        id: 'r16-2',
        date: 'Sun, 5 Jul',
        status: 'finished',
        home: { team: TEAMS.paraguay, score: 0 },
        away: { team: TEAMS.france, score: 1 },
        winner: 'away',
      },
      {
        id: 'r16-3',
        date: 'Mon, 6 Jul',
        status: 'finished',
        home: { team: TEAMS.usa, score: 1 },
        away: { team: TEAMS.belgium, score: 4 },
        winner: 'away',
      },
      {
        id: 'r16-4',
        date: 'Mon, 6 Jul',
        status: 'finished',
        home: { team: TEAMS.portugal, score: 0 },
        away: { team: TEAMS.spain, score: 1 },
        winner: 'away',
      },
      {
        id: 'r16-5',
        date: 'Mon, 6 Jul',
        status: 'finished',
        home: { team: TEAMS.brazil, score: 1 },
        away: { team: TEAMS.norway, score: 2 },
        winner: 'away',
      },
      {
        id: 'r16-6',
        date: 'Mon, 6 Jul',
        status: 'finished',
        home: { team: TEAMS.mexico, score: 2 },
        away: { team: TEAMS.england, score: 3 },
        winner: 'away',
      },
      {
        id: 'r16-7',
        date: 'Tue, 7 Jul',
        status: 'finished',
        home: { team: TEAMS.switzerland, score: 0, penalties: 4 },
        away: { team: TEAMS.colombia, score: 0, penalties: 3 },
        winner: 'home',
      },
      {
        id: 'r16-8',
        date: 'Tue, 7 Jul',
        status: 'finished',
        home: { team: TEAMS.argentina, score: 3 },
        away: { team: TEAMS.egypt, score: 2 },
        winner: 'home',
      },
    ],
  },
  {
    name: 'Quarter-finals',
    matches: [
      {
        id: 'qf-1',
        date: 'Fri, 10 Jul',
        time: '4:00 am',
        status: 'finished',
        home: { team: TEAMS.france, score: 2 },
        away: { team: TEAMS.morocco, score: 0 },
        winner: 'home',
      },
      {
        id: 'qf-2',
        date: 'Sat, 11 Jul',
        time: '3:00 am',
        status: 'finished',
        home: { team: TEAMS.spain, score: 2 },
        away: { team: TEAMS.belgium, score: 1 },
        winner: 'home',
      },
      {
        id: 'qf-3',
        date: 'Sun, 12 Jul',
        time: '5:00 am',
        status: 'finished',
        home: { team: TEAMS.norway, score: 1 },
        away: { team: TEAMS.england, score: 2 },
        winner: 'away',
      },
      {
        id: 'qf-4',
        date: 'Sun, 12 Jul',
        time: '10:00 am',
        status: 'finished',
        home: { team: TEAMS.argentina, score: 3 },
        away: { team: TEAMS.switzerland, score: 1 },
        winner: 'home',
      },
    ],
  },
  {
    name: 'Semi-finals',
    matches: [
      {
        id: 'sf-1',
        date: 'Wed, 15 Jul',
        time: '4:00 am',
        status: 'finished',
        home: { team: TEAMS.france, score: 1 },
        away: { team: TEAMS.spain, score: 2 },
        winner: 'away',
      },
      {
        id: 'sf-2',
        date: 'Thu, 16 Jul',
        time: '3:00 am',
        status: 'finished',
        home: { team: TEAMS.england, score: 1 },
        away: { team: TEAMS.argentina, score: 3 },
        winner: 'away',
      },
    ],
  },
  {
    name: 'Final',
    matches: [
      {
        id: 'f-1',
        date: 'Mon, 20 Jul',
        time: '3:00 am',
        status: 'finished',
        home: { team: TEAMS.spain, score: 1 },
        away: { team: TEAMS.argentina, score: 0 },
        winner: 'home',
      },
    ],
  },
]

const uTransition: any = { duration: 0.5, ease: [0.4, 0, 0.2, 1] }

const Flag = ({ team }: any) => {
  return team ? (
    <img
      src={`https://flagcdn.com/w80/${team.code}.png`}
      alt={`${team.name} flag`}
      className="border-border/40 h-5 w-7 rounded-[4px] border object-cover"
      loading="lazy"
      draggable={false}
    />
  ) : (
    <span className="flex h-5 w-7 items-center justify-center">
      <IconWorld className="text-muted-foreground/50 h-5 w-5" />
    </span>
  )
}

const TeamScore = ({ side, isWinner, isFinished }: any) => {
  const isLoser = isFinished && !isWinner
  return (
    <div className="flex items-center gap-3">
      <Flag team={side.team} />
      <span className={cn('flex-1 truncate text-base font-medium', isLoser && 'text-muted-foreground')}>
        {side.team?.name ?? 'TBD'}
      </span>
      {side.score !== null && (
        <span className={cn('text-base font-medium tabular-nums', isLoser && 'text-muted-foreground')}>
          {side.score}
          {side.penalties !== undefined && ` (${side.penalties})`}
        </span>
      )}
      <span
        className={cn(
          'border-y-4 border-r-[6px] border-y-transparent',
          isWinner ? 'border-r-foreground' : 'border-r-transparent',
        )}
      />
    </div>
  )
}

const MatchBox = ({ match }: any) => {
  const isFinished = match.status === 'finished'
  return (
    <div
      style={{ width: 250, height: 124 }}
      className="border-border/60 bg-muted/20 hover:border-border rounded-2xl border p-4 transition-colors"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-muted-foreground text-sm leading-5">
          {match.date}
          {match.time ? `, ${match.time}` : ''}
        </span>
        {isFinished && (
          <span className="bg-muted/20 text-muted-foreground rounded-full px-2.5 text-xs font-medium leading-5">
            FT{match.home.penalties !== undefined && ' (P)'}
          </span>
        )}
      </div>
      <div className="space-y-2.5">
        <TeamScore side={match.home} isWinner={match.winner === 'home'} isFinished={isFinished} />
        <TeamScore side={match.away} isWinner={match.winner === 'away'} isFinished={isFinished} />
      </div>
    </div>
  )
}

const Clock = () => {
  const [time, setTime] = useState(() => new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  const formattedTime = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Singapore',
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(time),
    [time],
  )
  return (
    <p className="text-muted-foreground text-sm italic">
      All times are in UTC+8 · Current time:{' '}
      <time dateTime={time.toISOString()} className="tabular-nums not-italic">
        {formattedTime}
      </time>
    </p>
  )
}

const BracketContainer = ({ tournamentRounds, initialRound = 1, className }: any) => {
  const maxRound = Math.max(0, tournamentRounds.length - 2)
  const [currentRound, setCurrentRound] = useState(() => Math.min(Math.max(initialRound, 0), maxRound))

  const getXPos = (rIdx: number) => 20 + (rIdx - currentRound) * 290

  const yPositions = useMemo(() => {
    const pos: number[][] = tournamentRounds.map(() => [])
    pos[currentRound] = tournamentRounds[currentRound].matches.map((_: any, i: number) => 156 * i + 62)
    for (let r = currentRound + 1; r < tournamentRounds.length; r++) {
      pos[r] = tournamentRounds[r].matches.map((_: any, i: number) => (pos[r - 1][2 * i] + pos[r - 1][2 * i + 1]) / 2)
    }
    for (let r = currentRound - 1; r >= 0; r--) {
      pos[r] = tournamentRounds[r].matches.map((_: any, i: number) => pos[r + 1][Math.floor(i / 2)])
    }
    return pos
  }, [tournamentRounds, currentRound])

  const containerHeight = 156 * tournamentRounds[currentRound].matches.length - 32

  return (
    <div className={cn('w-full', className)} style={{ maxWidth: 850 }}>
      <div className="relative mb-6 h-10 overflow-hidden">
        <motion.button
          type="button"
          aria-label="Previous round"
          onClick={() => setCurrentRound((prev) => Math.max(0, prev - 1))}
          animate={{ opacity: currentRound > 0 ? 1 : 0 }}
          transition={uTransition}
          className={cn(
            'text-foreground hover:bg-muted/20 absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full transition-colors',
            currentRound === 0 && 'pointer-events-none',
          )}
        >
          <IconChevronLeft className="h-5 w-5" />
        </motion.button>
        <motion.button
          type="button"
          aria-label="Next round"
          onClick={() => setCurrentRound((prev) => Math.min(maxRound, prev + 1))}
          animate={{ opacity: currentRound < maxRound ? 1 : 0 }}
          transition={uTransition}
          className={cn(
            'text-foreground hover:bg-muted/20 absolute right-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full transition-colors',
            currentRound >= maxRound && 'pointer-events-none',
          )}
        >
          <IconChevronRight className="h-5 w-5" />
        </motion.button>

        {tournamentRounds.map((round: any, idx: number) => (
          <motion.div
            key={round.name}
            initial={false}
            animate={{ x: getXPos(idx), opacity: idx >= currentRound && idx < currentRound + 3 ? 1 : 0 }}
            transition={uTransition}
            style={{ width: 250 }}
            className="absolute top-0 flex h-10 items-center justify-center"
          >
            <span className="text-base font-medium">{round.name}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={false}
        animate={{ height: containerHeight }}
        transition={uTransition}
        className="relative overflow-hidden"
      >
        {tournamentRounds.map((round: any, rIdx: number) =>
          round.matches.map((match: any, mIdx: number) => (
            <motion.span
              key={`stub-${match.id}`}
              initial={false}
              animate={{ x: getXPos(rIdx) - 20, y: yPositions[rIdx][mIdx], opacity: rIdx === currentRound ? 1 : 0 }}
              transition={uTransition}
              style={{ width: 20 }}
              className="bg-border/60 absolute left-0 top-0 h-px"
            />
          )),
        )}

        {tournamentRounds.map((round: any, rIdx: number) =>
          rIdx === 0
            ? null
            : round.matches.map((match: any, mIdx: number) => {
                const yTop = yPositions[rIdx - 1][2 * mIdx]
                const height = yPositions[rIdx - 1][2 * mIdx + 1] - yTop
                return (
                  <motion.div
                    key={`elbow-${match.id}`}
                    initial={false}
                    animate={{
                      x: getXPos(rIdx - 1) + 250,
                      y: yTop,
                      height: Math.max(height, 1),
                      opacity: rIdx > currentRound ? 1 : 0,
                    }}
                    transition={uTransition}
                    style={{ width: 20 }}
                    className="border-border/60 absolute left-0 top-0 rounded-r-xl border-y border-r"
                  >
                    <span style={{ width: 20 }} className="bg-border/60 absolute left-full top-1/2 h-px" />
                  </motion.div>
                )
              }),
        )}

        {tournamentRounds.map((round: any, rIdx: number) =>
          round.matches.map((match: any, mIdx: number) => (
            <motion.div
              key={match.id}
              initial={false}
              animate={{ x: getXPos(rIdx), y: yPositions[rIdx][mIdx] - 62, opacity: rIdx >= currentRound ? 1 : 0 }}
              transition={uTransition}
              className={cn('absolute left-0 top-0', rIdx < currentRound && 'pointer-events-none')}
            >
              <MatchBox match={match} />
            </motion.div>
          )),
        )}
      </motion.div>

      <div className="border-border/60 mt-10 border-t pt-6">
        <Clock />
      </div>
    </div>
  )
}

export const TournamentBracket = () => (
  <div className="text-foreground h-full w-full overflow-y-auto">
    <div className="py-22 mx-auto flex max-w-6xl flex-col items-center justify-center px-6">
      <BracketContainer tournamentRounds={rounds} initialRound={2} />
    </div>
  </div>
)
