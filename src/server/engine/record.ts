export const calculateOverallRecord = (weeklyPoints: Record<string, number>[][], rosterId: number) => {
  let wins = 0
  let losses = 0

  weeklyPoints.forEach((week) => {
    const team = week.find((entry) => entry[rosterId])

    if (!team) throw new Error('Cannot calculate overall wins')
    const teamPoints = team[rosterId]

    const pointValues = week.map((entry) => Object.values(entry)[0])

    const weekWins = pointValues.reduce((acc, curr) => {
      if (teamPoints > curr) return acc + 1
      return acc
    }, 0)

    wins += weekWins
    losses += week.length - 1 - weekWins
  })

  return [wins, losses]
}
