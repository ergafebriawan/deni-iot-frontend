import Link from "next/link";
import { Navbar, Dropdown} from "flowbite-react";
import nookies from 'nookies';
import { useRouter } from "next/router";

export default function MainNavbar(props) {
    const state = props.active;
    let home = '';
    let control = '';
    const route = useRouter();

    if(state == "home"){
        home = "text-amber-400";
        control = "text-gray-900"
    }else if (state == "control"){
        control = "text-amber-400";
        home = "text-gray-900";
    }else{
        control = "text-gray-900";
        home = "text-gray-900";
    }

    const doLogout = () => {
        nookies.destroy(null, 'token');
        route.replace('/login');
      } 

    return (
        <>
            <header className="sticky top-0 -mr-1 z-20">
                <Navbar fluid>
                    <Navbar.Brand href="/">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={40}
                            height={40}
                            fill="#4b5563"
                            className="bi bi-cpu-fill mx-auto ml-2"
                            viewBox="0 0 16 16"
                        >
                            <path d="M6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                            <path d="M5.5.5a.5.5 0 0 0-1 0V2A2.5 2.5 0 0 0 2 4.5H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2A2.5 2.5 0 0 0 4.5 14v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14a2.5 2.5 0 0 0 2.5-2.5h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14A2.5 2.5 0 0 0 11.5 2V.5a.5.5 0 0 0-1 0V2h-1V.5a.5.5 0 0 0-1 0V2h-1V.5a.5.5 0 0 0-1 0V2h-1V.5zm1 4.5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3A1.5 1.5 0 0 1 6.5 5z" />
                        </svg>
                    </Navbar.Brand>
                    <div className="flex">
                        <Link href="/"><h5 className={`${home} font-semibold mx-3`}>Report</h5></Link>
                        <Link href="/control"><h5 className={`${control} font-semibold mx-3`}>Control</h5></Link>
                    </div>
                    <div className="flex mr-2">
                        <Dropdown
                            inline
                            label={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={30}
                                    height={30}
                                    fill="#4b5563"
                                    className="bi bi-person-circle"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                                    />
                                </svg>

                            }
                        >
                            <Dropdown.Item><Link href="/profile">Profile</Link></Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item><button onClick={doLogout}>Sign out</button></Dropdown.Item>
                        </Dropdown>
                    </div>
                </Navbar>
            </header>
        </>
    );
}