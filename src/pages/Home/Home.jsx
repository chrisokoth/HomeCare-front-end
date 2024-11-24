

import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./home.module.css";
import Footer from "../../components/Footer/Footer";
import { useSelector } from "react-redux";
import NavbarD from "../../components/Doctor/NavbarD/NavbarD";
import { useRef, useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { 
  Activity, 
  Video, 
  ClipboardList, 
  Calendar, 
  Pill, 
  MessageSquare,
  ChevronDown,
  ChevronUp 
} from 'lucide-react';

function Home() {
  const doctor = useSelector((state) => state.doctor);
  const patient = useSelector((state) => state.patient);
  const [imagesInView, setImagesInView] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [showFaqs, setShowFaqs] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImagesInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.9 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [imagesInView]);

  const services = [
    {
      icon: <Video className="w-8 h-8 text-blue-600" />,
      title: "Video Consultations",
      description: "Secure high-quality telemedicine sessions optimized for low bandwidth areas"
    },
    {
      icon: <Activity className="w-8 h-8 text-blue-600" />,
      title: "Remote Monitoring",
      description: "Real-time vital signs tracking with automated health alerts"
    },
    {
      icon: <ClipboardList className="w-8 h-8 text-blue-600" />,
      title: "Digital Records",
      description: "Comprehensive electronic health records with secure storage"
    },
    {
      icon: <Pill className="w-8 h-8 text-blue-600" />,
      title: "Prescription Management",
      description: "Digital prescriptions with medication tracking and reminders"
    },
    {
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      title: "Easy Scheduling",
      description: "Streamlined appointment booking with healthcare providers"
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-blue-600" />,
      title: "Direct Communication",
      description: "Instant messaging between patients and healthcare providers"
    }
  ];

  const featuredServices = [
    {
      image: "service1.webp",
      title: "24/7 Telemedicine",
      description: "Connect with qualified healthcare providers anytime, anywhere in Kenya"
    },
    {
      image: "service2.webp", 
      title: "Remote Health Monitoring",
      description: "Track your vital signs and health metrics from home with real-time monitoring"
    },
    {
      image: "service3.webp",
      title: "Digital Health Records", 
      description: "Access your complete medical history in one secure digital platform"
    }
  ];

  const faqs = [
    {
      question: "What is AtHomeCare and how does it work?",
      answer: "AtHomeCare is a telemedicine platform connecting patients with healthcare providers across Kenya. Get video consultations, health monitoring, and digital prescriptions from home."
    },
    {
      question: "What are the technical requirements?",
      answer: "You need an internet connection with at least 1Mbps speed, a smartphone (Android 8.0+ or iOS 13.0+) or a computer with webcam and microphone."
    },
    {
      question: "How do I schedule an appointment?",
      answer: "Click 'Book an Appointment', select your provider, choose a time slot, and complete the M-PESA payment. You'll receive immediate confirmation."
    },
    {
      question: "Is my medical information secure?",
      answer: "Yes, we use end-to-end encryption and comply with Kenya's Data Protection Act 2019. Your records are stored securely with strict access controls."
    }
  ];

  return (
    <>
      {doctor.isLoggedIn && !patient.isLoggedIn ? <NavbarD /> : <Navbar />}
      <div className={styles.herosection}>
        <div className={styles.img1}>
          <LazyLoadImage src="img1.webp" alt="Hero" />
        </div>
        <div className={styles.content}>
          <TypeAnimation
            sequence={[
              "CARING FOR LIFE",
              1000,
              "CARING FOR YOU",
              1000,
              "CARING FOR HEALTH",
              1000,
              "CARING FOR FUTURE",
              1000,
            ]}
            speed={0}
            repeat={Infinity}
          />
          <div className={styles.content2}>
            HealthCare <br /> Without Boundaries
          </div>
          <Link to="/health_history">
            <div className={styles.content3}>Get Started</div>
          </Link>
        </div>
        <div className={styles.group}>
          <LazyLoadImage src="Group.webp" alt="Group" />
        </div>
        <div className={styles.button}>
          <Link to="/health_history">
            <div className={styles.b1}>
              Check your Health History
              <LazyLoadImage src="history.webp" alt="History" />
            </div>
          </Link>
          <div className={styles.b2} onClick={() => setShowFaqs(!showFaqs)}>
            FAQs
            <LazyLoadImage src="query.webp" alt="Query" />
          </div>
          <Link to="/appointment">
            <div className={styles.b3}>
              Book an Appointment
              <LazyLoadImage src="appointment.webp" alt="Appointment" />
            </div>
          </Link>
        </div>

        {showFaqs && (
          <div className={styles.faqOverlay} onClick={() => setShowFaqs(false)}>
            <div className={styles.faqContainer} onClick={e => e.stopPropagation()}>
              <div className={styles.faqHeader}>
                <h2>Frequently Asked Questions</h2>
                <button className={styles.closeButton} onClick={() => setShowFaqs(false)}>×</button>
              </div>
              <div className={styles.faqList}>
                {faqs.map((faq, index) => (
                  <div key={index} className={styles.faqItem}>
                    <button
                      className={styles.faqQuestion}
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    >
                      <span>{faq.question}</span>
                      {activeFaq === index ? (
                        <ChevronUp className={styles.faqIcon} />
                      ) : (
                        <ChevronDown className={styles.faqIcon} />
                      )}
                    </button>
                    {activeFaq === index && (
                      <div className={styles.faqAnswer}>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.lowerSection}>
        <div className={styles.lp1}>Welcome to AtHomeCare</div>
        <div className={styles.lp2}>
          Empowering Healthcare Through Digital Innovation
        </div>
        <div className={styles.lp3}>
          Experience Healthcare Without Boundaries with AtHomeCare.
          <br />
          Connect with doctors, monitor your health, and manage medical records seamlessly.
          <br />
          Quality healthcare at your fingertips, anywhere in Kenya.
        </div>
        
        <div className={styles.landImage}>
          <div ref={sectionRef} className={styles.cardGroups}>
            <div className={styles.cardGroup}>
              <div className={`${styles.bigCard} ${styles.card} ${imagesInView ? styles.animateCard1 : ""}`}></div>
              <div className={`${styles.bigCard} ${styles.card} ${imagesInView ? styles.animateCard2 : ""}`}></div>
              <div className={`${styles.bigCard} ${styles.card} ${imagesInView ? styles.animateCard3 : ""}`}></div>
              <div className={`${styles.bigCard} ${styles.card} ${imagesInView ? styles.animateCard4 : ""}`}></div>
            </div>
          </div>
        </div>

        <div className={styles.lp4}></div>
        <div className={styles.lp5}>Our Services</div>
        <div className={styles.lp6}>
          Facilitating Seamless Healthcare Access Across Kenya
        </div>
        
        <div className={styles.lp7}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-blue-50 rounded-full">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <p className="text-gray-600 text-center">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.featuredServices}>
        <h2>Featured Services</h2>
        <div className={styles.servicesList}>
          {featuredServices.map((service, index) => (
            <div key={index} className={styles.service}>
              <LazyLoadImage src={service.image} alt={service.title} />
              <h4>{service.title}</h4>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;