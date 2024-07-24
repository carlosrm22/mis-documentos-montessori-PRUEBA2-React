import React from 'react';

/**
 * Componente para el pie de página.
 */
function Footer() {
    return (
        <footer className="bg-light text-center text-lg-start mt-5">
            <div className="container p-4">
                <div className="row">
                    <div className="col-12 col-md-4 mb-4 mb-md-0">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="Logo" width="50" height="50" className="d-inline-block align-top" />
                        <h5 className="text-uppercase mt-2">Asociación Montessori de México</h5>
                    </div>
                    <div className="col-12 col-md-4 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Información de contacto</h5>
                        <ul className="list-unstyled mb-0">
                            <li className="text-wrap">
                                <i className="fas fa-home mr-3"></i> Avenida 2 No. 48, Col. San Pedro de los Pinos, Benito Jarez, C.P.03800, Ciudad de México
                            </li>
                            <li className="text-wrap">
                                <i className="fas fa-envelope mr-3"></i> contacto@asociacionmontessori.com.mx
                            </li>
                            <li>
                                <i className="fas fa-phone mr-3"></i> +52 4888 5013
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-4 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Síguenos</h5>
                        <a href="https://www.instagram.com/asociacionmontessori/" className="btn btn-outline-dark btn-floating m-1" role="button" target="_blank"
                            rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.facebook.com/asociacionmontessori" className="btn btn-outline-dark btn-floating m-1" role="button" target="_blank"
                            rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://api.whatsapp.com/send?phone=5215548885013&text=Hola,%20Me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20la%20certificaci%C3%B3n%20Montessori." className="btn btn-outline-dark btn-floating m-1" role="button" target="_blank"
                            rel="noopener noreferrer">
                            <i className="fab fa-whatsapp"></i>
                        </a>
                        <a href="https://www.youtube.com/@montessorimx" className="btn btn-outline-dark btn-floating m-1" role="button" target="_blank"
                            rel="noopener noreferrer">
                            <i className="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                <a className="text-dark" href="https://asociacionmontessori.com.mx">asociacionmontessori.com.mx</a>
            </div>
        </footer>
    );
}

export default Footer;
