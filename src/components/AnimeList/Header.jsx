import Link from "next/link"

const Header = ({ title, LinkHref, LinkTitle }) => {
    return (
        <div className="flex justify-between p-3 sm:py-6 py-3">
            <h1 className="font-bold text-xl">{title}</h1>
            {LinkHref && LinkTitle
                ?
                <Link href={LinkHref} className="transition-all hover:text-[#1e88e5]">
                    {LinkTitle}
                </Link>
                : null
            }
        </div>
    )
}

export default Header