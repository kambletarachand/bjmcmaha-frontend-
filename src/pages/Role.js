const ROLES = {
  VISITOR: 'visitor', // Default role for citizens of Maharashtra

  // Central Roles
  ADMIN: 'ADMIN',         // Includes both President and IT Admin
  IT_ADMIN: 'itAdmin',
  PRESIDENT: 'president',

  // Vice Presidents (zone-based)
  VICE_PRESIDENTS: [
    'vicepresident_z1',
    'vicepresident_z2',
    'viceresident_z3',
    'vicepresident_z4',
    'vicepresident_z5',
    'vicepresident_z6'
  ],

  // General Secretaries (non-zone-based)
  GENERAL_SECRETARIES: [
    'generalsecretary1',
    'generalsecretary2',
    'generalsecretary_3',
    'generalsecretary4'
  ],

  // Secretaries (non-zone-based)
  SECRETARIES: [
    'secretary_1',
    'secretary_2',
    'secretary_3',
    'secretary_4',
    'secretary_5',
    'secretary_6',
    'secretary_7',
    'secretary_8'
  ],

  // Treasurers (non-zone-based)
  TREASURERS: [
    'treasurer_1',
    'treasurer_2'
  ],

  // District Leaders (each district has one)
  DISTRICT_LEADERS: [
    'DistrictLeader_Ahmednagar',
    'DistrictLeader_Akola',
    'DistrictLeader_Amravati',
    'DistrictLeader_Aurangabad',
    'DistrictLeader_Beed',
    'DistrictLeader_Bhandara',
    'DistrictLeader_Buldhana',
    'DistrictLeader_Chandrapur',
    'DistrictLeader_Dhule',
    'DistrictLeader_Gadchiroli',
    'DistrictLeader_Gondia',
    'DistrictLeader_Hingoli',
    'DistrictLeader_Jalgaon',
    'DistrictLeader_Jalna',
    'DistrictLeader_Kolhapur',
    'DistrictLeader_Latur',
    'DistrictLeader_MumbaiCity',
    'DistrictLeader_MumbaiSuburban',
    'DistrictLeader_Nagpur',
    'DistrictLeader_Nanded',
    'DistrictLeader_Nandurbar',
    'DistrictLeader_Nashik',
    'DistrictLeader_Osmanabad',
    'DistrictLeader_Parbhani',
    'DistrictLeader_Palghar',
    'DistrictLeader_Pune',
    'DistrictLeader_Raigad',
    'DistrictLeader_Ratnagiri',
    'DistrictLeader_Sangli',
    'DistrictLeader_Satara',
    'DistrictLeader_Sindhudurg',
    'DistrictLeader_Solapur',
    'DistrictLeader_Thane',
    'DistrictLeader_Wardha',
    'DistrictLeader_Washim',
    'DistrictLeader_Yavatmal'
  ]
};

// Group: All central-level body members (non-district)
const BODY_MEMBER_ROLES = [
  ROLES.ADMIN,
  ROLES.IT_ADMIN,
  ROLES.PRESIDENT,
  ...ROLES.VICE_PRESIDENTS,
  ...ROLES.GENERAL_SECRETARIES,
  ...ROLES.SECRETARIES,
  ...ROLES.TREASURERS
];

// Group: Only district-level members
const MEMBER_ROLES = [...ROLES.DISTRICT_LEADERS];

// Role check helpers
const isVisitor = (role) => role === ROLES.VISITOR;
const isBodyMember = (role) => BODY_MEMBER_ROLES.includes(role);
const isDistrictLeader = (role) => ROLES.DISTRICT_LEADERS.includes(role);
const isVicePresident = (role) => ROLES.VICE_PRESIDENTS.includes(role);
const isGeneralSecretary = (role) => ROLES.GENERAL_SECRETARIES.includes(role);
const isSecretary = (role) => ROLES.SECRETARIES.includes(role);
const isTreasurer = (role) => ROLES.TREASURERS.includes(role);
const isPresident=(role=> ROLES.PRESIDENT)

export {
  ROLES,
  BODY_MEMBER_ROLES,
  MEMBER_ROLES,
  isVisitor,
  isBodyMember,
  isDistrictLeader,
  isVicePresident,
  isGeneralSecretary,
  isSecretary,
  isTreasurer,
  isPresident
};
