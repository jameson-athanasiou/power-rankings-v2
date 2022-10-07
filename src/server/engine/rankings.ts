import { getRosters, getUsersByLeague } from '@jathanasiou/sleeper-api'
import { calculateOverallRecord } from './record'
import { getPointsAgainst, getPointsFor, getPointsScoredByTeamByWeek } from './points'
import { getRosterStrength } from './roster'
import { leagueId } from '../config'

const buildTeamData = async () => {
  const users = await getUsersByLeague(leagueId)
  const rosters = await getRosters(leagueId)

  return rosters.map((roster) => {
    const matchingUser = users.find(({ user_id }) => user_id === roster.owner_id)
    return {
      ...roster,
      owner: {
        ...matchingUser,
        teamName: matchingUser?.metadata.team_name,
      },
    }
  })
}

export const buildData = async () => {
  const combinedData = await buildTeamData()
  const weeklyPoints = await getPointsScoredByTeamByWeek(3)
  const rosterStrengthData = await getRosterStrength()

  const formattedData = combinedData.map((team) => {
    const [overallWins, overallLosses] = calculateOverallRecord(weeklyPoints, team.roster_id)
    const { score } = rosterStrengthData.find(({ teamName }) => teamName === team.owner.teamName) || {}

    const dataPoints = {
      wins: team.settings.wins,
      losses: team.settings.losses,
      pointsFor: getPointsFor(team.settings),
      pointsAgainst: getPointsAgainst(team.settings),
      overallWins,
      overallLosses,
      rosterStrength: score,
      playoffOdds: null,
      luckFactor: null,
    }

    return { ...team, powerRankingsData: dataPoints }
  })

  return formattedData
}

export const generateRankings = async () => {
  const combinedData = await buildData()

  return combinedData.sort((rosterA, rosterB) => {
    const { wins: winsA } = rosterA.powerRankingsData
    const { wins: winsB } = rosterB.powerRankingsData
    if (winsA < winsB) return -1
    if (winsA > winsB) return -1
    return 0
  })
}
