"use client"

const Notif = ({ notif_text, isVisible }) => {

    return (
        <div className={`fixed z-10 top-32 bg-gray-800 text-white px-6 py-3 rounded shadow-lg transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <p>{notif_text}</p>
        </div>
    )
}

export default Notif