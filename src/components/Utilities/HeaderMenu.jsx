const HeaderMenu = ({title}) => {
    return (
        <div className="flex justify-start items-start py-3 pt-6 px-3">
            <p className="font-bold text-xl border-l-4 border-[#1e88e5] pl-3">{title}</p>
        </div>
    )
}

export default HeaderMenu