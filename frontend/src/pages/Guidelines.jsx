import Sidebar from '../components/SideBar';
import { useState } from 'react';
import graphic from '../assets/RecyclingSummary.jpg'

// WasteDisposalInfo.js

import React from 'react';

import {

    Container,
    Button,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardText,
    Table,
    UncontrolledCarousel

} from 'reactstrap';

const Guidelines = () => {

    const wasteData = [
        { item: 'Plastic Wrap', disposal: 'Garbage' },
        { item: 'Food scraps', disposal: 'Compost' },
        { item: 'Glass containers', disposal: 'Recycling' },
        { item: 'Metal cans', disposal: 'Recycling' },
        { item: 'CClear Rigid Plastics', disposal: 'Recycling' },
        { item: 'Used Batteris', disposal: "Recycling Drop-off Centre" }
    ];

    const handleRedirect = () => {
        // Replace 'https://www.toronto.ca/services-payments/recycling-organics-garbage/' with the actual URL
        window.location.href = 'https://www.hamilton.ca/home-neighbourhood/garbage-recycling/waste-collection-schedule';
    };

    return (
        <div className='d-flex'>
            <Sidebar />
            <Container className="my-4">
                <Row>
                    <Col>
                        <h2 className="text-center my-5">Waste Disposal and Recycling Guidelines</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className="mb-4">
                    <Card>
                            <CardBody>

                                <UncontrolledCarousel
                                    items={[
                                        {

                                            header: ' The EPA estimates 75% of waste is recyclable, yet only 34% of it is recycled.',
                                            key: 1,
                                            src: 'https://picsum.photos/id/123/1200/600'
                                        },
                                        {
                                            header: 'The average recycling contamination rate is 25%, or 1 in 4 items',

                                            key: 2,
                                            src: 'https://picsum.photos/id/456/1200/600'
                                        },
                                        {
                                            header: 'While glass can be reused for an estimated 1 million years, glass cookware such as Pyrex can’t be recycled.',
                                            key: 3,
                                            src: 'https://picsum.photos/id/678/1200/600'
                                        }
                                    ]}
                                />

                            </CardBody>
                        </Card>
                        <Card className=' my-2.5'>
                            <CardBody>
                                <CardTitle tag="h5">Common Recyclable Items</CardTitle>

                                <CardText className=' mb-0'>
                                    Familiarize yourself with the following common recyclable items:
                                </CardText>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Disposal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {wasteData.map((waste, index) => (
                                            <tr key={index}>
                                                <td>{waste.item}</td>
                                                <td>{waste.disposal}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                       
                    </Col>

                    <Col md={6} className='mb-4'>
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">General Recycling Rules</CardTitle>
                                <img
                                    alt="Card cap"
                                    src={graphic}
                                    width="100%"
                                    height="90%"
                                />
                                <CardText>
                                    Follow these general rules for recycling:
                                    <ul>
                                        <li>Rinse containers before recycling.</li>
                                        <li>Remove any contaminants from materials.</li>
                                        <li>Check the waste disposal schedule for your area.</li>
                                        {/* Add more rules as needed */}
                                    </ul>
                                </CardText>
                            </CardBody>
                        </Card>
                        <Card className='mt-3'>
                            <CardBody>
                                <CardTitle tag="h5">Waste Disposal Schedule</CardTitle>
                                <CardText>
                                    Familiarize yourself with the waste disposal schedule in your area. Different
                                    neighborhoods may have different collection days for garbage, recycling, and
                                    organic waste.
                                </CardText>

                                <Button color="primary" onClick={handleRedirect} >
                                    <i className="bi bi-calendar-check mx-2"></i>
                                    Click Here For More
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>

                </Row>
                {/* Add more cards or information as needed */}
            </Container>
        </div>
    );
};

export default Guidelines;
