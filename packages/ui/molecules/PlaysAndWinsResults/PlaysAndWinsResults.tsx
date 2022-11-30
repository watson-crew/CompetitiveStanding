import { WithDefaultProps } from "../../types"
import Text from "../../atoms/Text/Text"
import { IoMdTrophy } from 'react-icons/io'
import { IoLogoGameControllerB } from 'react-icons/io'

type PlaysAndWinsResultsProps = WithDefaultProps<{
    gamesPlayed: number,
    gamesWon: number,
    fullVersion: boolean
  }>


export default function PlaysAndWinsResults({ className, gamesPlayed, gamesWon, fullVersion = false}: PlaysAndWinsResultsProps) {

    return (
        <div className={className}>
            {fullVersion &&
            <section>
                <Text type='h2' className='text-sky-500 dark:text-sky-400'><span><IoMdTrophy/>{gamesWon}</span></Text>
                <Text type='p' className='text-[#ff3e00] font-bold'><span><IoLogoGameControllerB/>{gamesPlayed}</span></Text>
            </section>
            }
            {!fullVersion &&
            <section>
                <Text type='h3' className='text-sky-500 dark:text-sky-400'>
                    <span className="text-sky-500 dark:text-sky-400">{gamesWon}</span> / <span className="text-[#ff3e00] font-bold">{gamesPlayed}</span>
                </Text>
            </section>
          }
        </div>

    )
}