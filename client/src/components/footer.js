import React, { Component } from 'react';
import '../styles/footer.scss';
import { Row, Col } from 'react-bootstrap';

export default class Footer extends Component {

    render() {
        return(
            <div className='footer__container'>
                <hr/>
                <br/>
                <Row>
                    <Col>

                    </Col>
                    <Col>
                        <p>© 2020 Paul Wittchen</p>
                    </Col>
                    <Col>
                    
                    </Col>
                </Row>
            </div>
        )
    }
}