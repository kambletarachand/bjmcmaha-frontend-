import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import '../styles/aboutus.css';

const teamData = [
  {
    name: 'Jyoti Nitin Sawardekar',
    designation: 'President',
    mobile: '',
    image: '/profile images/president/p.jpeg'
  },
  {
    name: 'Jayash Rasikbhai Tank',
    designation: 'Vice President',
    mobile: '8087440447',
    image: '/profile images/vice president/Jayesh Tank_VP.jpg'
  },
  {
    name: 'Santosh Bapu Kasbe',
    designation: 'Vice President',
    mobile: '7620597572',
    image: '/profile images/vice president/SantoshKasbe_vp.jpeg'
  },
  {
    name: 'Nilesh Babulal Makawana',
    designation: 'Vice President',
    mobile: '8983013713',
    image: '/profile images/vice president/nilesh makwana VP.jpg'
  },
  {
    name: 'Santosh Ashok Gaikwad',
    designation: 'Vice President',
    mobile: '8983447127',
    image: '/profile images/vice president/SantoshGaikwad_VP.jpeg'
  },
  {
    name: 'Suraj Pralhad Todakar',
    designation: 'Vice President',
    mobile: '9960036547',
    image: '/profile images/vice president/Suraj Todkar_VP _4.jpeg'
  },
  {
    name: 'Yogesh Digambar Sonawane',
    designation: 'Vice President',
    mobile: '8275465114',
    image: '/profile images/vice president/YogeshSonawane_VP_3.jpeg'
  },
  {
    name: 'Ekta Manish Sanghvvi',
    designation: 'General Secretary',
    mobile: '9422030335',
    image: '/profile images/general secretary/Ekta Sanghvvi_General Secretary.jpeg'
  },
  {
    name: 'Aroona Chandrakant Kavathekar',
    designation: 'General Secretary',
    mobile: '9850568844',
    image: '/profile images/general secretary/Aroona_General Secretary.jpeg'
  },
  {
    name: 'Kiran Sunil Vaswani',
    designation: 'General Secretary',
    mobile: '8559050038',
    image: '/profile images/general secretary/Kiran Sunil Vaswani_Secretary.jpeg'
  },
  {
    name: 'Suresh Bhau Barawkar',
    designation: 'General Secretary',
    mobile: '7588870515',
    image: '/profile images/general secretary/SureshBarawkar_General Secretary.jpeg'
  },
  {
    name: 'Bhavin Hemant Shah',
    designation: 'Secretary',
    mobile: '8767198002',
    image: '/profile images/secretary/BhavenShah_Secretary.jpeg'
  },
  {
    name: 'Sagar Malhari Kudale',
    designation: 'Secretary',
    mobile: '8007866455',
    image: ''
  },
  {
    name: 'Yatin Ajay Mane',
    designation: 'Secretary',
    mobile: '7776808434',
    image: '/profile images/secretary/YatinMane_Secretary.jpeg'
  },
  {
    name: 'Aditya Sanjay Chavan',
    designation: 'Secretary',
    mobile: '9511670108',
    image: '/profile images/secretary/AdityaChavan_Secretary.jpeg'
  },
  {
    name: 'Aniket Ramesh Lagad',
    designation: 'Secretary',
    mobile: '777399902',
    image: '/profile images/secretary/Aniket Lagad Secretary.jpg'
  },
  {
    name: 'Ganesh Surve',
    designation: 'Secretary',
    mobile: '9145369295',
    image: '/profile images/secretary/Ganesh Surve _Secretary.jpg'
  },
  {
    name: 'Kakoli Bishwajit Ghosh',
    designation: 'Secretary',
    mobile: '9970525058',
    image: '/profile images/secretary/KakoliGhosh.jpeg'
  },
  {
    name: 'Anuradha Shiddgonda Patil',
    designation: 'Secretary',
    mobile: '8180028099',
    image: '/profile images/secretary/AnuradhaPatil.jpeg'
  },
  {
    name: 'Aman Nitin Sawardekar',
    designation: 'Treasurer',
    mobile: '7350002671',
    image: ''
  },
  {
    name: 'Adv. Pranali Vijay Chavan',
    designation: 'Treasurer',
    mobile: '8805334983',
    image: '/profile images/treasurer/PranitaVijayChavhan_Treasurer_10.jpeg'
  },
  {
    name: 'Tarchand Appasaheb Kamble',
    designation: 'IT Team',
    mobile: '7259244212',
    image: '/profile images/IT/Tarachand Kamble _ IT.jpg'
  },
  {
    name: 'Atharva Rajendra Shitole',
    designation: 'Member',
    mobile: '9579734275',
    image: '/profile images/members/Atharva Shitole_member.png'
  },
  {
    name: 'Nachiket Dinesh Shitole',
    designation: 'Member',
    mobile: '9697972002',
    image: '/profile images/members/NachiketDineshShitole_member.jpeg'
  },
  {
    name: 'Asaram Devidas Mane',
    designation: 'Member',
    mobile: '8805369017',
    image: '/profile images/members/AsaramMane_member.jpeg'
  },
  {
    name: 'Avdhut Vitthal Chavan',
    designation: 'Member',
    mobile: '9762040049',
    image: '/profile images/members/Audhut Chavan_member.jpeg'
  },
  {
    name: 'Amit Vitthal Raut',
    designation: 'Member',
    mobile: '7350002672',
    image: '/profile images/members/AmitRaut_member.jpeg'
  },
  {
    name: 'Umakant Shamrao Fulzele',
    designation: 'Member',
    mobile: '9881543808',
    image: '/profile images/members/Umakant Fulzele_member.jpg'
  }
];


const AboutUs = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const openModal = (member) => setSelectedMember(member);
  const closeModal = () => setSelectedMember(null);

  const groupedByDesignation = teamData.reduce((acc, member) => {
    if (!acc[member.designation]) acc[member.designation] = [];
    acc[member.designation].push(member);
    return acc;
  }, {});

  return (
    <Layout>
      <div className="aboutus-banner">
        <div className="aboutus-content">
          <h2>✨ Vision, Mission & Our Journey</h2>
          <p>
            Bharatiya Janata Majdoor Cell Maharashtra is the state chapter working under the national umbrella of BJMC. Led by President Jyoti Sawardekar, BJMC Maharashtra is committed to the empowerment, organization, and representation of workers across Maharashtra. We stand for dignity in labor, equal opportunity, and the upliftment of underrepresented voices in the workforce.
          </p>

          <h2>🎯 Vision</h2>
          <p>
            To empower and safeguard the collective strength of workers across India by fostering legally recognized, transparent, and responsible trade unions that champion workers’ rights and welfare.
          </p>

          <h2>🚀 Mission</h2>
          <p>
            To regulate the formation and functioning of trade unions, ensure their legal status and immunity, promote peaceful industrial relations, and provide a democratic platform for the collective voice of labor.
          </p>

          <h2>🎯 Aim</h2>
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

          <h2>🌐 About BJMC (National)</h2>
          <p>
            Bharatiya Janata Majdoor Cell (BJMC) is a national-level organization dedicated to the rights and welfare of workers across India. BJMC Maharashtra operates as a state chapter under this national umbrella, aligning with its mission while addressing local needs.
            <Link to="/bjmc-national"> Learn more about BJMC National &rarr;</Link>
          </p>

          <hr className="section-divider" />

          <h1>Our Team</h1>
          {Object.entries(groupedByDesignation).map(([role, members]) => (
            <div key={role}>
              <h2>{role}</h2>
              <div className="team-card-grid">
                {members.map((member, idx) => (
                  <div className="team-card" key={idx}>
                    <img src={member.image} alt={member.name} className="team-image" />
                    <h4>{member.name}</h4>
                    <button className="info-btn" onClick={() => openModal(member)}>
                      ℹ
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {selectedMember && (
            <div className="modal" onClick={closeModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={closeModal}>&times;</span>
                <img src={selectedMember.image} alt={selectedMember.name} className="modal-image" />
                <h3>{selectedMember.name}</h3>
                <p><strong>Designation:</strong> {selectedMember.designation}</p>
                {selectedMember.mobile && <p><strong>Mobile:</strong> {selectedMember.mobile}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
