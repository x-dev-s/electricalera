// import { env } from "@/next.config"
import { env } from 'node:process';
env.NEXT_OUTPUT_MODE = "standalone";

export const metadata = {
    title: "Admin | Electrical Era",
}
export default function RootLayout({ children }) {
    return (
        <div className='row'>
            <div id='admin-sidebarWrap' className='pt-lg-2'><div id='admin-sidebar'><h5 id='contentsHeading1' className='ps-1'></h5><div id='contents1' style={{maxHeight: "90vh"}}></div></div></div>
            <div id="admin-main-content">
                <div id="admin-header">
                    <nav className="navbar">
                        <div className="container-fluid navbar-expand-md">
                            <a href="/"><img id="logo2" src="/images/MyWebLogo2.png" alt="logo" /></a>
                            <button id="navbarToggle" className="navbar-toggler shadow-0 p-0" type="button"
                                data-bs-toggle="collapse" data-bs-target="#collapsable-nav" aria-expanded="false"
                                aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="collapsable-nav">
                                <ul id="nav-list" className="my-auto ms-auto navbar-nav">
                                    <li className="nav-item"><a className="nav-link" href="/admin">Dashboard</a></li>
                                    <li className="nav-item"><a className="nav-link" href="/admin/categories">Categories</a></li>
                                    <li className="nav-item"><a className="nav-link" href="/admin/posts">Posts</a></li>
                                    <li className="nav-item"><a className="nav-link" href="/admin/products">Products</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="py-5 container">
                    {children}
                </div>
                <div id="admin-footer">
                    <div className="container-fluid text-center">
                        <small>&copy; 2024 - Electrical Era. All Rights Reserved.</small>
                    </div>
                </div>
            </div>
        </div>
    )
}