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
  const [analyticsChartType, setAnalyticsChartType] = useState('trend'); // 'trend' | 'histogram' | 'service_compare' | 'demographics' | 'location_split'
  const [analyticsServiceFilter, setAnalyticsServiceFilter] = useState('All Services');
  const [analyticsMetric, setAnalyticsMetric] = useState('total'); // 'total' | 'adults' | 'youths' | 'children' | 'offeringPln'

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

  // 1. Chronological Trend (sorted by date, showing every logged session or period)
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

  // 2. Histogram Distribution (Frequency Buckets of Attendance Size or Offering)
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

  // 3. Service Day Comparison (Sunday Worship vs Koinonia vs Bible Study vs Revival)
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

  // 4. Demographic Breakdown (Adults vs Youths vs Children)
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

  // 5. Location Breakdown (Warsaw, Wrocław, Poznań, Kraków)
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

  // Summary KPIs for Top Banner & Analytics
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
    date: new Date().toISOString().slice(0, 10),
    location: 'Warsaw',
    serviceType: 'Sunday Worship',
    adults: '',
    youths: '',
    children: '',
    visitors: '',
    offeringPln: '',
    recordedBy: localStorage.getItem('dlbc_viewer_name') || ''
  });

  const handleAddAttendance = (e) => {
    e.preventDefault();
    const qStr = getQuarterString(attForm.date);
    const recorder = attForm.recordedBy.trim() || viewerName.trim() || 'Authorized Worker';
    const entry = {
      id: 'att-' + Date.now(),
      date: attForm.date,
      location: attForm.location,
      serviceType: attForm.serviceType,
      period: qStr,
      adults: Number(attForm.adults) || 0,
      youths: Number(attForm.youths) || 0,
      children: Number(attForm.children) || 0,
      visitors: Number(attForm.visitors) || 0,
      offeringPln: Number(attForm.offeringPln) || 0,
      recordedBy: recorder
    };
    setAttendance([entry, ...attendance]);
    setAttForm({
      ...attForm,
      adults: '',
      youths: '',
      children: '',
      visitors: '',
      offeringPln: '',
      recordedBy: recorder
    });
  };

  const handleDeleteAttendance = (id) => {
    setAttendance(attendance.filter(a => a.id !== id));
  };

  // ==========================================================================
  // FLEXIBLE MINISTERING ROSTERS (CREATE, EDIT, FILTER BY SERVICE & LOCATION)
  // ==========================================================================
  const SERVICE_ROSTER_TEMPLATES = {
    'Sunday Worship Service': [
      { time: '09:30', slot: 'Opening Prayer & Moderation', worker: 'Bro David' },
      { time: '09:45', slot: 'Search The Scriptures (STS)', worker: 'Bro Pelumi' },
      { time: '10:30', slot: 'Choir Ministration', worker: 'Sister Esther' },
      { time: '10:50', slot: 'Sermon / Word Ministration', worker: 'Pastor Dare' },
      { time: '11:45', slot: 'Ushering & Newcomer Welcome', worker: 'Bro Emmanuel' }
    ],
    'Prayer Meeting / Vigil': [
      { time: '18:30', slot: 'Opening Hymns & Worship', worker: 'Sister Esther' },
      { time: '18:45', slot: 'Exhortation & Prayer Points', worker: 'Pastor Dare' },
      { time: '19:15', slot: 'Intercessory Prayer Session', worker: 'Bro Emmanuel' },
      { time: '19:50', slot: 'Closing Benediction', worker: 'Bro David' }
    ],
    'Special Program / Crusade / Retreat': [
      { time: '17:00', slot: 'Protocol, Ushering & Welcome', worker: 'Bro Pelumi' },
      { time: '17:15', slot: 'Congregational Praise & Choir', worker: 'Sister Esther' },
      { time: '17:45', slot: 'Special Testimonies & Moderation', worker: 'Bro David' },
      { time: '18:05', slot: 'Main Revival Message & Altar Call', worker: 'Pastor Dare' },
      { time: '19:15', slot: 'Counseling & New Convert Follow-Up', worker: 'Sister Deborah' }
    ],
    'Midweek Koinonia / Bible Study': [
      { time: '18:30', slot: 'Praise & Worship', worker: 'Sister Esther' },
      { time: '18:50', slot: 'Bible Outline & Discussion', worker: 'Bro Pelumi' },
      { time: '19:30', slot: 'Intercessory Prayer', worker: 'Bro Emmanuel' }
    ],
    'Custom Service / Event': [
      { time: '18:00', slot: 'Opening & Moderation', worker: '' },
      { time: '18:30', slot: 'Main Ministration', worker: '' }
    ]
  };

  const [rosterLocationFilter, setRosterLocationFilter] = useState('All Locations');
  const [rosterServiceFilter, setRosterServiceFilter] = useState('All Services');
  const [showRosterBuilder, setShowRosterBuilder] = useState(false);
  const [editingRosterId, setEditingRosterId] = useState(null);
  const [rosterDraft, setRosterDraft] = useState({
    date: new Date().toISOString().slice(0, 10),
    location: 'Warsaw',
    serviceCategory: 'Sunday Worship Service',
    customServiceTitle: '',
    assignments: SERVICE_ROSTER_TEMPLATES['Sunday Worship Service'].map(a => ({ ...a }))
  });

  const openNewRosterBuilder = (presetCategory = 'Sunday Worship Service') => {
    setEditingRosterId(null);
    setRosterDraft({
      date: new Date().toISOString().slice(0, 10),
      location: 'Warsaw',
      serviceCategory: presetCategory,
      customServiceTitle: '',
      assignments: (SERVICE_ROSTER_TEMPLATES[presetCategory] || SERVICE_ROSTER_TEMPLATES['Custom Service / Event']).map(a => ({ ...a }))
    });
    setShowRosterBuilder(true);
  };

  const openEditRosterBuilder = (roster) => {
    setEditingRosterId(roster.id);
    const knownCategories = Object.keys(SERVICE_ROSTER_TEMPLATES);
    const isKnown = knownCategories.includes(roster.serviceType);
    setRosterDraft({
      date: roster.date,
      location: roster.location,
      serviceCategory: isKnown ? roster.serviceType : 'Custom Service / Event',
      customServiceTitle: isKnown ? '' : roster.serviceType,
      assignments: roster.assignments.map(a => ({ ...a }))
    });
    setShowRosterBuilder(true);
  };

  const handleRosterCategoryChange = (newCat) => {
    const template = SERVICE_ROSTER_TEMPLATES[newCat] || SERVICE_ROSTER_TEMPLATES['Custom Service / Event'];
    setRosterDraft(prev => ({
      ...prev,
      serviceCategory: newCat,
      assignments: template.map(a => ({ ...a }))
    }));
  };

  const handleDraftSlotChange = (index, field, value) => {
    setRosterDraft(prev => {
      const updated = prev.assignments.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item
      );
      return { ...prev, assignments: updated };
    });
  };

  const handleAddDraftSlot = () => {
    setRosterDraft(prev => ({
      ...prev,
      assignments: [...prev.assignments, { time: '19:00', slot: '', worker: '' }]
    }));
  };

  const handleRemoveDraftSlot = (index) => {
    setRosterDraft(prev => ({
      ...prev,
      assignments: prev.assignments.filter((_, idx) => idx !== index)
    }));
  };

  const handleSaveRoster = (e) => {
    e.preventDefault();
    const finalServiceTitle =
      rosterDraft.serviceCategory === 'Custom Service / Event'
        ? (rosterDraft.customServiceTitle.trim() || 'Special Church Service')
        : rosterDraft.customServiceTitle.trim()
        ? `${rosterDraft.serviceCategory}: ${rosterDraft.customServiceTitle.trim()}`
        : rosterDraft.serviceCategory;

    const cleanAssignments = rosterDraft.assignments
      .filter(a => a.slot.trim() || a.worker.trim())
      .map(a => ({
        time: a.time.trim() || '—',
        slot: a.slot.trim() || 'Duty Assignment',
        worker: a.worker.trim() || 'Unassigned'
      }));

    if (editingRosterId) {
      setRosters(rosters.map(r => r.id === editingRosterId ? {
        ...r,
        date: rosterDraft.date,
        location: rosterDraft.location,
        serviceType: finalServiceTitle,
        assignments: cleanAssignments
      } : r));
    } else {
      const created = {
        id: 'r-' + Date.now(),
        date: rosterDraft.date,
        location: rosterDraft.location,
        serviceType: finalServiceTitle,
        assignments: cleanAssignments
      };
      setRosters([created, ...rosters]);
    }
    setShowRosterBuilder(false);
    setEditingRosterId(null);
  };

  const handleDeleteRoster = (id) => {
    setRosters(rosters.filter(r => r.id !== id));
  };

  const filteredRosters = useMemo(() => {
    return rosters
      .filter(r => {
        const locOk = rosterLocationFilter === 'All Locations' || r.location === rosterLocationFilter;
        const svcOk =
          rosterServiceFilter === 'All Services' ||
          r.serviceType.toLowerCase().includes(rosterServiceFilter.toLowerCase());
        return locOk && svcOk;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [rosters, rosterLocationFilter, rosterServiceFilter]);

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
        {/* TAB 2: MINISTERING ROSTERS (FLEXIBLE SERVICE TYPES & EDITABLE SLOTS) */}
        {/* ==================================================================== */}
        {activeTab === 'rosters' && (
          <div className="space-y-5">
            {/* HEADER & FILTER BAR */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Flexible Ministering & Duty Rosters</h3>
                  <p className="text-xs text-slate-500">
                    Create and customize schedules for Sunday Worship, Prayer Meetings / Vigils, Special Programs, Crusades, or Koinonia
                  </p>
                </div>

                {isFullAdmin && (
                  <button
                    onClick={() => openNewRosterBuilder('Sunday Worship Service')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold rounded-xl shadow-sm transition"
                  >
                    <Plus className="w-4 h-4" />
                    Create New Roster
                  </button>
                )}
              </div>

              {/* FILTER CONTROLS BY SERVICE TYPE & LOCATION */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Filter by Service Type</label>
                  <select
                    value={rosterServiceFilter}
                    onChange={(e) => setRosterServiceFilter(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold border border-slate-300 rounded-xl bg-slate-50"
                  >
                    <option value="All Services">All Services & Programs</option>
                    <option value="Sunday">Sunday Worship Service</option>
                    <option value="Prayer">Prayer Meeting / Vigil</option>
                    <option value="Special">Special Program / Crusade / Retreat</option>
                    <option value="Koinonia">Midweek Koinonia / Bible Study</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Filter by Location</label>
                  <select
                    value={rosterLocationFilter}
                    onChange={(e) => setRosterLocationFilter(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold border border-slate-300 rounded-xl bg-slate-50"
                  >
                    <option value="All Locations">All Locations (Poland)</option>
                    <option value="Warsaw">Warsaw</option>
                    <option value="Wrocław">Wrocław</option>
                    <option value="Poznań">Poznań</option>
                    <option value="Kraków">Kraków</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <div className="text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 w-full">
                    Showing <strong className="text-slate-900">{filteredRosters.length}</strong> roster(s)
                  </div>
                </div>
              </div>
            </div>

            {/* FLEXIBLE ROSTER BUILDER / EDITOR PANEL (ADMIN ONLY) */}
            {isFullAdmin && showRosterBuilder && (
              <div className="bg-white border-2 border-amber-400 rounded-2xl p-5 shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {editingRosterId ? 'Edit Ministering Roster' : 'Build Flexible Service / Program Roster'}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Pick a service preset (Sunday, Prayer, Special Program) or type any custom program title and edit the duty rows below
                    </p>
                  </div>
                  <button onClick={() => setShowRosterBuilder(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveRoster} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Service / Program Type</label>
                      <select
                        value={rosterDraft.serviceCategory}
                        onChange={(e) => handleRosterCategoryChange(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-lg bg-amber-50"
                      >
                        <option value="Sunday Worship Service">Sunday Worship Service</option>
                        <option value="Prayer Meeting / Vigil">Prayer Meeting / Vigil</option>
                        <option value="Special Program / Crusade / Retreat">Special Program / Crusade / Retreat</option>
                        <option value="Midweek Koinonia / Bible Study">Midweek Koinonia / Bible Study</option>
                        <option value="Custom Service / Event">Custom Service / Event</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Program Subtitle / Custom Name <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Night of Power, Easter Retreat..."
                        value={rosterDraft.customServiceTitle}
                        onChange={(e) => setRosterDraft({ ...rosterDraft, customServiceTitle: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                      <input
                        type="date"
                        value={rosterDraft.date}
                        onChange={(e) => setRosterDraft({ ...rosterDraft, date: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                      <select
                        value={rosterDraft.location}
                        onChange={(e) => setRosterDraft({ ...rosterDraft, location: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                      >
                        <option>Warsaw</option>
                        <option>Wrocław</option>
                        <option>Poznań</option>
                        <option>Kraków</option>
                        <option>All Poland (Combined)</option>
                      </select>
                    </div>
                  </div>

                  {/* DYNAMIC ASSIGNMENT ROWS (ADD, EDIT, REMOVE ANY DUTY SLOT) */}
                  <div className="space-y-2 bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-800">Program Line-Up & Assigned Ministers / Workers</span>
                      <button
                        type="button"
                        onClick={handleAddDraftSlot}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Program Slot
                      </button>
                    </div>

                    <datalist id="dlbc-workers-list">
                      {people.filter(p => p.category === 'Worker').map(w => (
                        <option key={w.id} value={w.fullName} />
                      ))}
                    </datalist>

                    {rosterDraft.assignments.map((row, idx) => (
                      <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                        <input
                          type="text"
                          placeholder="09:30"
                          value={row.time}
                          onChange={(e) => handleDraftSlotChange(idx, 'time', e.target.value)}
                          className="col-span-3 sm:col-span-2 px-2.5 py-1.5 text-xs font-mono border border-slate-300 rounded-lg bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Duty / Ministration Slot (e.g., Prayer Charge)"
                          value={row.slot}
                          onChange={(e) => handleDraftSlotChange(idx, 'slot', e.target.value)}
                          className="col-span-9 sm:col-span-5 px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                        />
                        <input
                          type="text"
                          list="dlbc-workers-list"
                          placeholder="Assign Minister / Worker..."
                          value={row.worker}
                          onChange={(e) => handleDraftSlotChange(idx, 'worker', e.target.value)}
                          className="col-span-10 sm:col-span-4 px-2.5 py-1.5 text-xs font-semibold border border-slate-300 rounded-lg bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveDraftSlot(idx)}
                          title="Remove slot"
                          className="col-span-2 sm:col-span-1 flex justify-center text-slate-400 hover:text-red-600 py-1.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowRosterBuilder(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold rounded-lg"
                    >
                      {editingRosterId ? 'Save Updated Roster' : 'Publish Roster'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ROSTER CARDS GRID */}
            {filteredRosters.length === 0 ? (
              <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center">
                <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h4 className="font-bold text-slate-800 text-sm">No rosters match this service or location filter</h4>
                <p className="text-xs text-slate-500 mt-1">Switch the filters above or create a new roster for Sunday, Prayer, or a Special Program.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRosters.map(r => (
                  <div key={r.id} className="border border-slate-200 rounded-2xl p-4 bg-white shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[11px] font-bold">{r.location}</span>
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">{r.date}</span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm mt-1.5">{r.serviceType}</h4>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => {
                              const txt = `*DLBC Poland Roster (${r.date} - ${r.location})*
*${r.serviceType}*
` +
                                r.assignments.map(a => `• ${a.time} ${a.slot}: *${a.worker}*`).join('
');
                              navigator.clipboard?.writeText(txt);
                              alert('Roster copied for WhatsApp!');
                            }}
                            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold rounded-lg"
                          >
                            Copy WhatsApp
                          </button>

                          {isFullAdmin && (
                            <>
                              <button
                                onClick={() => openEditRosterBuilder(r)}
                                title="Edit Roster"
                                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteRoster(r.id)}
                                title="Delete Roster"
                                className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="divide-y divide-slate-100 bg-slate-50/70 rounded-xl border border-slate-200 px-3">
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
                  </div>
                ))}
              </div>
            )}
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
              <p className="text-xs text-slate-500 mb-4">Record Sunday Worship, Koinonia / Home Caring, Bible Study, or Revival services along with who recorded it</p>

              <form onSubmit={handleAddAttendance} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Service Date</label>
                  <input
                    type="date"
                    value={attForm.date}
                    onChange={(e) => setAttForm({ ...attForm, date: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                  <select
                    value={attForm.location}
                    onChange={(e) => setAttForm({ ...attForm, location: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                  >
                    <option>Warsaw</option>
                    <option>Wrocław</option>
                    <option>Poznań</option>
                    <option>Kraków</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Service Day / Type</label>
                  <select
                    value={attForm.serviceType}
                    onChange={(e) => setAttForm({ ...attForm, serviceType: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                  >
                    <option>Sunday Worship</option>
                    <option>Koinonia / Home Caring</option>
                    <option>Bible Study</option>
                    <option>Revival / Evangelism</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Recorded By (Name)</label>
                  <input
                    type="text"
                    placeholder="e.g., Bro Pelumi"
                    value={attForm.recordedBy}
                    onChange={(e) => setAttForm({ ...attForm, recordedBy: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Adults</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={attForm.adults}
                    onChange={(e) => setAttForm({ ...attForm, adults: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Youths</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={attForm.youths}
                    onChange={(e) => setAttForm({ ...attForm, youths: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Children</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={attForm.children}
                    onChange={(e) => setAttForm({ ...attForm, children: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                {isFullAdmin ? (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Offering (PLN) <span className="text-slate-400 font-normal">(Optional)</span></label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={attForm.offeringPln}
                      onChange={(e) => setAttForm({ ...attForm, offeringPln: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>
                ) : (
                  <div />
                )}

                <div className="sm:col-span-2 lg:col-span-4 flex justify-end pt-1">
                  <button type="submit" className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg">
                    + Save Attendance Record
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm overflow-x-auto">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-slate-900 text-sm">Service Attendance Log ({attendance.length})</h4>
              </div>

              {attendance.length === 0 ? (
                <div className="py-10 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/60">
                  <p className="text-xs font-semibold text-slate-700">No service attendance records logged yet.</p>
                  <p className="text-xs text-slate-500 mt-1">Use the form above to record Sunday Worship, Koinonia, Bible Study, or Revival attendance.</p>
                </div>
              ) : (
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
                      {isFullAdmin && <th className="py-2 text-right">Action</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {attendance.map(rec => (
                      <tr key={rec.id} className="hover:bg-slate-50">
                        <td className="py-2.5 font-medium">{rec.date}</td>
                        <td className="py-2.5">{rec.location}</td>
                        <td className="py-2.5">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            rec.serviceType === 'Sunday Worship' ? 'bg-amber-100 text-amber-800' :
                            rec.serviceType === 'Koinonia / Home Caring' ? 'bg-emerald-100 text-emerald-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {rec.serviceType}
                          </span>
                        </td>
                        <td className="py-2.5">{rec.adults}</td>
                        <td className="py-2.5">{rec.youths}</td>
                        <td className="py-2.5">{rec.children}</td>
                        <td className="py-2.5 font-bold text-slate-900">{rec.adults + rec.youths + rec.children}</td>
                        {isFullAdmin && <td className="py-2.5 font-mono">{rec.offeringPln ? `${rec.offeringPln} PLN` : '—'}</td>}
                        <td className="py-2.5 font-semibold text-slate-700">{rec.recordedBy}</td>
                        {isFullAdmin && (
                          <td className="py-2.5 text-right">
                            <button
                              onClick={() => handleDeleteAttendance(rec.id)}
                              title="Delete entry"
                              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-semibold"
                            >
                              <Trash2 className="w-3 h-3" />
                              Delete
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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
            {/* INTERACTIVE CONTROLS BAR (DROPDOWNS FOR CHART VIEW, METRIC, SERVICE & LOCATION) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    Flexible Church Data & Growth Insights
                  </h3>
                  <p className="text-xs text-slate-500">Switch between Trend Line, Histogram Distribution, Service-Day Comparison, Demographics, or Location Split</p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Leadership Restricted View
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">1. Visualization Type</label>
                  <select
                    value={analyticsChartType}
                    onChange={(e) => setAnalyticsChartType(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-xl bg-amber-50 text-slate-900 focus:outline-none focus:border-amber-500"
                  >
                    <option value="trend">📈 Growth Trend (Line & Area)</option>
                    <option value="histogram">📊 Histogram (Frequency Distribution)</option>
                    <option value="service_compare">⚖️ Sunday vs. Koinonia & Midweek</option>
                    <option value="demographics">👨‍👩‍👧‍👦 Demographics (Adults / Youths / Children)</option>
                    <option value="location_split">📍 Location Comparison (4 Cities)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">2. Metric to Analyze</label>
                  <select
                    value={analyticsMetric}
                    onChange={(e) => setAnalyticsMetric(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold border border-slate-300 rounded-xl bg-slate-50 text-slate-900"
                  >
                    <option value="total">Total Attendance (All Ages)</option>
                    <option value="adults">Adults Only</option>
                    <option value="youths">Youths Only</option>
                    <option value="children">Children Only</option>
                    <option value="offeringPln">Offering (PLN)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">3. Service Day Filter</label>
                  <select
                    value={analyticsServiceFilter}
                    onChange={(e) => setAnalyticsServiceFilter(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold border border-slate-300 rounded-xl bg-slate-50 text-slate-900"
                  >
                    <option value="All Services">All Service Days</option>
                    <option value="Sunday Worship">Sunday Worship</option>
                    <option value="Koinonia / Home Caring">Koinonia / Home Caring</option>
                    <option value="Bible Study">Bible Study</option>
                    <option value="Revival / Evangelism">Revival / Evangelism</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">4. Location Filter</label>
                  <select
                    value={analyticsLocation}
                    onChange={(e) => setAnalyticsLocation(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold border border-slate-300 rounded-xl bg-slate-50 text-slate-900"
                  >
                    <option value="All Locations">All Locations (Poland)</option>
                    <option value="Warsaw">Warsaw</option>
                    <option value="Wrocław">Wrocław</option>
                    <option value="Poznań">Poznań</option>
                    <option value="Kraków">Kraków</option>
                  </select>
                </div>
              </div>

              {/* DYNAMIC KPI SUMMARY CARDS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] text-slate-500">Matching Sessions</div>
                  <div className="text-lg font-extrabold text-slate-900">{filteredAttendance.length}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] text-slate-500">Average per Service</div>
                  <div className="text-lg font-extrabold text-slate-900">
                    {avgSelectedMetric} {analyticsMetric === 'offeringPln' ? 'PLN' : ''}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] text-slate-500">Highest Recorded Peak</div>
                  <div className="text-lg font-extrabold text-amber-600">
                    {peakSelectedMetric} {analyticsMetric === 'offeringPln' ? 'PLN' : ''}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] text-slate-500">First-to-Latest Change</div>
                  <div className={`text-lg font-extrabold ${overallGrowthPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {overallGrowthPct >= 0 ? `+${overallGrowthPct}%` : `${overallGrowthPct}%`}
                  </div>
                </div>
              </div>
            </div>

            {/* DYNAMIC VISUALIZATION CANVAS */}
            {filteredAttendance.length === 0 ? (
              <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center">
                <BarChart3 className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h4 className="font-bold text-slate-800 text-sm">No attendance data matches this filter yet</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Log services in the <strong>Attendance & Services</strong> tab (or switch your Location / Service filters above) to generate live trends, histograms, and service comparisons.
                </p>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                {/* VIEW 1: INTERACTIVE SVG TREND LINE + BAR PROGRESSION */}
                {analyticsChartType === 'trend' && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">
                          Chronological Growth Trend — {analyticsMetric === 'offeringPln' ? 'Offering (PLN)' : analyticsMetric.toUpperCase()}
                        </h4>
                        <p className="text-xs text-slate-500">{analyticsLocation} • {analyticsServiceFilter}</p>
                      </div>
                    </div>

                    {chronologicalTrendData.length === 1 ? (
                      <div className="p-6 rounded-xl bg-amber-50/60 border border-amber-200 text-center space-y-1">
                        <div className="text-xs text-amber-800 font-semibold">1 Session Logged ({chronologicalTrendData[0].label})</div>
                        <div className="text-2xl font-extrabold text-slate-900">
                          {chronologicalTrendData[0].value} {analyticsMetric === 'offeringPln' ? 'PLN' : 'Attendees'}
                        </div>
                        <p className="text-xs text-slate-500">Log at least 2 sessions to draw a multi-point trend line.</p>
                      </div>
                    ) : (
                      <div className="w-full overflow-x-auto">
                        {(() => {
                          const pts = chronologicalTrendData;
                          const maxV = Math.max(...pts.map(p => p.value), 1);
                          const width = Math.max(620, pts.length * 90);
                          const height = 240;
                          const padX = 45;
                          const padY = 30;
                          const plotW = width - padX * 2;
                          const plotH = height - padY * 2;

                          const coords = pts.map((p, idx) => {
                            const x = padX + (idx / (pts.length - 1)) * plotW;
                            const y = padY + plotH - (p.value / maxV) * plotH;
                            return { ...p, x, y };
                          });

                          const polylinePoints = coords.map(c => `${c.x},${c.y}`).join(' ');
                          const areaPoints = `${coords[0].x},${padY + plotH} ${polylinePoints} ${coords[coords.length - 1].x},${padY + plotH}`;

                          return (
                            <svg width={width} height={height + 35} className="mx-auto">
                              <defs>
                                <linearGradient id="dlbcTrendGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.02" />
                                </linearGradient>
                              </defs>

                              {/* Horizontal grid lines */}
                              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                                const gy = padY + plotH - ratio * plotH;
                                const labelVal = Math.round(ratio * maxV);
                                return (
                                  <g key={i}>
                                    <line x1={padX} y1={gy} x2={width - padX} y2={gy} stroke="#e2e8f0" strokeDasharray="3 3" />
                                    <text x={padX - 8} y={gy + 4} textAnchor="end" fontSize="10" fill="#64748b">{labelVal}</text>
                                  </g>
                                );
                              })}

                              {/* Area fill & trend line */}
                              <polygon points={areaPoints} fill="url(#dlbcTrendGrad)" />
                              <polyline fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={polylinePoints} />

                              {/* Data points & labels */}
                              {coords.map((c, idx) => (
                                <g key={idx}>
                                  <circle cx={c.x} cy={c.y} r="5" fill="#f59e0b" stroke="#0f172a" strokeWidth="2" />
                                  <text x={c.x} y={c.y - 10} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">
                                    {c.value}
                                  </text>
                                  <text x={c.x} y={padY + plotH + 18} textAnchor="middle" fontSize="10" fill="#475569">
                                    {c.shortDate}
                                  </text>
                                </g>
                              ))}
                            </svg>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                )}

                {/* VIEW 2: HISTOGRAM (FREQUENCY DISTRIBUTION) */}
                {analyticsChartType === 'histogram' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        Attendance / Offering Histogram — How Often Each Size Range Occurs
                      </h4>
                      <p className="text-xs text-slate-500">
                        Shows the distribution of service sizes across {filteredAttendance.length} logged session(s)
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 items-end h-56 pt-6 px-4 bg-slate-50 rounded-xl border border-slate-200">
                      {(() => {
                        const maxCount = Math.max(...histogramData.map(b => b.count), 1);
                        return histogramData.map((bin, idx) => {
                          const heightPct = Math.round((bin.count / maxCount) * 100);
                          return (
                            <div key={idx} className="flex flex-col items-center justify-end h-full pb-3">
                              <span className="text-xs font-extrabold text-slate-900 mb-1">
                                {bin.count} {bin.count === 1 ? 'service' : 'services'}
                              </span>
                              <div className="w-full max-w-[72px] bg-slate-200/70 rounded-t-lg h-36 flex items-end overflow-hidden">
                                <div
                                  className="w-full bg-gradient-to-t from-slate-900 to-amber-500 rounded-t-lg transition-all duration-500"
                                  style={{ height: `${bin.count === 0 ? 4 : Math.max(12, heightPct)}%` }}
                                />
                              </div>
                              <span className="text-xs font-bold text-slate-700 mt-2 text-center">{bin.label}</span>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                )}

                {/* VIEW 3: SUNDAY WORSHIP VS KOINONIA & MIDWEEK COMPARISON */}
                {analyticsChartType === 'service_compare' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Sunday Worship vs. Koinonia & Midweek Services</h4>
                      <p className="text-xs text-slate-500">Compares average attendance/offering per service day against Sunday Worship</p>
                    </div>

                    <div className="space-y-3">
                      {serviceComparisonData.map(s => (
                        <div key={s.type} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <div>
                              <span className="font-bold text-slate-900">{s.type}</span>
                              <span className="text-slate-400 ml-2">({s.sessions} sessions)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-slate-900">
                                {s.avg} avg {analyticsMetric === 'offeringPln' ? 'PLN' : ''}
                              </span>
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
                )}

                {/* VIEW 4: DEMOGRAPHICS BREAKDOWN */}
                {analyticsChartType === 'demographics' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Congregation Age Demographics (Adults, Youths & Children)</h4>
                      <p className="text-xs text-slate-500">Cumulative attendance composition across selected filters</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="text-xs font-semibold text-slate-500">Adults</div>
                        <div className="text-2xl font-extrabold text-slate-900 mt-1">{demographicSummary.adults}</div>
                        <div className="text-xs font-bold text-amber-700 mt-1">{demographicSummary.adultsPct}% of total</div>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="text-xs font-semibold text-slate-500">Youths / Students</div>
                        <div className="text-2xl font-extrabold text-emerald-700 mt-1">{demographicSummary.youths}</div>
                        <div className="text-xs font-bold text-emerald-700 mt-1">{demographicSummary.youthsPct}% of total</div>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="text-xs font-semibold text-slate-500">Children</div>
                        <div className="text-2xl font-extrabold text-blue-700 mt-1">{demographicSummary.children}</div>
                        <div className="text-xs font-bold text-blue-700 mt-1">{demographicSummary.childrenPct}% of total</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* VIEW 5: LOCATION COMPARISON (4 CITIES) */}
                {analyticsChartType === 'location_split' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Location Comparison — Warsaw, Wrocław, Poznań & Kraków</h4>
                      <p className="text-xs text-slate-500">Average per service across Poland ({analyticsServiceFilter})</p>
                    </div>

                    <div className="space-y-3">
                      {(() => {
                        const maxLocAvg = Math.max(...locationBreakdownData.map(l => l.avg), 1);
                        return locationBreakdownData.map(loc => {
                          const pct = Math.round((loc.avg / maxLocAvg) * 100);
                          return (
                            <div key={loc.location} className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="font-bold text-slate-800">{loc.location} <span className="font-normal text-slate-400">({loc.sessions} sessions)</span></span>
                                <span className="font-extrabold text-slate-900">{loc.avg} avg {analyticsMetric === 'offeringPln' ? 'PLN' : ''}</span>
                              </div>
                              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                                <div className="bg-slate-900 h-3 rounded-full" style={{ width: `${pct}%` }} />
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                )}
              </div>
            )}
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
