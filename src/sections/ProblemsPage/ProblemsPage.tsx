import React, {useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import ProblemsTable from '../../components/ProblemsTable/ProblemsTable';
import ProblemFilter from '../../components/ProblemFilter/ProblemFilter';

const ProblemsPage = ()=>{
    const [filterState,setFilter]=useState({});
    return (
        <Container fluid="xl">
            <Row>
                <Col sm={{span:9, order:1}} xs={{span:12, order:2}}>
                    <ProblemsTable filterState={filterState} NoP={50}/>
                </Col>
                <Col sm={{span:3, order:2}} xs={{span:12, order:1}}> {/** Move upon the Table when on Mobile */}
                    <ProblemFilter filterState={filterState} onChange={setFilter}/>
                </Col>
            </Row>
        </Container>
    )
};
export default ProblemsPage;