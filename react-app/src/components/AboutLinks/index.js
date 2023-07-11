import './AboutLinks.css'
import { useModal } from '../../context/Modal'

export default function AboutLinks() {
    const { setModalContent } = useModal()
    return (
        <button className="about-links-button" onClick={() => setModalContent(<DeveloperInfo />)}>
            <i className="fa-solid fa-computer-mouse"></i>
        </button>
    )
}

function DeveloperInfo() {
    const { closeModal } = useModal()
    return (
        <div className='about-links-modal'>
            <button>
                <i onClick={closeModal} className="fa-solid fa-xmark"></i>
            </button>
            <div>
                <table>
                    <thead className='about-links-header'>
                        <th>Michael Golshani</th>
                        <th>Lorena Sanchez</th>
                        <th>Ca'Sandra Smith</th>
                    </thead>
                    <tbody className='about-links-rows'>
                        <tr>
                            <td>
                                <a className='about-links' href='https://github.com/michaelgolshani' target='_blank'>
                                    <i className="fa-brands fa-github"></i>
                                </a>
                            </td>
                            <td>
                                <a className='about-links' href='https://github.com/renahime' target='_blank'>
                                    <i className="fa-brands fa-github"></i>
                                </a>
                            </td>
                            <td>
                                <a className='about-links' href='https://github.com/CaSandraSmith' target='_blank'>
                                    <i className="fa-brands fa-github"></i>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a className='about-links' href='https://www.linkedin.com/in/michaelgolshani/' target='_blank'>
                                    <i className="fa-brands fa-linkedin"></i>
                                </a>
                            </td>
                            <td>
                                <a className='about-links' href='https://www.linkedin.com/in/lorena-s-a4a106275/' target='_blank'>
                                    <i className="fa-brands fa-linkedin"></i>
                                </a>
                            </td>
                            <td>
                                <a className='about-links' href='https://www.linkedin.com/in/casandra-smith/' target='_blank'>
                                    <i className="fa-brands fa-linkedin"></i>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a className='about-links' href='https://michaelgolshani.github.io/#' target='_blank'>
                                    <i className="fa-solid fa-computer"></i>
                                </a>
                            </td>
                            <td>
                                <a className='about-links' href='https://lorena-sanchez-dev.squarespace.com/' target='_blank'>
                                    <i className="fa-solid fa-computer"></i>
                                </a>
                            </td>
                            <td>
                                <a className='about-links' href='https://casandrasmith.github.io/' target='_blank'>
                                    <i className="fa-solid fa-computer"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* <div>
                    <h2>Ca'Sandra Smith</h2>
                    <p>Linkedin</p>
                    <p>GitHub</p>
                </div> */}
            </div>
        </div>
    )
}