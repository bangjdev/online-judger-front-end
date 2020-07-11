import React, { useContext, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { LoadState, doSignUp } from '../../Global/GlobalFunctions/FetchingActions';
import { LanguageContext, FetchContext } from '../../Global/GlobalStates/GlobalStates';
import { ResponseDataType, FormDataType, StringIndexed } from '../../models';
import StatusButton from '../StatusButton/StatusButton';

const initialFormData = {
    username: "",
    email: "",
    password1: "",
    password2: "",
    first_name: "",
    last_name: ""
} as StringIndexed<FormDataType>;

interface FormProps {
    authModalToggle: Function
}

const SignUpForm: React.FC<FormProps> = (props: FormProps) => {
    const language = useContext(LanguageContext);
    const { apiFetcher } = useContext(FetchContext);
    const [formData, setFormData] = useState(initialFormData);
    const [loadState, setLoadState] = useState(LoadState.NOTLOADING);
    
    const formDataHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData( (prev:StringIndexed<FormDataType> )=>{
            if (event.target !== null) {
                prev[event.target.id]=event.target.value;
            }
            return prev;
        });
        console.log(formData);
    };

    const signUpHandler = () => {
       setLoadState(LoadState.LOADING); 
       console.log(formData);
       doSignUp(
        apiFetcher,
        formData,
        (signUpResponse: ResponseDataType<{}>) => {
            setLoadState(LoadState.NOTLOADING);                    
            props.authModalToggle();    
        },
        (error: Error) => {
            console.log(error);
            setLoadState(LoadState.NOTLOADING);
        }
        );
    }

    return (
        <Col>
            <Form className="mt-3">
                <Row>
                    <Col>
                        <Form.Group controlId="last_name">
                            <Form.Label>{language.dictionary['FORM_LASTNAME']}</Form.Label>
                            <Form.Control type="text" onChange={formDataHandler} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="first_name">
                            <Form.Label>{language.dictionary['FORM_FIRSTNAME']}</Form.Label>
                            <Form.Control type="text" onChange={formDataHandler} />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="username">
                    <Form.Label>{language.dictionary['FORM_USERNAME']}</Form.Label>
                    <Form.Control type="text" onChange={formDataHandler}
                        placeholder={language.dictionary['FORM_USERNAME_PLACE_HOLDER']} />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>{language.dictionary['FORM_EMAIL']}</Form.Label>
                    <Form.Control type="email" onChange={formDataHandler}
                        placeholder={language.dictionary['FORM_EMAIL_PLACE_HOLDER']} />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group controlId="password1">
                            <Form.Label>{language.dictionary['FORM_PASSWORD_1']}</Form.Label>
                            <Form.Control type="password" onChange={formDataHandler} placeholder="********" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="password2">
                            <Form.Label>{language.dictionary['FORM_PASSWORD_2']}</Form.Label>
                            <Form.Control type="password" onChange={formDataHandler} placeholder="********" />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="formSignUpButton">
                    <StatusButton loadState={loadState} onClick={signUpHandler}>
                        {language.dictionary['MODAL_SIGNUP']}
                    </StatusButton>
                </Form.Group>
            </Form>
        </Col>
    )
};

export default SignUpForm;