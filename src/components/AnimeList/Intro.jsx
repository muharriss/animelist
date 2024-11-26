const Intro = ({upcoming}) => {
  return (
    <div className="overflow-hidden rounded-md mt-5">
        <img
          src={upcoming.data[2].trailer.images.maximum_image_url} className="h-[50vh] w-screen max-w-[950px] object-cover "
          alt={upcoming.data[3].trailer.images.large_image_url}
       />
      </div>
  )
}

export default Intro