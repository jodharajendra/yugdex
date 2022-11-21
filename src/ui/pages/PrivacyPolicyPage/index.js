import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicyPage = () => {
  return (
    <>
      <section className="inner-page-banner">
        <div className="container">
          <div className="inner text-center">
            <h1 className="title"> Privacy Policy </h1>
            <nav className="mt-4">
              <ol className="breadcrumb justify-content-center">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Privacy policy</li>
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
                <p>We at YugDex(the "Service","us", "we", or "our") deeply care about your (The client who is using YugDex service) privacy. This page informs you of our policies regarding the collection, use and disclosure of Personal Information when you use our Service. We will not use or share your information with anyone except as described in this Privacy Policy. We use your Personal Information for providing and improving the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible at <a href="https://yugdex.com" >https://yugdex.com</a></p>


                <h5> Information Collection And Use</h5>

                <p> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to, your email address, other information ("Personal Information"). </p>







                <h5> Log Data </h5>

                <p> We collect information that your browser sends whenever you visit our Service ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages and other statistics. In addition, we may use third party services such as Google Analytics that collect, monitor and analyze this type of information in order to increase our Service's functionality. These third party service providers have their own privacy policies addressing how they use such information. </p>


                <h5> Information Collection And Use </h5>

                <p> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to, your email address, other information ("Personal Information") like PAN, aadhar and bank details. These details are important for getting a KYC (Know your customer) compliance before you can use the platform. </p>


                <h5> Cookies </h5>

                <p> Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer's hard drive. We use "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service. </p>


                <h5> Service Providers </h5>

                <p> We may employ third party companies and individuals to facilitate our Service, to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used. These third parties have access to your Personal Information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose. </p>


                <h5> Security </h5>

                <p> The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security. </p>


                <h5> Communications </h5>

                <p> We may use your Personal Information to contact you with newsletters, marketing or promotional materials and other information that may be of interest to you. You may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send. </p>


                <h5> International Transfer </h5>

                <p> Your information, including Personal Information, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction. If you are located outside India and choose to provide information to us, please note that we transfer the information, including Personal Information, to India and process it there. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer. </p>


                <h5> Links To Other Sites </h5>

                <p> Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over, and assume no responsibility for the content, privacy policies or practices of any third party sites or services. </p>


                <h5> Children's Privacy </h5>

                <p> Our Service does not address anyone under the age of 13 ("Children"). We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your Children has provided us with Personal Information, please contact us. If we become aware that we have collected Personal Information from a children under age 13 without verification of parental consent, we take steps to remove that information from our servers. </p>


                <h5>Ascent</h5>
                <p>We at ascent deeply care about privacy. We limit data collection to a minimal only taken for necessary purposes case. Data is collected in 2 forms:</p>
                <ul>
                  <li>1.	The data that you give us: By filling any forms or sending us emails on our support</li>
                  <li>2.	The data that we collect: Login info, device info, IP and analytics data to personalise your experience. We do not use or share any of PII (personally identifiable information) Data usage is limited to creation of better experiences. You can ask us to erase your data through a mail request with valid reasons on <a href="mailto:support@yugdex.com" >support@yugdex.com</a> </li>
                </ul>

                <h5>Changes To This Privacy Policy</h5>

                <p> We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>


                <h5> Contact Us</h5>
                <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@yugdex.com">support@yugdex.com</a> or via the contact form.</p>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PrivacyPolicyPage;