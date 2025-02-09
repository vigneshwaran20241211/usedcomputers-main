"use client";
import React, { useState, useEffect } from 'react';
import Header from "@/components/Layouts/Header";
import Stepsfour from "@/components/Layouts/Stepsfour";
import CustomerProfile from '@/components/Layouts/Profile';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import axios from 'axios';

const Welldone = () => {
  const [formData, setFormData] = useState(null);  // Initialize as null to handle loading state
  const fileUrl = formData ? `http://dev.usedcomputer.com.my:3000/quotation/${formData.quotationId}.pdf` : '';
  const accessToken = localStorage.getItem('accessToken');
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    // Make sure there's an access token before making the request
    if (accessToken) {
      axios.get(`${process.env.API_URL}product`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then(response => {
          setCategory(response.data.data); // Store the fetched data in state
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  console.log(category); // You can log the data here for debugging

  useEffect(() => {
    const storedData = sessionStorage.getItem("formData");
    if (storedData) {
      setFormData(JSON.parse(storedData));  // Parse formData when it exists in sessionStorage
    }
  }, []);

  // If formData is still loading or not available, display a loading message
  if (!formData) {
    return <div>Loading...</div>;
  }

  const calculateMaterialTotals = (products, formData) => {
    let materialTotals = {
      plastic: 0,
      copper: 0,
      aluminium: 0,
      gold: 0
    };

    // Loop through formData products
    formData.forEach(data => {
      // Loop through each product in formData
      data.products.forEach(product => {
        // Loop through category parts and multiply quantities
        products.forEach(category => {
          category.parts.forEach(part => {
            if (product.id === category._id) {  // Check if the product matches category
              let totalQuantity = product.quantity * part.quantity;  // Multiply quantities

              // Update material totals based on part code
              switch (part.id.code) {
                case 'PL':  // Plastic
                  materialTotals.plastic += totalQuantity;
                  break;
                case 'CU':  // Copper
                  materialTotals.copper += totalQuantity;
                  break;
                case 'AI':  // Aluminium
                  materialTotals.aluminium += totalQuantity;
                  break;
                case 'AU':  // Gold
                  materialTotals.gold += totalQuantity;
                  break;
                default:
                  break;
              }
            }
          });
        });
      });
    });

    return materialTotals;
  };

  // Example usage
  const materialTotals = calculateMaterialTotals(category, formData.category);
  console.log(materialTotals);

  const handlePrint = () => {
    if (!formData) {
      console.error("Form data is not available for printing.");
      return;
    }

    // Fetch userName from localStorage
    let userDetails = localStorage.getItem('userDetails');
    userDetails = JSON.parse(userDetails);

    // Calculate total quantity and grand total
    let totalQuantity = 0;
    let grandTotal = 0;

    formData.category.forEach(category => {
      category.products.forEach(product => {
        totalQuantity += product.quantity;
        grandTotal += product.quantity * product.price;
      });
    });

    // Open a new window for printing
    const printWindow = window.open('', '', 'height=800,width=1100');
    if (!printWindow) {
      console.error("Popup blocked. Please allow popups in your browser.");
      return;
    }

    // Template for printing
    const printTemplate = `
      <html lang='en'>

<head>
  <meta charset='UTF-8' />
  <meta name='viewport' content='width=device-width, initial-scale=1.0' />
  <title>Activate Your Account</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f7fc;
      color:
        #333;
      margin: 0;
      padding: 0;
    }

    .email-container {
      width: 100%;
      background-color: #ffffff;
      margin: 0 auto;
      padding: 10px;
      border-radius:
        8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-width: 800px;
    }

    .header {
      text-align: center;
      margin-bottom: 20px;
    }

    .header img {
      max-width:
        150px;
      margin-bottom: 20px;
    }

    .content {
      font-size: 16px;
      line-height:
        1.6;
    }

    .cta-button {
      display: inline-block;
      background-color: #4CAF50;
      color: #ffffff;
      padding: 12px 24px;
      font-size: 16px;
      text-decoration:
        none;
      border-radius: 4px;
      text-align: center;
      margin-top: 20px;
    }

    .footer {
      text-align: center;
      font-size: 14px;
      margin-top: 40px;
      color: #777;
    }

    .footer a {
      color: #4CAF50;
      text-decoration: none;
    }
  </style>
</head>

<body>
  <div class='email-container'>
    <table cellspacing='0' cellpadding='0' border='0' height='100%' width='100%'>
      <tbody>
        <tr>
          <td align='center' valign='top' style='padding:0'>
            <table bgcolor='#FFFFFF' cellspacing='0' cellpadding='10' border='0' width='100%'>
              <tbody>
                <tr>
                  <td>
                    <table cellspacing='0' cellpadding='0' border='0' width='100%'>
                      <tbody>
                        <tr>
                          <td valign='bottom' align='left'>
                            <img
                              src='https://ci3.googleusercontent.com/meips/ADKq_NYmaDwfIlH1gNuQsPmn9I7S6IP_7Q0QxkWuyRh-6lqCG_y7GVMbn8tYSdrKv4EPhveVY_pDrt3oI9keHJNVsQZ0xdwr-xYeEkHBSW_xVRaPvAlzVj92XbMQI6Hhk8-KqQKZ=s0-d-e1-ft#https://usedcomputer.com.my/Assets/images/Logo-for-Usedcomputer-with-TMs.png'
                              style='width:300px' class='CToWUd' data-bit='iit' />
                          </td>
                          <td valign='top' align='right'>
                            <h2 style='font-family:Arial,Helvetica,sans-serif;font-size:18px;margin:3px 0px'>Quotation
                              #:
                              <span style='color:#be1e31'>${formData.quotationId}</span>
                            </h2>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td valign='top'>
                    <table cellspacing='0' cellpadding='0' border='0' width='100%'>
                      <tbody>
                        <tr>
                          <td width='58%' valign='top' align='left'>
                            <h2 style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:0;margin-left:10px'>
                              Address:</h2>
                            <div
                              style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin-top:2px;margin-left:10px'>
                              <p style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:0px 0px'>TM Recycle
                                IT Sdn. Bhd.</p>
                              <p style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:0px 0px'>Lot 195,
                                Jalan Sungai Pinang 5/6,</p>
                              <p style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:0px 0px'>Taman
                                Perindustrian Pulau Indah Fasa 2,</p>
                            </div>
                          </td>
                          <td width='42%' valign='top' align='left'>
                            <div
                              style='font-family:Arial,Helvetica,sans-serif;font-size:15px;margin-top:0px;margin-left:40px'>
                              <p style='margin:0'><span
                                  style='font-family:Helvetica;font-size:14px;font-weight:bold'>Contact Number:</span>
                                <span style='font-family:Helvetica;font-size:14px;margin:3px 0px'>03-31222383</span>
                              </p>
                              <p style='margin:0'><span
                                  style='font-family:Helvetica;font-size:14px;font-weight:bold'>Email:</span>
                                <span style='font-family:Helvetica;font-size:14px;margin:3px 0px'><a
                                    href='mailto:info@usedcomputer.com.my'
                                    target='_blank'>info@usedcomputer.com.my</a></span>
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr align='left'>
                          <td valign='bottom'>
                            <div style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin-top:5px'>
                              <br />
                              <p style='margin:0;margin-left:10px;margin-top:3px'><span
                                  style='font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold'>Quotation
                                  Date: </span><span
                                  style='font-family:Helvetica;font-size:14px;font-weight:600;margin:3px 0px'> ${formData.quotationDate}</span>
                              </p>
                            </div>
                          </td>
                          <td valign='top' align='left'></td>
                        </tr>
                        <tr height='12'>
                          <td colspan='2' valign='bottom' align='center' height='12'>
                            <span
                              style='font-family:Arial,Helvetica,sans-serif;font-size:16px;text-align:center;font-weight:bold'>QUOTATION
                              SUMMARY</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td valign='top' style='margin:0;padding:0'>
                    <table cellspacing='0' cellpadding='0' border='0' width='100%'>
                      <tbody>
                        <tr>
                          <th colspan='4' align='center' width='100%'
                            style='font-family:Helvetica;font-size:15px;padding:5px;margin:0;background:#eaeaea'>
                            CUSTOMER DETAILS</th>
                        </tr>
                        <tr>
                          <td align='right' valign='top' width='16%'>
                            <h3 style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:3px 0px'>Name :</h3>
                          </td>
                          <td valign='top' width='34%'>
                            <p style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:3px 0px'>
                            ${userDetails.name}
                             ${userDetails.lastname}</p>
                          </td>
                          <td align='right' valign='top' width='16%'>
                            <h3 style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:3px 0px'>Email
                              Address :</h3>
                          </td>
                          <td valign='top' width='34%'>
                            <p style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:3px 0px'><a
                                href='mailto:${userDetails.email}' target='_blank'>${userDetails.email}</a></p>
                          </td>
                        </tr>
                        <tr>
                          <td align='right' valign='top' width='16%'>
                            <h3 style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:3px 0px'>
                              Company Name/<br />
                              Goverment Agency :
                            </h3>
                          </td>

                          <td valign='top' width='34%'>
                            <p style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:3px 0px'>
                            ${userDetails?.company || "-"}
                            </p>
                          </td>
                          <td align='right' valign='top' width='16%'>
                            <h3 style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:3px 0px'>Address :
                            </h3>
                          </td>
                          <td valign='top' width='34%'>
                            <p style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:3px 0px'>
                            ${userDetails.address}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td align='right' valign='top' width='16%'>
                            <h3 style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:3px 0px'>
                              Industry :
                            </h3>
                          </td>
                          <td valign='top' width='34%'>
                            <p style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:3px 0px'>
                            ${userDetails?.industry || "-"}
                            </p>
                          </td>
                          <td width='16%'>&nbsp;</td>
                          <td width='34%'>&nbsp;</td>
                        </tr>
                        <tr>
                          <td align='right' valign='top' width='18%'>
                            <h3 style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:3px 0px'>Contact
                              Number :</h3>
                          </td>
                          <td valign='top' width='32%'>
                            <p style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:3px 0px'>
                            ${userDetails.mobile}
                            </p>
                          </td>
                          <td width='16%'>&nbsp;</td>
                          <td width='34%'>&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>
                    <table class="table" cellspacing='0' cellpadding='0' border='0' width='100%' style='margin-top:10px'>
                <thead>
                  <tr>
                    <th style="text-align:center;">Category</th>
                    <th style="text-align:center;">Product</th>
                    <th style="text-align:center;">Quantity</th>
                      <th style="text-align:center;">Price</th>
                    <th style="text-align:center;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${formData.category.map((category) => {
      return category.products.map((product) => {
        return `
                        <tr>
                          <td style="text-align:center;">${category.title}</td>
                          <td style="text-align:center;">${product.title}</td>
                          <td style="text-align:center;">${product.quantity}</td>
                          <td style="text-align:center;">${product.price}</td>
                          <td style="text-align:center;">RM ${product.quantity * product.price}</td>
                        </tr>
                      `;
      }).join('');
    }).join('')}
                        <!-- Summary Rows -->
                        <tr>
                          <td colspan='2' align='right' width='60%'>
                            <h3 style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:3px 0px'>TOTAL
                              QUANTITY : &nbsp;</h3>
                          </td>
                          <td align='center' width='20%'>
                            <h3 style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:3px 0px'>
                            ${totalQuantity}
                            </h3>
                          </td>
                          <td align='center' border='0' width='20%'>
                            <h3 style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:3px 0px'></h3>
                          </td>
                        </tr>
                         <tr>
                        <td colspan='3' align='right' width='60%'>
                          <h3 style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:3px 0px'>
                            Quotation Type / Quotation Session: &nbsp;</h3>
                        </td>
                        <td align='center' border='0' width='20%'>
                          <h3 style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:3px 0px'>
                          ${formData.quotationype} / ${formData.quotationSession}
                          </h3>
                        </td>
                      </tr>
                        <tr>
                          <td colspan='3' align='right' width='60%'>
                            <h3 style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:3px 0px'>GRAND
                              TOTAL: &nbsp;</h3>
                          </td>
                          <td align='center' border='0' width='20%'>
                            <h3 style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:3px 0px'>
                              RM
                              ${grandTotal}
                            </h3>
                          </td>
                        </tr>
                        <tr>
                          <td colspan='3' align='right' width='60%'>
                            <h3 style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:3px 0px'>TOTAL
                              AMOUNT TO BE PAID: &nbsp;</h3>
                          </td>
                          <td align='center' border='0' width='20%'>
                            <h3 style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:3px 0px'>
                              RM
                              ${grandTotal}
                            </h3>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                  </td>
                </tr>
                <tr>
                  <td valign='top'>
                    <table cellspacing='0' cellpadding='0' border='0' width='100%'>
                      <tbody>
                        <tr>
                          <td width='100%' valign='top' align='left'>
                            <div style='color:#4e4949;float:left;width:100%'>
                              <ol>
                                <li>
                                  <strong>All the pricing listed for the items
                                    are based on
                                    <span style='color:blue'>"Scrap &amp; Not
                                      Working"</span>
                                    only.</strong>
                                </li>
                                <li>
                                  <strong>For TBD items, our customer service
                                    officers will contact you to get more
                                    information and provide the best price.</strong>
                                </li>
                              </ol>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr style='margin:0'>
                  <td valign='top' style='margin:0'>
                    <p style='font-family:Arial,Helvetica,sans-serif;font-size:14px;margin:0;color:#bbb;font-style:italic'
                      align='center'>This Receipt is automatically generated.</p>
                  </td>
                </tr>
                <tr>
                  <td width='100%' valign='top' align='right'>
                    <div style='float:right;width:300px'>
                      <p style='font-family:Arial,Helvetica,sans-serif;font-size:15px;margin:0;height:100px;text-align:center'
                        align='right'>
                        <img
                          src='https://ci3.googleusercontent.com/meips/ADKq_Na6Qnrzgjgwl8gYFowNwYArRvLJM36CpcWxz3vVrejIxlqM7L43s1CJ40JLIh6U0JA6kfFRlKG9MZhCPNBN2tbFwjGz41ydeg=s0-d-e1-ft#https://usedcomputer.com.my/Assets/images/seal.png'
                          style='width:100px' class='CToWUd' data-bit='iit' />
                      </p>
                      <p style='font-weight:bold;margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;text-align:center'
                        align='right'>Authorized Stamp &amp; Signature</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td valign='top'>
                    <table cellspacing='0' cellpadding='0' border='0' width='100%'>

                      <tbody>
                        <tr>
                          <td width='100%' valign='top' align='left'>
                            <div style='margin-top:95px;color:#4e4949;float:left;width:100%'>
                              <p
                                style='font-family:Arial,Helvetica,sans-serif;font-size:15px;margin:3px 0 0;font-style:italic'>
                                Terms and Condition.</p>
                              <ol type='1'>
                                <li>
                                  We reserve the right to refuse service to
                                  anyone for any reason at any time.
                                </li>
                                <li>
                                  You understand that your content (not
                                  including credit card information), may be
                                  transferred unencrypted and involve (a)
                                  transmissions over various networks; and (b)
                                  changes to conform and adapt to technical
                                  requirements of connecting networks or
                                  devices. Credit card information is always
                                  encrypted during transfer over networks.
                                </li>
                                <li>
                                  You agree not to reproduce, duplicate, copy,
                                  sell, resell or exploit any portion of the
                                  Service, use of the Service, or access to
                                  the Service or any contact on the website
                                  through which the service is provided,
                                  without express written permission by us.
                                </li>
                                <li>
                                  Prices for our products are subject to
                                  change without notice.
                                </li>
                                <li>
                                  We reserve the right at any time to modify
                                  or discontinue the Service (or any part or
                                  content thereof) without notice at any time.
                                </li>
                                <li>
                                  We shall not be liable to you or to any
                                  third-party for any modification, price
                                  change, suspension or discontinuance of the
                                  Service.
                                </li>
                                <li>
                                  Your submission of personal information
                                  through the website is governed by our
                                  Privacy Policy.
                                </li>
                                <li>
                                  We do not guarantee, represent or warrant
                                  that your use of our service will be
                                  uninterrupted, timely, secure or error-free.
                                </li>
                                <li>
                                  We do not warrant that the results that may
                                  be obtained from the use of the service will
                                  be accurate or reliable.
                                </li>
                                <li>
                                  You agree that from time to time we may
                                  remove the service for indefinite periods of
                                  time or cancel the service at any time,
                                  without notice to you
                                </li>
                              </ol>
                            </div>
                          </td>
                        </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</body>

</html>
    `;

    // Write the print content to the print window
    printWindow.document.write(printTemplate);
    printWindow.document.close();

    // Trigger the print dialog
    //printWindow.print();
  };

  return (
    <fieldset className="px-4 lg:px-0 wellmar">
      <header className="flex items-center flex-wrap pb-6">
        <Header></Header>
      </header>
      <Stepsfour />
      <CustomerProfile />
      <p className="text-primary font-bold text-base lg:text-24 mb-5 lg:mb-10 wel wellmarone">
        Thank you for disposing of your E-Waste with Usedcomputer Malaysia. Kindly check your email for the copy of the booking collection summary.
      </p>
      <p className="text-primary font-bold text-base lg:text-24 mb-5 lg:mb-10 wel wellmarone">Your booking number is:</p>
      <h3 className="lg:text-40 xl:text-34 pb-4 text-base font-extrabold text-primary lg:pb-8 ordernum wellmarone">{formData.quotationId}</h3>
      <div className="lg:py-8 py-4 wellmarone">
        <Link href={fileUrl} target="blank">
          <button className="uppercase bg-secondary text-white py-1.5 px-4 lg:px-12 font-extrabold text-base lg:text-24 rounded lg:mr-8">
            Download
          </button>
        </Link>
        <button className="uppercase bg-secondary text-white py-1.5 px-4 lg:px-12 font-extrabold text-base lg:text-24 rounded" onClick={handlePrint} target="blank">Print</button>
      </div>
      <div className="border-gradient relative p-6 lg:p-10 my-10 lg:my-20 wellmartwo">
        <h3 className="uppercase text-center text-primary font-bold text-28 md:text-40 xl:text-64 pt-8 lg:pt-16 pb-8 weldone">WELL DONE!</h3>
        <p className="text-primary font-bold text-base lg:text-22 mb-5 lg:mb-10 kmwith">
          With the amount of disposal collected, you have just managed to accumulate and recycle these materials:
        </p>
        <div className="py-6 lg:py-14 lg:pb-20 grid grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-14 lg:px-10">
          {/* Plastic */}
          <div className="gray-gradient p-2.5 b-gray-gradient rounded-2xl">
            <div className="py-8 mb-2.5 how-it-works b-gray-gradient rounded-t-2xl h-32 lg:h-44 overflow-hidden flex items-center justify-center">
              <img src="./images/recycle.png" alt="Recycle" className="recycle mx-auto h-32" />
            </div>
            <div className="bg-secondary text-center p-2 lg:p-3 b-gray-gradient rounded-b-2xl">
              <span className="text-white font-semibold text-sm lg:text-base pb-1">PLASTIC</span>
              <h6 className="text-white font-extrabold text-22 lg:text-28">{materialTotals.plastic}g</h6>
            </div>
          </div>
          {/* Gold */}
          <div className="gray-gradient p-2.5 b-gray-gradient rounded-2xl">
            <div className="py-8 mb-2.5 how-it-works b-gray-gradient rounded-t-2xl h-32 lg:h-44 overflow-hidden flex items-center justify-center">
              <h3 className="font-semibold text-center text-64 text-white">Au</h3>
            </div>
            <div className="bg-secondary text-center p-2 lg:p-3 b-gray-gradient rounded-b-2xl">
              <span className="text-white font-semibold text-sm lg:text-base pb-1">GOLD</span>
              <h6 className="text-white font-extrabold text-22 lg:text-28">{materialTotals.gold}g</h6>
            </div>
          </div>
          {/* Copper */}
          <div className="gray-gradient p-2.5 b-gray-gradient rounded-2xl">
            <div className="py-8 mb-2.5 how-it-works b-gray-gradient rounded-t-2xl h-32 lg:h-44 overflow-hidden flex items-center justify-center">
              <h3 className="font-semibold text-center text-64 text-white">Cu</h3>
            </div>
            <div className="bg-secondary text-center p-2 lg:p-3 b-gray-gradient rounded-b-2xl">
              <span className="text-white font-semibold text-sm lg:text-base pb-1">COPPER</span>
              <h6 className="text-white font-extrabold text-22 lg:text-28">{materialTotals.copper}g</h6>
            </div>
          </div>
          {/* Aluminium */}
          <div className="gray-gradient p-2.5 b-gray-gradient rounded-2xl">
            <div className="py-8 mb-2.5 how-it-works b-gray-gradient rounded-t-2xl h-32 lg:h-44 overflow-hidden flex items-center justify-center">
              <h3 className="font-semibold text-center text-64 text-white">Al</h3>
            </div>
            <div className="bg-secondary text-center p-2 lg:p-3 b-gray-gradient rounded-b-2xl">
              <span className="text-white font-semibold text-sm lg:text-base pb-1">ALUMINIUM</span>
              <h6 className="text-white font-extrabold text-22 lg:text-28">{materialTotals.aluminium}g</h6>
            </div>
          </div>
        </div>
        <p className="text-primary font-semibold text-22 lg:text-28 xl:text-34 ordernum">
          You have just collected a total of <span className="text-secondary font-extrabold">
            {(materialTotals.plastic + materialTotals.gold + materialTotals.copper + materialTotals.aluminium) / 1000}kg
          </span> of E-Waste. When correctly recycled, this saves up to <span className="text-secondary font-extrabold">
            {((materialTotals.plastic + materialTotals.gold + materialTotals.copper + materialTotals.aluminium) / 1000 * 10.3).toFixed(2)}kg
          </span> of CO2 equivalent.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 pt-12">
          <div className="lg:border-r-2 lg:mr-14">
            <img src="/images/save-earth.png" alt="Save Earth" className="h-72 mx-auto" />
          </div>
          <div>
            <h4 className="text-primary font-bold text-base lg:text-22 mb-5 lg:mb-10 ordernum">YOUR CO2 SAVING EQUALS<br></br> TO A DRIVE OF:</h4>
            <h1 className="text-secondary font-bold text-sm lg:text-22 lg:text-64 km"> {(((materialTotals.plastic + materialTotals.gold + materialTotals.copper + materialTotals.aluminium) / 1000 * 10.3) / 0.12).toFixed(2)}KM</h1>
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default Welldone;
