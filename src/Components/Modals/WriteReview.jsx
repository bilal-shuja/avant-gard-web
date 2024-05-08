import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './modalStyles.scss'


const WriteReview = ({ openModal, showModal }) => {

    const postReview = () => {
        const formdata = new FormData();
        formdata.append("article_id", "1");
        formdata.append("review_description", "very good");
        formdata.append("article_owner_name", "test");
        formdata.append("star_count", "5");
        formdata.append("total_count", "1");

        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        fetch("https://avantgarde.alphanitesofts.net/api/post_review", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }


    return (
        <div>
            <Modal
                show={openModal}
                onHide={showModal}
                backdrop="static"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Write a review:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Your Views Matter to improve our Services</h5>
                    <p>
                        We value your opinion and would love to hear about your experience with our product/service. Your feedback helps us improve our services and better serve you in the future.
                    </p>

                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>

                </Modal.Body>

                <div className="rating">
                    <input type="radio" name="rating" id="r1" />
                    <label htmlFor="r1" />
                    <input type="radio" name="rating" id="r2" />
                    <label htmlFor="r2" />
                    <input type="radio" name="rating" id="r3" />
                    <label htmlFor="r3" />
                    <input type="radio" name="rating" id="r4" />
                    <label htmlFor="r4" />
                    <input type="radio" name="rating" id="r5" />
                    <label htmlFor="r5" />
                </div>

                <Modal.Footer>
                    <Button className='btn btn-outline-secondary' onClick={showModal}>Close</Button>
                </Modal.Footer>

            </Modal>
        </div>
    )
}

export default WriteReview