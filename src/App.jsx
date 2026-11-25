import React, { useState, useMemo, useEffect } from 'react';
import {
  Users, Calendar, BarChart3, ShieldCheck, UserPlus, ClipboardList,
  MapPin, Lock, Unlock, Plus, Trash2, Archive, RotateCcw, Search,
  Edit3, Check, X, Eye, EyeOff, TrendingUp, BookOpen, Bell,
  Download, Phone, Home, HeartHandshake, ChevronRight, Award,
  Sparkles, Filter, CheckCircle2, AlertCircle
} from 'lucide-react';

// ============================================================================
// INITIAL DATA & CHURCH RECORDS (DLBC POLAND: WARSAW, WROCLAW, POZNAN, KRAKOW)
// ============================================================================
const INITIAL_PEOPLE = [
  // WORKERS
  { id: 'p1', category: 'Worker', title: 'Pastor', fullName: 'Pastor Dare', phone: '+48 500 100 001', address: 'ul. Puławska 42/12, Warsaw', emergencyName: 'Sister Grace Dare', emergencyPhone: '+48 500 100 091', location: 'Warsaw', accessRole: 'head_pastor', units: ['Pastoral', 'Preaching', 'Leadership'], joinDate: '2021-03-10', status: 'Active' },
  { id: 'p2', category: 'Worker', title: 'Pastor', fullName: 'Pastor William', phone: '+48 500 100 002', address: 'ul. Świdnicka 18/4, Wrocław', emergencyName: 'Sister Ruth William', emergencyPhone: '+48 500 100 092', location: 'Wrocław', accessRole: 'full_access', units: ['National Oversight', 'Preaching'], joinDate: '2019-06-01', status: 'Active' },
  { id: 'p3', category: 'Worker', title: 'Bro', fullName: 'Bro David', phone: '+48 500 100 003', address: 'ul. Marszałkowska 88/7, Warsaw', emergencyName: 'Bro Samuel', emergencyPhone: '+48 500 100 005', location: 'Warsaw', accessRole: 'usher_entry', units: ['STS', 'Moderation', 'Choir'], joinDate: '2022-01-15', status: 'Active' },
  { id: 'p4', category: 'Worker', title: 'Sister', fullName: 'Sister Esther', phone: '+48 500 100 004', address: 'ul. Mokotowska 19/3, Warsaw', emergencyName: 'Sister Deborah', emergencyPhone: '+48 500 100 008', location: 'Warsaw', accessRole: 'member', units: ['Choir', 'Follow-up', 'Children'], joinDate: '2022-05-20', status: 'Active' },
  { id: 'p5', category: 'Worker', title: 'Bro', fullName: 'Bro Samuel', phone: '+48 500 100 005', address: 'ul. Grójecka 65/11, Warsaw', emergencyName: 'Bro David', emergencyPhone: '+48 500 100 003', location: 'Warsaw', accessRole: 'member', units: ['Media / Technical', 'Vigils'], joinDate: '2022-09-12', status: 'Active' },
  { id: 'p6', category: 'Worker', title: 'Bro', fullName: 'Bro Pelumi', phone: '+48 500 100 006', address: 'ul. Targowa 33/9, Warsaw', emergencyName: 'Bro Emmanuel', emergencyPhone: '+48 500 100 010', location: 'Warsaw', accessRole: 'usher_entry', units: ['Ushering', 'Data Entry', 'STS', 'Moderation'], joinDate: '2023-02-14', status: 'Active' },
  { id: 'p7', category: 'Worker', title: 'Bro', fullName: 'Bro Caleb', phone: '+48 500 100 007', address: 'ul. Półwiejska 24/6, Poznań', emergencyName: 'Sister Hannah', emergencyPhone: '+48 500 100 014', location: 'Poznań', accessRole: 'usher_entry', units: ['Location Lead', 'STS', 'Evangelism'], joinDate: '2023-04-02', status: 'Active' },
  { id: 'p8', category: 'Worker', title: 'Sister', fullName: 'Sister Deborah', phone: '+48 500 100 008', address: 'ul. Floriańska 15/2, Kraków', emergencyName: 'Sister Esther', emergencyPhone: '+48 500 100 004', location: 'Kraków', accessRole: 'usher_entry', units: ['Location Lead', 'Choir', 'Follow-up'], joinDate: '2023-06-18', status: 'Active' },
  { id: 'p9', category: 'Worker', title: 'Bro', fullName: 'Bro Joshua', phone: '+48 500 100 009', address: 'ul. Legnicka 50/8, Wrocław', emergencyName: 'Pastor William', emergencyPhone: '+48 500 100 002', location: 'Wrocław', accessRole: 'member', units: ['Ushering', 'Media / Technical'], joinDate: '2023-08-11', status: 'Active' },
  { id: 'p10', category: 'Worker', title: 'Bro', fullName: 'Bro Emmanuel', phone: '+48 500 100 010', address: 'ul. Jana Pawła II 29/14, Warsaw', emergencyName: 'Bro Pelumi', emergencyPhone: '+48 500 100 006', location: 'Warsaw', accessRole: 'member', units: ['Prayer Band', 'Vigils', 'Evangelism'], joinDate: '2023-10-05', status: 'Active' },
  // MEMBERS (SEPARATE DIRECTORY CATEGORY)
  { id: 'm1', category: 'Member', title: 'Bro', fullName: 'Bro Daniel Okafor', phone: '+48 501 200 101', address: 'ul. Wilcza 14/5, Warsaw', emergencyName: 'Sister Mary Okafor', emergencyPhone: '+48 501 200 102', location: 'Warsaw', accessRole: 'member', units: ['General Congregation'], joinDate: '2024-03-17', status: 'Active' },
  { id: 'm2', category: 'Member', title: 'Sister', fullName: 'Sister Mary Okafor', phone: '+48 501 200 102', address: 'ul. Wilcza 14/5, Warsaw', emergencyName: 'Bro Daniel Okafor', emergencyPhone: '+48 501 200 101', location: 'Warsaw', accessRole: 'member', units: ['Women Fellowship'], joinDate: '2024-03-17', status: 'Active' },
  { id: 'm3', category: 'Member', title: 'Bro', fullName: 'Bro Piotr Kowalski', phone: '+48 501 200 103', address: 'ul. Karmelicka 9/3, Kraków', emergencyName: 'Anna Kowalska', emergencyPhone: '+48 501 200 199', location: 'Kraków', accessRole: 'member', units: ['Youth / Campus'], joinDate: '2024-09-08', status: 'Active' },
  { id: 'm4', category: 'Member', title: 'Sister', fullName: 'Sister Abigail Mensah', phone: '+48 501 200 104', address: 'ul. Głogowska 72/4, Poznań', emergencyName: 'Kwame Mensah', emergencyPhone: '+48 501 200 198', location: 'Poznań', accessRole: 'member', units: ['Youth / Campus'], joinDate: '2025-01-19', status: 'Active' },
  { id: 'm5', category: 'Member', title: 'Bro', fullName: 'Bro Gideon Balogun', phone: '+48 501 200 105', address: 'ul. Oławska 11/6, Wrocław', emergencyName: 'Tunde Balogun', emergencyPhone: '+48 501 200 197', location: 'Wrocław', accessRole: 'member', units: ['Men Fellowship'], joinDate: '2025-04-13', status: 'Active' },
  { id: 'm6', category: 'Member', title: 'Sister', fullName: 'Sister Faith Adeyemi', phone: '+48 501 200 106', address: 'ul. Solec 44/10, Warsaw', emergencyName: 'Sister Esther', emergencyPhone: '+48 500 100 004', location: 'Warsaw', accessRole: 'member', units: ['General Congregation'], joinDate: '2025-08-24', status: 'Active' }
];

const INITIAL_ATTENDANCE = [
  // Historical Multi-Year & Service Comparison Data (Sunday vs Koinonia vs Bible Study vs Revival)
  { id: 'a1', date: '2023-10-15', period: '2023 H2', location: 'Warsaw', serviceType: 'Sunday Worship', adults: 14, youths: 3, children: 2, visitors: 1, offeringPln: 420, recordedBy: 'Pastor Dare' },
  { id: 'a2', date: '2023-10-18', period: '2023 H2', location: 'Warsaw', serviceType: 'Koinonia / Home Caring', adults: 9, youths: 2, children: 0, visitors: 0, offeringPln: 0, recordedBy: 'Bro David' },
  { id: 'a3', date: '2024-04-14', period: '2024 H1', location: 'Warsaw', serviceType: 'Sunday Worship', adults: 13, youths: 2, children: 2, visitors: 1, offeringPln: 390, recordedBy: 'Bro Pelumi' },
  { id: 'a4', date: '2024-04-17', period: '2024 H1', location: 'Warsaw', serviceType: 'Koinonia / Home Caring', adults: 8, youths: 2, children: 0, visitors: 0, offeringPln: 0, recordedBy: 'Bro Pelumi' },
  { id: 'a5', date: '2024-10-20', period: '2024 H2', location: 'Warsaw', serviceType: 'Sunday Worship', adults: 14, youths: 3, children: 1, visitors: 2, offeringPln: 460, recordedBy: 'Bro Pelumi' },
  { id: 'a6', date: '2024-10-23', period: '2024 H2', location: 'Warsaw', serviceType: 'Bible Study', adults: 10, youths: 2, children: 0, visitors: 0, offeringPln: 120, recordedBy: 'Bro David' },
  { id: 'a7', date: '2025-04-13', period: '2025 H1', location: 'Warsaw', serviceType: 'Sunday Worship', adults: 17, youths: 3, children: 2, visitors: 2, offeringPln: 580, recordedBy: 'Bro Pelumi' },
  { id: 'a8', date: '2025-04-16', period: '2025 H1', location: 'Warsaw', serviceType: 'Koinonia / Home Caring', adults: 12, youths: 3, children: 0, visitors: 1, offeringPln: 0, recordedBy: 'Bro Pelumi' },
  { id: 'a9', date: '2025-10-19', period: '2025 H2', location: 'Warsaw', serviceType: 'Sunday Worship', adults: 19, youths: 4, children: 3, visitors: 2, offeringPln: 690, recordedBy: 'Bro Pelumi' },
  { id: 'a10', date: '2025-10-22', period: '2025 H2', location: 'Warsaw', serviceType: 'Koinonia / Home Caring', adults: 14, youths: 3, children: 0, visitors: 1, offeringPln: 0, recordedBy: 'Bro Pelumi' },
  { id: 'a11', date: '2026-10-04', period: '2026 Q4', location: 'Warsaw', serviceType: 'Sunday Worship', adults: 21, youths: 4, children: 3, visitors: 3, offeringPln: 780, recordedBy: 'Bro Pelumi' },
  { id: 'a12', date: '2026-10-07', period: '2026 Q4', location: 'Warsaw', serviceType: 'Koinonia / Home Caring', adults: 16, youths: 3, children: 0, visitors: 2, offeringPln: 0, recordedBy: 'Bro Pelumi' },
  { id: 'a13', date: '2026-10-08', period: '2026 Q4', location: 'Warsaw', serviceType: 'Bible Study', adults: 15, youths: 3, children: 0, visitors: 1, offeringPln: 210, recordedBy: 'Bro David' },
  { id: 'a14', date: '2026-10-09', period: '2026 Q4', location: 'Warsaw', serviceType: 'Revival / Evangelism', adults: 14, youths: 4, children: 0, visitors: 2, offeringPln: 190, recordedBy: 'Bro Pelumi' },
  { id: 'a15', date: '2026-11-01', period: '2026 Q4', location: 'Warsaw', serviceType: 'Sunday Worship', adults: 22, youths: 5, children: 3, visitors: 2, offeringPln: 840, recordedBy: 'Bro Pelumi' },
  { id: 'a16', date: '2026-11-04', period: '2026 Q4', location: 'Warsaw', serviceType: 'Koinonia / Home Caring', adults: 18, youths: 4, children: 0, visitors: 2, offeringPln: 0, recordedBy: 'Bro Pelumi' },
  { id: 'a17', date: '2026-11-08', period: '2026 Q4', location: 'Wrocław', serviceType: 'Sunday Worship', adults: 11, youths: 3, children: 1, visitors: 1, offeringPln: 410, recordedBy: 'Bro Joshua' },
  { id: 'a18', date: '2026-11-11', period: '2026 Q4', location: 'Wrocław', serviceType: 'Koinonia / Home Caring', adults: 8, youths: 2, children: 0, visitors: 0, offeringPln: 0, recordedBy: 'Bro Joshua' },
  { id: 'a19', date: '2026-11-15', period: '2026 Q4', location: 'Poznań', serviceType: 'Sunday Worship', adults: 9, youths: 4, children: 0, visitors: 2, offeringPln: 340, recordedBy: 'Bro Caleb' },
  { id: 'a20', date: '2026-11-22', period: '2026 Q4', location: 'Warsaw', serviceType: 'Sunday Worship', adults: 23, youths: 5, children: 3, visitors: 3, offeringPln: 910, recordedBy: 'Bro Pelumi' },
  { id: 'a21', date: '2026-11-25', period: '2026 Q4', location: 'Warsaw', serviceType: 'Koinonia / Home Caring', adults: 19, youths: 4, children: 0, visitors: 2, offeringPln: 0, recordedBy: 'Bro Pelumi' }
];

const INITIAL_NEWCOMERS = [
  { id: 'nc1', fullName: 'Chinedu Eze', phone: '+48 512 334 101', location: 'Warsaw', visitDate: '2026-11-22', invitedBy: 'Bro Pelumi', assignedFollowUp: 'Sister Esther', status: 'First-Timer', notes: 'Student at Warsaw Univ of Technology', archived: false },
  { id: 'nc2', fullName: 'Katarzyna Nowak', phone: '+48 512 334 102', location: 'Warsaw', visitDate: '2026-11-15', invitedBy: 'Bro David', assignedFollowUp: 'Sister Esther', status: 'Second Visit', notes: 'Interested in Koinonia fellowship near Mokotów', archived: false },
  { id: 'nc3', fullName: 'Michael Mensah', phone: '+48 512 334 103', location: 'Poznań', visitDate: '2026-11-08', invitedBy: 'Bro Caleb', assignedFollowUp: 'Bro Caleb', status: 'Established', notes: 'Joined campus fellowship', archived: false },
  { id: 'nc4', fullName: 'Oluwaseun Taiwo', phone: '+48 512 334 104', location: 'Warsaw', visitDate: '2026-10-18', invitedBy: 'Bro Emmanuel', assignedFollowUp: 'Bro Emmanuel', status: 'Second Visit', notes: 'Works in Wilanów, prefers evening calls', archived: false },
  { id: 'nc5', fullName: 'Grace Boateng', phone: '+48 512 334 105', location: 'Wrocław', visitDate: '2026-10-04', invitedBy: 'Bro Joshua', assignedFollowUp: 'Pastor William', status: 'First-Timer', notes: 'Visited during October Sunday service', archived: false },
  { id: 'nc6', fullName: 'Samuel Adjei', phone: '+48 512 334 106', location: 'Warsaw', visitDate: '2026-07-12', invitedBy: 'Pastor Dare', assignedFollowUp: 'Bro David', status: 'Established', notes: 'Summer outreach convert — archived after Q3 follow-up', archived: true }
];

const INITIAL_PLANS_AND_NOTICES = {
  '2025': {
    theme: '2025: Year of Unshakable Foundation & Koinonia Multiplication',
    noticeBoard: [
      { id: 'n25-1', title: '2025 Year-End Thanksgiving Archive', date: '2025-12-14', audience: 'All Locations', priority: 'Normal', body: 'All four Polish locations gathered for combined Thanksgiving and annual review.' }
    ],
    goals: [
      { id: 'g25-1', quarter: 'Q1–Q2 2025', title: 'Establish Weekly Koinonia Centers in Warsaw', target: '2 Active Centers', progress: 100, status: 'Completed' },
      { id: 'g25-2', quarter: 'Q3–Q4 2025', title: 'Grow Sunday Attendance Above 22 Avg', target: '23.6 Achieved', progress: 100, status: 'Completed' }
    ]
  },
  '2026': {
    theme: '2026: Year of Open Doors, Sound Doctrine & Harvest Across Poland',
    noticeBoard: [
      { id: 'n26-1', title: 'December National Retreat & Crossover Vigil', date: '2026-12-26', audience: 'All Poland Locations', priority: 'Urgent', body: 'Combined Poland Retreat runs Dec 26–29. Location coordinators should submit travel headcount by Dec 10.' },
      { id: 'n26-2', title: 'Weekly Koinonia House Fellowship Expansion', date: '2026-11-28', audience: 'Warsaw, Wrocław, Poznań, Kraków', priority: 'Normal', body: 'Every member is encouraged to host or attend midweek Koinonia fellowship in their district.' }
    ],
    goals: [
      { id: 'g26-1', quarter: 'Q1–Q2 2026', title: 'Launch Structured Newcomer Follow-Up Pipeline', target: '100% 48-hr Contact', progress: 100, status: 'Completed' },
      { id: 'g26-2', quarter: 'Q3 2026', title: 'Koinonia Attendance Ratio >= 75% of Sunday', target: '82% Achieved', progress: 100, status: 'Completed' },
      { id: 'g26-3', quarter: 'Q4 2026', title: 'Reach 30+ Sunday Worship Attendance in Warsaw', target: '31 Recorded Nov 22', progress: 95, status: 'In Progress' }
    ]
  },
  '2027': {
    theme: '2027: Year of Deeper Roots & City-Wide Evangelism',
    noticeBoard: [
      { id: 'n27-1', title: '2027 Q1 Workers & Leaders Strategic Planning', date: '2027-01-09', audience: 'All Workers', priority: 'Normal', body: 'Annual workers alignment and roster commissioning across all Polish cities.' }
    ],
    goals: [
      { id: 'g27-1', quarter: 'Q1 2027', title: 'Open Gdańsk / Tri-City Outreach Cell', target: '10 Core Members', progress: 15, status: 'Planned' },
      { id: 'g27-2', quarter: 'Q2 2027', title: 'Train 12 New Workers Across Locations', target: '12 Certified Workers', progress: 10, status: 'Planned' }
    ]
  }
};

const INITIAL_ROSTERS = [
  {
    id: 'r1',
    date: '2026-11-29',
    location: 'Warsaw',
    serviceType: 'Sunday Worship Service',
    assignments: [
      { time: '09:30', slot: 'Opening Prayer & Moderation', worker: 'Bro David' },
      { time: '09:45', slot: 'Search The Scriptures (STS)', worker: 'Bro Pelumi' },
      { time: '10:30', slot: 'Choir Ministration', worker: 'Sister Esther' },
      { time: '10:50', slot: 'Sermon / Word Ministration', worker: 'Pastor Dare' },
      { time: '11:45', slot: 'Ushering & Newcomer Welcome', worker: 'Bro Emmanuel' }
    ]
  },
  {
    id: 'r2',
    date: '2026-12-02',
    location: 'Warsaw',
    serviceType: 'Midweek Koinonia & Prayer',
    assignments: [
      { time: '18:30', slot: 'Praise & Worship', worker: 'Sister Esther' },
      { time: '18:50', slot: 'Bible Outline & Discussion', worker: 'Bro Pelumi' },
      { time: '19:30', slot: 'Intercessory Prayer', worker: 'Bro Emmanuel' }
    ]
  }
];

// ============================================================================
// ACCESS PASSCODES (SPECIAL ENTRY VS PUBLIC URL VIEW)
// ============================================================================
// Public URL visitors start in 'public_member' mode (no passcode needed).
// Entering a Special Access Code unlocks elevated privileges:
//   - Head Pastor (Pastor Dare):   DLBC-HP2026
//   - Full Access (Pastor William): DLBC-FA2026
//   - Usher / Data Entry:           DLBC-UE2026
const ACCESS_CODES = {
  'DLBC-HP2026': { role: 'head_pastor', label: 'Head Pastor (Full Admin)' },
  'DLBC-FA2026': { role: 'full_access', label: 'Senior / Full Access' },
  'DLBC-UE2026': { role: 'usher_entry', label: 'Usher / Data Entry' }
};

export default function App() {
  // User Identity & Access Control State
  const [viewerName, setViewerName] = useState(() => localStorage.getItem('dlbc_viewer_name') || '');
  const [accessLevel, setAccessLevel] = useState(() => localStorage.getItem('dlbc_access_level') || 'public_member');
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState('overview');

  // Core Church State (Persisted to LocalStorage)
  const [people, setPeople] = useState(() => {
    const saved = localStorage.getItem('dlbc_people_v2');
    return saved ? JSON.parse(saved) : INITIAL_PEOPLE;
  });
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('dlbc_attendance_v2');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });
  const [newcomers, setNewcomers] = useState(() => {
    const saved = localStorage.getItem('dlbc_newcomers_v2');
    return saved ? JSON.parse(saved) : INITIAL_NEWCOMERS;
  });
  const [plansByYear, setPlansByYear] = useState(() => {
    const saved = localStorage.getItem('dlbc_plans_v2');
    return saved ? JSON.parse(saved) : INITIAL_PLANS_AND_NOTICES;
  });
  const [rosters, setRosters] = useState(() => {
    const saved = localStorage.getItem('dlbc_rosters_v2');
    return saved ? JSON.parse(saved) : INITIAL_ROSTERS;
  });

  useEffect(() => { localStorage.setItem('dlbc_people_v2', JSON.stringify(people)); }, [people]);
  useEffect(() => { localStorage.setItem('dlbc_attendance_v2', JSON.stringify(attendance)); }, [attendance]);
  useEffect(() => { localStorage.setItem('dlbc_newcomers_v2', JSON.stringify(newcomers)); }, [newcomers]);
  useEffect(() => { localStorage.setItem('dlbc_plans_v2', JSON.stringify(plansByYear)); }, [plansByYear]);
  useEffect(() => { localStorage.setItem('dlbc_rosters_v2', JSON.stringify(rosters)); }, [rosters]);

  // Permission Helpers
  const isFullAdmin = accessLevel === 'head_pastor' || accessLevel === 'full_access';
  const isHeadPastor = accessLevel === 'head_pastor';
  const canEnterData = isFullAdmin || accessLevel === 'usher_entry';

  const handleNameChange = (val) => {
    setViewerName(val);
    localStorage.setItem('dlbc_viewer_name', val);
  };

  const handleUnlockSubmit = (e) => {
    e.preventDefault();
    const normalized = passcodeInput.trim().toUpperCase();
    const match = ACCESS_CODES[normalized];
    if (match) {
      setAccessLevel(match.role);
      localStorage.setItem('dlbc_access_level', match.role);
      setPasscodeInput('');
      setPasscodeError('');
      setShowUnlockModal(false);
    } else {
      setPasscodeError('Invalid special entry code. Check with Head Pastor.');
    }
  };

  const handleLockToPublic = () => {
    setAccessLevel('public_member');
    localStorage.setItem('dlbc_access_level', 'public_member');
    if (activeTab === 'analytics' || activeTab === 'directory') {
      setActiveTab('overview');
    }
  };

  // ==========================================================================
  // ANALYTICS COMPUTATIONS (GROWTH TREND & SUNDAY VS KOINONIA / OTHER DAYS)
  // ==========================================================================
  const [analyticsLocation, setAnalyticsLocation] = useState('All Locations');

  const filteredAttendance = useMemo(() => {
    return analyticsLocation === 'All Locations'
      ? attendance
      : attendance.filter(a => a.location === analyticsLocation);
  }, [attendance, analyticsLocation]);

  // 1. Multi-Year Growth Trend (Sunday Worship Average by Period)
  const growthTrendData = useMemo(() => {
    const periods = ['2023 H2', '2024 H1', '2024 H2', '2025 H1', '2025 H2', '2026 Q4'];
    return periods.map(p => {
      const records = filteredAttendance.filter(a => a.period === p && a.serviceType === 'Sunday Worship');
      if (records.length === 0) return { label: p, avg: 0, count: 0 };
      const sum = records.reduce((acc, r) => acc + r.adults + r.youths + r.children, 0);
      return { label: p, avg: +(sum / records.length).toFixed(1), count: records.length };
    });
  }, [filteredAttendance]);

  // 2. Service Day Comparison (Sunday Worship vs Koinonia vs Bible Study vs Revival)
  const serviceComparisonData = useMemo(() => {
    const types = ['Sunday Worship', 'Koinonia / Home Caring', 'Bible Study', 'Revival / Evangelism'];
    const sundayRecords = filteredAttendance.filter(a => a.serviceType === 'Sunday Worship');
    const sundayAvg = sundayRecords.length
      ? sundayRecords.reduce((s, r) => s + r.adults + r.youths + r.children, 0) / sundayRecords.length
      : 1;

    return types.map(type => {
      const recs = filteredAttendance.filter(a => a.serviceType === type);
      const totalSum = recs.reduce((s, r) => s + r.adults + r.youths + r.children, 0);
      const avg = recs.length ? +(totalSum / recs.length).toFixed(1) : 0;
      const retentionPct = sundayAvg > 0 ? Math.round((avg / sundayAvg) * 100) : 0;
      return { type, avg, sessions: recs.length, retentionPct };
    });
  }, [filteredAttendance]);

  const latestSundayAvg = growthTrendData[growthTrendData.length - 1]?.avg || 0;
  const baselineSundayAvg = growthTrendData[0]?.avg || 1;
  const overallGrowthPct = Math.round(((latestSundayAvg - baselineSundayAvg) / baselineSundayAvg) * 100);

  // ==========================================================================
  // NEWCOMERS STATE & FILTERS (MONTH / QUARTER / ARCHIVED)
  // ==========================================================================
  const [ncViewMode, setNcViewMode] = useState('month'); // 'month' | 'quarter' | 'archived'
  const [selectedMonth, setSelectedMonth] = useState('2026-11');
  const [selectedQuarter, setSelectedQuarter] = useState('2026-Q4');
  const [ncForm, setNcForm] = useState({ fullName: '', phone: '', location: 'Warsaw', visitDate: '2026-11-26', invitedBy: '', assignedFollowUp: 'Sister Esther', notes: '' });

  const getQuarterString = (dateStr) => {
    if (!dateStr) return '';
    const [y, m] = dateStr.split('-');
    const q = Math.ceil(parseInt(m, 10) / 3);
    return `${y}-Q${q}`;
  };

  const visibleNewcomers = useMemo(() => {
    if (ncViewMode === 'archived') {
      return newcomers.filter(n => n.archived);
    }
    return newcomers.filter(n => {
      if (n.archived) return false;
      if (ncViewMode === 'month') return n.visitDate.startsWith(selectedMonth);
      if (ncViewMode === 'quarter') return getQuarterString(n.visitDate) === selectedQuarter;
      return true;
    });
  }, [newcomers, ncViewMode, selectedMonth, selectedQuarter]);

  const handleAddNewcomer = (e) => {
    e.preventDefault();
    if (!ncForm.fullName.trim()) return;
    const item = {
      id: 'nc-' + Date.now(),
      ...ncForm,
      status: 'First-Timer',
      archived: false
    };
    setNewcomers([item, ...newcomers]);
    setNcForm({ fullName: '', phone: '', location: 'Warsaw', visitDate: '2026-11-26', invitedBy: '', assignedFollowUp: 'Sister Esther', notes: '' });
  };

  const toggleArchiveNewcomer = (id) => {
    setNewcomers(newcomers.map(n => n.id === id ? { ...n, archived: !n.archived } : n));
  };

  const deleteNewcomer = (id) => {
    setNewcomers(newcomers.filter(n => n.id !== id));
  };

  // ==========================================================================
  // WORKERS & MEMBERS SEPARATE DIRECTORIES + PARTICULARS
  // ==========================================================================
  const [directorySubTab, setDirectorySubTab] = useState('Worker'); // 'Worker' | 'Member'
  const [dirSearch, setDirSearch] = useState('');
  const [dirLocationFilter, setDirLocationFilter] = useState('All');
  const [editingPersonId, setEditingPersonId] = useState(null);
  const [editPersonDraft, setEditPersonDraft] = useState(null);
  const [newPersonForm, setNewPersonForm] = useState({
    category: 'Worker',
    title: 'Bro',
    fullName: '',
    phone: '',
    address: '',
    emergencyName: '',
    emergencyPhone: '',
    location: 'Warsaw',
    accessRole: 'member',
    unitsText: ''
  });

  const filteredDirectory = useMemo(() => {
    return people.filter(p => {
      if (p.category !== directorySubTab) return false;
      if (dirLocationFilter !== 'All' && p.location !== dirLocationFilter) return false;
      if (dirSearch.trim()) {
        const q = dirSearch.toLowerCase();
        return (
          p.fullName.toLowerCase().includes(q) ||
          p.phone.toLowerCase().includes(q) ||
          (p.address && p.address.toLowerCase().includes(q)) ||
          (p.emergencyName && p.emergencyName.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [people, directorySubTab, dirLocationFilter, dirSearch]);

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (!newPersonForm.fullName.trim()) return;
    const units = newPersonForm.unitsText
      ? newPersonForm.unitsText.split(',').map(u => u.trim()).filter(Boolean)
      : [newPersonForm.category === 'Worker' ? 'General Service' : 'General Congregation'];
    const created = {
      id: 'p-' + Date.now(),
      category: newPersonForm.category,
      title: newPersonForm.title,
      fullName: newPersonForm.fullName.trim(),
      phone: newPersonForm.phone.trim(),
      address: newPersonForm.address.trim(),
      emergencyName: newPersonForm.emergencyName.trim(),
      emergencyPhone: newPersonForm.emergencyPhone.trim(),
      location: newPersonForm.location,
      accessRole: newPersonForm.category === 'Worker' ? newPersonForm.accessRole : 'member',
      units,
      joinDate: new Date().toISOString().slice(0, 10),
      status: 'Active'
    };
    setPeople([created, ...people]);
    setDirectorySubTab(created.category);
    setNewPersonForm({
      category: created.category,
      title: 'Bro',
      fullName: '',
      phone: '',
      address: '',
      emergencyName: '',
      emergencyPhone: '',
      location: 'Warsaw',
      accessRole: 'member',
      unitsText: ''
    });
  };

  const handleToggleCategory = (personId, newCat) => {
    setPeople(people.map(p => p.id === personId ? {
      ...p,
      category: newCat,
      accessRole: newCat === 'Member' ? 'member' : p.accessRole
    } : p));
  };

  const saveEditedPerson = () => {
    if (!editPersonDraft) return;
    setPeople(people.map(p => p.id === editPersonDraft.id ? editPersonDraft : p));
    setEditingPersonId(null);
    setEditPersonDraft(null);
  };

  // ==========================================================================
  // MULTI-YEAR STRATEGIC PLAN & NOTICE BOARD STATE
  // ==========================================================================
  const [selectedPlanYear, setSelectedPlanYear] = useState('2026');
  const [newYearInput, setNewYearInput] = useState('');
  const [newNoticeForm, setNewNoticeForm] = useState({ title: '', date: '2026-12-01', audience: 'All Locations', priority: 'Normal', body: '' });
  const [newGoalForm, setNewGoalForm] = useState({ quarter: 'Q1', title: '', target: '', progress: 0, status: 'Planned' });

  const availableYears = Object.keys(plansByYear).sort();
  const currentYearData = plansByYear[selectedPlanYear] || {
    theme: `${selectedPlanYear}: Strategic Church Plan & Vision`,
    noticeBoard: [],
    goals: []
  };

  const handleCreateYear = (e) => {
    e.preventDefault();
    const yr = newYearInput.trim();
    if (!yr || !/^\d{4}$/.test(yr)) return;
    if (!plansByYear[yr]) {
      setPlansByYear({
        ...plansByYear,
        [yr]: {
          theme: `${yr}: Year of Expansion & Spiritual Establishment across Poland`,
          noticeBoard: [],
          goals: []
        }
      });
    }
    setSelectedPlanYear(yr);
    setNewYearInput('');
  };

  const handleUpdateYearTheme = (newTheme) => {
    setPlansByYear({
      ...plansByYear,
      [selectedPlanYear]: { ...currentYearData, theme: newTheme }
    });
  };

  const handleAddNotice = (e) => {
    e.preventDefault();
    if (!newNoticeForm.title.trim()) return;
    const notice = { id: 'not-' + Date.now(), ...newNoticeForm };
    setPlansByYear({
      ...plansByYear,
      [selectedPlanYear]: {
        ...currentYearData,
        noticeBoard: [notice, ...currentYearData.noticeBoard]
      }
    });
    setNewNoticeForm({ title: '', date: `${selectedPlanYear}-12-01`, audience: 'All Locations', priority: 'Normal', body: '' });
  };

  const handleDeleteNotice = (noticeId) => {
    setPlansByYear({
      ...plansByYear,
      [selectedPlanYear]: {
        ...currentYearData,
        noticeBoard: currentYearData.noticeBoard.filter(n => n.id !== noticeId)
      }
    });
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoalForm.title.trim()) return;
    const goal = { id: 'goal-' + Date.now(), ...newGoalForm, progress: Number(newGoalForm.progress) };
    setPlansByYear({
      ...plansByYear,
      [selectedPlanYear]: {
        ...currentYearData,
        goals: [...currentYearData.goals, goal]
      }
    });
    setNewGoalForm({ quarter: 'Q1', title: '', target: '', progress: 0, status: 'Planned' });
  };

  const handleDeleteGoal = (goalId) => {
    setPlansByYear({
      ...plansByYear,
      [selectedPlanYear]: {
        ...currentYearData,
        goals: currentYearData.goals.filter(g => g.id !== goalId)
      }
    });
  };

  // ==========================================================================
  // ATTENDANCE ENTRY STATE
  // ==========================================================================
  const [attForm, setAttForm] = useState({
    date: '2026-11-29',
    location: 'Warsaw',
    serviceType: 'Sunday Worship',
    adults: 22,
    youths: 5,
    children: 3,
    visitors: 2,
    offeringPln: 0
  });

  const handleAddAttendance = (e) => {
    e.preventDefault();
    const qStr = getQuarterString(attForm.date);
    const entry = {
      id: 'att-' + Date.now(),
      ...attForm,
      period: qStr,
      adults: Number(attForm.adults),
      youths: Number(attForm.youths),
      children: Number(attForm.children),
      visitors: Number(attForm.visitors),
      offeringPln: Number(attForm.offeringPln),
      recordedBy: viewerName.trim() || (isHeadPastor ? 'Pastor Dare' : 'Authorized Usher')
    };
    setAttendance([entry, ...attendance]);
  };

  // ==========================================================================
  // EXPORT CSV HELPER (HEAD PASTOR / FULL ACCESS ONLY)
  // ==========================================================================
  const exportDirectoryCsv = () => {
    const headers = ['Category', 'Title', 'Full Name', 'Phone', 'Home Address', 'Emergency Contact', 'Emergency Phone', 'Location', 'Units', 'Access Role'];
    const rows = people.map(p => [
      p.category, p.title, p.fullName, p.phone, `"${p.address || ''}"`,
      `"${p.emergencyName || ''}"`, p.emergencyPhone || '', p.location, `"${p.units.join('; ')}"`, p.accessRole
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DLBC_Poland_Directory_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  // ==========================================================================
  // ROLE-BASED NAVIGATION TABS
  // ==========================================================================
  const navTabs = [
    { id: 'overview', label: 'Overview & Notice Board', icon: Bell, visible: true },
    { id: 'rosters', label: 'Ministering Rosters', icon: Calendar, visible: true },
    { id: 'plans', label: `${selectedPlanYear} Strategic Plan`, icon: BookOpen, visible: true },
    { id: 'attendance', label: 'Attendance & Services', icon: ClipboardList, visible: canEnterData },
    { id: 'newcomers', label: 'Newcomers & Follow-Up', icon: UserPlus, visible: canEnterData },
    { id: 'analytics', label: 'Growth & Service Analytics', icon: BarChart3, visible: isFullAdmin },
    { id: 'directory', label: 'Workers & Members Directory', icon: Users, visible: isFullAdmin }
  ].filter(t => t.visible);

  const workersCount = people.filter(p => p.category === 'Worker').length;
  const membersCount = people.filter(p => p.category === 'Member').length;
  const activeNewcomersCount = newcomers.filter(n => !n.archived).length;
  const archivedNewcomersCount = newcomers.filter(n => n.archived).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* TOP BAR: BRANDING + FLEXIBLE NAME INPUT + SPECIAL ACCESS UNLOCK */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold text-lg shadow">
              DL
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base sm:text-lg tracking-tight">DLBC Poland Operations Portal</h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-amber-300 border border-slate-700">
                  Warsaw • Wrocław • Poznań • Kraków
                </span>
              </div>
              <p className="text-xs text-slate-400">Deeper Life Bible Church Poland — National & Location Administration</p>
            </div>
          </div>

          {/* FLEXIBLE NAME INPUT + SPECIAL ACCESS BADGE */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg">
              <span className="text-xs text-slate-400">Your Name:</span>
              <input
                type="text"
                value={viewerName}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Type your name..."
                className="bg-slate-950 text-white text-xs font-medium px-2.5 py-1 rounded border border-slate-700 focus:outline-none focus:border-amber-400 w-36 sm:w-44"
              />
            </div>

            {accessLevel === 'public_member' ? (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  Public View
                </span>
                <button
                  onClick={() => setShowUnlockModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-sm"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Special Entry
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {accessLevel === 'head_pastor' && 'Head Pastor (Full Admin)'}
                  {accessLevel === 'full_access' && 'Full Access Oversight'}
                  {accessLevel === 'usher_entry' && 'Usher / Data Entry'}
                </span>
                <button
                  onClick={handleLockToPublic}
                  title="Lock back to Public Member View"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  Exit Admin
                </button>
              </div>
            )}
          </div>
        </div>

        {/* NAVIGATION BAR */}
        <nav className="bg-slate-950/60 border-t border-slate-800/80 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-1">
            {navTabs.map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition ${
                    active
                      ? 'border-amber-400 text-amber-300 bg-slate-900/70'
                      : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-900/40'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* SPECIAL ENTRY PASSCODE MODAL */}
      {showUnlockModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Special Leadership & Worker Entry</h3>
                  <p className="text-xs text-slate-500">Unlocks restricted analytics, personal data & entry forms</p>
                </div>
              </div>
              <button onClick={() => setShowUnlockModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUnlockSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Display Name</label>
                <input
                  type="text"
                  value={viewerName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g., Pastor Dare, Pastor William, Bro Pelumi"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Special Entry Passcode</label>
                <input
                  type="password"
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  placeholder="Enter access passcode..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  required
                />
                {passcodeError && <p className="text-xs text-red-600 mt-1">{passcodeError}</p>}
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-800">Access Tiers:</p>
                <p>• <strong>Head Pastor / Full Access:</strong> Full analytics, personal particulars, financial offerings, directory & archive controls.</p>
                <p>• <strong>Usher / Data Entry:</strong> Attendance logging & newcomer follow-up (personal directory & offering totals remain hidden).</p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUnlockModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg"
                >
                  Unlock Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* WELCOME BANNER */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
              {selectedPlanYear} Theme • {currentYearData.theme}
            </p>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              Welcome{viewerName.trim() ? `, ${viewerName.trim()}` : ' to DLBC Poland'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {accessLevel === 'public_member'
                ? 'You are viewing the public portal (Notice Board, Ministering Rosters & Annual Plan). Click "Special Entry" in the top bar for leadership or worker access.'
                : `Signed in with ${accessLevel === 'head_pastor' ? 'Head Pastor Full Access' : accessLevel === 'full_access' ? 'Full Oversight Access' : 'Usher / Data Entry Access'}.`}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-center">
              <div className="text-xs text-slate-500">Active Locations</div>
              <div className="text-lg font-extrabold text-slate-900">4 Cities</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-center">
              <div className="text-xs text-slate-500">Sunday Avg (Q4)</div>
              <div className="text-lg font-extrabold text-emerald-600">{latestSundayAvg}</div>
            </div>
            {isFullAdmin && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 text-center">
                <div className="text-xs text-amber-800">Workers / Members</div>
                <div className="text-lg font-extrabold text-amber-900">{workersCount} / {membersCount}</div>
              </div>
            )}
          </div>
        </div>

        {/* ==================================================================== */}
        {/* TAB 1: OVERVIEW & NOTICE BOARD (PUBLIC + ADMIN EDITABLE)             */}
        {/* ==================================================================== */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* NOTICE BOARD (2 COLUMNS) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-amber-600" />
                    <h3 className="font-bold text-slate-900 text-base">Church Notice Board ({selectedPlanYear})</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-slate-500 font-medium">Year:</label>
                    <select
                      value={selectedPlanYear}
                      onChange={(e) => setSelectedPlanYear(e.target.value)}
                      className="text-xs font-semibold bg-slate-100 border border-slate-300 rounded-lg px-2.5 py-1.5"
                    >
                      {availableYears.map(yr => (
                        <option key={yr} value={yr}>{yr}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {isFullAdmin && (
                  <form onSubmit={handleAddNotice} className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5 space-y-3">
                    <div className="text-xs font-bold text-slate-800">Post New Announcement to {selectedPlanYear} Notice Board</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <input
                        type="text"
                        placeholder="Announcement title..."
                        value={newNoticeForm.title}
                        onChange={(e) => setNewNoticeForm({ ...newNoticeForm, title: e.target.value })}
                        className="sm:col-span-2 px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                        required
                      />
                      <input
                        type="date"
                        value={newNoticeForm.date}
                        onChange={(e) => setNewNoticeForm({ ...newNoticeForm, date: e.target.value })}
                        className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        placeholder="Audience (e.g., All Locations, Warsaw Workers)"
                        value={newNoticeForm.audience}
                        onChange={(e) => setNewNoticeForm({ ...newNoticeForm, audience: e.target.value })}
                        className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                      />
                      <select
                        value={newNoticeForm.priority}
                        onChange={(e) => setNewNoticeForm({ ...newNoticeForm, priority: e.target.value })}
                        className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                      >
                        <option value="Normal">Normal Notice</option>
                        <option value="Urgent">Urgent / Priority</option>
                      </select>
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Announcement details..."
                      value={newNoticeForm.body}
                      onChange={(e) => setNewNoticeForm({ ...newNoticeForm, body: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                      required
                    />
                    <button type="submit" className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg">
                      Publish Notice
                    </button>
                  </form>
                )}

                {currentYearData.noticeBoard.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">No announcements posted for {selectedPlanYear} yet.</p>
                ) : (
                  <div className="space-y-3">
                    {currentYearData.noticeBoard.map(notice => (
                      <div key={notice.id} className="border border-slate-200 rounded-xl p-4 hover:border-slate-300 transition bg-white">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                notice.priority === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                              }`}>
                                {notice.priority}
                              </span>
                              <span className="text-xs text-slate-500">{notice.date} • {notice.audience}</span>
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm mt-1">{notice.title}</h4>
                          </div>
                          {isFullAdmin && (
                            <button
                              onClick={() => handleDeleteNotice(notice.id)}
                              className="text-slate-400 hover:text-red-600 p-1"
                              title="Delete notice"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">{notice.body}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: SERVICE SCHEDULE & UPCOMING ROSTER PREVIEW */}
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  Weekly Service Days (Poland)
                </h3>
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-slate-900">Sunday Worship Service</div>
                    <div className="text-slate-600 mt-0.5">09:30 AM – 12:00 PM • All Locations</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-slate-900">Midweek Koinonia / Home Caring</div>
                    <div className="text-slate-600 mt-0.5">Wednesdays • 18:30 PM • House Cells & Online</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-slate-900">Thursday Revival & Evangelism Training</div>
                    <div className="text-slate-600 mt-0.5">Thursdays • 18:30 PM • Location Centers</div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-900 text-sm">Next Ministering Roster</h3>
                  <button onClick={() => setActiveTab('rosters')} className="text-xs font-semibold text-amber-600 hover:underline">
                    View All
                  </button>
                </div>
                {rosters[0] && (
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-700">
                      {rosters[0].date} • {rosters[0].location} ({rosters[0].serviceType})
                    </div>
                    {rosters[0].assignments.map((a, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 last:border-0">
                        <span className="text-slate-500">{a.slot}</span>
                        <span className="font-semibold text-slate-900">{a.worker}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: MINISTERING ROSTERS (PUBLIC VIEW + ADMIN EDIT)                */}
        {/* ==================================================================== */}
        {activeTab === 'rosters' && (
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Ministering & Duty Rosters</h3>
                  <p className="text-xs text-slate-500">Assigned workers for Sunday Worship, Koinonia, and Revival services</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rosters.map(r => (
                  <div key={r.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-xs font-bold">{r.location}</span>
                        <h4 className="font-bold text-slate-900 text-sm mt-1">{r.serviceType}</h4>
                        <p className="text-xs text-slate-500">{r.date}</p>
                      </div>
                      <button
                        onClick={() => {
                          const txt = `*DLBC Poland Roster (${r.date} - ${r.location})*\n${r.serviceType}\n` +
                            r.assignments.map(a => `• ${a.time} ${a.slot}: *${a.worker}*`).join('\n');
                          navigator.clipboard?.writeText(txt);
                          alert('Roster copied for WhatsApp!');
                        }}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg"
                      >
                        Copy WhatsApp
                      </button>
                    </div>
                    <div className="divide-y divide-slate-200 bg-white rounded-lg border border-slate-200 px-3">
                      {r.assignments.map((a, i) => (
                        <div key={i} className="py-2 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-mono text-slate-400 mr-2">{a.time}</span>
                            <span className="text-slate-700">{a.slot}</span>
                          </div>
                          <span className="font-bold text-slate-900">{a.worker}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: MULTI-YEAR STRATEGIC PLAN (SWITCHABLE TO ANY YEAR)            */}
        {/* ==================================================================== */}
        {activeTab === 'plans' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Annual Strategic Plan & Vision Tracker</h3>
                <p className="text-xs text-slate-500">Switch between years or create a new annual plan (e.g., 2025, 2026, 2027, 2028)</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {availableYears.map(yr => (
                  <button
                    key={yr}
                    onClick={() => setSelectedPlanYear(yr)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      selectedPlanYear === yr
                        ? 'bg-slate-900 text-amber-300 shadow'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {yr} Plan
                  </button>
                ))}

                {isFullAdmin && (
                  <form onSubmit={handleCreateYear} className="flex items-center gap-1.5 ml-2">
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="Add Year (2028)"
                      value={newYearInput}
                      onChange={(e) => setNewYearInput(e.target.value)}
                      className="w-32 px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg"
                    />
                    <button type="submit" className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg">
                      + Year
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* EDITABLE ANNUAL THEME */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-800 mb-1">
                {selectedPlanYear} Prophetic & Operational Theme
              </label>
              {isFullAdmin ? (
                <input
                  type="text"
                  value={currentYearData.theme}
                  onChange={(e) => handleUpdateYearTheme(e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:outline-none"
                />
              ) : (
                <div className="text-sm font-bold text-slate-900">{currentYearData.theme}</div>
              )}
            </div>

            {/* ADD NEW STRATEGIC GOAL (FULL ADMIN ONLY) */}
            {isFullAdmin && (
              <form onSubmit={handleAddGoal} className="bg-slate-50 border border-slate-200 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-5 gap-2.5 items-end">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Quarter</label>
                  <input
                    type="text"
                    value={newGoalForm.quarter}
                    onChange={(e) => setNewGoalForm({ ...newGoalForm, quarter: e.target.value })}
                    placeholder="Q1 2027"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Strategic Milestone / Goal</label>
                  <input
                    type="text"
                    value={newGoalForm.title}
                    onChange={(e) => setNewGoalForm({ ...newGoalForm, title: e.target.value })}
                    placeholder="e.g., Launch Gdańsk Outreach Fellowship"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Target Metric</label>
                  <input
                    type="text"
                    value={newGoalForm.target}
                    onChange={(e) => setNewGoalForm({ ...newGoalForm, target: e.target.value })}
                    placeholder="15 Members"
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <button type="submit" className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg">
                  Add Goal
                </button>
              </form>
            )}

            {/* GOALS LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentYearData.goals.map(goal => (
                <div key={goal.id} className="border border-slate-200 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-bold">{goal.quarter}</span>
                      <h4 className="font-bold text-slate-900 text-sm mt-1">{goal.title}</h4>
                      <p className="text-xs text-slate-500">Target: {goal.target}</p>
                    </div>
                    {isFullAdmin && (
                      <button onClick={() => handleDeleteGoal(goal.id)} className="text-slate-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${goal.progress}%` }} />
                  </div>
                  <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                    <span>Status: {goal.status}</span>
                    <span>{goal.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 4: ATTENDANCE ENTRY & SERVICE LOG (USHER + FULL ADMIN)           */}
        {/* ==================================================================== */}
        {activeTab === 'attendance' && canEnterData && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-slate-900 text-base mb-1">Log Service Attendance</h3>
              <p className="text-xs text-slate-500 mb-4">Record Sunday Worship, Koinonia / Home Caring, Bible Study, or Revival services</p>

              <form onSubmit={handleAddAttendance} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 items-end">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                  <input type="date" value={attForm.date} onChange={(e) => setAttForm({ ...attForm, date: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg" required />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                  <select value={attForm.location} onChange={(e) => setAttForm({ ...attForm, location: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg">
                    <option>Warsaw</option>
                    <option>Wrocław</option>
                    <option>Poznań</option>
                    <option>Kraków</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Service Day / Type</label>
                  <select value={attForm.serviceType} onChange={(e) => setAttForm({ ...attForm, serviceType: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg">
                    <option>Sunday Worship</option>
                    <option>Koinonia / Home Caring</option>
                    <option>Bible Study</option>
                    <option>Revival / Evangelism</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Adults</label>
                  <input type="number" min="0" value={attForm.adults} onChange={(e) => setAttForm({ ...attForm, adults: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Youths</label>
                  <input type="number" min="0" value={attForm.youths} onChange={(e) => setAttForm({ ...attForm, youths: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Children</label>
                  <input type="number" min="0" value={attForm.children} onChange={(e) => setAttForm({ ...attForm, children: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg" />
                </div>
                <div>
                  <button type="submit" className="w-full px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg">
                    Save Record
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm overflow-x-auto">
              <h4 className="font-bold text-slate-900 text-sm mb-3">Recent Attendance Log</h4>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-2">Date</th>
                    <th className="py-2">Location</th>
                    <th className="py-2">Service Type</th>
                    <th className="py-2">Adults</th>
                    <th className="py-2">Youths</th>
                    <th className="py-2">Children</th>
                    <th className="py-2 font-bold text-slate-800">Total</th>
                    {isFullAdmin && <th className="py-2">Offering (PLN)</th>}
                    <th className="py-2">Recorded By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attendance.slice(0, 15).map(rec => (
                    <tr key={rec.id} className="hover:bg-slate-50">
                      <td className="py-2 font-medium">{rec.date}</td>
                      <td className="py-2">{rec.location}</td>
                      <td className="py-2">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          rec.serviceType === 'Sunday Worship' ? 'bg-amber-100 text-amber-800' :
                          rec.serviceType === 'Koinonia / Home Caring' ? 'bg-emerald-100 text-emerald-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {rec.serviceType}
                        </span>
                      </td>
                      <td className="py-2">{rec.adults}</td>
                      <td className="py-2">{rec.youths}</td>
                      <td className="py-2">{rec.children}</td>
                      <td className="py-2 font-bold text-slate-900">{rec.adults + rec.youths + rec.children}</td>
                      {isFullAdmin && <td className="py-2 font-mono">{rec.offeringPln} PLN</td>}
                      <td className="py-2 text-slate-500">{rec.recordedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 5: NEWCOMERS (MONTH / QUARTER FILTER + ARCHIVE + DELETE)         */}
        {/* ==================================================================== */}
        {activeTab === 'newcomers' && canEnterData && (
          <div className="space-y-6">
            {/* ADD NEWCOMER FORM */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-slate-900 text-base mb-1">Register First-Timer / Newcomer</h3>
              <p className="text-xs text-slate-500 mb-4">Active view displays newcomers by selected Month or Quarter; older records can be archived safely.</p>

              <form onSubmit={handleAddNewcomer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input type="text" value={ncForm.fullName} onChange={(e) => setNcForm({ ...ncForm, fullName: e.target.value })} placeholder="Visitor full name" className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input type="text" value={ncForm.phone} onChange={(e) => setNcForm({ ...ncForm, phone: e.target.value })} placeholder="+48 ..." className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                  <select value={ncForm.location} onChange={(e) => setNcForm({ ...ncForm, location: e.target.value })} className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg">
                    <option>Warsaw</option>
                    <option>Wrocław</option>
                    <option>Poznań</option>
                    <option>Kraków</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Visit Date</label>
                  <input type="date" value={ncForm.visitDate} onChange={(e) => setNcForm({ ...ncForm, visitDate: e.target.value })} className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Follow-Up Worker</label>
                  <input type="text" value={ncForm.assignedFollowUp} onChange={(e) => setNcForm({ ...ncForm, assignedFollowUp: e.target.value })} className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg" />
                </div>
                <button type="submit" className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg">
                  + Save Newcomer
                </button>
              </form>
            </div>

            {/* FILTER BAR: THIS MONTH | THIS QUARTER | ARCHIVED VAULT */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setNcViewMode('month')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${ncViewMode === 'month' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    Monthly View
                  </button>
                  <button
                    onClick={() => setNcViewMode('quarter')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${ncViewMode === 'quarter' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    Quarterly View
                  </button>
                  <button
                    onClick={() => setNcViewMode('archived')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${ncViewMode === 'archived' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}
                  >
                    <Archive className="w-3.5 h-3.5" />
                    Archived Vault ({archivedNewcomersCount})
                  </button>
                </div>

                {ncViewMode === 'month' && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Month:</span>
                    <input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="px-2.5 py-1 text-xs border border-slate-300 rounded-lg" />
                  </div>
                )}
                {ncViewMode === 'quarter' && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Quarter:</span>
                    <select value={selectedQuarter} onChange={(e) => setSelectedQuarter(e.target.value)} className="px-2.5 py-1 text-xs border border-slate-300 rounded-lg">
                      <option value="2026-Q4">2026-Q4 (Oct–Dec)</option>
                      <option value="2026-Q3">2026-Q3 (Jul–Sep)</option>
                      <option value="2026-Q2">2026-Q2 (Apr–Jun)</option>
                      <option value="2026-Q1">2026-Q1 (Jan–Mar)</option>
                    </select>
                  </div>
                )}
              </div>

              {visibleNewcomers.length === 0 ? (
                <p className="text-xs text-slate-500 py-8 text-center">No newcomer records found for this filter period.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="py-2">Name</th>
                        <th className="py-2">Phone</th>
                        <th className="py-2">Location</th>
                        <th className="py-2">Visit Date</th>
                        <th className="py-2">Assigned Worker</th>
                        <th className="py-2">Notes</th>
                        <th className="py-2 text-right">Archive / Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {visibleNewcomers.map(nc => (
                        <tr key={nc.id} className="hover:bg-slate-50">
                          <td className="py-2.5 font-bold text-slate-900">{nc.fullName}</td>
                          <td className="py-2.5 font-mono">{nc.phone}</td>
                          <td className="py-2.5">{nc.location}</td>
                          <td className="py-2.5">{nc.visitDate}</td>
                          <td className="py-2.5 text-emerald-700 font-semibold">{nc.assignedFollowUp}</td>
                          <td className="py-2.5 text-slate-500 max-w-xs truncate">{nc.notes}</td>
                          <td className="py-2.5 text-right space-x-2">
                            <button
                              onClick={() => toggleArchiveNewcomer(nc.id)}
                              title={nc.archived ? 'Restore to Active List' : 'Archive Newcomer'}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-semibold"
                            >
                              {nc.archived ? <RotateCcw className="w-3 h-3" /> : <Archive className="w-3 h-3" />}
                              {nc.archived ? 'Restore' : 'Archive'}
                            </button>
                            {isFullAdmin && (
                              <button
                                onClick={() => deleteNewcomer(nc.id)}
                                title="Permanently Delete"
                                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-semibold"
                              >
                                <Trash2 className="w-3 h-3" />
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 6: GROWTH & SERVICE ANALYTICS (HEAD PASTOR / FULL ACCESS ONLY)   */}
        {/* ==================================================================== */}
        {activeTab === 'analytics' && isFullAdmin && (
          <div className="space-y-6">
            {/* TOP KPI STRIP */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div>
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  Leadership Growth & Service Comparison Analytics
                </h3>
                <p className="text-xs text-slate-500">Restricted to Head Pastor & Full-Access Oversight</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">Filter Location:</span>
                <select
                  value={analyticsLocation}
                  onChange={(e) => setAnalyticsLocation(e.target.value)}
                  className="px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded-lg bg-slate-50"
                >
                  <option>All Locations</option>
                  <option>Warsaw</option>
                  <option>Wrocław</option>
                  <option>Poznań</option>
                  <option>Kraków</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* CHART 1: MULTI-YEAR SUNDAY GROWTH TREND */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Multi-Year Sunday Worship Growth Trend</h4>
                    <p className="text-xs text-slate-500">Average Sunday attendance from 2023 H2 to 2026 Q4</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800">
                    {overallGrowthPct >= 0 ? `+${overallGrowthPct}%` : `${overallGrowthPct}%`} Growth
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  {growthTrendData.map(item => {
                    const maxVal = Math.max(...growthTrendData.map(d => d.avg), 30);
                    const widthPct = Math.min(100, Math.round((item.avg / maxVal) * 100));
                    return (
                      <div key={item.label} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-semibold text-slate-700">{item.label}</span>
                          <span className="font-extrabold text-slate-900">{item.avg} avg</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-slate-800 to-amber-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${widthPct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CHART 2: SUNDAY WORSHIP VS KOINONIA / OTHER DAYS COMPARISON */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="mb-4">
                  <h4 className="font-bold text-slate-900 text-sm">Sunday Worship vs. Koinonia & Other Service Days</h4>
                  <p className="text-xs text-slate-500">Midweek engagement ratio compared against Sunday attendance baseline</p>
                </div>

                <div className="space-y-4 pt-2">
                  {serviceComparisonData.map(s => (
                    <div key={s.type} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">{s.type}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900">{s.avg} avg</span>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            s.type === 'Sunday Worship'
                              ? 'bg-slate-200 text-slate-800'
                              : s.retentionPct >= 70
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {s.type === 'Sunday Worship' ? '100% Baseline' : `${s.retentionPct}% of Sunday`}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-2.5 rounded-full ${
                            s.type === 'Sunday Worship' ? 'bg-slate-900' :
                            s.type === 'Koinonia / Home Caring' ? 'bg-emerald-600' : 'bg-blue-600'
                          }`}
                          style={{ width: `${Math.min(100, s.retentionPct)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 7: SEPARATE WORKERS & MEMBERS DIRECTORY + PARTICULARS            */}
        {/* ==================================================================== */}
        {activeTab === 'directory' && isFullAdmin && (
          <div className="space-y-6">
            {/* ADD WORKER OR MEMBER PARTICULARS FORM */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Add Worker or Member Particulars</h3>
                  <p className="text-xs text-slate-500">Capture Full Name, Phone Number, Home Address, Emergency Contact, and assign Worker or Member classification</p>
                </div>
                <button
                  onClick={exportDirectoryCsv}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export CSV
                </button>
              </div>

              <form onSubmit={handleAddPerson} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Classification</label>
                  <select
                    value={newPersonForm.category}
                    onChange={(e) => setNewPersonForm({ ...newPersonForm, category: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs font-bold border border-slate-300 rounded-lg bg-amber-50"
                  >
                    <option value="Worker">Worker</option>
                    <option value="Member">Member</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Bro Samuel Adeyemi"
                    value={newPersonForm.fullName}
                    onChange={(e) => setNewPersonForm({ ...newPersonForm, fullName: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+48 500 000 000"
                    value={newPersonForm.phone}
                    onChange={(e) => setNewPersonForm({ ...newPersonForm, phone: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                  <select
                    value={newPersonForm.location}
                    onChange={(e) => setNewPersonForm({ ...newPersonForm, location: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                  >
                    <option>Warsaw</option>
                    <option>Wrocław</option>
                    <option>Poznań</option>
                    <option>Kraków</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Home Address</label>
                  <input
                    type="text"
                    placeholder="Street, Apt, Postal Code, City"
                    value={newPersonForm.address}
                    onChange={(e) => setNewPersonForm({ ...newPersonForm, address: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Emergency Contact (Who to Contact)</label>
                  <input
                    type="text"
                    placeholder="Contact Person Name"
                    value={newPersonForm.emergencyName}
                    onChange={(e) => setNewPersonForm({ ...newPersonForm, emergencyName: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Emergency Contact Number</label>
                  <input
                    type="text"
                    placeholder="+48 500 000 999"
                    value={newPersonForm.emergencyPhone}
                    onChange={(e) => setNewPersonForm({ ...newPersonForm, emergencyPhone: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                    required
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Ministry Units / Fellowship Group (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="e.g., Ushering, Choir, STS, Evangelism"
                    value={newPersonForm.unitsText}
                    onChange={(e) => setNewPersonForm({ ...newPersonForm, unitsText: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="flex items-end">
                  <button type="submit" className="w-full px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg">
                    Save to {newPersonForm.category}s
                  </button>
                </div>
              </form>
            </div>

            {/* SEPARATE TABS: WORKERS DIRECTORY VS MEMBERS DIRECTORY */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDirectorySubTab('Worker')}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
                      directorySubTab === 'Worker'
                        ? 'bg-slate-900 text-amber-300 shadow'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Workers Directory ({workersCount})
                  </button>
                  <button
                    onClick={() => setDirectorySubTab('Member')}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
                      directorySubTab === 'Member'
                        ? 'bg-slate-900 text-amber-300 shadow'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Members Directory ({membersCount})
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                    <input
                      type="text"
                      placeholder="Search name, phone, address..."
                      value={dirSearch}
                      onChange={(e) => setDirSearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg w-52"
                    />
                  </div>
                  <select
                    value={dirLocationFilter}
                    onChange={(e) => setDirLocationFilter(e.target.value)}
                    className="px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg"
                  >
                    <option value="All">All Locations</option>
                    <option value="Warsaw">Warsaw</option>
                    <option value="Wrocław">Wrocław</option>
                    <option value="Poznań">Poznań</option>
                    <option value="Kraków">Kraków</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="py-2.5">Full Name</th>
                      <th className="py-2.5">Phone Number</th>
                      <th className="py-2.5">Home Address</th>
                      <th className="py-2.5">Emergency Contact (Who to Contact)</th>
                      <th className="py-2.5">Location</th>
                      <th className="py-2.5">Classification</th>
                      <th className="py-2.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredDirectory.map(person => {
                      const isEditing = editingPersonId === person.id;
                      return (
                        <tr key={person.id} className="hover:bg-slate-50 align-top">
                          <td className="py-3 pr-2">
                            {isEditing ? (
                              <input
                                type="text"
                                value={editPersonDraft.fullName}
                                onChange={(e) => setEditPersonDraft({ ...editPersonDraft, fullName: e.target.value })}
                                className="px-2 py-1 border border-slate-300 rounded w-full"
                              />
                            ) : (
                              <div>
                                <div className="font-bold text-slate-900">{person.fullName}</div>
                                <div className="text-[11px] text-slate-500">{person.units.join(' • ')}</div>
                              </div>
                            )}
                          </td>

                          <td className="py-3 pr-2 font-mono">
                            {isEditing ? (
                              <input
                                type="text"
                                value={editPersonDraft.phone}
                                onChange={(e) => setEditPersonDraft({ ...editPersonDraft, phone: e.target.value })}
                                className="px-2 py-1 border border-slate-300 rounded w-32"
                              />
                            ) : person.phone}
                          </td>

                          <td className="py-3 pr-2 text-slate-700">
                            {isEditing ? (
                              <input
                                type="text"
                                value={editPersonDraft.address}
                                onChange={(e) => setEditPersonDraft({ ...editPersonDraft, address: e.target.value })}
                                className="px-2 py-1 border border-slate-300 rounded w-44"
                              />
                            ) : (
                              <span className="inline-flex items-start gap-1">
                                <Home className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                                {person.address || '—'}
                              </span>
                            )}
                          </td>

                          <td className="py-3 pr-2">
                            {isEditing ? (
                              <div className="space-y-1">
                                <input
                                  type="text"
                                  placeholder="Contact name"
                                  value={editPersonDraft.emergencyName}
                                  onChange={(e) => setEditPersonDraft({ ...editPersonDraft, emergencyName: e.target.value })}
                                  className="px-2 py-1 border border-slate-300 rounded w-36 block"
                                />
                                <input
                                  type="text"
                                  placeholder="Contact phone"
                                  value={editPersonDraft.emergencyPhone}
                                  onChange={(e) => setEditPersonDraft({ ...editPersonDraft, emergencyPhone: e.target.value })}
                                  className="px-2 py-1 border border-slate-300 rounded w-36 block"
                                />
                              </div>
                            ) : (
                              <div>
                                <div className="font-semibold text-slate-800">{person.emergencyName || '—'}</div>
                                <div className="font-mono text-[11px] text-slate-500">{person.emergencyPhone || ''}</div>
                              </div>
                            )}
                          </td>

                          <td className="py-3 pr-2">{person.location}</td>

                          <td className="py-3 pr-2">
                            <select
                              value={person.category}
                              onChange={(e) => handleToggleCategory(person.id, e.target.value)}
                              className={`px-2 py-1 rounded text-[11px] font-bold border ${
                                person.category === 'Worker'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : 'bg-blue-50 text-blue-800 border-blue-300'
                              }`}
                            >
                              <option value="Worker">Worker</option>
                              <option value="Member">Member</option>
                            </select>
                          </td>

                          <td className="py-3 text-right whitespace-nowrap space-x-1.5">
                            {isEditing ? (
                              <>
                                <button onClick={saveEditedPerson} className="px-2 py-1 bg-emerald-600 text-white rounded font-semibold">
                                  Save
                                </button>
                                <button onClick={() => setEditingPersonId(null)} className="px-2 py-1 bg-slate-200 text-slate-700 rounded font-semibold">
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditingPersonId(person.id);
                                  setEditPersonDraft({ ...person });
                                }}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-semibold"
                              >
                                Edit
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
