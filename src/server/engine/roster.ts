import got from 'got'

type TeamInfo = {
  teamName: string
  score: number
  tier: number
  newscore: number
  rank: number
  percent: string
}

type FantasyProsResponse = {
  standings: TeamInfo[]
}

const url =
  'https://mpbnfl.fantasypros.com/api/getLeagueAnalysisJSON?key=nfl~5f3bbb1f-ee23-44e2-b758-02bac1337546&period=ros'

const getFantasyProsData = async (): Promise<FantasyProsResponse> => {
  const data = await got(url).json()
  return data as FantasyProsResponse
}

export const getRosterStrength = async () => {
  const { standings } = await getFantasyProsData()
  return standings.map(({ teamName, score, rank, percent }) => {
    const [formattedPercent] = percent.split('.')
    return { teamName, score, rank, percent: Number(formattedPercent) }
  })
}
