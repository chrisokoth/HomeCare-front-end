import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Appointment.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Appointment() {
  const navigate = useNavigate();
  const [step, setStep] = useState("details"); // 'details', 'summary', 'payment'

  const [formData, setFormData] = useState({
    patientName: "",
    appointmentDate: "",
    preferredTime: "",
    doctorId: "",
    symptoms: "",
    phoneNumber: "",
  });

  const [paymentMethod, setPaymentMethod] = useState(""); // "card" or "mobile_money"
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
    mobileMoneyNumber: "",
  });

  const doctors = [
    { id: 1, name: "Dr. Roman Reigns", specialty: "Dentist" },
    { id: 2, name: "Dr. Sarah Smith", specialty: "General Physician" },
    { id: 3, name: "Dr. John Doe", specialty: "Cardiologist" },
  ];

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.patientName || !formData.appointmentDate || !formData.doctorId) {
      toast.error("Please fill in all required fields");
      return;
    }
    setStep("summary");
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (paymentMethod === "card" && (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv)) {
      toast.error("Please fill in all card payment details");
      return;
    }
    if (paymentMethod === "mobile_money" && !paymentDetails.mobileMoneyNumber) {
      toast.error("Please fill in your mobile money number");
      return;
    }

    toast.success("Payment successful! Appointment booked.");
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.grid_container}>
          <div className={styles.left_wrapper}>
            {/* Doctor list and recent appointments */}
            <div className={styles.t1}>Recent Appointments</div>
            <div className={styles.docs}>
              {doctors.map((doctor, index) => (
                <div key={index} className={index === 0 ? styles.doc1 : styles.doc2}>
                  <img src="doc.webp" alt="doctor" />
                  <div>
                    <div className={styles.t2}>{doctor.specialty}</div>
                    <div className={styles.t3}>{doctor.name}</div>
                  </div>
                  <div className={styles.date}>&#128197; 20Jan 2023</div>
                </div>
              ))}
            </div>

            <div className={styles.t1}>Available Doctors</div>
            <div className={styles.docsu}>
              {doctors.map((doctor, index) => (
                <div key={index} className={index === 0 ? styles.doc1 : styles.doc2}>
                  <img src="doc.webp" alt="doctor" />
                  <div>
                    <div className={styles.t2}>{doctor.specialty}</div>
                    <div className={styles.t3}>{doctor.name}</div>
                  </div>
                  <div className={styles.status}>Available</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.right_wrapper}>
            {step === "details" ? (
              <div className={styles.formCard}>
                <h1 className={styles.formTitle}>Schedule Your Appointment</h1>
                <form onSubmit={handleSubmit} className={styles.consultationForm}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Full Name</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Appointment Date</label>
                      <input
                        type="date"
                        className={styles.input}
                        value={formData.appointmentDate}
                        onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Preferred Time</label>
                      <select
                        className={styles.select}
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        required
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((time, index) => (
                          <option key={index} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Select Doctor</label>
                    <select
                      className={styles.select}
                      value={formData.doctorId}
                      onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                      required
                    >
                      <option value="">Choose your doctor</option>
                      {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.name} - {doctor.specialty}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Reason for Visit</label>
                    <textarea
                      className={styles.textarea}
                      rows="4"
                      value={formData.symptoms}
                      onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                      placeholder="Describe your symptoms or reason for visit"
                      required
                    />
                  </div>

                  <button type="submit" className={styles.submitButton}>
                    Continue to Review
                  </button>
                </form>
              </div>
            ) : step === "summary" ? (
              <div className={styles.summaryCard}>
                <h2 className={styles.summaryTitle}>Review Appointment Details</h2>
                <div className={styles.summaryContent}>
                  <div className={styles.summaryItem}>
                    <span>Patient Name:</span>
                    <span>{formData.patientName}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span>Date:</span>
                    <span>{new Date(formData.appointmentDate).toLocaleDateString()}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span>Preferred Time:</span>
                    <span>{formData.preferredTime}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span>Doctor:</span>
                    <span>{doctors.find((d) => d.id === parseInt(formData.doctorId))?.name}</span>
                  </div>
                </div>

                <div className={styles.pricingDetails}>
                  <div className={styles.priceItem}>
                    <span>Consultation Fee</span>
                    <span>$129</span>
                  </div>
                  <div className={styles.priceItem}>
                    <span>Online Booking Fee</span>
                    <span>$0</span>
                  </div>
                  <div className={styles.totalPrice}>
                    <span>Total Amount</span>
                    <span>$129</span>
                  </div>
                </div>

                <div className={styles.buttonGroup}>
                  <button className={styles.backButton} onClick={() => setStep("details")}>
                    Edit Details
                  </button>
                  <button className={styles.continueButton} onClick={() => setStep("payment")}>
                    Continue to Payment
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.paymentCard}>
                <h2 className={styles.paymentTitle}>Complete Payment</h2>
                <div className={styles.totalAmount}>Amount to Pay: $129</div>
                <form onSubmit={handlePayment} className={styles.paymentForm}>
                  <div className={styles.formGroup}>
                    <label>Payment Method</label>
                    <select
                      className={styles.select}
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      required
                    >
                      <option value="">Choose Payment Method</option>
                      <option value="card">Card</option>
                      <option value="mobile_money">Mobile Money</option>
                    </select>
                  </div>

                  {paymentMethod === "card" && (
                    <>
                      <div className={styles.formGroup}>
                        <label>Card Number</label>
                        <input
                          type="text"
                          className={styles.input}
                          value={paymentDetails.cardNumber}
                          onChange={(e) =>
                            setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })
                          }
                          placeholder="Enter card number"
                          required
                        />
                      </div>
                      <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                          <label>Expiry Date</label>
                          <input
                            type="month"
                            className={styles.input}
                            value={paymentDetails.expiryDate}
                            onChange={(e) =>
                              setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label>CVV</label>
                          <input
                            type="text"
                            className={styles.input}
                            value={paymentDetails.cvv}
                            onChange={(e) =>
                              setPaymentDetails({ ...paymentDetails, cvv: e.target.value })
                            }
                            maxLength={3}
                            placeholder="CVV"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {paymentMethod === "mobile_money" && (
                    <div className={styles.formGroup}>
                      <label>Mobile Money Number</label>
                      <input
                        type="text"
                        className={styles.input}
                        value={paymentDetails.mobileMoneyNumber}
                        onChange={(e) =>
                          setPaymentDetails({
                            ...paymentDetails,
                            mobileMoneyNumber: e.target.value,
                          })
                        }
                        placeholder="Enter Mobile Money number"
                        required
                      />
                    </div>
                  )}

                  <button type="submit" className={styles.submitButton}>
                    Pay and Confirm
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Appointment;
