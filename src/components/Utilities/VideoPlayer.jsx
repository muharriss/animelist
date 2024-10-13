"use client"

const { default: YouTube } = require("react-youtube")

const VideoPlayer = ({ youtubeId }) => {
    return (
        <div className="relative  pt-[56.25%] h-0 overflow-hidden max-w-full bg-[#000]">
            <YouTube
                className="absolute top-0 left-0 w-full h-full"
                videoId={youtubeId}
                onReady={(event) => event.target.pauseVideo()}
                opts={{ width: "100%", height: "100%" }}
            />
        </div>
    )
}

export default VideoPlayer