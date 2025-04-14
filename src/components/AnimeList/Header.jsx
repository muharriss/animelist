import Link from "next/link"

const Header = ({ title, LinkHref, LinkTitle }) => {
    return (
        <div className="flex justify-between p-3 pt-6 sm:py-6 ">
            <h1 className="font-bold text-xl border-l-4 border-[#1e88e5] pl-3">{title}</h1>
            {LinkHref && LinkTitle
                ?
                <Link href={LinkHref} className="transition-all text-[#1e88e5] hover:text-[#1e88e5c5]">
                    {LinkTitle}
                </Link>
                : null
            }
        </div>
    )
}

export default Header