import React, { useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleInputReset = () => {
    setName("");
    setEmail("");
    setMobileNumber("");
    setSubject("");
    setMessage("");
  }

  const handleContact = async (name, email, mobileNumber, subject, message) => {
    await AuthService.Contactus(name, email, mobileNumber, subject, message).then(async result => {
      if (result.message === "Your request Submitted.") {
        try {
          alertSuccessMessage(result.message);
          handleInputReset();
        } catch (error) {
          alertErrorMessage(error);
          /*  console.log('error', `${error}`); */
        }
      } else {
        alertErrorMessage(result.message);
      }
    })

  }
  return (
    <>
      <section className="inner-page-banner">
        <div className="container">
          <div className="inner text-center">
            <h1 className="title"> Contact Us </h1>
            <nav className="mt-4">
              <ol className="breadcrumb justify-content-center">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Contact Us</li>
              </ol>
            </nav>
          </div>
        </div>
      </section>
      <section className="pb-90">
        <div className="container">
          <div className="row" >
            <div className="col-md-10 m-auto" >
              <div className="create-item-wrapper plicy_sec" >
                <div className="form-field-wrapper ">
                  <div className="row">

                    <div className="col-md-6 mb-4">
                      <div className="field-box">
                        <label for="name" className="form-label">Enter Your Name</label>
                        <input type="text" value={name} name="name" onChange={(event) => setName(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="field-box">
                        <label for="email" className="form-label">Enter Email Address</label>
                        <input type="email" placeholder="" value={email} name="email" onChange={(event) => setEmail(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="field-box">
                        <label for="name" className="form-label">Enter Phone Number</label>
                        <input type="number" placeholder="" value={mobileNumber} name="mobileNumber" onChange={(event) => setMobileNumber(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="field-box">
                        <label for="subject" className="form-label">Enter Subject</label>
                        <input type="text" placeholder="" value={subject} name="subject" onChange={(event) => setSubject(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-md-12 mb-4">
                      <div className="field-box">
                        <label for="message" className="form-label">Enter Your Message</label>
                        <textarea value={message} name="message" onChange={(event) => setMessage(event.target.value)} />
                      </div>
                    </div>

                    <button class=" mt-5 btn btn-gradient btn-medium justify-content-center w-100" type="button" onClick={() => handleContact(name, email, mobileNumber, subject, message)}><span> Submit</span></button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;