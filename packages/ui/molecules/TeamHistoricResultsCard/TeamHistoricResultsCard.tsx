
import { Team, TeamHistoricResult } from 'schema';
import { twMerge } from 'tailwind-merge';
import { WithDefaultProps } from '../../types';
import Card from "../../atoms/Card/Card"
import PlayerCard from "../../molecules/PlayerCard/PlayerCard"
import Text from "../../atoms/Text/Text"
import TextWithIcon from '../TextWithIcon/TextWithIcon';
import { AiOutlineTrophy } from 'react-icons/ai'
import { Button } from '../..';

type TeamHistoricResultsProps = WithDefaultProps<{
    team: Team,
    historicResults: TeamHistoricResult,
    setAsWinner: () => void
}>

export default function TeamHistoricResultsCard({team, historicResults, setAsWinner, className}: TeamHistoricResultsProps) {

    const containerClasses = twMerge("bg-slate-100 w-full min-h-full h-full flex justify-center items-center flex-col", className)

    return (
        <Card className={containerClasses}>
            <div className="flex">
                <Text type="h1">{team.cumulativeTeamId}</Text>
                <TextWithIcon
                    icon={AiOutlineTrophy}
                    textProps={{type:"h3", className:"text-3xl"}}
                    iconProps={{size: 50}}
                >
                    {historicResults.wins}
                </TextWithIcon>
            </div>
            <div className="flex">
                {team.players.map((player) => <PlayerCard player={player}/>)}
            </div>
            <Button onClick={setAsWinner} text="Mark as Winner"/>
        </Card>
    )
}