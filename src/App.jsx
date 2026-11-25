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

const INITIAL_ATTENDANCE = [];

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
const ACCESS_CODES = {
  'DLBC-HP2026': { role: 'head_pastor', label: 'Head Pastor (Full Admin)' },
  'DLBC-FA2026': { role: 'full_access', label: 'Senior / Full Access' },
  'DLBC-UE2026': { role: 'usher_entry', label: 'Usher / Data Entry' }
};

export default function App() {
  const [viewerName, setViewerName] = useState(() => localStorage.getItem('dlbc_viewer_name') || '');
  const [accessLevel, setAccessLevel] = useState(() => localStorage.getItem('dlbc_access_level') || 'public_member');
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  const [activeTab, setActiveTab] = useState('overview');

  const [people, setPeople] = useState(() => {
    const saved = localStorage.getItem('dlbc_people_v2');
    return saved ? JSON.parse(saved) : INITIAL_PEOPLE;
  });
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('dlbc_attendance_v3');
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
  useEffect(() => { localStorage.setItem('dlbc_attendance_v3', JSON.stringify(attendance)); }, [attendance]);
  useEffect(() => { localStorage.setItem('dlbc_newcomers_v2', JSON.stringify(newcomers)); }, [newcomers]);
  useEffect(() => { localStorage.setItem('dlbc_plans_v2', JSON.stringify(plansByYear)); }, [plansByYear]);
  useEffect(() => { localStorage.setItem('dlbc_rosters_v2', JSON.stringify(rosters)); }, [rosters]);

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
  // ANALYTICS COMPUTATIONS
  // ==========================================================================
  const [analyticsLocation, setAnalyticsLocation] = useState('All Locations');
  const [analyticsChartType, setAnalyticsChartType] = useState('trend');
  const [analyticsServiceFilter, setAnalyticsServiceFilter] = useState('All Services');
  const [analyticsMetric, setAnalyticsMetric] = useState('total');

  const getMetricValue = (rec, metricKey) => {
    if (metricKey === 'adults') return Number(rec.adults) || 0;
    if (metricKey === 'youths') return Number(rec.youths) || 0;
    if (metricKey === 'children') return Number(rec.children) || 0;
    if (metricKey === 'offeringPln') return Number(rec.offeringPln) || 0;
    return (Number(rec.adults) || 0) + (Number(rec.youths) || 0) + (Number(rec.children) || 0);
  };

  const filteredAttendance = useMemo(() => {
    return attendance.filter(a => {
      const locMatch = analyticsLocation === 'All Locations' || a.location === analyticsLocation;
      const svcMatch = analyticsServiceFilter === 'All Services' || a.serviceType === analyticsServiceFilter;
      return locMatch && svcMatch;
    });
  }, [attendance, analyticsLocation, analyticsServiceFilter]);

  const chronologicalTrendData = useMemo(() => {
    const sorted = [...filteredAttendance].sort((a, b) => a.date.localeCompare(b.date));
    return sorted.map(rec => ({
      id: rec.id,
      label: `${rec.date} (${rec.location})`,
      shortDate: rec.date,
      serviceType: rec.serviceType,
      value: getMetricValue(rec, analyticsMetric)
    }));
  }, [filteredAttendance, analyticsMetric]);

  const histogramData = useMemo(() => {
    if (filteredAttendance.length === 0) return [];
    const values = filteredAttendance.map(r => getMetricValue(r, analyticsMetric));
    const isOffering = analyticsMetric === 'offeringPln';
    const bins = isOffering
      ? [
          { label: '0 – 250 PLN', min: 0, max: 250, count: 0 },
          { label: '251 – 500 PLN', min: 251, max: 500, count: 0 },
          { label: '501 – 800 PLN', min: 501, max: 800, count: 0 },
          { label: '801+ PLN', min: 801, max: Infinity, count: 0 }
        ]
      : [
          { label: '1 – 10', min: 1, max: 10, count: 0 },
          { label: '11 – 20', min: 11, max: 20, count: 0 },
          { label: '21 – 30', min: 21, max: 30, count: 0 },
          { label: '31 – 45', min: 31, max: 45, count: 0 },
          { label: '46+', min: 46, max: Infinity, count: 0 }
        ];

    values.forEach(v => {
      const bin = bins.find(b => v >= b.min && v <= b.max);
      if (bin) bin.count += 1;
    });
    return bins;
  }, [filteredAttendance, analyticsMetric]);

  const serviceComparisonData = useMemo(() => {
    const locFiltered = analyticsLocation === 'All Locations'
      ? attendance
      : attendance.filter(a => a.location === analyticsLocation);

    const types = ['Sunday Worship', 'Koinonia / Home Caring', 'Bible Study', 'Revival / Evangelism'];
    const sundayRecords = locFiltered.filter(a => a.serviceType === 'Sunday Worship');
    const sundayAvg = sundayRecords.length
      ? sundayRecords.reduce((s, r) => s + getMetricValue(r, analyticsMetric), 0) / sundayRecords.length
      : 0;

    return types.map(type => {
      const recs = locFiltered.filter(a => a.serviceType === type);
      const totalSum = recs.reduce((s, r) => s + getMetricValue(r, analyticsMetric), 0);
      const avg = recs.length ? +(totalSum / recs.length).toFixed(1) : 0;
      const retentionPct = sundayAvg > 0 ? Math.round((avg / sundayAvg) * 100) : 0;
      return { type, avg, sessions: recs.length, retentionPct };
    });
  }, [attendance, analyticsLocation, analyticsMetric]);

  const demographicSummary = useMemo(() => {
    const totals = filteredAttendance.reduce(
      (acc, r) => {
        acc.adults += Number(r.adults) || 0;
        acc.youths += Number(r.youths) || 0;
        acc.children += Number(r.children) || 0;
        return acc;
      },
      { adults: 0, youths: 0, children: 0 }
    );
    const grand = totals.adults + totals.youths + totals.children;
    return {
      ...totals,
      grand,
      adultsPct: grand ? Math.round((totals.adults / grand) * 100) : 0,
      youthsPct: grand ? Math.round((totals.youths / grand) * 100) : 0,
      childrenPct: grand ? Math.round((totals.children / grand) * 100) : 0
    };
  }, [filteredAttendance]);

  const locationBreakdownData = useMemo(() => {
    const locs = ['Warsaw', 'Wrocław', 'Poznań', 'Kraków'];
    const svcFiltered = analyticsServiceFilter === 'All Services'
      ? attendance
      : attendance.filter(a => a.serviceType === analyticsServiceFilter);

    return locs.map(loc => {
      const recs = svcFiltered.filter(a => a.location === loc);
      const sum = recs.reduce((s, r) => s + getMetricValue(r, analyticsMetric), 0);
      const avg = recs.length ? +(sum / recs.length).toFixed(1) : 0;
      return { location: loc, sessions: recs.length, avg, total: sum };
    });
  }, [attendance, analyticsServiceFilter, analyticsMetric]);

  const sundayAll = attendance.filter(a => a.serviceType === 'Sunday Worship').sort((a, b) => a.date.localeCompare(b.date));
  const latestSundayAvg = sundayAll.length
    ? +(sundayAll.reduce((s, r) => s + r.adults + r.youths + r.children, 0) / sundayAll.length).toFixed(1)
    : 0;
  const firstVal = chronologicalTrendData.length ? chronologicalTrendData[0].value : 0;
  const lastVal = chronologicalTrendData.length ? chronologicalTrendData[chronologicalTrendData.length - 1].value : 0;
  const overallGrowthPct = firstVal > 0 ? Math.round(((lastVal - firstVal) / firstVal) * 100) : 0;
  const avgSelectedMetric = filteredAttendance.length
    ? +(filteredAttendance.reduce((s, r) => s + getMetricValue(r, analyticsMetric), 0) / filteredAttendance.length).toFixed(1)
    : 0;
  const peakSelectedMetric = filteredAttendance.length
    ? Math.max(...filteredAttendance.map(r => getMetricValue(r, analyticsMetric)))
    : 0;

  // ==========================================================================
  // NEWCOMERS STATE & FILTERS
  // ==========================================================================
  const [ncViewMode, setNcViewMode] = useState('month');
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
  const [directorySubTab, setDirectorySubTab] = useState('Worker');
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
  const [newNoticeForm, setNewNoticeForm] = useState({ title: '', date: '2026-12-01', audience: 'All Locations', priority: 'Normal
