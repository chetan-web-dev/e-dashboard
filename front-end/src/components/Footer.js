import React from "react";

const Footer = () => {
    const date = new Date();
    return (
        <footer className="text-center text-lg-start bg-skyblue text-white">
            <section>
                <div className="row">
                    <section className="p-3 pt-0">
                        <div className="row d-flex align-items-center">
                            <div className="col-md-12 col-lg-12 text-center text-md-start">
                                <div className="p-3 text-center">
                                    © {date.getFullYear()} Copyright:&nbsp;
                                    <a className="text-white" href="/">
                                        E-comm Dashboard</a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </footer>

    )
};

export default Footer;








