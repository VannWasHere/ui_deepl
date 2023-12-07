const Gallery = () => {
    return (
        <>
            <h2 className="text-2xl font-bold text-center">Supported Brand</h2>
            <div className="w-full flex gap-5 justify-center">
                <img className="w-32" src={"./src/images/logo_honda.svg"} alt="honda" />
                <img className="w-40" src={"./src/images/logo_kawasaki.svg"} alt="honda" />
                <img className="w-40" src={"./src/images/logo_suzuki.svg"} alt="honda" />
                <img className="w-40" src={"./src/images/logo_yamaha.svg"} alt="honda" />
            </div>
        </>
    );
}

export default Gallery;