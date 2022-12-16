import { Container } from "react-bootstrap";
import Header from "../../components/Header";
import geetLogo from "../../assets/geet-logo-large.png";
import { Fragment } from "react";

export default function Resources() {

    const breadcrumbItems = [
        { title: "Home", link: process.env.REACT_APP_HOST },
    ];

    const caseVignettes = [
        { key : "Invest Ottawa", filename : "Invest-Ottawa.pdf" },
        { key : "Women of Ontario Social Enterprise Network", filename : "Women-of-Ontario-Social-Enterprise-Network.pdf"},
        { key : "National Louis University Master (M.S.) in Design Thinking and Entrepreneurship", filename : "National-Louis-University-Master-in-Design-Thinking-and-Entrepreneurship.pdf"},
        { key : "The University of Texas at Austin  Kendra Scott Women's Entrepreneurial Leadership Institute", filename : "The-University-of-Texas-at-Austin-Kendra-Scott-Women's-Entrepreneurial-Leadership-Institute.pdf"},
        { key : "University of Ottawa Entrepreneurship Hub", filename : "University-of-Ottawa-Entrepreneurship-Hub.pdf"}
    ];
    
    return(
        <Fragment>
            <Header breadcrumbItems={breadcrumbItems} title={"Resources"} />
            <img className={"sticky-icon"} src={geetLogo} alt="GEET LOGO" />

            <Container
            style={{height : "65vh"}}>
                <span><b>Case Vignettes</b></span>
                <hr />
                <ul>
                    {
                        caseVignettes.map((vignette) => {
                            return(
                                <li><a href={`${process.env.PUBLIC_URL}/resources/${vignette.filename}`}>{vignette.key}</a></li>
                            )
                        })
                    }
                </ul>
            </Container>
        </Fragment>

    );
}