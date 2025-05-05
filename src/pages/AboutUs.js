import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import '../styles/aboutus.css';

const teamMembers = [
  { name: "Jyoti Sawardekar", designation: "State President", image: "/profile images/p.jpeg" },
  { name: "Ekta Sanghvvi", designation: "Vice President", image: "/profile images/5.jpeg" },
  { name: "Dr. Biswapriya Roy Chowdhury", designation: "General Secretary", image: "/profile images/1.jpeg"},
  { name: "Arnab Chatterjee", designation: "Joint Secretary", image: "/profile images/4.jpeg"},
  { name: "Aroona Chandrakanth Kavathekar", designation: "Treasurer", image: "/profile images/aroona.jpeg" },
  { name: "Savita Anil Pande", designation: "Media Head", image: "/profile images/2.jpeg" },
  { name: "Suresh Naik", designation: "Labour Welfare Officer", image: "/team/suresh.jpg" },
  { name: "Anjali More", designation: "Legal Advisor", image: "/team/anjali.jpg" },
  { name: "Ravi Kulkarni", designation: "Campaign Manager", image: "/team/ravi.jpg" },
  { name: "Pooja Sawant", designation: "Event Coordinator", image: "/team/pooja.jpg" },
  { name: "Nitin Kale", designation: "Social Media Lead", image: "/team/nitin.jpg" },
];

const AboutUs = () => {
  return (
    <Layout>
      <div className="aboutus-banner">
        <img
          src="/images/bjmc logo.webp"
          alt="BJMC Logo"
          className="aboutus-logo"
        />
        <div className="aboutus-content">
          <h1>About Us</h1>
          <h2>Vision, Mission & Our Journey</h2>

          <p>
            Bharatiya Janata Majdoor Cell Maharashtra is the state chapter working under the national umbrella of BJMC. Led by President Jyoti Sawardekar, BJMC Maharashtra is committed to the empowerment, organization, and representation of workers across Maharashtra. We stand for dignity in labor, equal opportunity, and the upliftment of underrepresented voices in the workforce.
          </p>

          <h2>Vision</h2>
          <p>
            To empower and safeguard the collective strength of workers across India by fostering legally recognized, transparent, and responsible trade unions that champion workers’ rights and welfare.
          </p>

          <h2>Mission</h2>
          <p>
            To regulate the formation and functioning of trade unions, ensure their legal status and immunity, promote peaceful industrial relations, and provide a democratic platform for the collective voice of labor.
          </p>

          <h2>Aim</h2>
          <ul>
            <li>To provide a legal framework for the registration and protection of trade unions.</li>
            <li>To secure immunity for registered unions in civil and criminal proceedings related to lawful trade disputes.</li>
            <li>To promote transparency and accountability in union operations through regular returns and regulations.</li>
          </ul>

          <blockquote className="highlight-quote">
            <p>
              "Unity is Strength – Established in 1926, the Shramik Sangh Adhiniyam (Trade Unions Act) laid the foundation for organized labor in India. With a vision of collective empowerment and protection, this act grants legal identity and safeguards to trade unions. Let us honor this legacy and work towards a future where every worker’s voice is heard, respected, and protected."
            </p>
          </blockquote>

          <p>
            <strong>#ShramikSanghAdhiniyam1926 #WorkersRights #UnionPower #LaborLaws #EmpoweringIndia</strong>
          </p>

          <h2>About BJMC (National)</h2>
          <p>
            Bharatiya Janata Majdoor Cell (BJMC) is a national-level organization dedicated to the rights and welfare of workers across India. BJMC Maharashtra operates as a state chapter under this national umbrella, aligning with its mission while addressing local needs.
            <Link to="/bjmc-national"> Learn more about BJMC National &rarr;</Link>
          </p>

          <h2>Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div className="team-card" key={index}>
                <img src={member.image} alt={member.name} className="team-image" />
                <h3>{member.name}</h3>
                <p>{member.designation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
