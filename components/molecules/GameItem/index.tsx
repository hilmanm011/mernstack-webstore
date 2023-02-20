import Image from "next/image"
import Link from "next/link"
interface GameItemProps {
    thumbnail: string,
    title: string,
    category: string,
    id: string
}
const GameItem = (props: GameItemProps) => {
    const { thumbnail, title, category,id } = props
    const ROOT_IMG = process.env.NEXT_PUBLIC_IMG
    const myLoader = ({ src, width, quality }) => {
        return `${ROOT_IMG}/${src}?w=${width}&q=${quality || 75}`
    }
    return (
        <div className="featured-game-card position-relative">
            <Link href={`/detail/${id}`} legacyBehavior>
                <a>
                    <div className="blur-sharp">
                        <Image className="thumbnail" loader={myLoader} src={`${thumbnail}`} width={205} height={270} alt="" />
                    </div>
                    <div className="cover position-absolute bottom-0 m-32">
                        <div className="d-flex flex-column h-100 justify-content-between text-decoration-none">
                            <div className="game-icon mx-auto">
                                <Image src="/icon/console.svg" width={54} height={36} alt="console" />
                            </div>
                            <div>
                                <p className="fw-semibold text-white text-xl m-0">{title}</p>
                                <p className="fw-light text-white m-0">{category}</p>
                            </div>
                        </div>
                    </div>
                </a>
            </Link>

        </div>
    )
}

export default GameItem