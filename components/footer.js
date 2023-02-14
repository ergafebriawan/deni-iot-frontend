export default function Footer() {
    const date = new Date();
    return (
        <>
            <hr className="mt-5 mx-3 bg-gray-900" />
            <p className="text-center mt-5 pb-5 font-semibold">built @TA {date.getFullYear()}</p>
        </>
    );
}