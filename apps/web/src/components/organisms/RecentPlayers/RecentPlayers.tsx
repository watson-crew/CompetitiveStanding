import { WithDefaultProps, PlayerCard } from "@src/../../../packages/ui";
import { useSelector } from 'react-redux'
import { selectRecentlyPlayed } from '@src/store/reducers/playerSlice'
import { User } from "@src/../../../packages/schema";

type RecentPlayersProps = WithDefaultProps<{
    onSelected: (user: User) => void
}>

export default function RecentPlayers({ onSelected }: RecentPlayersProps) {
    const recentlyPlayedUsers = useSelector(selectRecentlyPlayed)

    const onClick = (user: User) => {
        onSelected(user);
    }

    const recentlyPlayedUserCards = () => {
        return recentlyPlayedUsers.map(
            user => <div onClick={() => onClick(user)}><PlayerCard player={user} /></div>
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