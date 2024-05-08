import React from 'react'
import './PolicyStyles.scss'
const PrivacyPolicy = () => {
    return (
        <div className='row'>
            <div className='col-lg-6 mx-auto main-policy'>
                <h1 className='text-center'>Privacy policy</h1>
                <p >This Privacy Policy describes how avantgardeoriginal.com collects, uses, and discloses your Personal Information when you visit or make a purchase from the Site.</p>
                <h1>Collecting Personal Information</h1>
                <p>When you visit the Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support. In this Privacy Policy, we refer to any information that can uniquely identify an individual (including the information below) as “Personal Information”. See the list below for more information about what Personal Information we collect and why.</p>
                <p style={{ textDecoration: "underline" }}>Device information</p>

                <ul className="a">
                    <li>Examples of Personal Information collected: version of web browser, IP address, time zone, cookie information, what sites or products you view, search terms, and how you interact with the Site.</li>
                    <li>Purpose of collection: to load the Site accurately for you, and to perform analytics on Site usage to optimize our Site.</li>
                    <li>Source of collection: Collected automatically when you access our Site using cookies, log files, web beacons, tags, or pixels.</li>
                    <li>Disclosure for a business purpose: shared with our processor Shopify</li>
                </ul>

                <p style={{ textDecoration: "underline" }}>Order information</p>

                <ul>
                    <li>Examples of Personal Information collected: name, billing address, shipping address, payment information (including credit card numbers, email address, and phone number.</li>
                    <li>Purpose of collection: to provide products or services to you to fulfill our contract, to process your payment information, arrange for shipping, and provide you with invoices and/or order confirmations, communicate with you, screen our orders for potential risk or fraud, and when in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
                    <li>Source of collection: collected from you.</li>
                    <li>Disclosure for a business purpose: shared with our processor Shopify.</li>
                </ul>


                <h1>
                    Sharing Personal Information
                </h1>

                <p>We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you, as described above. For example:</p>

                <ul>
                    <li>We use Shopify to power our online store. You can read more about how Shopify uses your Personal Information here: https://www.shopify.com/legal/privacy.</li>
                    <li>We may share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</li>
                </ul>

                <h1>Behavioral Advertising</h1>

                {/* <ul> */}
                <p>As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For example:</p>
                {/* </ul> */}

                <ul>
                    <li>We use Google Analytics to help us understand how our customers use the Site. You can read more about how Google uses your Personal Information here: https://policies.google.com/privacy?hl=en.You can also opt-out of Google Analytics here: https://tools.google.com/dlpage/gaoptout.</li>
                    <li>We share information about your use of the Site, your purchases, and your interaction with our ads on other websites with our advertising partners. We collect and share some of this information directly with our advertising partners, and in some cases through the use of cookies or other similar technologies (which you may consent to, depending on your location).</li>
                </ul>

                <p>For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at <a target='_blank' href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.">http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.</a> </p>


                <p className='mb-5'>You can opt out of targeted advertising by:</p>

                <ul>
                    <li><a href="https://www.facebook.com/settings/?tab=ads" target='_blank'>FACEBOOK - https://www.facebook.com/settings/?tab=ads</a></li>
                    <li><a href="https://www.google.com/settings/ads/anonymous" target='_blank'>GOOGLE - https://www.google.com/settings/ads/anonymous</a></li>
                </ul>

                <p>Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance’s opt-out portal at: <a href="http://optout.aboutads.info/">http://optout.aboutads.info/.</a></p>

                <h1>Using Personal Information</h1>

                <p>We use your personal Information to provide our services to you, which includes: offering products for sale, processing payments, shipping and fulfillment of your order, and keeping you up to date on new products, services, and offers.</p>


                <h1>Cookies</h1>

                <p>A cookie is a small amount of information that’s downloaded to your computer or device when you visit our Site. We use a number of different cookies, including functional, performance, advertising, and social media or content cookies. Cookies make your browsing experience better by allowing the website to remember your actions and preferences (such as login and region selection). This means you don’t have to re-enter this information each time you return to the site or browse from one page to another. Cookies also provide information on how people use the website, for instance whether it’s their first time visiting or if they are a frequent visitor.</p>
                <p>We use the following cookies to optimize your experience on our Site and to provide our services.</p>


                <h1>Changes</h1>

                <p>We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.</p>

                <h1>Contact</h1>

                <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at [email address] or by mail using the details provided below:</p>
                <p>Avant Garde, First floor, 82 A1, PIA Housing Society, Lahore, Pakistan.</p>
            </div>

        </div>
    )
}

export default PrivacyPolicy