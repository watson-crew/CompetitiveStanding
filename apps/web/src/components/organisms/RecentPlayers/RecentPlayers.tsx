import { WithDefaultProps, PlayerCard } from "@src/../../../packages/ui";
import { useSelector } from 'react-redux'
import { selectRecentlyPlayed } from '@src/store/reducers/playerSlice'

type RecentPlayersProps = WithDefaultProps<{}>

export default function RecentPlayers({}: RecentPlayersProps) {
    const recentlyPlayedUsers = useSelector(selectRecentlyPlayed)

    const recentlyPlayedUserCards = () => {
        return recentlyPlayedUsers.map(user => <PlayerCard player={user} />)
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