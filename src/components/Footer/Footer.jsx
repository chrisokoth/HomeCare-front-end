import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_1}>
        <Link className={styles.text_1} to="/">
          AtHomeCare<span className={styles.text_2}></span>
        </Link>
        <p className={styles.text_3}>HealthCare Without Boundaries</p>
      </div>
      <div className={styles.footer_2}>
        <p className={styles.text_4}>Important Links</p>
        <div className={styles.links}>
          <Link to="/health_history">Health History</Link>
          <Link to="/prescription">Prescription</Link>
          <Link to="/test">Test & Reports</Link>
          <Link to="/appointment">Appointment</Link>
        </div>
      </div>
      <div className={styles.footer_3}>
        <p className={styles.text_6}>Contact Us</p>
        <a className={styles.contact_1}>Call: (+254) 734578965</a>
        <p className={styles.address}>
          <span className={styles.addressSpan}>Address:</span> Nairobi, Kenya
        </p>
      </div>
    </div>
  );
};

export default Footer;
