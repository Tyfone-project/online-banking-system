import { useNavigate } from 'react-router-dom';


const NavigationBar = () => {

    const navigate = useNavigate();

    const LogoutHandler = () => {
        sessionStorage.clear();
        navigate("/");
    }


    return (
        <nav className="navbar navbar-expand-lg py-0 fixed-top" style={{ backgroundColor: "Black" }}>

            <div className="container">
                <a href="/" className="navbar-brand" style={{ color: "white" }}>Online Banking System</a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navmenu">
                    <ul className="navbar-nav ms-auto">
                        <div class="btn-group mx-auto">
                            <li class="nav-item">
                                <button className="btn btn-primary w-75" onClick={LogoutHandler}>Logout</button>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavigationBar;