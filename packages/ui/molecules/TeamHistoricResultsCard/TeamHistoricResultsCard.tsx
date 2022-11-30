
import { Team, TeamHistoricResult } from 'schema';
import { twMerge } from 'tailwind-merge';
import { WithDefaultProps } from '../../types';
import Card from "../../atoms/Card/Card"
import PlayerCard from "../../molecules/PlayerCard/PlayerCard"
import Text from "../../atoms/Text/Text"
import TextWithIcon from '../TextWithIcon/TextWithIcon';
import { Button } from '../..';
import { CommonIcons } from '../../types/icons'
import WithScrollbar from '../../atoms/WithScrollbar/WithScrollbar';

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

            <WithScrollbar className="flex-grow items-center">
                {team.players.map((player) => <PlayerCard player={player} className="h-1/2"/>)}
            </WithScrollbar>

            <Button onClick={setAsWinner} text="Mark as Winner" className="w-fit flex-none"/>
        </Card>
    )
}