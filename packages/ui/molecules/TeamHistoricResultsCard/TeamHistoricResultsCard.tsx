
import { Team, TeamHistoricResult } from 'schema';
import { twMerge } from 'tailwind-merge';
import { WithDefaultProps } from '../../types';
import Card from "../../atoms/Card/Card"
import PlayerCard from "../../molecules/PlayerCard/PlayerCard"
import Text from "../../atoms/Text/Text"
import TextWithIcon from '../TextWithIcon/TextWithIcon';
import { Button } from '../..';
import { CommonIcons } from '../../types/icons'

type TeamHistoricResultsProps = WithDefaultProps<{
    team: Team,
    historicResults: TeamHistoricResult,
    setAsWinner: () => void
}>

export default function TeamHistoricResultsCard({team, historicResults, setAsWinner, className}: TeamHistoricResultsProps) {

    const containerClasses = twMerge("bg-slate-100 flex flex-col items-center justify-center", className)

    return (
        <Card className={containerClasses}>
            <div className="flex-none flex mb-10">
                <Text type="h1">{team.cumulativeTeamId}</Text>
                <TextWithIcon
                    icon={CommonIcons.Trophy}
                    textProps={{type:"h3", className:"text-3xl"}}
                    iconProps={{size: 50}}
                >
                    {historicResults.wins}
                </TextWithIcon>
            </div>

            <div className="flex-grow items-center justify-center flex w-full space-x-4 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {team.players.map((player) => <PlayerCard player={player} className="h-1/2"/>)}
            </div>
            <Button onClick={setAsWinner} text="Mark as Winner" className="w-fit flex-none"/>
        </Card>
    )
}