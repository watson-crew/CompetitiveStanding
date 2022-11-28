import { WithDefaultProps, PlayerCard, Button } from "@src/../../../packages/ui";
import { useSelector } from 'react-redux'
import { selectRecentlyPlayed } from '@src/store/reducers/playerSlice'
import { User } from "@src/../../../packages/schema";

type RecentPlayersProps = WithDefaultProps<{
    onSelected: (user: User) => void,
    disabled?: number[]
}>

export default function RecentPlayers({ onSelected, disabled }: RecentPlayersProps) {
    const recentlyPlayedUsers = useSelector(selectRecentlyPlayed)

    const onClick = (user: User) => {
        onSelected(user);
    }

    const isDisabled = (id: number) => {
        if (!disabled) {
            return false;
        }
        return disabled.includes(id)
    }

    const recentlyPlayedUserCards = () => {
        return recentlyPlayedUsers.map(
            user => <PlayerCard player={user}><Button text="Add" onClick={() => onClick(user)} disabled={isDisabled(user.id)}/></PlayerCard>
        )
    }

    return (
        <section>
            <h1>Recently Played</h1>
            <div className="h-full w-full flex-row flex overflow-scroll">
                {recentlyPlayedUserCards()}
            </div>
        </section>
    )
}