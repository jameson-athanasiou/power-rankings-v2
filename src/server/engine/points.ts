import { getHeadToHeadMatchupsByWeek, RosterSettings } from '@jathanasiou/sleeper-api'
import { leagueId } from '../config'

export const getPointsScoredByTeamByWeek = async (currentWeek: number) => {
  const calls = Array.from(Array(currentWeek)).map((_, index) => {
    return getHeadToHeadMatchupsByWeek(leagueId, index + 1)
  })

  const allMatchups = await Promise.all(calls)

  const matchupsByWeek = allMatchups.map((matchups) => {
    const points = matchups.map(([team1, team2]) => {
      return [{ [team1.roster_id]: team1.points }, { [team2.roster_id]: team2.points }]
    })

    return points
  })

  return matchupsByWeek.map((week) => week.flat())
}

export const getPointsFor = (team: RosterSettings) => Number(`${team.fpts}.${team.fpts_decimal}`)
export const getPointsAgainst = (team: RosterSettings) => Number(`${team.fpts_against}.${team.fpts_against_decimal}`)
