import React from "react";

const Footer = () => {
    const date = new Date();
    return (
        <footer className="text-center text-lg-start bg-skyblue text-white">
            {/* <div className="container p-4 pb-0"> */}
                <section>
                    <div className="row">
                        {/* <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">
                                Company name
                            </h6>
                            <p>
                                Here you can use rows and columns to organize your footer
                                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                                elit.
                            </p>
                        </div>
                        <hr className="w-100 clearfix d-md-none" />
                        <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
                            <p>
                                <a className="text-white" href="#">MDBootstrap</a>
                            </p>
                            <p>
                                <a className="text-white" href="#">MDWordPress</a>
                            </p>
                            <p>
                                <a className="text-white" href="#">BrandFlow</a>
                            </p>
                            <p>
                                <a className="text-white" href="#">Bootstrap Angular</a>
                            </p>
                        </div>
                        <hr className="w-100 clearfix d-md-none" />
                        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h6 class="text-uppercase mb-4 font-weight-bold">
                                Useful links
                            </h6>
                            <p>
                                <a className="text-white" href="#">Your Account</a>
                            </p>
                            <p>
                                <a className="text-white" href="#">Become an Affiliate</a>
                            </p>
                            <p>
                                <a className="text-white" href="#">Shipping Rates</a>
                            </p>
                            <p>
                                <a className="text-white" href="#">Help</a>
                            </p>
                        </div>
                        <hr className="w-100 clearfix d-md-none" />
                        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                            <p><i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                            <p><i className="fas fa-envelope mr-3"></i> info@gmail.com</p>
                            <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                            <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
                        </div>
                        <hr class="my-3"></hr> */}
                        <section class="p-3 pt-0">
                            <div class="row d-flex align-items-center">
                                <div class="col-md-12 col-lg-12 text-center text-md-start">
                                    <div class="p-3 text-center">
                                        © {date.getFullYear()} Copyright:&nbsp;
                                        <a class="text-white" href="/">
                                            E-comm</a>
                                    </div>
                                </div>
                                {/* <div class="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                                    <a class="btn btn-outline-light btn-floating m-1 text-white"
                                        role="button"><i class="fab fa-facebook-f"></i></a>

                                    <a class="btn btn-outline-light btn-floating m-1 text-white"
                                        role="button" ><i class="fab fa-twitter"></i ></a>

                                    <a class="btn btn-outline-light btn-floating m-1 text-white"
                                        role="button" ><i class="fab fa-google"></i></a>

                                    <a class="btn btn-outline-light btn-floating m-1"
                                        role="button" ><i class="fab fa-instagram"></i></a>
                                </div> */}
                            </div>
                        </section>
                    </div>
                </section>
            {/* </div> */}
        </footer>

    )
};

export default Footer;








