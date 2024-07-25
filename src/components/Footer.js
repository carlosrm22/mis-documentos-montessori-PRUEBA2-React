import React from 'react';

/**
 * Componente para el pie de página.
 */
function Footer() {
    return (
        <footer className="bg-light text-center text-lg-start mt-5">
            <div className="container p-4">
                <div className="row">
                    <div className="col-12 col-md-4 mb-4 mb-md-0 text-center">
                        <a href="https://asociacionmontessori.com.mx/" target="_blank" rel="noopener noreferrer" className="text-black no-underline"><img src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="Logo" width="50" height="50" className="d-inline-block align-top" />
                            <h5 className="text-uppercase mt-2">Asociación Montessori de México</h5></a>
                    </div>
                    <div className="col-12 col-md-4 mb-4 mb-md-0">
                        <h5 className="text-uppercase text-center">Información de contacto</h5>
                        <ul className="list-unstyled mb-0">
                            <li className="text-wrap">
                                <i className="fas fa-home mr-3"></i>
                                <a href="https://kalpilli.com/Instalaciones/" target="_blank" rel="noopener noreferrer" className="text-black no-underline">
                                    Avenida 2 No. 48, Col. San Pedro de los Pinos, Benito Juarez, C.P.03800, Ciudad de México
                                </a>
                            </li>
                            <li className="text-wrap">
                                <i className="fas fa-envelope mr-3"></i> <a href="mailto:contacto@asociacionmontessori.com.mx" target="_blank" rel="noopener noreferrer" className="text-black no-underline">Email</a>
                            </li>
                            <li>
                                <i className="fas fa-phone mr-3"></i><a href="https://wa.me/5215548885013?text=Hola,%20necesito%20ayuda%20con%20mis%20documentos%20Montessori" target="_blank" rel="noopener noreferrer" className="text-black no-underline"> +52 4888 5013</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-4 mb-4 mb-md-0 text-center">
                        <h5 className="text-uppercase">Síguenos</h5>
                        <a href="https://www.instagram.com/asociacionmontessori/" className="btn btn-outline-dark btn-floating m-1" role="button" target="_blank"
                            rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.facebook.com/asociacionmontessori" className="btn btn-outline-dark btn-floating m-1" role="button" target="_blank"
                            rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://wa.me/5215548885013?text=Hola,%20necesito%20ayuda%20con%20mis%20documentos%20Montessori" className="btn btn-outline-dark btn-floating m-1" role="button" target="_blank"
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
            <div className="bg-primary text-center p-3">
                <span className="text-white">
                    <a href="https://asociacionmontessori.com.mx" target="_blank" rel="noopener noreferrer" className="text-white no-underline">
                        asociacionmontessori.com.mx
                    </a>
                    <br></br>
                    © 2024 Asociación Montessori de México. Todos los derechos reservados.
                </span>
            </div>
        </footer>
    );
}

export default Footer;
