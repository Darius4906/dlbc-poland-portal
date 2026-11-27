import React, { useState, useMemo, useEffect } from 'react';
import {
  Users, Calendar, BarChart3, ShieldCheck, UserPlus, ClipboardList,
  MapPin, Lock, Unlock, Plus, Trash2, Archive, RotateCcw, Search,
  Edit3, Check, X, Eye, TrendingUp, BookOpen, Bell,
  Download, Home, Layers, History, Sliders
} from 'lucide-react';

// ============================================================================
// INITIAL DATA & CHURCH RECORDS (DLBC POLAND)
// ============================================================================
const INITIAL_PEOPLE = [
  // WORKERS
  { id: 'p1', category: 'Worker', title: 'Pastor', fullName: 'Pastor Dare', phone: '+48 500 100 001', address: 'ul. Puławska 42/12', emergencyName: 'Sister Grace Dare', emergencyPhone: '+48 500 100 091', location: '', accessRole: 'head_pastor', units: ['Pastoral', 'Preaching', 'Leadership'], joinDate: '2021-03-10', status: 'Active' },
  { id: 'p2', category: 'Worker', title: 'Pastor', fullName: 'Pastor William', phone: '+48 500 100 002', address: 'ul. Świdnicka 18/4', emergencyName: 'Sister Ruth William', emergencyPhone: '+48 500 100 092', location: '', accessRole: 'full_access', units: ['National Oversight', 'Preaching'], joinDate: '2019-06-01', status: 'Active' },
  { id: 'p3', category: 'Worker', title: 'Bro', fullName: 'Bro David', phone: '+48 500 100 003', address: 'ul. Marszałkowska 88/7', emergencyName: 'Bro Samuel', emergencyPhone: '+48 500 100 005', location: '', accessRole: 'usher_entry', units: ['STS', 'Moderation', 'Choir'], joinDate: '2022-01-15', status: 'Active' },
  { id: 'p4', category: 'Worker', title: 'Sister', fullName: 'Sister Esther', phone: '+48 500 100 004', address: 'ul. Mokotowska 19/3', emergencyName: 'Sister Deborah', emergencyPhone: '+48 500 100 008', location: '', accessRole: 'member', units: ['Choir', 'Follow-up', 'Children'], joinDate: '2022-05-20', status: 'Active' },
  { id: 'p5', category: 'Worker', title: 'Bro', fullName: 'Bro Samuel', phone: '+48 500 100 005', address: 'ul. Grójecka 65/11', emergencyName: 'Bro David', emergencyPhone: '+48 500 100 003', location: '', accessRole: 'member', units: ['Media / Technical', 'Vigils'], joinDate: '2022-09-12', status: 'Active' },
  { id: 'p6', category: 'Worker', title: 'Bro', fullName: 'Bro Pelumi', phone: '+48 500 100 006', address: 'ul. Targowa 33/9', emergencyName: 'Bro Emmanuel', emergencyPhone: '+48 500 100 010', location: '', accessRole: 'usher_entry', units: ['Ushering', 'Data Entry', 'STS', 'Moderation'], joinDate: '2023-02-14', status: 'Active' },
  { id: 'p7', category: 'Worker', title: 'Bro', fullName: 'Bro Caleb', phone: '+48 500 100 007', address: 'ul. Półwiejska 24/6', emergencyName: 'Sister Hannah', emergencyPhone: '+48 500 100 014', location: '', accessRole: 'usher_entry', units: ['Location Lead', 'STS', 'Evangelism'], joinDate: '2023-04-02', status: 'Active' },
  { id: 'p8', category: 'Worker', title: 'Sister', fullName: 'Sister Deborah', phone: '+48 500 100 008', address: 'ul. Floriańska 15/2', emergencyName: 'Sister Esther', emergencyPhone: '+48 500 100 004', location: '', accessRole: 'usher_entry', units: ['Location Lead', 'Choir', 'Follow-up'], joinDate: '2023-06-18', status: 'Active' },
  { id: 'p9', category: 'Worker', title: 'Bro', fullName: 'Bro Joshua', phone: '+48 500 100 009', address: 'ul. Legnicka 50/8', emergencyName: 'Pastor William', emergencyPhone: '+48 500 100 002', location: '', accessRole: 'member', units: ['Ushering', 'Media / Technical'], joinDate: '2023-08-11', status: 'Active' },
  { id: 'p10', category: 'Worker', title: 'Bro', fullName: 'Bro Emmanuel', phone: '+48 500 100 010', address: 'ul. Jana Pawła II 29/14', emergencyName: 'Bro Pelumi', emergencyPhone: '+48 500 100 006', location: '', accessRole: 'member', units: ['Prayer Band', 'Vigils', 'Evangelism'], joinDate: '2023-10-05', status: 'Active' },
  // MEMBERS (SEPARATE DIRECTORY CATEGORY)
  { id: 'm1', category: 'Member', title: 'Bro', fullName: 'Bro Daniel Okafor', phone: '+48 501 200 101', address: 'ul. Wilcza 14/5', emergencyName: 'Sister Mary Okafor', emergencyPhone: '+48 501 200 102', location: '', accessRole: 'member', units: ['General Congregation'], joinDate: '2024-03-17', status: 'Active' },
  { id: 'm2', category: 'Member', title: 'Sister', fullName: 'Sister Mary Okafor', phone: '+48 501 200 102', address: 'ul. Wilcza 14/5', emergencyName: 'Bro Daniel Okafor', emergencyPhone: '+48 501 200 101', location: '', accessRole: 'member', units: ['Women Fellowship'], joinDate: '2024-03-17', status: 'Active' },
  { id: 'm3', category: 'Member', title: 'Bro', fullName: 'Bro Piotr Kowalski', phone: '+48 501 200 103', address: 'ul. Karmelicka 9/3', emergencyName: 'Anna Kowalska', emergencyPhone: '+48 501 200 199', location: '', accessRole: 'member', units: ['Youth / Campus'], joinDate: '2024-09-08', status: 'Active' },
  { id: 'm4', category: 'Member', title: 'Sister', fullName: 'Sister Abigail Mensah', phone: '+48 501 200 104', address: 'ul. Głogowska 72/4', emergencyName: 'Kwame Mensah', emergencyPhone: '+48 501 200 198', location: '', accessRole: 'member', units: ['Youth / Campus'], joinDate: '2025-01-19', status: 'Active' },
  { id: 'm5', category: 'Member', title: 'Bro', fullName: 'Bro Gideon Balogun', phone: '+48 501 200 105', address: 'ul. Oławska 11/6', emergencyName: 'Tunde Balogun', emergencyPhone: '+48 501 200 197', location: '', accessRole: 'member', units: ['Men Fellowship'], joinDate: '2025-04-13', status: 'Active' },
  { id: 'm6', category: 'Member', title: 'Sister', fullName: 'Sister Faith Adeyemi', phone: '+48 501 200 106', address: 'ul. Solec 44/10', emergencyName: 'Sister Esther', emergencyPhone: '+48 500 100 004', location: '', accessRole: 'member', units: ['General Congregation'], joinDate: '2025-08-24', status: 'Active' }
];

const INITIAL_WEEKLY_SERVICES = [
  { id: 'ws1', name: 'Sunday Worship Service', schedule: '09:30 AM – 12:00 PM' },
  { id: 'ws2', name: 'Midweek Koinonia / Home Caring', schedule: 'Wednesdays • 18:30 PM' },
  { id: 'ws3', name: 'Thursday Revival & Evangelism Training', schedule: 'Thursdays • 18:30 PM' }
];

const INITIAL_ATTENDANCE = [];

const INITIAL_NEWCOMERS = [
  { id: 'nc1', fullName: 'Chinedu Eze', phone: '+48 512 334 101', location: '', visitDate: '2026-11-22', invitedBy: 'Bro Pelumi', assignedFollowUp: 'Sister Esther', status: 'First-Timer', notes: 'University student', archived: false },
  { id: 'nc2', fullName: 'Katarzyna Nowak', phone: '+48 512 334 102', location: '', visitDate: '2026-11-15', invitedBy: 'Bro David', assignedFollowUp: 'Sister Esther', status: 'Second Visit', notes: 'Interested in Koinonia fellowship', archived: false },
  { id: 'nc3', fullName: 'Michael Mensah', phone: '+48 512 334 103', location: '', visitDate: '2026-11-08', invitedBy: 'Bro Caleb', assignedFollowUp: 'Bro Caleb', status: 'Established', notes: 'Joined campus fellowship', archived: false },
  { id: 'nc4', fullName: 'Oluwaseun Taiwo', phone: '+48 512 334 104', location: '', visitDate: '2026-10-18', invitedBy: 'Bro Emmanuel', assignedFollowUp: 'Bro Emmanuel', status: 'Second Visit', notes: 'Prefers evening calls', archived: false },
  { id: 'nc5', fullName: 'Grace Boateng', phone: '+48 512 334 105', location: '', visitDate: '2026-10-04', invitedBy: 'Bro Joshua', assignedFollowUp: 'Pastor William', status: 'First-Timer', notes: 'Visited during October Sunday service', archived: false },
  { id: 'nc6', fullName: 'Samuel Adjei', phone: '+48 512 334 106', location: '', visitDate: '2026-07-12', invitedBy: 'Pastor Dare', assignedFollowUp: 'Bro David', status: 'Established', notes: 'Archived after Q3 follow-up', archived: true }
];
const INITIAL_PLANS_AND_NOTICES = {};
const DEFAULT_QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];
const INITIAL_ROSTERS = [];

const INITIAL_FA_POLICY = {
  canEdit: false,
  restrictedModules: {
    directory: true,
    offerings: false,
    rosters: false,
    plansAndNotices: false,
    attendance: false,
    newcomers: false
  }
};

const ACCESS_CODES = {
  'DLBC-HP2026': { role: 'head_pastor', label: 'Head Pastor (Full Admin)' },
  'DLBC-FA2026': { role: 'full_access', label: 'Full Access (Oversight)' },
  'DLBC-UE2026': { role: 'usher_entry', label: 'Usher / Data Entry' }
};

const createEmptyYearPlan = () => ({
  theme: '',
  bibleReference: '',
  themeDescription: '',
  noticeBoard: [],
  quarters: {
    Q1: { team: '', activities: [] },
    Q2: { team: '', activities: [] },
    Q3: { team: '', activities: [] },
    Q4: { team: '', activities: [] }
  }
});

const normalizeYearPlan = (raw) => {
  const base = createEmptyYearPlan();
  if (!raw || typeof raw !== 'object') return base;

  const normalizedQuarters = { ...base.quarters };
  if (raw.quarters && typeof raw.quarters === 'object') {
    Object.entries(raw.quarters).forEach(([qKey, qVal]) => {
      normalizedQuarters[qKey] = {
        team: typeof qVal?.team === 'string' ? qVal.team : '',
        activities: Array.isArray(qVal?.activities)
          ? qVal.activities.map(act => ({
              id: act.id || 'act-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
              activity: act.activity || '',
              date: act.date || '',
              target: act.target || '',
              description: typeof act.description === 'string' ? act.description : '',
              executionStatus: act.executionStatus === 'executed' ? 'executed' : 'not_executed'
            }))
          : []
      };
    });
  }

  return {
    theme: typeof raw.theme === 'string' ? raw.theme : '',
    bibleReference: typeof raw.bibleReference === 'string' ? raw.bibleReference : '',
    themeDescription: typeof raw.themeDescription === 'string' ? raw.themeDescription : '',
    noticeBoard: Array.isArray(raw.noticeBoard) ? raw.noticeBoard : [],
    quarters: normalizedQuarters
  };
};

const getRecordCounts = (rec) => {
  const adultMale = Number(rec.adultMale) || 0;
  const adultFemale = Number(rec.adultFemale) || 0;
  const youthBoys = Number(rec.youthBoys) || 0;
  const youthGirls = Number(rec.youthGirls) || 0;
  const childrenBoys = Number(rec.childrenBoys) || 0;
  const childrenGirls = Number(rec.childrenGirls) || 0;
  const visitorMale = Number(rec.visitorMale) || 0;
  const visitorFemale = Number(rec.visitorFemale) || 0;

  const hasGenderFields =
    'adultMale' in rec || 'adultFemale' in rec ||
    'youthBoys' in rec || 'youthGirls' in rec ||
    'childrenBoys' in rec || 'childrenGirls' in rec ||
    'visitorMale' in rec || 'visitorFemale' in rec;

  const adults = hasGenderFields ? adultMale + adultFemale : (Number(rec.adults) || 0);
  const youths = hasGenderFields ? youthBoys + youthGirls : (Number(rec.youths) || 0);
  const children = hasGenderFields ? childrenBoys + childrenGirls : (Number(rec.children) || 0);
  const visitors = hasGenderFields ? visitorMale + visitorFemale : (Number(rec.visitors) || 0);
  const maleTotal = adultMale + youthBoys + childrenBoys + visitorMale;
  const femaleTotal = adultFemale + youthGirls + childrenGirls + visitorFemale;
  const total = adults + youths + children + visitors;

  return {
    adultMale, adultFemale, youthBoys, youthGirls,
    childrenBoys, childrenGirls, visitorMale, visitorFemale,
    adults, youths, children, visitors, maleTotal, femaleTotal, total
  };
};

const getWeekNumberInMonth = (dateStr) => {
  if (!dateStr || dateStr.length < 10) return 1;
  const day = parseInt(dateStr.slice(8, 10), 10);
  if (Number.isNaN(day) || day < 1) return 1;
  return Math.min(5, Math.ceil(day / 7));
};

const summarizeFieldDiffs = (beforeObj, afterObj, fieldLabels) => {
  const changes = [];
  Object.entries(fieldLabels).forEach(([key, label]) => {
    const prevVal = String(beforeObj?.[key] ?? '').trim();
    const nextVal = String(afterObj?.[key] ?? '').trim();
    if (prevVal !== nextVal) {
      changes.push(`${label}: "${prevVal || '—'}" → "${nextVal || '—'}"`);
    }
  });
  return changes.length > 0 ? changes.join(' | ') : 'Updated record';
};

const TREND_SERIES_OPTIONS = [
  { key: 'total', label: 'Total', color: '#0d2247', fill: 'rgba(13, 34, 71, 0.14)' },
  { key: 'maleTotal', label: 'All Male', color: '#2563eb', fill: 'rgba(37, 99, 235, 0.14)' },
  { key: 'femaleTotal', label: 'All Female', color: '#db2777', fill: 'rgba(219, 39, 119, 0.14)' },
  { key: 'adultMale', label: 'Adult Male', color: '#1d4ed8', fill: 'rgba(29, 78, 216, 0.12)' },
  { key: 'adultFemale', label: 'Adult Female', color: '#be185d', fill: 'rgba(190, 24, 93, 0.12)' },
  { key: 'youthBoys', label: 'Youth Boys', color: '#059669', fill: 'rgba(5, 150, 105, 0.12)' },
  { key: 'youthGirls', label: 'Youth Girls', color: '#d97706', fill: 'rgba(217, 119, 6, 0.12)' },
  { key: 'childrenBoys', label: 'Children Boys', color: '#0284c7', fill: 'rgba(2, 132, 199, 0.12)' },
  { key: 'childrenGirls', label: 'Children Girls', color: '#9333ea', fill: 'rgba(147, 51, 234, 0.12)' },
  { key: 'visitorMale', label: 'Visitor Male', color: '#0f766e', fill: 'rgba(15, 118, 110, 0.12)' },
  { key: 'visitorFemale', label: 'Visitor Female', color: '#c026d3', fill: 'rgba(192, 38, 211, 0.12)' }
];
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
  const [weeklyServices, setWeeklyServices] = useState(() => {
    const saved = localStorage.getItem('dlbc_weekly_services_v1');
    return saved ? JSON.parse(saved) : INITIAL_WEEKLY_SERVICES;
  });
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('dlbc_attendance_v4') || localStorage.getItem('dlbc_attendance_v3');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });
  const [newcomers, setNewcomers] = useState(() => {
    const saved = localStorage.getItem('dlbc_newcomers_v2');
    return saved ? JSON.parse(saved) : INITIAL_NEWCOMERS;
  });
  const [plansByYear, setPlansByYear] = useState(() => {
    const saved = localStorage.getItem('dlbc_plans_v5') || localStorage.getItem('dlbc_plans_v4') || localStorage.getItem('dlbc_plans_v3');
    if (!saved) return INITIAL_PLANS_AND_NOTICES;
    const parsed = JSON.parse(saved);
    const out = {};
    Object.entries(parsed).forEach(([yr, val]) => {
      out[yr] = normalizeYearPlan(val);
    });
    return out;
  });
  const [rosters, setRosters] = useState(() => {
    const saved = localStorage.getItem('dlbc_rosters_v2');
    return saved ? JSON.parse(saved) : INITIAL_ROSTERS;
  });

  const [faPolicy, setFaPolicy] = useState(() => {
    const saved = localStorage.getItem('dlbc_fa_policy_v1');
    if (!saved) return INITIAL_FA_POLICY;
    const parsed = JSON.parse(saved);
    return {
      canEdit: Boolean(parsed.canEdit),
      restrictedModules: {
        ...INITIAL_FA_POLICY.restrictedModules,
        ...(parsed.restrictedModules || {})
      }
    };
  });

  const [activityLog, setActivityLog] = useState(() => {
    const saved = localStorage.getItem('dlbc_activity_log_v1');
    return saved ? JSON.parse(saved) : [];
  });
  const [logActionFilter, setLogActionFilter] = useState('ALL');
  const [logActorFilter, setLogActorFilter] = useState('ALL');
  // One-time cleanup of old hardcoded city names while preserving all entered records
  useEffect(() => {
    const cleanupKey = 'dlbc_cleared_hardcoded_locations_v1';
    if (localStorage.getItem(cleanupKey)) return;

    const legacyCities = new Set(['warsaw', 'wrocław', 'wroclaw', 'poznań', 'poznan', 'kraków', 'krakow', 'all']);
    const isLegacyCity = (val) => typeof val === 'string' && legacyCities.has(val.trim().toLowerCase());

    setPeople(prev => prev.map(p => (isLegacyCity(p.location) ? { ...p, location: '' } : p)));
    setAttendance(prev => prev.map(a => (isLegacyCity(a.location) ? { ...a, location: '' } : a)));
    setNewcomers(prev => prev.map(n => (isLegacyCity(n.location) ? { ...n, location: '' } : n)));
    setRosters(prev => prev.map(r => (isLegacyCity(r.location) ? { ...r, location: '' } : r)));

    localStorage.setItem(cleanupKey, 'done');
  }, []);

  useEffect(() => { localStorage.setItem('dlbc_people_v2', JSON.stringify(people)); }, [people]);
  useEffect(() => { localStorage.setItem('dlbc_weekly_services_v1', JSON.stringify(weeklyServices)); }, [weeklyServices]);
  useEffect(() => { localStorage.setItem('dlbc_attendance_v4', JSON.stringify(attendance)); }, [attendance]);
  useEffect(() => { localStorage.setItem('dlbc_newcomers_v2', JSON.stringify(newcomers)); }, [newcomers]);
  useEffect(() => { localStorage.setItem('dlbc_plans_v5', JSON.stringify(plansByYear)); }, [plansByYear]);
  useEffect(() => { localStorage.setItem('dlbc_rosters_v2', JSON.stringify(rosters)); }, [rosters]);
  useEffect(() => { localStorage.setItem('dlbc_fa_policy_v1', JSON.stringify(faPolicy)); }, [faPolicy]);
  useEffect(() => { localStorage.setItem('dlbc_activity_log_v1', JSON.stringify(activityLog)); }, [activityLog]);

  const roleLabel =
    accessLevel === 'head_pastor'
      ? 'Head Pastor (HP)'
      : accessLevel === 'full_access'
      ? 'Full Access (FA)'
      : accessLevel === 'usher_entry'
      ? 'Usher / Data Entry'
      : 'Public View';

  const recordAuditChange = ({ action, moduleName, targetLabel, details }) => {
    const actorName = viewerName.trim() || roleLabel;
    const entry = {
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
      timestamp: new Date().toLocaleString(),
      actorName,
      actorRole: accessLevel,
      actorRoleLabel: roleLabel,
      action,
      moduleName,
      targetLabel,
      details
    };
    setActivityLog(prev => [entry, ...prev].slice(0, 250));
  };

  const isHeadPastor = accessLevel === 'head_pastor';
  const isFullAccessRole = accessLevel === 'full_access';
  const hasOversightView = isHeadPastor || isFullAccessRole;

  const canEditModule = (moduleKey) => {
    if (isHeadPastor) return true;
    if (isFullAccessRole) return Boolean(faPolicy.canEdit) && !faPolicy.restrictedModules?.[moduleKey];
    return false;
  };

  const canExecutePlanStatus = isHeadPastor || isFullAccessRole;
  const canViewOfferings = isHeadPastor || (isFullAccessRole && !faPolicy.restrictedModules?.offerings);
  const canEnterAttendance = isHeadPastor || accessLevel === 'usher_entry' || canEditModule('attendance');
  const canEnterNewcomers = isHeadPastor || accessLevel === 'usher_entry' || canEditModule('newcomers');

  const knownLocations = useMemo(() => {
    const set = new Set();
    people.forEach(p => p.location && set.add(p.location.trim()));
    attendance.forEach(a => a.location && set.add(a.location.trim()));
    newcomers.forEach(n => n.location && set.add(n.location.trim()));
    rosters.forEach(r => r.location && set.add(r.location.trim()));
    return Array.from(set).filter(Boolean);
  }, [people, attendance, newcomers, rosters]);

  const knownServiceTypes = useMemo(() => {
    const set = new Set();
    weeklyServices.forEach(ws => ws.name && set.add(ws.name.trim()));
    attendance.forEach(a => a.serviceType && set.add(a.serviceType.trim()));
    rosters.forEach(r => r.serviceType && set.add(r.serviceType.trim()));
    return Array.from(set).filter(Boolean);
  }, [weeklyServices, attendance, rosters]);
  const toggleFaEditPermission = () => {
    if (!isHeadPastor) return;
    const nextCanEdit = !faPolicy.canEdit;
    setFaPolicy(prev => ({ ...prev, canEdit: nextCanEdit }));
    recordAuditChange({
      action: 'Permission Changed',
      moduleName: 'FA Access Control',
      targetLabel: 'Full Access (FA) Edit Rights',
      details: nextCanEdit
        ? 'HP GRANTED edit permission to FA (subject to module restrictions)'
        : 'HP REVOKED edit permission from FA (FA returned to View + Execute mode)'
    });
  };

  const toggleFaModuleRestriction = (moduleKey, label) => {
    if (!isHeadPastor) return;
    const currentRestricted = Boolean(faPolicy.restrictedModules?.[moduleKey]);
    const nextRestricted = !currentRestricted;
    setFaPolicy(prev => ({
      ...prev,
      restrictedModules: {
        ...prev.restrictedModules,
        [moduleKey]: nextRestricted
      }
    }));
    recordAuditChange({
      action: 'Permission Changed',
      moduleName: 'FA Access Control',
      targetLabel: `FA Restriction — ${label}`,
      details: nextRestricted
        ? `HP RESTRICTED FA edit/sensitive access on ${label}`
        : `HP UNRESTRICTED FA access on ${label}`
    });
  };

  const [isEditingServices, setIsEditingServices] = useState(false);
  const [servicesDraft, setServicesDraft] = useState([]);

  const startEditingServices = () => {
    if (!canEditModule('plansAndNotices')) return;
    setServicesDraft(weeklyServices.map(s => ({ ...s })));
    setIsEditingServices(true);
  };

  const handleServiceDraftChange = (id, field, value) => {
    setServicesDraft(prev => prev.map(s => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleAddServiceDraft = () => {
    setServicesDraft(prev => [...prev, { id: 'ws-' + Date.now(), name: '', schedule: '' }]);
  };

  const handleRemoveServiceDraft = (id) => {
    setServicesDraft(prev => prev.filter(s => s.id !== id));
  };

  const handleSaveServices = (e) => {
    e.preventDefault();
    if (!canEditModule('plansAndNotices')) return;
    const cleaned = servicesDraft
      .filter(s => s.name.trim() || s.schedule.trim())
      .map(s => ({
        id: s.id,
        name: s.name.trim() || 'Church Service',
        schedule: s.schedule.trim() || 'Schedule TBD'
      }));
    setWeeklyServices(cleaned);
    setIsEditingServices(false);
    recordAuditChange({
      action: 'Edited',
      moduleName: 'Weekly Service Days',
      targetLabel: 'Weekly Service Schedule',
      details: `Updated weekly service list (${cleaned.length} service day(s) configured)`
    });
  };

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
    setIsEditingServices(false);
    if (activeTab === 'analytics' || activeTab === 'directory') setActiveTab('overview');
  };
  const [analyticsLocation, setAnalyticsLocation] = useState('');
  const [analyticsChartType, setAnalyticsChartType] = useState('trend');
  const [analyticsServiceFilter, setAnalyticsServiceFilter] = useState('');
  const [analyticsMetric, setAnalyticsMetric] = useState('total');
  const [selectedCohortMonth, setSelectedCohortMonth] = useState('');
  const [selectedTrendSeries, setSelectedTrendSeries] = useState(['total']);
  const [showAreaFill, setShowAreaFill] = useState(true);

  const toggleTrendSeries = (key) => {
    setSelectedTrendSeries(prev => {
      if (prev.includes(key)) return prev.length > 1 ? prev.filter(k => k !== key) : prev;
      return [...prev, key];
    });
  };

  const getMetricValue = (rec, metricKey) => {
    const c = getRecordCounts(rec);
    if (metricKey === 'adults') return c.adults;
    if (metricKey === 'adultMale') return c.adultMale;
    if (metricKey === 'adultFemale') return c.adultFemale;
    if (metricKey === 'youths') return c.youths;
    if (metricKey === 'youthBoys') return c.youthBoys;
    if (metricKey === 'youthGirls') return c.youthGirls;
    if (metricKey === 'children') return c.children;
    if (metricKey === 'childrenBoys') return c.childrenBoys;
    if (metricKey === 'childrenGirls') return c.childrenGirls;
    if (metricKey === 'visitors') return c.visitors;
    if (metricKey === 'visitorMale') return c.visitorMale;
    if (metricKey === 'visitorFemale') return c.visitorFemale;
    if (metricKey === 'maleTotal') return c.maleTotal;
    if (metricKey === 'femaleTotal') return c.femaleTotal;
    if (metricKey === 'offeringPln') return canViewOfferings ? (Number(rec.offeringPln) || 0) : 0;
    return c.total;
  };

  const filteredAttendance = useMemo(() => {
    const locQ = analyticsLocation.trim().toLowerCase();
    const svcQ = analyticsServiceFilter.trim().toLowerCase();
    return attendance.filter(a => {
      const locMatch = !locQ || (a.location || '').toLowerCase().includes(locQ);
      const svcMatch = !svcQ || (a.serviceType || '').toLowerCase().includes(svcQ);
      return locMatch && svcMatch;
    });
  }, [attendance, analyticsLocation, analyticsServiceFilter]);

  const chronologicalTrendData = useMemo(() => {
    const sorted = [...filteredAttendance].sort((a, b) => a.date.localeCompare(b.date));
    return sorted.map(rec => {
      const row = {
        id: rec.id,
        label: rec.location ? `${rec.date} (${rec.location})` : rec.date,
        shortDate: rec.date,
        serviceType: rec.serviceType,
        value: getMetricValue(rec, analyticsMetric)
      };
      TREND_SERIES_OPTIONS.forEach(opt => {
        row[opt.key] = getMetricValue(rec, opt.key);
      });
      return row;
    });
  }, [filteredAttendance, analyticsMetric, canViewOfferings]);
 const cohortMonths = useMemo(() => {
    const set = new Set(
      filteredAttendance.map(a => (a.date && a.date.length >= 7 ? a.date.slice(0, 7) : '')).filter(Boolean)
    );
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, [filteredAttendance]);

  const activeCohortMonth = useMemo(() => {
    if (selectedCohortMonth && cohortMonths.includes(selectedCohortMonth)) return selectedCohortMonth;
    return cohortMonths[0] || '';
  }, [selectedCohortMonth, cohortMonths]);

  const cohortMonthSessions = useMemo(() => {
    const base = activeCohortMonth
      ? filteredAttendance.filter(a => a.date && a.date.startsWith(activeCohortMonth))
      : filteredAttendance;
    return [...base].sort((a, b) => a.date.localeCompare(b.date)).map(rec => {
      const c = getRecordCounts(rec);
      return {
        id: rec.id, date: rec.date, location: rec.location || 'Unspecified',
        serviceType: rec.serviceType || 'Service', adults: c.adults, youths: c.youths,
        children: c.children, visitors: c.visitors, total: c.total
      };
    });
  }, [filteredAttendance, activeCohortMonth]);

  const cohortMonthSummary = useMemo(() => cohortMonthSessions.reduce(
    (acc, s) => ({
      adults: acc.adults + s.adults, youths: acc.youths + s.youths,
      children: acc.children + s.children, visitors: acc.visitors + s.visitors, total: acc.total + s.total
    }),
    { adults: 0, youths: 0, children: 0, visitors: 0, total: 0 }
  ), [cohortMonthSessions]);

  const serviceComparisonData = useMemo(() => {
    const locQ = analyticsLocation.trim().toLowerCase();
    const locFiltered = !locQ ? attendance : attendance.filter(a => (a.location || '').toLowerCase().includes(locQ));
    const uniqueTypes = Array.from(new Set(locFiltered.map(a => a.serviceType).filter(Boolean)));
    return uniqueTypes.map(type => {
      const recs = locFiltered.filter(a => a.serviceType === type);
      const totalSum = recs.reduce((s, r) => s + getMetricValue(r, analyticsMetric), 0);
      const avg = recs.length ? +(totalSum / recs.length).toFixed(1) : 0;
      return { type, avg, sessions: recs.length };
    });
  }, [attendance, analyticsLocation, analyticsMetric, canViewOfferings]);

  const locationBreakdownData = useMemo(() => {
    const svcQ = analyticsServiceFilter.trim().toLowerCase();
    const svcFiltered = !svcQ ? attendance : attendance.filter(a => (a.serviceType || '').toLowerCase().includes(svcQ));
    const uniqueLocs = Array.from(new Set(svcFiltered.map(a => a.location).filter(Boolean)));
    return uniqueLocs.map(loc => {
      const recs = svcFiltered.filter(a => a.location === loc);
      const sum = recs.reduce((s, r) => s + getMetricValue(r, analyticsMetric), 0);
      return { location: loc, sessions: recs.length, avg: recs.length ? +(sum / recs.length).toFixed(1) : 0, total: sum };
    });
  }, [attendance, analyticsServiceFilter, analyticsMetric, canViewOfferings]);

  const sundayAll = attendance.filter(a => (a.serviceType || '').toLowerCase().includes('sunday')).sort((a, b) => a.date.localeCompare(b.date));
  const latestSundayAvg = sundayAll.length
    ? +(sundayAll.reduce((s, r) => s + getRecordCounts(r).total, 0) / sundayAll.length).toFixed(1) : 0;
  const firstVal = chronologicalTrendData.length ? chronologicalTrendData[0].value : 0;
  const lastVal = chronologicalTrendData.length ? chronologicalTrendData[chronologicalTrendData.length - 1].value : 0;
  const overallGrowthPct = firstVal > 0 ? Math.round(((lastVal - firstVal) / firstVal) * 100) : 0;
  const avgSelectedMetric = filteredAttendance.length
    ? +(filteredAttendance.reduce((s, r) => s + getMetricValue(r, analyticsMetric), 0) / filteredAttendance.length).toFixed(1) : 0;
  const peakSelectedMetric = filteredAttendance.length
    ? Math.max(...filteredAttendance.map(r => getMetricValue(r, analyticsMetric))) : 0;
  const [ncViewMode, setNcViewMode] = useState('month');
  const [selectedMonth, setSelectedMonth] = useState('2026-11');
  const [selectedQuarter, setSelectedQuarter] = useState('2026-Q4');
  const [ncForm, setNcForm] = useState({ fullName: '', phone: '', location: '', visitDate: '2026-11-27', invitedBy: '', assignedFollowUp: 'Sister Esther', notes: '' });

  const getQuarterString = (dateStr) => {
    if (!dateStr) return '';
    const [y, m] = dateStr.split('-');
    return `${y}-Q${Math.ceil(parseInt(m, 10) / 3)}`;
  };

  const visibleNewcomers = useMemo(() => {
    if (ncViewMode === 'archived') return newcomers.filter(n => n.archived);
    return newcomers.filter(n => {
      if (n.archived) return false;
      if (ncViewMode === 'month') return n.visitDate.startsWith(selectedMonth);
      if (ncViewMode === 'quarter') return getQuarterString(n.visitDate) === selectedQuarter;
      return true;
    });
  }, [newcomers, ncViewMode, selectedMonth, selectedQuarter]);

  const handleAddNewcomer = (e) => {
    e.preventDefault();
    if (!canEnterNewcomers || !ncForm.fullName.trim()) return;
    const created = { id: 'nc-' + Date.now(), ...ncForm, location: ncForm.location.trim(), status: 'First-Timer', archived: false };
    setNewcomers([created, ...newcomers]);
    recordAuditChange({
      action: 'Created',
      moduleName: 'Newcomers',
      targetLabel: created.fullName,
      details: `Added newcomer (${created.visitDate}${created.location ? ` • ${created.location}` : ''}, Follow-up: ${created.assignedFollowUp || '—'})`
    });
    setNcForm({ fullName: '', phone: '', location: '', visitDate: '2026-11-27', invitedBy: '', assignedFollowUp: 'Sister Esther', notes: '' });
  };

  const toggleArchiveNewcomer = (id) => {
    if (!canEditModule('newcomers')) return;
    const target = newcomers.find(n => n.id === id);
    if (!target) return;
    const nextArchived = !target.archived;
    setNewcomers(newcomers.map(n => n.id === id ? { ...n, archived: nextArchived } : n));
    recordAuditChange({
      action: nextArchived ? 'Archived' : 'Restored',
      moduleName: 'Newcomers',
      targetLabel: target.fullName,
      details: `${nextArchived ? 'Archived' : 'Restored'} newcomer record (${target.visitDate})`
    });
  };

  const deleteNewcomer = (id) => {
    if (!canEditModule('newcomers')) return;
    const target = newcomers.find(n => n.id === id);
    setNewcomers(newcomers.filter(n => n.id !== id));
    if (target) {
      recordAuditChange({
        action: 'Deleted',
        moduleName: 'Newcomers',
        targetLabel: target.fullName,
        details: `Deleted newcomer record visited ${target.visitDate}`
      });
    }
  };
  const [directorySubTab, setDirectorySubTab] = useState('Worker');
  const [dirSearch, setDirSearch] = useState('');
  const [dirLocationFilter, setDirLocationFilter] = useState('');
  const [editingPersonId, setEditingPersonId] = useState(null);
  const [editPersonDraft, setEditPersonDraft] = useState(null);
  const [newPersonForm, setNewPersonForm] = useState({
    category: 'Worker', title: 'Bro', fullName: '', phone: '', address: '',
    emergencyName: '', emergencyPhone: '', location: '', accessRole: 'member', unitsText: ''
  });

  const filteredDirectory = useMemo(() => {
    const locQ = dirLocationFilter.trim().toLowerCase();
    return people.filter(p => {
      if (p.category !== directorySubTab) return false;
      if (locQ && !(p.location || '').toLowerCase().includes(locQ)) return false;
      if (dirSearch.trim()) {
        const q = dirSearch.toLowerCase();
        return p.fullName.toLowerCase().includes(q) || p.phone.toLowerCase().includes(q) ||
          (p.address && p.address.toLowerCase().includes(q)) || (p.emergencyName && p.emergencyName.toLowerCase().includes(q));
      }
      return true;
    });
  }, [people, directorySubTab, dirLocationFilter, dirSearch]);

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (!canEditModule('directory') || !newPersonForm.fullName.trim()) return;
    const units = newPersonForm.unitsText
      ? newPersonForm.unitsText.split(',').map(u => u.trim()).filter(Boolean)
      : [newPersonForm.category === 'Worker' ? 'General Service' : 'General Congregation'];
    const created = {
      id: 'p-' + Date.now(), category: newPersonForm.category, title: newPersonForm.title,
      fullName: newPersonForm.fullName.trim(), phone: newPersonForm.phone.trim(),
      address: newPersonForm.address.trim(), emergencyName: newPersonForm.emergencyName.trim(),
      emergencyPhone: newPersonForm.emergencyPhone.trim(), location: newPersonForm.location.trim(),
      accessRole: newPersonForm.category === 'Worker' ? newPersonForm.accessRole : 'member',
      units, joinDate: new Date().toISOString().slice(0, 10), status: 'Active'
    };
    setPeople([created, ...people]);
    setDirectorySubTab(created.category);
    recordAuditChange({
      action: 'Created',
      moduleName: 'Directory',
      targetLabel: `${created.fullName} (${created.category})`,
      details: `Added ${created.category.toLowerCase()} • Phone: ${created.phone || '—'} • Location: ${created.location || '—'}`
    });
    setNewPersonForm({ category: created.category, title: 'Bro', fullName: '', phone: '', address: '', emergencyName: '', emergencyPhone: '', location: '', accessRole: 'member', unitsText: '' });
  };

  const handleToggleCategory = (personId, newCat) => {
    if (!canEditModule('directory')) return;
    const prevPerson = people.find(p => p.id === personId);
    setPeople(people.map(p => p.id === personId ? { ...p, category: newCat, accessRole: newCat === 'Member' ? 'member' : p.accessRole } : p));
    if (prevPerson && prevPerson.category !== newCat) {
      recordAuditChange({
        action: 'Edited',
        moduleName: 'Directory',
        targetLabel: prevPerson.fullName,
        details: `Classification: "${prevPerson.category}" → "${newCat}"`
      });
    }
  };

  const saveEditedPerson = () => {
    if (!canEditModule('directory') || !editPersonDraft) return;
    const prevPerson = people.find(p => p.id === editPersonDraft.id);
    setPeople(people.map(p => p.id === editPersonDraft.id ? editPersonDraft : p));
    recordAuditChange({
      action: 'Edited',
      moduleName: 'Directory',
      targetLabel: editPersonDraft.fullName,
      details: summarizeFieldDiffs(prevPerson, editPersonDraft, {
        fullName: 'Name', phone: 'Phone', address: 'Address',
        emergencyName: 'Emergency Contact', emergencyPhone: 'Emergency Phone', location: 'Location'
      })
    });
    setEditingPersonId(null);
    setEditPersonDraft(null);
  };

  const handleDeletePerson = (person) => {
    if (!canEditModule('directory')) return;
    if (!window.confirm(`Remove ${person.fullName} from the ${person.category}s Directory?`)) return;
    setPeople(prev => prev.filter(p => p.id !== person.id));
    recordAuditChange({
      action: 'Deleted',
      moduleName: 'Directory',
      targetLabel: `${person.fullName} (${person.category})`,
      details: `Removed from ${person.category}s Directory (${person.phone || 'no phone'})`
    });
    if (editingPersonId === person.id) {
      setEditingPersonId(null);
      setEditPersonDraft(null);
    }
  };
  const availableYears = useMemo(() => Object.keys(plansByYear).sort(), [plansByYear]);
  const [selectedPlanYear, setSelectedPlanYear] = useState(() => {
    const saved = localStorage.getItem('dlbc_plans_v5') || localStorage.getItem('dlbc_plans_v4') || localStorage.getItem('dlbc_plans_v3');
    if (saved) {
      const keys = Object.keys(JSON.parse(saved)).sort();
      return keys.length ? keys[keys.length - 1] : '';
    }
    return '';
  });
  const [newYearInput, setNewYearInput] = useState('');
  const [selectedQuarterTab, setSelectedQuarterTab] = useState('Q1');
  const [customQuarterInput, setCustomQuarterInput] = useState('');
  const [newNoticeForm, setNewNoticeForm] = useState({ title: '', date: '', audience: '', priority: 'Normal', body: '' });
  const [editingNoticeId, setEditingNoticeId] = useState(null);
  const [editNoticeDraft, setEditNoticeDraft] = useState(null);
  const [newActivityForm, setNewActivityForm] = useState({ activity: '', date: '', target: '', description: '', executionStatus: 'not_executed' });
  const [editingActivityId, setEditingActivityId] = useState(null);
  const [editActivityDraft, setEditActivityDraft] = useState(null);

  const activePlanYear = useMemo(() => (selectedPlanYear && plansByYear[selectedPlanYear] ? selectedPlanYear : (availableYears[availableYears.length - 1] || '')), [selectedPlanYear, plansByYear, availableYears]);
  const currentYearData = useMemo(() => (!activePlanYear || !plansByYear[activePlanYear] ? null : normalizeYearPlan(plansByYear[activePlanYear])), [activePlanYear, plansByYear]);
  const yearQuarterKeys = useMemo(() => (!currentYearData ? DEFAULT_QUARTERS : Array.from(new Set([...DEFAULT_QUARTERS, ...Object.keys(currentYearData.quarters || {})]))), [currentYearData]);
  const activeQuarterKey = useMemo(() => (selectedQuarterTab && yearQuarterKeys.includes(selectedQuarterTab) ? selectedQuarterTab : (yearQuarterKeys[0] || 'Q1')), [selectedQuarterTab, yearQuarterKeys]);
  const activeQuarterData = useMemo(() => (!currentYearData ? { team: '', activities: [] } : (currentYearData.quarters[activeQuarterKey] || { team: '', activities: [] })), [currentYearData, activeQuarterKey]);

  const handleCreateYear = (e) => {
    e.preventDefault();
    if (!canEditModule('plansAndNotices')) return;
    const yr = newYearInput.trim();
    if (!yr) return;
    if (!plansByYear[yr]) setPlansByYear({ ...plansByYear, [yr]: createEmptyYearPlan() });
    setSelectedPlanYear(yr); setSelectedQuarterTab('Q1'); setEditingActivityId(null); setEditActivityDraft(null); setEditingNoticeId(null); setEditNoticeDraft(null); setNewYearInput('');
    recordAuditChange({ action: 'Created', moduleName: 'Strategic Plan', targetLabel: `Year ${yr}`, details: `Created ${yr} strategic plan & notice board` });
  };

  const handleDeleteYear = (yrToDelete) => {
    if (!canEditModule('plansAndNotices') || !yrToDelete || !plansByYear[yrToDelete]) return;
    if (!window.confirm(`Delete ${yrToDelete} completely, including its theme, notice board posts, and all quarter plans?`)) return;
    const updated = { ...plansByYear }; delete updated[yrToDelete]; setPlansByYear(updated);
    const remaining = Object.keys(updated).sort();
    setSelectedPlanYear(remaining.length > 0 ? remaining[remaining.length - 1] : ''); setEditingActivityId(null); setEditActivityDraft(null); setEditingNoticeId(null); setEditNoticeDraft(null);
    recordAuditChange({ action: 'Deleted', moduleName: 'Strategic Plan', targetLabel: `Year ${yrToDelete}`, details: `Deleted full ${yrToDelete} plan & notices` });
  };

  const handleUpdateYearField = (field, newVal) => {
    if (!canEditModule('plansAndNotices') || !activePlanYear || !currentYearData) return;
    const prevVal = currentYearData[field] || '';
    if (String(prevVal).trim() !== String(newVal).trim()) {
      recordAuditChange({ action: 'Edited', moduleName: 'Strategic Plan', targetLabel: `${activePlanYear} Theme (${field})`, details: `"${prevVal || '—'}" → "${newVal || '—'}"` });
    }
    setPlansByYear({ ...plansByYear, [activePlanYear]: { ...currentYearData, [field]: newVal } });
  };

  const handleAddQuarterTab = (e) => {
    e.preventDefault();
    if (!canEditModule('plansAndNotices')) return;
    const qLabel = customQuarterInput.trim();
    if (!qLabel || !activePlanYear || !currentYearData) return;
    setPlansByYear({ ...plansByYear, [activePlanYear]: { ...currentYearData, quarters: { ...currentYearData.quarters, [qLabel]: currentYearData.quarters[qLabel] || { team: '', activities: [] } } } });
    setSelectedQuarterTab(qLabel); setEditingActivityId(null); setEditActivityDraft(null); setCustomQuarterInput('');
    recordAuditChange({ action: 'Created', moduleName: 'Strategic Plan', targetLabel: `${activePlanYear} • ${qLabel}`, details: `Added quarter tab ${qLabel}` });
  };

  const handleAddNotice = (e) => {
    e.preventDefault();
    if (!canEditModule('plansAndNotices') || !activePlanYear || !currentYearData || !newNoticeForm.title.trim()) return;
    const createdNotice = { id: 'not-' + Date.now(), ...newNoticeForm, date: newNoticeForm.date || new Date().toISOString().slice(0, 10) };
    setPlansByYear({ ...plansByYear, [activePlanYear]: { ...currentYearData, noticeBoard: [createdNotice, ...currentYearData.noticeBoard] } });
    recordAuditChange({ action: 'Created', moduleName: 'Notice Board', targetLabel: createdNotice.title, details: `Priority: ${createdNotice.priority} • Date: ${createdNotice.date}` });
    setNewNoticeForm({ title: '', date: '', audience: '', priority: 'Normal', body: '' });
  };

  const handleStartEditNotice = (notice) => {
    if (!canEditModule('plansAndNotices')) return;
    setEditingNoticeId(notice.id); setEditNoticeDraft({ ...notice });
  };

  const handleSaveEditedNotice = () => {
    if (!canEditModule('plansAndNotices') || !editNoticeDraft || !activePlanYear || !currentYearData) return;
    const prevNotice = currentYearData.noticeBoard.find(n => n.id === editNoticeDraft.id);
    const updatedNotice = { ...editNoticeDraft, title: (editNoticeDraft.title || '').trim() || editNoticeDraft.title, audience: (editNoticeDraft.audience || '').trim() };
    setPlansByYear({ ...plansByYear, [activePlanYear]: { ...currentYearData, noticeBoard: currentYearData.noticeBoard.map(n => (n.id === editNoticeDraft.id ? updatedNotice : n)) } });
    recordAuditChange({ action: 'Edited', moduleName: 'Notice Board', targetLabel: updatedNotice.title, details: summarizeFieldDiffs(prevNotice, updatedNotice, { title: 'Title', date: 'Date', audience: 'Audience', priority: 'Priority', body: 'Details' }) });
    setEditingNoticeId(null); setEditNoticeDraft(null);
  };

  const handleDeleteNotice = (noticeId) => {
    if (!canEditModule('plansAndNotices') || !activePlanYear || !currentYearData) return;
    const targetNotice = currentYearData.noticeBoard.find(n => n.id === noticeId);
    setPlansByYear({ ...plansByYear, [activePlanYear]: { ...currentYearData, noticeBoard: currentYearData.noticeBoard.filter(n => n.id !== noticeId) } });
    if (targetNotice) {
      recordAuditChange({ action: 'Deleted', moduleName: 'Notice Board', targetLabel: targetNotice.title, details: `Deleted notice dated ${targetNotice.date}` });
    }
    if (editingNoticeId === noticeId) { setEditingNoticeId(null); setEditNoticeDraft(null); }
  };
  const handleUpdateQuarterTeam = (newTeam) => {
    if (!canEditModule('plansAndNotices') || !activePlanYear || !currentYearData) return;
    const existingQ = currentYearData.quarters[activeQuarterKey] || { team: '', activities: [] };
    if ((existingQ.team || '').trim() !== newTeam.trim()) {
      recordAuditChange({ action: 'Edited', moduleName: 'Strategic Plan', targetLabel: `${activePlanYear} • ${activeQuarterKey} Team`, details: `"${existingQ.team || '—'}" → "${newTeam || '—'}"` });
    }
    setPlansByYear({ ...plansByYear, [activePlanYear]: { ...currentYearData, quarters: { ...currentYearData.quarters, [activeQuarterKey]: { ...existingQ, team: newTeam } } } });
  };

  const handleAddQuarterActivity = (e) => {
    e.preventDefault();
    if (!canEditModule('plansAndNotices') || !activePlanYear || !currentYearData || !newActivityForm.activity.trim()) return;
    const existingQ = currentYearData.quarters[activeQuarterKey] || { team: '', activities: [] };
    const createdActivity = { id: 'act-' + Date.now(), activity: newActivityForm.activity.trim(), date: newActivityForm.date.trim(), target: newActivityForm.target.trim(), description: newActivityForm.description.trim(), executionStatus: newActivityForm.executionStatus };
    setPlansByYear({ ...plansByYear, [activePlanYear]: { ...currentYearData, quarters: { ...currentYearData.quarters, [activeQuarterKey]: { ...existingQ, activities: [...existingQ.activities, createdActivity] } } } });
    recordAuditChange({ action: 'Created', moduleName: 'Strategic Plan', targetLabel: `${activePlanYear} • ${activeQuarterKey}: ${createdActivity.activity}`, details: `Date: ${createdActivity.date || '—'} | Target: ${createdActivity.target || '—'}` });
    setNewActivityForm({ activity: '', date: '', target: '', description: '', executionStatus: 'not_executed' });
  };

  // FA can execute/toggle status ("Executed" / "Not Executed") even when editing is locked
  const handleSetActivityStatus = (activityId, statusValue) => {
    if (!canExecutePlanStatus || !activePlanYear || !currentYearData) return;
    const existingQ = currentYearData.quarters[activeQuarterKey] || { team: '', activities: [] };
    const targetAct = existingQ.activities.find(item => item.id === activityId);
    setPlansByYear({ ...plansByYear, [activePlanYear]: { ...currentYearData, quarters: { ...currentYearData.quarters, [activeQuarterKey]: { ...existingQ, activities: existingQ.activities.map(item => item.id === activityId ? { ...item, executionStatus: statusValue } : item) } } } });
    if (targetAct && targetAct.executionStatus !== statusValue) {
      recordAuditChange({
        action: statusValue === 'executed' ? 'Marked Executed' : 'Marked Not Executed',
        moduleName: 'Strategic Plan',
        targetLabel: `${activePlanYear} • ${activeQuarterKey}: ${targetAct.activity}`,
        details: `Execution status: "${targetAct.executionStatus}" → "${statusValue}"`
      });
    }
  };

  const handleStartEditActivity = (item) => {
    if (!canEditModule('plansAndNotices')) return;
    setEditingActivityId(item.id); setEditActivityDraft({ ...item });
  };

  const handleSaveEditedActivity = () => {
    if (!canEditModule('plansAndNotices') || !editActivityDraft || !activePlanYear || !currentYearData) return;
    const existingQ = currentYearData.quarters[activeQuarterKey] || { team: '', activities: [] };
    const prevAct = existingQ.activities.find(item => item.id === editActivityDraft.id);
    const updatedItem = { ...editActivityDraft, activity: editActivityDraft.activity.trim() || editActivityDraft.activity, date: editActivityDraft.date.trim(), target: editActivityDraft.target.trim() };
    setPlansByYear({ ...plansByYear, [activePlanYear]: { ...currentYearData, quarters: { ...currentYearData.quarters, [activeQuarterKey]: { ...existingQ, activities: existingQ.activities.map(item => item.id === editActivityDraft.id ? updatedItem : item) } } } });
    recordAuditChange({ action: 'Edited', moduleName: 'Strategic Plan', targetLabel: `${activePlanYear} • ${activeQuarterKey}: ${updatedItem.activity}`, details: summarizeFieldDiffs(prevAct, updatedItem, { activity: 'Activity', date: 'Date', target: 'Target', description: 'Description' }) });
    setEditingActivityId(null); setEditActivityDraft(null);
  };

  const handleDeleteQuarterActivity = (activityId) => {
    if (!canEditModule('plansAndNotices') || !activePlanYear || !currentYearData) return;
    const existingQ = currentYearData.quarters[activeQuarterKey] || { team: '', activities: [] };
    const targetAct = existingQ.activities.find(item => item.id === activityId);
    setPlansByYear({ ...plansByYear, [activePlanYear]: { ...currentYearData, quarters: { ...currentYearData.quarters, [activeQuarterKey]: { ...existingQ, activities: existingQ.activities.filter(item => item.id !== activityId) } } } });
    if (targetAct) {
      recordAuditChange({ action: 'Deleted', moduleName: 'Strategic Plan', targetLabel: `${activePlanYear} • ${activeQuarterKey}: ${targetAct.activity}`, details: 'Removed activity from quarter plan' });
    }
    if (editingActivityId === activityId) { setEditingActivityId(null); setEditActivityDraft(null); }
  };
  const [attForm, setAttForm] = useState({
    date: new Date().toISOString().slice(0, 10), location: '', serviceType: '',
    adultMale: '', adultFemale: '', youthBoys: '', youthGirls: '',
    childrenBoys: '', childrenGirls: '', visitorMale: '', visitorFemale: '',
    offeringPln: '', recordedBy: localStorage.getItem('dlbc_viewer_name') || ''
  });
  const [attBrowseMode, setAttBrowseMode] = useState('date');
  const [selectedAttDate, setSelectedAttDate] = useState('');
  const [selectedAttMonth, setSelectedAttMonth] = useState('');
  const [editingAttId, setEditingAttId] = useState(null);
  const [editAttDraft, setEditAttDraft] = useState(null);

  const availableAttDates = useMemo(() => Array.from(new Set(attendance.map(a => a.date).filter(Boolean))).sort((a, b) => b.localeCompare(a)), [attendance]);
  const availableAttMonths = useMemo(() => Array.from(new Set(attendance.map(a => (a.date && a.date.length >= 7 ? a.date.slice(0, 7) : '')).filter(Boolean))).sort((a, b) => b.localeCompare(a)), [attendance]);
  const activeAttDate = useMemo(() => (selectedAttDate && availableAttDates.includes(selectedAttDate) ? selectedAttDate : (availableAttDates[0] || '')), [selectedAttDate, availableAttDates]);
  const activeAttMonth = useMemo(() => (selectedAttMonth && availableAttMonths.includes(selectedAttMonth) ? selectedAttMonth : (availableAttMonths[0] || '')), [selectedAttMonth, availableAttMonths]);
  const dayRecords = useMemo(() => (!activeAttDate ? [] : attendance.filter(a => a.date === activeAttDate)), [attendance, activeAttDate]);
  const monthRecords = useMemo(() => (!activeAttMonth ? [] : attendance.filter(a => a.date && a.date.startsWith(activeAttMonth)).sort((a, b) => b.date.localeCompare(a.date))), [attendance, activeAttMonth]);

  const monthRollupByGroup = useMemo(() => {
    const map = new Map();
    monthRecords.forEach(rec => {
      const key = `${rec.location || 'Unspecified'} — ${rec.serviceType || 'Service'}`;
      const c = getRecordCounts(rec);
      if (!map.has(key)) map.set(key, { key, location: rec.location || 'Unspecified', serviceType: rec.serviceType || 'Service', sessions: 0, adults: 0, youths: 0, children: 0, visitors: 0, total: 0, offeringPln: 0 });
      const row = map.get(key);
      row.sessions += 1; row.adults += c.adults; row.youths += c.youths; row.children += c.children; row.visitors += c.visitors; row.total += c.total; row.offeringPln += Number(rec.offeringPln) || 0;
    });
    return Array.from(map.values());
  }, [monthRecords]);

  const handleAddAttendance = (e) => {
    e.preventDefault();
    if (!canEnterAttendance) return;
    const recorder = attForm.recordedBy.trim() || viewerName.trim() || 'Authorized Worker';
    const adultMale = Number(attForm.adultMale) || 0; const adultFemale = Number(attForm.adultFemale) || 0;
    const youthBoys = Number(attForm.youthBoys) || 0; const youthGirls = Number(attForm.youthGirls) || 0;
    const childrenBoys = Number(attForm.childrenBoys) || 0; const childrenGirls = Number(attForm.childrenGirls) || 0;
    const visitorMale = Number(attForm.visitorMale) || 0; const visitorFemale = Number(attForm.visitorFemale) || 0;
    const totalCount = adultMale + adultFemale + youthBoys + youthGirls + childrenBoys + childrenGirls + visitorMale + visitorFemale;
    const entry = {
      id: 'att-' + Date.now(), date: attForm.date, location: attForm.location.trim(), serviceType: attForm.serviceType.trim(), period: getQuarterString(attForm.date),
      adultMale, adultFemale, youthBoys, youthGirls, childrenBoys, childrenGirls, visitorMale, visitorFemale,
      adults: adultMale + adultFemale, youths: youthBoys + youthGirls, children: childrenBoys + childrenGirls, visitors: visitorMale + visitorFemale,
      offeringPln: canViewOfferings ? (Number(attForm.offeringPln) || 0) : 0, recordedBy: recorder
    };
    setAttendance([entry, ...attendance]);
    recordAuditChange({ action: 'Created', moduleName: 'Attendance', targetLabel: `${entry.date} • ${entry.serviceType}`, details: `Location: ${entry.location || '—'} | Total: ${totalCount}${canViewOfferings && entry.offeringPln ? ` | Offering: ${entry.offeringPln} PLN` : ''}` });
    setSelectedAttDate(attForm.date);
    if (attForm.date && attForm.date.length >= 7) { setSelectedAttMonth(attForm.date.slice(0, 7)); setSelectedCohortMonth(attForm.date.slice(0, 7)); }
    setAttForm({ ...attForm, adultMale: '', adultFemale: '', youthBoys: '', youthGirls: '', childrenBoys: '', childrenGirls: '', visitorMale: '', visitorFemale: '', offeringPln: '', recordedBy: recorder });
  };

  const handleStartEditAttendance = (rec) => {
    if (!canEditModule('attendance')) return;
    setEditingAttId(rec.id);
    setEditAttDraft({
      id: rec.id, date: rec.date || '', location: rec.location || '', serviceType: rec.serviceType || '',
      adultMale: rec.adultMale ?? '', adultFemale: rec.adultFemale ?? '',
      youthBoys: rec.youthBoys ?? '', youthGirls: rec.youthGirls ?? '',
      childrenBoys: rec.childrenBoys ?? '', childrenGirls: rec.childrenGirls ?? '',
      visitorMale: rec.visitorMale ?? '', visitorFemale: rec.visitorFemale ?? '',
      offeringPln: rec.offeringPln ?? '', recordedBy: rec.recordedBy || ''
    });
  };

  const handleSaveEditedAttendance = () => {
    if (!canEditModule('attendance') || !editAttDraft) return;
    const prevRec = attendance.find(item => item.id === editAttDraft.id);
    const adultMale = Number(editAttDraft.adultMale) || 0; const adultFemale = Number(editAttDraft.adultFemale) || 0;
    const youthBoys = Number(editAttDraft.youthBoys) || 0; const youthGirls = Number(editAttDraft.youthGirls) || 0;
    const childrenBoys = Number(editAttDraft.childrenBoys) || 0; const childrenGirls = Number(editAttDraft.childrenGirls) || 0;
    const visitorMale = Number(editAttDraft.visitorMale) || 0; const visitorFemale = Number(editAttDraft.visitorFemale) || 0;
    const updatedRec = {
      ...prevRec, date: editAttDraft.date || prevRec.date, period: getQuarterString(editAttDraft.date || prevRec.date),
      location: (editAttDraft.location || '').trim(), serviceType: (editAttDraft.serviceType || '').trim(),
      adultMale, adultFemale, youthBoys, youthGirls, childrenBoys, childrenGirls, visitorMale, visitorFemale,
      adults: adultMale + adultFemale, youths: youthBoys + youthGirls, children: childrenBoys + childrenGirls, visitors: visitorMale + visitorFemale,
      offeringPln: canViewOfferings ? (Number(editAttDraft.offeringPln) || 0) : (prevRec.offeringPln || 0),
      recordedBy: (editAttDraft.recordedBy || '').trim() || prevRec.recordedBy
    };
    setAttendance(prev => prev.map(item => (item.id === editAttDraft.id ? updatedRec : item)));
    recordAuditChange({
      action: 'Edited',
      moduleName: 'Attendance',
      targetLabel: `${updatedRec.date} • ${updatedRec.serviceType}`,
      details: summarizeFieldDiffs(prevRec, updatedRec, {
        date: 'Date', location: 'Location', serviceType: 'Service',
        adultMale: 'Adult M', adultFemale: 'Adult F', youthBoys: 'Youth B', youthGirls: 'Youth G',
        childrenBoys: 'Child B', childrenGirls: 'Child G', visitorMale: 'Visitor M', visitorFemale: 'Visitor F',
        offeringPln: 'Offering PLN'
      })
    });
    setEditingAttId(null); setEditAttDraft(null);
  };

  const handleDeleteAttendance = (id) => {
    if (!canEditModule('attendance')) return;
    const target = attendance.find(a => a.id === id);
    setAttendance(attendance.filter(a => a.id !== id));
    if (target) {
      recordAuditChange({ action: 'Deleted', moduleName: 'Attendance', targetLabel: `${target.date} • ${target.serviceType}`, details: `Deleted attendance record (${target.location || '—'}, Total: ${getRecordCounts(target).total})` });
    }
    if (editingAttId === id) { setEditingAttId(null); setEditAttDraft(null); }
  };
  const [rosterLocationFilter, setRosterLocationFilter] = useState('');
  const [rosterServiceFilter, setRosterServiceFilter] = useState('');
  const [selectedRosterProgram, setSelectedRosterProgram] = useState('');
  const [selectedRosterMonth, setSelectedRosterMonth] = useState('');
  const [selectedRosterWeek, setSelectedRosterWeek] = useState('ALL');
  const [showRosterBuilder, setShowRosterBuilder] = useState(false);
  const [editingRosterId, setEditingRosterId] = useState(null);
  const [rosterDraft, setRosterDraft] = useState({ date: new Date().toISOString().slice(0, 10), location: '', serviceType: '', assignments: [] });

  const openNewRosterBuilder = () => {
    if (!canEditModule('rosters')) return;
    setEditingRosterId(null);
    setRosterDraft({ date: new Date().toISOString().slice(0, 10), location: rosterLocationFilter || '', serviceType: rosterServiceFilter || '', assignments: [{ time: '09:30', slot: 'Opening Prayer & Moderation', worker: '' }, { time: '10:00', slot: 'Main Ministration / Message', worker: '' }] });
    setShowRosterBuilder(true);
  };

  const openEditRosterBuilder = (roster) => {
    if (!canEditModule('rosters')) return;
    setEditingRosterId(roster.id);
    setRosterDraft({ date: roster.date, location: roster.location, serviceType: roster.serviceType, assignments: roster.assignments.map(a => ({ ...a })) });
    setShowRosterBuilder(true);
  };

  const handleDraftSlotChange = (index, field, value) => setRosterDraft(prev => ({ ...prev, assignments: prev.assignments.map((item, idx) => (idx === index ? { ...item, [field]: value } : item)) }));
  const handleAddDraftSlot = () => setRosterDraft(prev => ({ ...prev, assignments: [...prev.assignments, { time: '', slot: '', worker: '' }] }));
  const handleRemoveDraftSlot = (index) => setRosterDraft(prev => ({ ...prev, assignments: prev.assignments.filter((_, idx) => idx !== index) }));

  const handleSaveRoster = (e) => {
    e.preventDefault();
    if (!canEditModule('rosters')) return;
    const finalServiceTitle = rosterDraft.serviceType.trim() || 'Church Service';
    const finalLocation = rosterDraft.location.trim() || 'General';
    const cleanAssignments = rosterDraft.assignments.filter(a => a.slot.trim() || a.worker.trim()).map(a => ({ time: a.time.trim() || '—', slot: a.slot.trim() || 'Duty Assignment', worker: a.worker.trim() || 'Unassigned' }));
    if (editingRosterId) {
      setRosters(rosters.map(r => r.id === editingRosterId ? { ...r, date: rosterDraft.date, location: finalLocation, serviceType: finalServiceTitle, assignments: cleanAssignments } : r));
      recordAuditChange({ action: 'Edited', moduleName: 'Rosters', targetLabel: `${finalServiceTitle} (${rosterDraft.date})`, details: `Updated roster slots (${cleanAssignments.length} slot(s), Location: ${finalLocation})` });
    } else {
      setRosters([{ id: 'r-' + Date.now(), date: rosterDraft.date, location: finalLocation, serviceType: finalServiceTitle, assignments: cleanAssignments }, ...rosters]);
      recordAuditChange({ action: 'Created', moduleName: 'Rosters', targetLabel: `${finalServiceTitle} (${rosterDraft.date})`, details: `Created roster (${cleanAssignments.length} slot(s), Location: ${finalLocation})` });
    }
    setSelectedRosterProgram(finalServiceTitle);
    if (rosterDraft.date && rosterDraft.date.length >= 7) setSelectedRosterMonth(rosterDraft.date.slice(0, 7));
    setSelectedRosterWeek(String(getWeekNumberInMonth(rosterDraft.date)));
    setShowRosterBuilder(false); setEditingRosterId(null);
  };

  const handleDeleteRoster = (id) => {
    if (!canEditModule('rosters')) return;
    const target = rosters.find(r => r.id === id);
    setRosters(rosters.filter(r => r.id !== id));
    if (target) {
      recordAuditChange({ action: 'Deleted', moduleName: 'Rosters', targetLabel: `${target.serviceType} (${target.date})`, details: `Deleted roster (${target.location || '—'})` });
    }
  };

  const locationFilteredRosters = useMemo(() => {
    const locQ = rosterLocationFilter.trim().toLowerCase();
    const svcQ = rosterServiceFilter.trim().toLowerCase();
    return rosters
      .filter(r => (!locQ || (r.location || '').toLowerCase().includes(locQ)) && (!svcQ || (r.serviceType || '').toLowerCase().includes(svcQ)))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [rosters, rosterLocationFilter, rosterServiceFilter]);

  const rosterPrograms = useMemo(() => {
    const map = new Map();
    locationFilteredRosters.forEach(r => {
      const prog = (r.serviceType || 'Church Service').trim();
      map.set(prog, (map.get(prog) || 0) + 1);
    });
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [locationFilteredRosters]);

  const activeRosterProgram = useMemo(() => {
    if (selectedRosterProgram && rosterPrograms.some(p => p.name === selectedRosterProgram)) return selectedRosterProgram;
    return rosterPrograms[0]?.name || '';
  }, [selectedRosterProgram, rosterPrograms]);

  const programRosters = useMemo(() => {
    if (!activeRosterProgram) return [];
    return locationFilteredRosters.filter(r => (r.serviceType || 'Church Service').trim() === activeRosterProgram);
  }, [locationFilteredRosters, activeRosterProgram]);

  const rosterMonthsForProgram = useMemo(() => {
    const map = new Map();
    programRosters.forEach(r => {
      const mo = r.date && r.date.length >= 7 ? r.date.slice(0, 7) : 'Undated';
      map.set(mo, (map.get(mo) || 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0])).map(([month, count]) => ({ month, count }));
  }, [programRosters]);

  const activeRosterMonth = useMemo(() => {
    if (selectedRosterMonth && rosterMonthsForProgram.some(m => m.month === selectedRosterMonth)) return selectedRosterMonth;
    return rosterMonthsForProgram[0]?.month || '';
  }, [selectedRosterMonth, rosterMonthsForProgram]);

  const monthRostersForProgram = useMemo(() => {
    if (!activeRosterMonth) return programRosters;
    return programRosters.filter(r => (r.date && r.date.length >= 7 ? r.date.slice(0, 7) : 'Undated') === activeRosterMonth);
  }, [programRosters, activeRosterMonth]);

  const rosterWeeksForMonth = useMemo(() => {
    const map = new Map();
    monthRostersForProgram.forEach(r => {
      const wk = getWeekNumberInMonth(r.date);
      map.set(wk, (map.get(wk) || 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]).map(([week, count]) => ({ week, count }));
  }, [monthRostersForProgram]);

  const filteredRosters = useMemo(() => {
    if (selectedRosterWeek === 'ALL') return monthRostersForProgram;
    const wkNum = Number(selectedRosterWeek);
    return monthRostersForProgram.filter(r => getWeekNumberInMonth(r.date) === wkNum);
  }, [monthRostersForProgram, selectedRosterWeek]);

  const exportDirectoryCsv = () => {
    const headers = ['Category', 'Title', 'Full Name', 'Phone', 'Home Address', 'Emergency Contact', 'Emergency Phone', 'Location', 'Units', 'Access Role'];
    const rows = people.map(p => [p.category, p.title, p.fullName, p.phone, `"${p.address || ''}"`, `"${p.emergencyName || ''}"`, p.emergencyPhone || '', `"${p.location || ''}"`, `"${p.units.join('; ')}"`, p.accessRole]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `DLBC_Poland_Directory_${new Date().toISOString().slice(0, 10)}.csv`; a.click();
  };

  const navTabs = [
    { id: 'overview', label: 'Overview & Notice Board', icon: Bell, visible: true },
    { id: 'rosters', label: 'Ministering Rosters', icon: Calendar, visible: true },
    { id: 'plans', label: activePlanYear ? `${activePlanYear} Strategic Plan` : 'Strategic Plan', icon: BookOpen, visible: true },
    { id: 'attendance', label: 'Attendance & Services', icon: ClipboardList, visible: canEnterAttendance },
    { id: 'newcomers', label: 'Newcomers & Follow-Up', icon: UserPlus, visible: canEnterNewcomers },
    { id: 'analytics', label: 'Growth & Service Analytics', icon: BarChart3, visible: hasOversightView },
    { id: 'directory', label: 'Workers, Access & Audit', icon: Users, visible: hasOversightView }
  ].filter(t => t.visible);

  const workersCount = people.filter(p => p.category === 'Worker').length;
  const membersCount = people.filter(p => p.category === 'Member').length;
  const archivedNewcomersCount = newcomers.filter(n => n.archived).length;
  const quarterActivities = activeQuarterData.activities || [];
  const executedCount = quarterActivities.filter(a => a.executionStatus === 'executed').length;
  const notExecutedCount = quarterActivities.filter(a => a.executionStatus === 'not_executed').length;
  return (
    <div className="min-h-screen bg-[#f4f6fa] text-[#0f1f3d] font-sans text-base">
      <datalist id="dlbc-locations-list">
        {knownLocations.map(loc => <option key={loc} value={loc} />)}
      </datalist>
      <datalist id="dlbc-service-types-list">
        {knownServiceTypes.map(svc => <option key={svc} value={svc} />)}
      </datalist>

      <header className="bg-[#0d2247] text-white border-b-2 border-[#d49b1a] sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#eab308] via-[#d49b1a] to-[#b47b08] text-[#0d2247] flex items-center justify-center font-extrabold text-xl shadow ring-2 ring-[#facc15]/40">
              DL
            </div>
            <div>
              <h1 className="font-bold text-xl sm:text-2xl tracking-tight text-white">DLBC Poland Operations Portal</h1>
              <p className="text-sm text-[#b8c7e0]">Deeper Life Bible Church Poland — National & Location Administration</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2 bg-[#163466] border border-[#2a4d87] px-3 py-1.5 rounded-lg">
              <span className="text-sm text-[#c7d6ee]">Your Name:</span>
              <input
                type="text"
                value={viewerName}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Type your name..."
                className="bg-[#091833] text-white text-sm font-medium px-2.5 py-1 rounded border border-[#2e5494] focus:outline-none focus:border-[#eab308] w-40 sm:w-48"
              />
            </div>

            {accessLevel === 'public_member' ? (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-[#163466] text-[#dbe6f7] border border-[#2a4d87]">
                  <Eye className="w-4 h-4 text-[#eab308]" />
                  Public View
                </span>
                <button
                  onClick={() => setShowUnlockModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-bold bg-[#eab308] hover:bg-[#facc15] text-[#0d2247] transition shadow-sm"
                >
                  <Lock className="w-4 h-4" />
                  Special Entry
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/40">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  {isHeadPastor && 'Head Pastor (Full Admin)'}
                  {isFullAccessRole && (faPolicy.canEdit ? 'Full Access (Edit Enabled)' : 'Full Access (View + Execute)')}
                  {accessLevel === 'usher_entry' && 'Usher / Data Entry'}
                </span>
                <button
                  onClick={handleLockToPublic}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-[#163466] hover:bg-[#1e427d] text-[#dbe6f7] border border-[#2a4d87] transition"
                >
                  <Unlock className="w-4 h-4" />
                  Exit Admin
                </button>
              </div>
            )}
          </div>
        </div>

        <nav className="bg-[#091833] border-t border-[#1c396b] overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-1">
            {navTabs.map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition ${
                    active ? 'border-[#eab308] text-[#fde047] bg-[#0d2247]' : 'border-transparent text-[#9eb2d4] hover:text-white hover:bg-[#0d2247]/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>
      </header>
   {showUnlockModal && (
        <div className="fixed inset-0 bg-[#071329]/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#d9e1ef]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-[#fef6df] text-[#9a6b06] border border-[#f2d488] flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0d2247] text-lg">Special Leadership & Worker Entry</h3>
                  <p className="text-sm text-slate-500">Unlocks restricted analytics, personal data & entry forms</p>
                </div>
              </div>
              <button onClick={() => setShowUnlockModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleUnlockSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0d2247] mb-1">Your Display Name</label>
                <input type="text" value={viewerName} onChange={(e) => handleNameChange(e.target.value)} placeholder="Type your name..." className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#0d2247]" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0d2247] mb-1">Special Entry Passcode</label>
                <input type="password" value={passcodeInput} onChange={(e) => setPasscodeInput(e.target.value)} placeholder="Enter access passcode..." className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#0d2247]" required />
                {passcodeError && <p className="text-sm text-red-600 mt-1">{passcodeError}</p>}
              </div>
              <div className="bg-[#f8fafd] border border-[#dfe6f2] rounded-lg p-3.5 text-sm text-slate-600 space-y-1.5">
                <p className="font-semibold text-[#0d2247]">Access Tiers:</p>
                <p>• <strong>Head Pastor (HP):</strong> Full control, FA permission toggles & change audit log.</p>
                <p>• <strong>Full Access (FA):</strong> Full visibility + "Executed" toggle; edits when HP enables it.</p>
                <p>• <strong>Usher / Data Entry:</strong> Attendance logging & newcomer follow-up.</p>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowUnlockModal(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold bg-[#0d2247] hover:bg-[#163466] text-white rounded-lg">Unlock Access</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="bg-white border border-[#dce3f0] border-l-4 border-l-[#0d2247] rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            {currentYearData && currentYearData.theme ? (
              <p className="text-sm font-bold uppercase tracking-wider text-[#9a6b06]">
                {activePlanYear} • {currentYearData.theme}
                {currentYearData.bibleReference ? ` (${currentYearData.bibleReference})` : ''}
              </p>
            ) : (
              <p className="text-sm font-bold uppercase tracking-wider text-[#9a6b06]">
                Deeper Life Bible Church • National & Location Operations
              </p>
            )}
            <h2 className="text-2xl font-bold text-[#0d2247] mt-0.5">
              Welcome{viewerName.trim() ? `, ${viewerName.trim()}` : ' to DLBC Poland'}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {accessLevel === 'public_member'
                ? 'You are viewing the public portal (Notice Board, Ministering Rosters & Strategic Plan). Click "Special Entry" in the top bar for leadership or worker access.'
                : isFullAccessRole && !faPolicy.canEdit
                ? 'Full Access mode: You can view all sections and mark activities Executed/Not Executed. Editing is currently view-only unless enabled by Head Pastor.'
                : `Signed in with ${roleLabel}.`}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="bg-[#f8fafd] border border-[#dce3f0] rounded-xl px-4 py-2.5 text-center">
              <div className="text-sm text-slate-500">Sunday Avg</div>
              <div className="text-xl font-extrabold text-emerald-700">{latestSundayAvg}</div>
            </div>
            {hasOversightView && (
              <div className="bg-[#fef9ea] border border-[#f2d488] rounded-xl px-4 py-2.5 text-center">
                <div className="text-sm text-[#8a5d05]">Workers / Members</div>
                <div className="text-xl font-extrabold text-[#0d2247]">{workersCount} / {membersCount}</div>
              </div>
            )}
          </div>
        </div>
     {/* TAB 1: OVERVIEW & NOTICE BOARD */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white border border-[#dce3f0] rounded-2xl p-5 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-[#b47b08]" />
                    <h3 className="font-bold text-[#0d2247] text-lg">Church Notice Board {activePlanYear ? `(${activePlanYear})` : ''}</h3>
                  </div>
                  {availableYears.length > 0 && (
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-slate-500 font-medium">Year:</label>
                      <select value={activePlanYear} onChange={(e) => setSelectedPlanYear(e.target.value)} className="text-sm font-semibold bg-[#f4f6fa] border border-slate-300 rounded-lg px-3 py-1.5">
                        {availableYears.map(yr => <option key={yr} value={yr}>{yr}</option>)}
                      </select>
                    </div>
                  )}
                </div>

                {!currentYearData ? (
                  <div className="py-8 text-center border border-dashed border-[#cdd7e8] rounded-xl bg-[#f8fafd] space-y-3">
                    <p className="text-sm font-semibold text-[#0d2247]">No year has been created yet for the Notice Board & Strategic Plan.</p>
                    {canEditModule('plansAndNotices') ? (
                      <form onSubmit={handleCreateYear} className="inline-flex items-center gap-2">
                        <input type="text" placeholder="Type year..." value={newYearInput} onChange={(e) => setNewYearInput(e.target.value)} className="w-40 px-3 py-1.5 text-sm border border-slate-300 rounded-lg bg-white" required />
                        <button type="submit" className="px-3.5 py-1.5 bg-[#0d2247] hover:bg-[#163466] text-[#fde047] text-sm font-bold rounded-lg">+ Create Year</button>
                      </form>
                    ) : (
                      <p className="text-sm text-slate-500">Leadership has not published an active year yet.</p>
                    )}
                  </div>
                ) : (
                  <>
                    {canEditModule('plansAndNotices') && (
                      <form onSubmit={handleAddNotice} className="bg-[#f8fafd] border border-[#dce3f0] rounded-xl p-4 mb-5 space-y-3">
                        <div className="text-sm font-bold text-[#0d2247]">Post New Announcement to {activePlanYear} Notice Board</div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          <input type="text" placeholder="Announcement title..." value={newNoticeForm.title} onChange={(e) => setNewNoticeForm({ ...newNoticeForm, title: e.target.value })} className="sm:col-span-2 px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white" required />
                          <input type="date" value={newNoticeForm.date} onChange={(e) => setNewNoticeForm({ ...newNoticeForm, date: e.target.value })} className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <input type="text" placeholder="Audience (type freely)..." value={newNoticeForm.audience} onChange={(e) => setNewNoticeForm({ ...newNoticeForm, audience: e.target.value })} className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white" />
                          <select value={newNoticeForm.priority} onChange={(e) => setNewNoticeForm({ ...newNoticeForm, priority: e.target.value })} className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white">
                            <option value="Normal">Normal Notice</option>
                            <option value="Urgent">Urgent / Priority</option>
                          </select>
                        </div>
                        <textarea rows={2} placeholder="Announcement details..." value={newNoticeForm.body} onChange={(e) => setNewNoticeForm({ ...newNoticeForm, body: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white" required />
                        <button type="submit" className="px-4 py-2 bg-[#0d2247] hover:bg-[#163466] text-white text-sm font-semibold rounded-lg">Publish Notice</button>
                      </form>
                    )}

                    {currentYearData.noticeBoard.length === 0 ? (
                      <p className="text-sm text-slate-500 py-6 text-center">No announcements posted for {activePlanYear} yet.</p>
                    ) : (
                      <div className="space-y-3">
                        {currentYearData.noticeBoard.map(notice => {
                          const isEditingNotice = canEditModule('plansAndNotices') && editingNoticeId === notice.id && editNoticeDraft;
                          if (isEditingNotice) {
                            return (
                              <div key={notice.id} className="border-2 border-[#eab308] bg-[#fef9ea] rounded-xl p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#8a5d05]">Editing Announcement</span>
                                  <button type="button" onClick={() => { setEditingNoticeId(null); setEditNoticeDraft(null); }} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                  <input type="text" value={editNoticeDraft.title} onChange={(e) => setEditNoticeDraft({ ...editNoticeDraft, title: e.target.value })} className="sm:col-span-2 px-3 py-2 text-sm font-bold border border-slate-300 rounded-lg bg-white" required />
                                  <input type="date" value={editNoticeDraft.date} onChange={(e) => setEditNoticeDraft({ ...editNoticeDraft, date: e.target.value })} className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                  <input type="text" placeholder="Audience..." value={editNoticeDraft.audience} onChange={(e) => setEditNoticeDraft({ ...editNoticeDraft, audience: e.target.value })} className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white" />
                                  <select value={editNoticeDraft.priority} onChange={(e) => setEditNoticeDraft({ ...editNoticeDraft, priority: e.target.value })} className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white">
                                    <option value="Normal">Normal Notice</option>
                                    <option value="Urgent">Urgent / Priority</option>
                                  </select>
                                </div>
                                <textarea rows={2} value={editNoticeDraft.body} onChange={(e) => setEditNoticeDraft({ ...editNoticeDraft, body: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white" />
                                <div className="flex justify-end gap-2">
                                  <button type="button" onClick={() => { setEditingNoticeId(null); setEditNoticeDraft(null); }} className="px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-200/60 rounded-lg">Cancel</button>
                                  <button type="button" onClick={handleSaveEditedNotice} className="inline-flex items-center gap-1 px-4 py-1.5 bg-[#0d2247] hover:bg-[#163466] text-[#fde047] text-sm font-bold rounded-lg"><Check className="w-4 h-4" />Save Notice</button>
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div key={notice.id} className="border border-[#dce3f0] rounded-xl p-4 hover:border-[#b9c7df] transition bg-white">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase ${notice.priority === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-[#e8effa] text-[#0d2247]'}`}>{notice.priority}</span>
                                    <span className="text-sm text-slate-500">{notice.date}{notice.audience ? ` • ${notice.audience}` : ''}</span>
                                  </div>
                                  <h4 className="font-bold text-[#0d2247] text-base mt-1">{notice.title}</h4>
                                </div>
                                {canEditModule('plansAndNotices') && (
                                  <div className="flex items-center gap-1">
                                    <button type="button" onClick={() => handleStartEditNotice(notice)} className="text-slate-400 hover:text-[#0d2247] p-1" title="Edit notice"><Edit3 className="w-4 h-4" /></button>
                                    <button type="button" onClick={() => handleDeleteNotice(notice.id)} className="text-slate-400 hover:text-red-600 p-1" title="Delete notice"><Trash2 className="w-4 h-4" /></button>
                                  </div>
                                )}
                              </div>
                              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{notice.body}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
<div className="space-y-4">
              <div className="bg-white border border-[#dce3f0] rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-[#0d2247] text-base flex items-center gap-2"><MapPin className="w-4 h-4 text-[#b47b08]" />Weekly Service Days</h3>
                  {canEditModule('plansAndNotices') && !isEditingServices && (
                    <button onClick={startEditingServices} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#f4f6fa] hover:bg-[#e6ecf6] text-[#0d2247] border border-[#cbd5e6] transition">
                      <Edit3 className="w-3.5 h-3.5" />Edit Days
                    </button>
                  )}
                </div>

                {canEditModule('plansAndNotices') && isEditingServices ? (
                  <form onSubmit={handleSaveServices} className="space-y-3">
                    {servicesDraft.map((svc, idx) => (
                      <div key={svc.id} className="p-3 rounded-xl bg-[#fef9ea] border border-[#f2d488] space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#8a5d05]">Service #{idx + 1}</span>
                          <button type="button" onClick={() => handleRemoveServiceDraft(svc.id)} className="text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                        </div>
                        <input type="text" placeholder="Service name..." value={svc.name} onChange={(e) => handleServiceDraftChange(svc.id, 'name', e.target.value)} className="w-full px-3 py-2 text-sm font-bold border border-slate-300 rounded-lg bg-white" required />
                        <input type="text" placeholder="Day, time & venue..." value={svc.schedule} onChange={(e) => handleServiceDraftChange(svc.id, 'schedule', e.target.value)} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white" required />
                      </div>
                    ))}
                    <button type="button" onClick={handleAddServiceDraft} className="w-full py-2 border border-dashed border-slate-300 hover:border-slate-400 rounded-xl text-sm font-semibold text-slate-700 flex items-center justify-center gap-1">
                      <Plus className="w-4 h-4" />Add Another Service Day
                    </button>
                    <div className="flex justify-end gap-2 pt-1">
                      <button type="button" onClick={() => setIsEditingServices(false)} className="px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                      <button type="submit" className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-[#0d2247] hover:bg-[#163466] text-[#fde047] text-sm font-bold rounded-lg"><Check className="w-4 h-4" />Save Changes</button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-2.5 text-sm">
                    {weeklyServices.length === 0 ? (
                      <p className="text-slate-500 py-3 text-center">No weekly service days listed.</p>
                    ) : (
                      weeklyServices.map(svc => (
                        <div key={svc.id} className="p-3 rounded-xl bg-[#f8fafd] border border-[#dce3f0]">
                          <div className="font-bold text-[#0d2247]">{svc.name}</div>
                          <div className="text-slate-600 mt-0.5">{svc.schedule}</div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              <div className="bg-white border border-[#dce3f0] rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-[#0d2247] text-base">Next Ministering Roster</h3>
                  <button onClick={() => setActiveTab('rosters')} className="text-sm font-semibold text-[#9a6b06] hover:underline">View All</button>
                </div>
                {rosters[0] ? (
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-slate-700">{rosters[0].date}{rosters[0].location ? ` • ${rosters[0].location}` : ''} ({rosters[0].serviceType})</div>
                    {rosters[0].assignments.map((a, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm py-1.5 border-b border-slate-100 last:border-0">
                        <span className="text-slate-500">{a.slot}</span>
                        <span className="font-semibold text-[#0d2247]">{a.worker}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">No rosters published yet.</p>
                )}
              </div>
            </div>
          </div>
        )}
   {/* TAB 2: CLUSTERED MINISTERING ROSTERS (PROGRAM -> MONTH -> WEEK) */}
        {activeTab === 'rosters' && (
          <div className="space-y-5">
            <div className="bg-white border border-[#dce3f0] rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h3 className="font-bold text-[#0d2247] text-lg">Ministering & Duty Rosters (By Program, Month & Week)</h3>
                  <p className="text-sm text-slate-500">Click a program cluster (e.g., Sunday Worship Service), pick a month, and open a specific week</p>
                </div>
                {canEditModule('rosters') && (
                  <button onClick={openNewRosterBuilder} className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0d2247] hover:bg-[#163466] text-[#fde047] text-sm font-bold rounded-xl shadow-xs transition">
                    <Plus className="w-4 h-4" />Create New Roster
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Search Program Name</label>
                  <input type="text" list="dlbc-service-types-list" autoComplete="off" placeholder="Type program name..." value={rosterServiceFilter} onChange={(e) => setRosterServiceFilter(e.target.value)} className="w-full px-3 py-2 text-sm font-semibold border border-slate-300 rounded-xl bg-[#f8fafd]" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Filter by Location</label>
                  <input type="text" list="dlbc-locations-list" autoComplete="off" placeholder="Type location..." value={rosterLocationFilter} onChange={(e) => setRosterLocationFilter(e.target.value)} className="w-full px-3 py-2 text-sm font-semibold border border-slate-300 rounded-xl bg-[#f8fafd]" />
                </div>
                <div className="flex items-end">
                  <div className="text-sm text-slate-500 bg-[#f8fafd] border border-[#dce3f0] rounded-xl px-3.5 py-2 w-full">
                    Showing <strong className="text-[#0d2247]">{filteredRosters.length}</strong> in selected view ({locationFilteredRosters.length} total)
                  </div>
                </div>
              </div>
            </div>

            {canEditModule('rosters') && showRosterBuilder && (
              <div className="bg-white border-2 border-[#eab308] rounded-2xl p-5 shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h4 className="font-bold text-[#0d2247] text-base">{editingRosterId ? 'Edit Ministering Roster' : 'Build Service / Program Roster'}</h4>
                    <p className="text-sm text-slate-500">Type the Service / Program name, Date, and Location, then customize duty slots</p>
                  </div>
                  <button onClick={() => setShowRosterBuilder(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                </div>

                <form onSubmit={handleSaveRoster} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-[#0d2247] mb-1">Service / Program Name</label>
                      <input type="text" list="dlbc-service-types-list" autoComplete="off" placeholder="Type service or program name..." value={rosterDraft.serviceType} onChange={(e) => setRosterDraft({ ...rosterDraft, serviceType: e.target.value })} className="w-full px-3 py-2 text-sm font-bold border border-slate-300 rounded-lg bg-[#fef9ea]" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0d2247] mb-1">Date</label>
                      <input type="date" value={rosterDraft.date} onChange={(e) => setRosterDraft({ ...rosterDraft, date: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0d2247] mb-1">Location</label>
                      <input type="text" list="dlbc-locations-list" autoComplete="off" placeholder="Type location..." value={rosterDraft.location} onChange={(e) => setRosterDraft({ ...rosterDraft, location: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" required />
                    </div>
                  </div>

                  <div className="space-y-2 bg-[#f8fafd] border border-[#dce3f0] rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-[#0d2247]">Program Line-Up & Assigned Ministers / Workers</span>
                      <button type="button" onClick={handleAddDraftSlot} className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-semibold text-[#0d2247]">
                        <Plus className="w-3.5 h-3.5" />Add Program Slot
                      </button>
                    </div>
                    <datalist id="dlbc-workers-list">
                      {people.filter(p => p.category === 'Worker').map(w => <option key={w.id} value={w.fullName} />)}
                    </datalist>
                    {rosterDraft.assignments.map((row, idx) => (
                      <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                        <input type="text" placeholder="Time..." value={row.time} onChange={(e) => handleDraftSlotChange(idx, 'time', e.target.value)} className="col-span-3 sm:col-span-2 px-2.5 py-2 text-sm font-mono border border-slate-300 rounded-lg bg-white" />
                        <input type="text" placeholder="Duty / Ministration Slot..." value={row.slot} onChange={(e) => handleDraftSlotChange(idx, 'slot', e.target.value)} className="col-span-9 sm:col-span-5 px-2.5 py-2 text-sm border border-slate-300 rounded-lg bg-white" />
                        <input type="text" list="dlbc-workers-list" placeholder="Assign Minister / Worker..." value={row.worker} onChange={(e) => handleDraftSlotChange(idx, 'worker', e.target.value)} className="col-span-10 sm:col-span-4 px-2.5 py-2 text-sm font-semibold border border-slate-300 rounded-lg bg-white" />
                        <button type="button" onClick={() => handleRemoveDraftSlot(idx)} className="col-span-2 sm:col-span-1 flex justify-center text-slate-400 hover:text-red-600 py-1.5"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setShowRosterBuilder(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                    <button type="submit" className="px-5 py-2 bg-[#0d2247] hover:bg-[#163466] text-[#fde047] text-sm font-bold rounded-lg">{editingRosterId ? 'Save Updated Roster' : 'Publish Roster'}</button>
                  </div>
                </form>
              </div>
            )}

            {locationFilteredRosters.length === 0 ? (
              <div className="bg-white border border-dashed border-[#cdd7e8] rounded-2xl p-10 text-center">
                <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h4 className="font-bold text-[#0d2247] text-base">No rosters match this service or location filter</h4>
                <p className="text-sm text-slate-500 mt-1">Clear the filters above or create a new roster.</p>
              </div>
            ) : (
              <div className="bg-white border border-[#dce3f0] rounded-2xl p-5 shadow-xs space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500">1. Click a Program / Service Cluster</div>
                  <div className="flex flex-wrap items-center gap-2">
                    {rosterPrograms.map(prog => {
                      const active = prog.name === activeRosterProgram;
                      return (
                        <button
                          key={prog.name}
                          type="button"
                          onClick={() => { setSelectedRosterProgram(prog.name); setSelectedRosterMonth(''); setSelectedRosterWeek('ALL'); }}
                          className={`px-4 py-2 rounded-xl text-sm font-bold border transition flex items-center gap-2 ${active ? 'bg-[#0d2247] text-[#fde047] border-[#0d2247] shadow-xs' : 'bg-[#f8fafd] hover:bg-[#eef3fa] text-[#0d2247] border-[#dce3f0]'}`}
                        >
                          <span>{prog.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-md ${active ? 'bg-[#1a386e] text-[#fde047]' : 'bg-white text-slate-600 border border-[#dce3f0]'}`}>{prog.count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500">2. Click a Month for {activeRosterProgram}</div>
                  <div className="flex flex-wrap items-center gap-2">
                    {rosterMonthsForProgram.map(m => {
                      const active = m.month === activeRosterMonth;
                      return (
                        <button
                          key={m.month}
                          type="button"
                          onClick={() => { setSelectedRosterMonth(m.month); setSelectedRosterWeek('ALL'); }}
                          className={`px-3.5 py-1.5 rounded-xl text-sm font-bold border transition flex items-center gap-1.5 ${active ? 'bg-[#9a6b06] text-white border-[#9a6b06]' : 'bg-[#fef9ea] hover:bg-[#fef0c7] text-[#8a5d05] border-[#f2d488]'}`}
                        >
                          <span>{m.month}</span>
                          <span className="text-xs opacity-85">({m.count})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500">3. Drill Down by Week ({activeRosterMonth})</div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedRosterWeek('ALL')}
                      className={`px-3.5 py-1.5 rounded-xl text-sm font-bold border transition ${selectedRosterWeek === 'ALL' ? 'bg-[#0d2247] text-white border-[#0d2247]' : 'bg-[#f4f6fa] text-[#0d2247] border-[#dce3f0]'}`}
                    >
                      All Weeks ({monthRostersForProgram.length})
                    </button>
                    {rosterWeeksForMonth.map(w => {
                      const active = selectedRosterWeek === String(w.week);
                      return (
                        <button
                          key={w.week}
                          type="button"
                          onClick={() => setSelectedRosterWeek(String(w.week))}
                          className={`px-3.5 py-1.5 rounded-xl text-sm font-bold border transition ${active ? 'bg-[#0d2247] text-[#fde047] border-[#0d2247]' : 'bg-[#f8fafd] hover:bg-[#eef3fa] text-[#0d2247] border-[#dce3f0]'}`}
                        >
                          Week {w.week} <span className="text-xs opacity-75">({w.count})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                  {filteredRosters.map(r => (
                    <div key={r.id} className="border border-[#dce3f0] rounded-2xl p-4 bg-[#f9fbfe] shadow-2xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-1.5">
                              {r.location && <span className="px-2.5 py-0.5 rounded bg-[#fef6df] text-[#8a5d05] border border-[#f2d488] text-xs font-bold">{r.location}</span>}
                              <span className="px-2.5 py-0.5 rounded bg-[#eef2f9] text-[#0d2247] text-xs font-semibold">{r.date} • Week {getWeekNumberInMonth(r.date)}</span>
                            </div>
                            <h4 className="font-bold text-[#0d2247] text-base mt-1.5">{r.serviceType}</h4>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => {
                                const txt = `*DLBC Poland Roster (${r.date}${r.location ? ` - ${r.location}` : ''})*\n*${r.serviceType}*\n` + r.assignments.map(a => `• ${a.time} ${a.slot}: *${a.worker}*`).join('\n');
                                navigator.clipboard?.writeText(txt);
                                alert('Roster copied for WhatsApp!');
                              }}
                              className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg"
                            >
                              Copy WhatsApp
                            </button>
                            {canEditModule('rosters') && (
                              <>
                                <button onClick={() => openEditRosterBuilder(r)} className="p-1.5 bg-white hover:bg-[#e6ecf6] text-[#0d2247] border border-[#cbd5e6] rounded-lg"><Edit3 className="w-4 h-4" /></button>
                                <button onClick={() => handleDeleteRoster(r.id)} className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="divide-y divide-slate-100 bg-white rounded-xl border border-[#dce3f0] px-3.5">
                          {r.assignments.map((a, i) => (
                            <div key={i} className="py-2 flex items-center justify-between text-sm">
                              <div><span className="font-mono text-slate-400 mr-2">{a.time}</span><span className="text-slate-700">{a.slot}</span></div>
                              <span className="font-bold text-[#0d2247]">{a.worker}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {/* TAB 3: CLICK-TO-VIEW QUARTER STRATEGIC PLAN */}
        {activeTab === 'plans' && (
          <div className="bg-white border border-[#dce3f0] rounded-2xl p-5 shadow-xs space-y-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#e3e9f3] pb-4">
              <div>
                <h3 className="font-bold text-[#0d2247] text-lg">Annual Strategic Plan & Vision Tracker</h3>
                <p className="text-sm text-slate-500">Click a quarter tab to view activities, dates, targets, descriptions, and execution status</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {availableYears.map(yr => (
                  <button key={yr} onClick={() => { setSelectedPlanYear(yr); setEditingActivityId(null); setEditActivityDraft(null); }} className={`px-3.5 py-1.5 rounded-lg text-sm font-bold transition ${activePlanYear === yr ? 'bg-[#0d2247] text-[#fde047] shadow-xs' : 'bg-[#f4f6fa] text-[#0d2247] hover:bg-[#e6ecf6] border border-[#dce3f0]'}`}>{yr}</button>
                ))}
                {canEditModule('plansAndNotices') && (
                  <form onSubmit={handleCreateYear} className="flex items-center gap-1.5 ml-1">
                    <input type="text" placeholder="Type year..." value={newYearInput} onChange={(e) => setNewYearInput(e.target.value)} className="w-32 px-2.5 py-1.5 text-sm border border-slate-300 rounded-lg" required />
                    <button type="submit" className="px-3 py-1.5 bg-[#eab308] hover:bg-[#facc15] text-[#0d2247] text-sm font-bold rounded-lg">+ Year</button>
                  </form>
                )}
              </div>
            </div>

            {!currentYearData ? (
              <div className="py-12 text-center border border-dashed border-[#cdd7e8] rounded-2xl bg-[#f8fafd] space-y-3">
                <BookOpen className="w-8 h-8 text-[#0d2247]/50 mx-auto" />
                <h4 className="font-bold text-[#0d2247] text-base">No Strategic Plan Year Created Yet</h4>
                <p className="text-sm text-slate-500 max-w-md mx-auto">{canEditModule('plansAndNotices') ? 'Type a year above and click "+ Year" to begin planning.' : 'No annual strategic plan has been published yet.'}</p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="bg-gradient-to-br from-[#fef9ea] to-[#fffdf7] border border-[#ebc978] rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#8a5d05]">{activePlanYear} Theme, Scripture & Vision Note</span>
                    {canEditModule('plansAndNotices') && (
                      <button type="button" onClick={() => handleDeleteYear(activePlanYear)} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition">
                        <Trash2 className="w-3.5 h-3.5" />Delete {activePlanYear}
                      </button>
                    )}
                  </div>
                  {canEditModule('plansAndNotices') ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                        <div className="md:col-span-8">
                          <label className="block text-xs font-bold text-[#0d2247] mb-1">Theme Title</label>
                          <input type="text" value={currentYearData.theme} onChange={(e) => handleUpdateYearField('theme', e.target.value)} placeholder={`Type ${activePlanYear} theme...`} className="w-full bg-white border border-[#dfc078] rounded-xl px-3.5 py-2 text-base font-bold text-[#0d2247]" />
                        </div>
                        <div className="md:col-span-4">
                          <label className="block text-xs font-bold text-[#0d2247] mb-1">Bible Reference</label>
                          <input type="text" value={currentYearData.bibleReference} onChange={(e) => handleUpdateYearField('bibleReference', e.target.value)} placeholder="e.g., Romans 8:29..." className="w-full bg-white border border-[#dfc078] rounded-xl px-3.5 py-2 text-sm font-semibold text-[#0d2247]" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#0d2247] mb-1">Theme Description / Summary</label>
                        <textarea rows={2} value={currentYearData.themeDescription} onChange={(e) => handleUpdateYearField('themeDescription', e.target.value)} placeholder="Add a brief description or spiritual emphasis..." className="w-full bg-white border border-[#dfc078] rounded-xl px-3.5 py-2 text-sm text-slate-700" />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-lg font-extrabold text-[#0d2247]">{currentYearData.theme || '—'}</span>
                        {currentYearData.bibleReference && <span className="px-2.5 py-0.5 rounded-full bg-[#0d2247] text-[#fde047] text-xs font-bold">{currentYearData.bibleReference}</span>}
                      </div>
                      {currentYearData.themeDescription && <p className="text-sm text-slate-700 leading-relaxed">{currentYearData.themeDescription}</p>}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#e3e9f3] pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {yearQuarterKeys.map(qKey => {
                      const qObj = currentYearData.quarters[qKey] || { team: '', activities: [] };
                      const isSelected = qKey === activeQuarterKey;
                      const doneCount = (qObj.activities || []).filter(a => a.executionStatus === 'executed').length;
                      const totalCount = (qObj.activities || []).length;
                      return (
                        <button key={qKey} type="button" onClick={() => { setSelectedQuarterTab(qKey); setEditingActivityId(null); setEditActivityDraft(null); }} className={`px-4 py-2 rounded-xl text-sm font-extrabold transition flex items-center gap-2 border ${isSelected ? 'bg-[#0d2247] text-[#fde047] border-[#0d2247] shadow-xs' : 'bg-[#f8fafd] hover:bg-[#eef3fa] text-[#0d2247] border-[#dce3f0]'}`}>
                          <span>{qKey}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded-md ${isSelected ? 'bg-[#1a386e] text-[#fde047]' : 'bg-white text-slate-600 border border-[#dce3f0]'}`}>{doneCount}/{totalCount}</span>
                        </button>
                      );
                    })}
                  </div>
                  {canEditModule('plansAndNotices') && (
                    <form onSubmit={handleAddQuarterTab} className="flex items-center gap-1.5">
                      <input type="text" placeholder="Custom quarter tab..." value={customQuarterInput} onChange={(e) => setCustomQuarterInput(e.target.value)} className="w-36 px-2.5 py-1.5 text-sm border border-slate-300 rounded-lg bg-[#f8fafd]" />
                      <button type="submit" className="px-3 py-1.5 bg-[#f4f6fa] hover:bg-[#e6ecf6] text-[#0d2247] border border-[#cbd5e6] text-sm font-bold rounded-lg">+ Quarter</button>
                    </form>
                  )}
                </div>

                <div className="border border-[#dce3f0] rounded-2xl p-5 bg-[#f9fbfe] space-y-5">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-white border border-[#dce3f0] rounded-2xl p-4">
                    <div className="lg:col-span-8 space-y-1.5">
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0d2247]">{activeQuarterKey} Driving Team (Multiple Names / Leads)</label>
                      {canEditModule('plansAndNotices') ? (
                        <textarea rows={3} value={activeQuarterData.team || ''} onChange={(e) => handleUpdateQuarterTeam(e.target.value)} placeholder={`Type team members or lead driving ${activeQuarterKey}...`} className="w-full px-3.5 py-2 text-sm font-semibold text-[#0d2247] border border-[#cbd5e6] rounded-xl bg-[#fcfdfe] leading-relaxed" />
                      ) : (
                        <div className="p-3 rounded-xl bg-[#f8fafd] border border-[#e3e9f3] text-sm font-semibold text-[#0d2247] whitespace-pre-line min-h-[72px]">{activeQuarterData.team || 'Unassigned'}</div>
                      )}
                    </div>
                    <div className="lg:col-span-4 flex flex-col justify-between bg-[#f8fafd] border border-[#e3e9f3] rounded-xl p-3.5 space-y-2.5">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">{activeQuarterKey} Execution Overview</div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-white border border-[#dce3f0] rounded-lg p-2"><div className="text-xs text-slate-500">Activities</div><div className="text-lg font-extrabold text-[#0d2247]">{quarterActivities.length}</div></div>
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2"><div className="text-xs text-emerald-700">Executed</div><div className="text-lg font-extrabold text-emerald-800">{executedCount}</div></div>
                        <div className="bg-rose-50 border border-rose-200 rounded-lg p-2"><div className="text-xs text-rose-700">Not Exec.</div><div className="text-lg font-extrabold text-rose-800">{notExecutedCount}</div></div>
                      </div>
                    </div>
                  </div>
                  {canEditModule('plansAndNotices') && (
                    <form onSubmit={handleAddQuarterActivity} className="bg-white border border-[#dce3f0] rounded-2xl p-4 space-y-3">
                      <div className="text-sm font-bold text-[#0d2247]">Add New Activity to {activeQuarterKey}</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
                        <div className="lg:col-span-5">
                          <label className="block text-xs font-semibold text-[#0d2247] mb-1">Activity</label>
                          <input type="text" value={newActivityForm.activity} onChange={(e) => setNewActivityForm({ ...newActivityForm, activity: e.target.value })} placeholder={`Type ${activeQuarterKey} activity...`} className="w-full px-3 py-2 text-sm font-medium border border-slate-300 rounded-lg" required />
                        </div>
                        <div className="lg:col-span-3">
                          <label className="block text-xs font-semibold text-[#0d2247] mb-1">Date</label>
                          <input type="text" value={newActivityForm.date} onChange={(e) => setNewActivityForm({ ...newActivityForm, date: e.target.value })} placeholder="Type date or date range..." className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                        </div>
                        <div className="lg:col-span-2">
                          <label className="block text-xs font-semibold text-[#0d2247] mb-1">Target</label>
                          <input type="text" value={newActivityForm.target} onChange={(e) => setNewActivityForm({ ...newActivityForm, target: e.target.value })} placeholder="Type target..." className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                        </div>
                        <div className="lg:col-span-2">
                          <button type="submit" className="w-full px-4 py-2 bg-[#0d2247] hover:bg-[#163466] text-[#fde047] text-sm font-bold rounded-lg transition">+ Add</button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#0d2247] mb-1">Activity Description / Notes (up to ~3 lines)</label>
                        <textarea rows={3} value={newActivityForm.description} onChange={(e) => setNewActivityForm({ ...newActivityForm, description: e.target.value })} placeholder="Add extra context, scope, venue, or instructions..." className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-[#fcfdfe] leading-relaxed" />
                      </div>
                    </form>
                  )}

                  <div className="bg-white border border-[#dce3f0] rounded-2xl overflow-hidden">
                    <div className="px-4 py-3 bg-[#0d2247] text-white flex flex-wrap items-center justify-between gap-2 text-sm">
                      <span className="font-bold">{activePlanYear} • {activeQuarterKey} Activities{activeQuarterData.team ? ` — ${activeQuarterData.team.replace(/\n+/g, ', ')}` : ''}</span>
                      <span className="text-[#fde047] font-semibold">{quarterActivities.length} item(s)</span>
                    </div>

                    {quarterActivities.length === 0 ? (
                      <div className="py-10 text-center text-sm text-slate-500">No activities added for {activeQuarterKey} in {activePlanYear} yet.</div>
                    ) : (
                      <div className="divide-y divide-[#e6ecf6]">
                        {quarterActivities.map((item, idx) => {
                          const isExec = item.executionStatus === 'executed';
                          const isNotExec = item.executionStatus === 'not_executed';
                          const isEditingThis = canEditModule('plansAndNotices') && editingActivityId === item.id && editActivityDraft;
                          return (
                            <div key={item.id} className="p-4 hover:bg-[#f8fafd] transition">
                              {isEditingThis ? (
                                <div className="bg-[#fef9ea] border border-[#f2d488] rounded-xl p-4 space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#8a5d05]">Editing Activity #{idx + 1} ({activeQuarterKey})</span>
                                    <button type="button" onClick={() => { setEditingActivityId(null); setEditActivityDraft(null); }} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                                    <div className="sm:col-span-6"><input type="text" value={editActivityDraft.activity} onChange={(e) => setEditActivityDraft({ ...editActivityDraft, activity: e.target.value })} className="w-full px-3 py-2 text-sm font-bold border border-slate-300 rounded-lg bg-white" /></div>
                                    <div className="sm:col-span-3"><input type="text" value={editActivityDraft.date} onChange={(e) => setEditActivityDraft({ ...editActivityDraft, date: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white" /></div>
                                    <div className="sm:col-span-3"><input type="text" value={editActivityDraft.target} onChange={(e) => setEditActivityDraft({ ...editActivityDraft, target: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white" /></div>
                                  </div>
                                  <textarea rows={3} value={editActivityDraft.description} onChange={(e) => setEditActivityDraft({ ...editActivityDraft, description: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white leading-relaxed" />
                                  <div className="flex justify-end gap-2">
                                    <button type="button" onClick={() => { setEditingActivityId(null); setEditActivityDraft(null); }} className="px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                                    <button type="button" onClick={handleSaveEditedActivity} className="inline-flex items-center gap-1 px-4 py-1.5 bg-[#0d2247] hover:bg-[#163466] text-[#fde047] text-sm font-bold rounded-lg"><Check className="w-4 h-4" />Save Activity</button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                  <div className="space-y-1.5 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="px-2 py-0.5 rounded bg-[#eef2f9] text-[#0d2247] text-xs font-extrabold">#{idx + 1}</span>
                                      <h4 className="text-base font-bold text-[#0d2247] break-words">{item.activity}</h4>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
                                      <span><strong className="text-[#0d2247]">Date:</strong> {item.date || '—'}</span>
                                      <span><strong className="text-[#0d2247]">Target:</strong> {item.target || '—'}</span>
                                    </div>
                                    <div className="mt-1.5 p-2.5 rounded-xl bg-[#f8fafd] border border-[#e6ecf6] text-sm text-slate-700 leading-relaxed line-clamp-3 min-h-[60px]">
                                      {item.description ? item.description : <span className="text-slate-400 italic">No extra description added.</span>}
                                    </div>
                                  </div>

                                  <div className="flex flex-wrap sm:flex-nowrap lg:flex-col items-start sm:items-center lg:items-end justify-between gap-2 shrink-0">
                                    <div className="inline-flex items-center gap-2">
                                      <button type="button" disabled={!canExecutePlanStatus} onClick={() => handleSetActivityStatus(item.id, 'executed')} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition ${isExec ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-300 hover:bg-emerald-50'}`}>
                                        <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${isExec ? 'bg-white text-emerald-700 border-white' : 'border-slate-400'}`}>{isExec && <Check className="w-2.5 h-2.5 stroke-[3]" />}</span>Executed
                                      </button>
                                      <button type="button" disabled={!canExecutePlanStatus} onClick={() => handleSetActivityStatus(item.id, 'not_executed')} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition ${isNotExec ? 'bg-rose-600 text-white border-rose-600' : 'bg-white text-slate-600 border-slate-300 hover:bg-rose-50'}`}>
                                        <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${isNotExec ? 'bg-white text-rose-700 border-white' : 'border-slate-400'}`}>{isNotExec && <Check className="w-2.5 h-2.5 stroke-[3]" />}</span>Not Executed
                                      </button>
                                    </div>
                                    {canEditModule('plansAndNotices') && (
                                      <div className="inline-flex items-center gap-1.5">
                                        <button type="button" onClick={() => handleStartEditActivity(item)} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#f4f6fa] hover:bg-[#e6ecf6] text-[#0d2247] border border-[#cbd5e6]"><Edit3 className="w-3.5 h-3.5" />Edit</button>
                                        <button type="button" onClick={() => handleDeleteQuarterActivity(item.id)} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-700 border border-red-200"><Trash2 className="w-3.5 h-3.5" />Delete</button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
  {/* TAB 4: ATTENDANCE ENTRY & EXPLORER */}
        {activeTab === 'attendance' && canEnterAttendance && (
          <div className="space-y-6">
            <div className="bg-white border border-[#dce3f0] rounded-2xl p-5 shadow-xs">
              <h3 className="font-bold text-[#0d2247] text-lg mb-1">Log Service Attendance</h3>
              <p className="text-sm text-slate-500 mb-4">Enter Location and Service Type manually, and log Adults (M/F), Youth (B/G), Children (B/G), and Visitors (M/F)</p>

              <form onSubmit={handleAddAttendance} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-[#0d2247] mb-1">Service Date</label>
                    <input type="date" value={attForm.date} onChange={(e) => setAttForm({ ...attForm, date: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0d2247] mb-1">Location (Type Yourself)</label>
                    <input type="text" list="dlbc-locations-list" autoComplete="off" placeholder="Type location..." value={attForm.location} onChange={(e) => setAttForm({ ...attForm, location: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0d2247] mb-1">Service Type (Type Yourself)</label>
                    <input type="text" list="dlbc-service-types-list" autoComplete="off" placeholder="Type service type..." value={attForm.serviceType} onChange={(e) => setAttForm({ ...attForm, serviceType: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0d2247] mb-1">Recorded By (Name)</label>
                    <input type="text" placeholder="Type your name..." value={attForm.recordedBy} onChange={(e) => setAttForm({ ...attForm, recordedBy: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#f8fafd] border border-[#dce3f0] space-y-2">
                    <div className="flex items-center justify-between"><span className="text-sm font-bold text-[#0d2247]">Adults</span><span className="text-xs font-semibold text-slate-500">Subtotal: {(Number(attForm.adultMale) || 0) + (Number(attForm.adultFemale) || 0)}</span></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div><label className="block text-xs font-semibold text-slate-600 mb-1">Male</label><input type="number" min="0" placeholder="0" value={attForm.adultMale} onChange={(e) => setAttForm({ ...attForm, adultMale: e.target.value })} className="w-full px-2.5 py-2 text-sm border border-slate-300 rounded-lg bg-white" /></div>
                      <div><label className="block text-xs font-semibold text-slate-600 mb-1">Female</label><input type="number" min="0" placeholder="0" value={attForm.adultFemale} onChange={(e) => setAttForm({ ...attForm, adultFemale: e.target.value })} className="w-full px-2.5 py-2 text-sm border border-slate-300 rounded-lg bg-white" /></div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2">
                    <div className="flex items-center justify-between"><span className="text-sm font-bold text-emerald-950">Youth</span><span className="text-xs font-semibold text-emerald-700">Subtotal: {(Number(attForm.youthBoys) || 0) + (Number(attForm.youthGirls) || 0)}</span></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div><label className="block text-xs font-semibold text-slate-600 mb-1">Boys</label><input type="number" min="0" placeholder="0" value={attForm.youthBoys} onChange={(e) => setAttForm({ ...attForm, youthBoys: e.target.value })} className="w-full px-2.5 py-2 text-sm border border-slate-300 rounded-lg bg-white" /></div>
                      <div><label className="block text-xs font-semibold text-slate-600 mb-1">Girls</label><input type="number" min="0" placeholder="0" value={attForm.youthGirls} onChange={(e) => setAttForm({ ...attForm, youthGirls: e.target.value })} className="w-full px-2.5 py-2 text-sm border border-slate-300 rounded-lg bg-white" /></div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200 space-y-2">
                    <div className="flex items-center justify-between"><span className="text-sm font-bold text-blue-950">Children</span><span className="text-xs font-semibold text-blue-700">Subtotal: {(Number(attForm.childrenBoys) || 0) + (Number(attForm.childrenGirls) || 0)}</span></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div><label className="block text-xs font-semibold text-slate-600 mb-1">Boys</label><input type="number" min="0" placeholder="0" value={attForm.childrenBoys} onChange={(e) => setAttForm({ ...attForm, childrenBoys: e.target.value })} className="w-full px-2.5 py-2 text-sm border border-slate-300 rounded-lg bg-white" /></div>
                      <div><label className="block text-xs font-semibold text-slate-600 mb-1">Girls</label><input type="number" min="0" placeholder="0" value={attForm.childrenGirls} onChange={(e) => setAttForm({ ...attForm, childrenGirls: e.target.value })} className="w-full px-2.5 py-2 text-sm border border-slate-300 rounded-lg bg-white" /></div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-200 space-y-2">
                    <div className="flex items-center justify-between"><span className="text-sm font-bold text-purple-950">Visitors</span><span className="text-xs font-semibold text-purple-700">Subtotal: {(Number(attForm.visitorMale) || 0) + (Number(attForm.visitorFemale) || 0)}</span></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div><label className="block text-xs font-semibold text-slate-600 mb-1">Male</label><input type="number" min="0" placeholder="0" value={attForm.visitorMale} onChange={(e) => setAttForm({ ...attForm, visitorMale: e.target.value })} className="w-full px-2.5 py-2 text-sm border border-slate-300 rounded-lg bg-white" /></div>
                      <div><label className="block text-xs font-semibold text-slate-600 mb-1">Female</label><input type="number" min="0" placeholder="0" value={attForm.visitorFemale} onChange={(e) => setAttForm({ ...attForm, visitorFemale: e.target.value })} className="w-full px-2.5 py-2 text-sm border border-slate-300 rounded-lg bg-white" /></div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-1">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="px-3.5 py-2 rounded-xl bg-[#fef9ea] border border-[#f2d488] text-sm font-bold text-[#0d2247]">
                      Grand Total:{' '}
                      <span className="text-base font-extrabold">
                        {(Number(attForm.adultMale) || 0) + (Number(attForm.adultFemale) || 0) + (Number(attForm.youthBoys) || 0) + (Number(attForm.youthGirls) || 0) + (Number(attForm.childrenBoys) || 0) + (Number(attForm.childrenGirls) || 0) + (Number(attForm.visitorMale) || 0) + (Number(attForm.visitorFemale) || 0)}
                      </span>
                    </div>
                    {canViewOfferings && (
                      <div className="w-48">
                        <label className="block text-xs font-semibold text-[#0d2247] mb-1">Offering (PLN) <span className="text-slate-400 font-normal">(Optional)</span></label>
                        <input type="number" min="0" step="0.01" placeholder="0.00" value={attForm.offeringPln} onChange={(e) => setAttForm({ ...attForm, offeringPln: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                      </div>
                    )}
                  </div>
                  <button type="submit" className="px-5 py-2.5 bg-[#0d2247] hover:bg-[#163466] text-white text-sm font-semibold rounded-lg">+ Save Attendance Record</button>
                </div>
              </form>
            </div>

            <div className="bg-white border border-[#dce3f0] rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-3 border-b border-[#e3e9f3]">
                <div>
                  <h4 className="font-bold text-[#0d2247] text-base">Attendance Explorer ({attendance.length} total session{attendance.length === 1 ? '' : 's'} logged)</h4>
                  <p className="text-sm text-slate-500">Click a <strong>Date</strong> or <strong>Month</strong> to view records in tabular form</p>
                </div>
                <div className="inline-flex rounded-xl bg-[#f4f6fa] p-1 border border-[#dce3f0] self-start">
                  <button type="button" onClick={() => setAttBrowseMode('date')} className={`px-3.5 py-1.5 rounded-lg text-sm font-bold transition ${attBrowseMode === 'date' ? 'bg-[#0d2247] text-[#fde047]' : 'text-[#0d2247]'}`}>By Date</button>
                  <button type="button" onClick={() => setAttBrowseMode('month')} className={`px-3.5 py-1.5 rounded-lg text-sm font-bold transition ${attBrowseMode === 'month' ? 'bg-[#0d2247] text-[#fde047]' : 'text-[#0d2247]'}`}>By Month</button>
                </div>
              </div>

              {attendance.length === 0 ? (
                <div className="py-10 text-center border border-dashed border-[#cdd7e8] rounded-xl bg-[#f8fafd]">
                  <p className="text-sm font-semibold text-[#0d2247]">No service attendance records logged yet.</p>
                </div>
              ) : attBrowseMode === 'date' ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">Click a Date:</span>
                    {availableAttDates.map(dt => (
                      <button key={dt} type="button" onClick={() => setSelectedAttDate(dt)} className={`px-3.5 py-1.5 rounded-xl text-sm font-bold border transition ${dt === activeAttDate ? 'bg-[#0d2247] text-[#fde047] border-[#0d2247]' : 'bg-[#f8fafd] text-[#0d2247] border-[#dce3f0]'}`}>
                        {dt} <span className="text-xs opacity-75">({attendance.filter(a => a.date === dt).length})</span>
                      </button>
                    ))}
                  </div>
                  <div className="overflow-x-auto border border-[#dce3f0] rounded-xl">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-[#dce3f0] text-slate-500 bg-[#f8fafd]">
                          <th className="py-2.5 px-3">Location</th><th className="py-2.5 px-3">Service Type</th><th className="py-2.5 px-3">Adults (M/F)</th>
                          <th className="py-2.5 px-3">Youth (B/G)</th><th className="py-2.5 px-3">Children (B/G)</th><th className="py-2.5 px-3">Visitors (M/F)</th>
                          <th className="py-2.5 px-3 font-bold text-[#0d2247]">Total</th>{canViewOfferings && <th className="py-2.5 px-3">Offering</th>}
                          <th className="py-2.5 px-3">Recorded By</th>{canEditModule('attendance') && <th className="py-2.5 px-3 text-right">Actions</th>}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {dayRecords.map(rec => {
                          const c = getRecordCounts(rec);
                          const isEditing = canEditModule('attendance') && editingAttId === rec.id && editAttDraft;
                          if (isEditing) {
                            const draftTotal = (Number(editAttDraft.adultMale) || 0) + (Number(editAttDraft.adultFemale) || 0) + (Number(editAttDraft.youthBoys) || 0) + (Number(editAttDraft.youthGirls) || 0) + (Number(editAttDraft.childrenBoys) || 0) + (Number(editAttDraft.childrenGirls) || 0) + (Number(editAttDraft.visitorMale) || 0) + (Number(editAttDraft.visitorFemale) || 0);
                            return (
                              <tr key={rec.id} className="bg-[#fef9ea]">
                                <td className="py-2.5 px-2"><input type="text" list="dlbc-locations-list" autoComplete="off" placeholder="Location..." value={editAttDraft.location} onChange={(e) => setEditAttDraft({ ...editAttDraft, location: e.target.value })} className="w-28 px-2 py-1 text-xs font-semibold border border-slate-300 rounded bg-white" /></td>
                                <td className="py-2.5 px-2"><input type="text" list="dlbc-service-types-list" autoComplete="off" value={editAttDraft.serviceType} onChange={(e) => setEditAttDraft({ ...editAttDraft, serviceType: e.target.value })} className="w-36 px-2 py-1 text-xs border border-slate-300 rounded bg-white" /></td>
                                <td className="py-2.5 px-2 whitespace-nowrap"><div className="flex items-center gap-1"><input type="number" min="0" value={editAttDraft.adultMale} onChange={(e) => setEditAttDraft({ ...editAttDraft, adultMale: e.target.value })} className="w-12 px-1.5 py-1 text-xs border border-slate-300 rounded bg-white" /><span className="text-xs text-slate-400">/</span><input type="number" min="0" value={editAttDraft.adultFemale} onChange={(e) => setEditAttDraft({ ...editAttDraft, adultFemale: e.target.value })} className="w-12 px-1.5 py-1 text-xs border border-slate-300 rounded bg-white" /></div></td>
                                <td className="py-2.5 px-2 whitespace-nowrap"><div className="flex items-center gap-1"><input type="number" min="0" value={editAttDraft.youthBoys} onChange={(e) => setEditAttDraft({ ...editAttDraft, youthBoys: e.target.value })} className="w-12 px-1.5 py-1 text-xs border border-slate-300 rounded bg-white" /><span className="text-xs text-slate-400">/</span><input type="number" min="0" value={editAttDraft.youthGirls} onChange={(e) => setEditAttDraft({ ...editAttDraft, youthGirls: e.target.value })} className="w-12 px-1.5 py-1 text-xs border border-slate-300 rounded bg-white" /></div></td>
                                <td className="py-2.5 px-2 whitespace-nowrap"><div className="flex items-center gap-1"><input type="number" min="0" value={editAttDraft.childrenBoys} onChange={(e) => setEditAttDraft({ ...editAttDraft, childrenBoys: e.target.value })} className="w-12 px-1.5 py-1 text-xs border border-slate-300 rounded bg-white" /><span className="text-xs text-slate-400">/</span><input type="number" min="0" value={editAttDraft.childrenGirls} onChange={(e) => setEditAttDraft({ ...editAttDraft, childrenGirls: e.target.value })} className="w-12 px-1.5 py-1 text-xs border border-slate-300 rounded bg-white" /></div></td>
                                <td className="py-2.5 px-2 whitespace-nowrap"><div className="flex items-center gap-1"><input type="number" min="0" value={editAttDraft.visitorMale} onChange={(e) => setEditAttDraft({ ...editAttDraft, visitorMale: e.target.value })} className="w-12 px-1.5 py-1 text-xs border border-slate-300 rounded bg-white" /><span className="text-xs text-slate-400">/</span><input type="number" min="0" value={editAttDraft.visitorFemale} onChange={(e) => setEditAttDraft({ ...editAttDraft, visitorFemale: e.target.value })} className="w-12 px-1.5 py-1 text-xs border border-slate-300 rounded bg-white" /></div></td>
                                <td className="py-2.5 px-3 font-extrabold text-[#0d2247]">{draftTotal}</td>
                                {canViewOfferings && <td className="py-2.5 px-2"><input type="number" min="0" step="0.01" value={editAttDraft.offeringPln} onChange={(e) => setEditAttDraft({ ...editAttDraft, offeringPln: e.target.value })} className="w-20 px-1.5 py-1 text-xs font-mono border border-slate-300 rounded bg-white" /></td>}
                                <td className="py-2.5 px-2"><input type="text" value={editAttDraft.recordedBy} onChange={(e) => setEditAttDraft({ ...editAttDraft, recordedBy: e.target.value })} className="w-24 px-2 py-1 text-xs border border-slate-300 rounded bg-white" /></td>
                                {canEditModule('attendance') && (
                                  <td className="py-2.5 px-3 text-right whitespace-nowrap space-x-1">
                                    <button type="button" onClick={handleSaveEditedAttendance} className="px-2.5 py-1 rounded bg-emerald-600 text-white text-xs font-semibold">Save</button>
                                    <button type="button" onClick={() => { setEditingAttId(null); setEditAttDraft(null); }} className="px-2.5 py-1 rounded bg-slate-200 text-slate-700 text-xs font-semibold">Cancel</button>
                                  </td>
                                )}
                              </tr>
                            );
                          }
                          return (
                            <tr key={rec.id} className="hover:bg-[#f8fafd]">
                              <td className="py-2.5 px-3 font-semibold text-[#0d2247]">{rec.location || '—'}</td>
                              <td className="py-2.5 px-3">{rec.serviceType}</td>
                              <td className="py-2.5 px-3 whitespace-nowrap">{c.adults} ({c.adultMale}M/{c.adultFemale}F)</td>
                              <td className="py-2.5 px-3 whitespace-nowrap">{c.youths} ({c.youthBoys}B/{c.youthGirls}G)</td>
                              <td className="py-2.5 px-3 whitespace-nowrap">{c.children} ({c.childrenBoys}B/{c.childrenGirls}G)</td>
                              <td className="py-2.5 px-3 whitespace-nowrap">{c.visitors} ({c.visitorMale}M/{c.visitorFemale}F)</td>
                              <td className="py-2.5 px-3 font-extrabold text-[#0d2247]">{c.total}</td>
                              {canViewOfferings && <td className="py-2.5 px-3 font-mono">{rec.offeringPln ? `${rec.offeringPln} PLN` : '—'}</td>}
                              <td className="py-2.5 px-3">{rec.recordedBy}</td>
                              {canEditModule('attendance') && (
                                <td className="py-2.5 px-3 text-right whitespace-nowrap space-x-1.5">
                                  <button type="button" onClick={() => handleStartEditAttendance(rec)} className="px-2.5 py-1 rounded bg-[#f4f6fa] hover:bg-[#e6ecf6] text-[#0d2247] border border-[#cbd5e6] text-xs font-semibold">Edit</button>
                                  <button type="button" onClick={() => handleDeleteAttendance(rec.id)} className="px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold">Delete</button>
                                </td>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">Click a Month:</span>
                    {availableAttMonths.map(mo => (
                      <button key={mo} type="button" onClick={() => setSelectedAttMonth(mo)} className={`px-3.5 py-1.5 rounded-xl text-sm font-bold border transition ${mo === activeAttMonth ? 'bg-[#0d2247] text-[#fde047] border-[#0d2247]' : 'bg-[#f8fafd] text-[#0d2247] border-[#dce3f0]'}`}>
                        {mo} <span className="text-xs opacity-75">({attendance.filter(a => a.date && a.date.startsWith(mo)).length})</span>
                      </button>
                    ))}
                  </div>
                  <div className="overflow-x-auto border border-[#dce3f0] rounded-xl">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-[#dce3f0] text-slate-500 bg-[#fef9ea]">
                          <th className="py-2.5 px-3">Location</th><th className="py-2.5 px-3">Service Type</th><th className="py-2.5 px-3">Sessions</th>
                          <th className="py-2.5 px-3">Adults</th><th className="py-2.5 px-3">Youth</th><th className="py-2.5 px-3">Children</th>
                          <th className="py-2.5 px-3">Visitors</th><th className="py-2.5 px-3 font-bold text-[#0d2247]">Monthly Total</th><th className="py-2.5 px-3 font-bold text-emerald-800">Avg / Service</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {monthRollupByGroup.map(row => (
                          <tr key={row.key} className="hover:bg-[#f8fafd]">
                            <td className="py-2.5 px-3 font-semibold text-[#0d2247]">{row.location}</td>
                            <td className="py-2.5 px-3">{row.serviceType}</td>
                            <td className="py-2.5 px-3">{row.sessions}</td>
                            <td className="py-2.5 px-3 font-bold">{row.adults}</td>
                            <td className="py-2.5 px-3 font-bold text-emerald-800">{row.youths}</td>
                            <td className="py-2.5 px-3 font-bold text-blue-800">{row.children}</td>
                            <td className="py-2.5 px-3 font-bold text-purple-800">{row.visitors}</td>
                            <td className="py-2.5 px-3 font-extrabold text-[#0d2247]">{row.total}</td>
                            <td className="py-2.5 px-3 font-bold text-emerald-700">{row.sessions ? (row.total / row.sessions).toFixed(1) : 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: NEWCOMERS */}
        {activeTab === 'newcomers' && canEnterNewcomers && (
          <div className="space-y-6">
            <div className="bg-white border border-[#dce3f0] rounded-2xl p-5 shadow-xs">
              <h3 className="font-bold text-[#0d2247] text-lg mb-1">Register First-Timer / Newcomer</h3>
              <p className="text-sm text-slate-500 mb-4">Active view displays newcomers by selected Month or Quarter; older records can be archived safely.</p>
              <form onSubmit={handleAddNewcomer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end">
                <div><label className="block text-sm font-semibold text-[#0d2247] mb-1">Full Name</label><input type="text" value={ncForm.fullName} onChange={(e) => setNcForm({ ...ncForm, fullName: e.target.value })} placeholder="Type full name..." className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" required /></div>
                <div><label className="block text-sm font-semibold text-[#0d2247] mb-1">Phone Number</label><input type="text" value={ncForm.phone} onChange={(e) => setNcForm({ ...ncForm, phone: e.target.value })} placeholder="Type phone..." className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" /></div>
                <div><label className="block text-sm font-semibold text-[#0d2247] mb-1">Location (Type Yourself)</label><input type="text" list="dlbc-locations-list" autoComplete="off" placeholder="Type location..." value={ncForm.location} onChange={(e) => setNcForm({ ...ncForm, location: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" required /></div>
                <div><label className="block text-sm font-semibold text-[#0d2247] mb-1">Visit Date</label><input type="date" value={ncForm.visitDate} onChange={(e) => setNcForm({ ...ncForm, visitDate: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" required /></div>
                <div><label className="block text-sm font-semibold text-[#0d2247] mb-1">Follow-Up Worker</label><input type="text" value={ncForm.assignedFollowUp} onChange={(e) => setNcForm({ ...ncForm, assignedFollowUp: e.target.value })} placeholder="Type worker name..." className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" /></div>
                <button type="submit" className="px-4 py-2 bg-[#0d2247] hover:bg-[#163466] text-white text-sm font-semibold rounded-lg">+ Save Newcomer</button>
              </form>
            </div>

            <div className="bg-white border border-[#dce3f0] rounded-2xl p-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pb-3 border-b border-[#e3e9f3]">
                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={() => setNcViewMode('month')} className={`px-3.5 py-1.5 rounded-lg text-sm font-bold ${ncViewMode === 'month' ? 'bg-[#0d2247] text-white' : 'bg-[#f4f6fa] text-[#0d2247]'}`}>Monthly View</button>
                  <button onClick={() => setNcViewMode('quarter')} className={`px-3.5 py-1.5 rounded-lg text-sm font-bold ${ncViewMode === 'quarter' ? 'bg-[#0d2247] text-white' : 'bg-[#f4f6fa] text-[#0d2247]'}`}>Quarterly View</button>
                  <button onClick={() => setNcViewMode('archived')} className={`px-3.5 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5 ${ncViewMode === 'archived' ? 'bg-[#9a6b06] text-white' : 'bg-[#fef9ea] text-[#8a5d05] border border-[#f2d488]'}`}><Archive className="w-4 h-4" />Archived Vault ({archivedNewcomersCount})</button>
                </div>
                {ncViewMode === 'month' && <div className="flex items-center gap-2"><span className="text-sm text-slate-500">Month:</span><input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="px-2.5 py-1.5 text-sm border border-slate-300 rounded-lg" /></div>}
                {ncViewMode === 'quarter' && <div className="flex items-center gap-2"><span className="text-sm text-slate-500">Quarter:</span><input type="text" value={selectedQuarter} onChange={(e) => setSelectedQuarter(e.target.value)} placeholder="Type quarter..." className="px-2.5 py-1.5 text-sm border border-slate-300 rounded-lg w-32" /></div>}
              </div>

              {visibleNewcomers.length === 0 ? (
                <p className="text-sm text-slate-500 py-8 text-center">No newcomer records found for this filter period.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-[#dce3f0] text-slate-500">
                        <th className="py-2.5">Name</th><th className="py-2.5">Phone</th><th className="py-2.5">Location</th>
                        <th className="py-2.5">Visit Date</th><th className="py-2.5">Assigned Worker</th><th className="py-2.5">Notes</th>
                        {canEditModule('newcomers') && <th className="py-2.5 text-right">Archive / Delete</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {visibleNewcomers.map(nc => (
                        <tr key={nc.id} className="hover:bg-[#f8fafd]">
                          <td className="py-2.5 font-bold text-[#0d2247]">{nc.fullName}</td>
                          <td className="py-2.5 font-mono">{nc.phone}</td>
                          <td className="py-2.5">{nc.location || '—'}</td>
                          <td className="py-2.5">{nc.visitDate}</td>
                          <td className="py-2.5 text-emerald-700 font-semibold">{nc.assignedFollowUp}</td>
                          <td className="py-2.5 text-slate-500 max-w-xs truncate">{nc.notes}</td>
                          {canEditModule('newcomers') && (
                            <td className="py-2.5 text-right space-x-2">
                              <button onClick={() => toggleArchiveNewcomer(nc.id)} className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#fef9ea] hover:bg-[#fef0c7] text-[#8a5d05] border border-[#f2d488] text-xs font-semibold">
                                {nc.archived ? <RotateCcw className="w-3.5 h-3.5" /> : <Archive className="w-3.5 h-3.5" />}{nc.archived ? 'Restore' : 'Archive'}
                              </button>
                              <button onClick={() => deleteNewcomer(nc.id)} className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold"><Trash2 className="w-3.5 h-3.5" />Delete</button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
  {/* TAB 6: GROWTH & SERVICE ANALYTICS */}
     {activeTab === 'analytics' && hasOversightView && (
       <div className="space-y-6">
         <div className="bg-white border border-[#dce3f0] rounded-2xl p-5 shadow-xs space-y-4">
           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
             <div>
               <h3 className="font-bold text-[#0d2247] text-lg flex items-center gap-2">
                 <TrendingUp className="w-5 h-5 text-[#9a6b06]" />
                 Growth & Service Analytics
               </h3>
               <p className="text-sm text-slate-500">
                 Explore attendance trends, monthly cohorts, service averages, and location comparisons
               </p>
             </div>
           </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">1. Visualization Type</label>
                  <select value={analyticsChartType} onChange={(e) => setAnalyticsChartType(e.target.value)} className="w-full px-3 py-2 text-sm font-bold border border-[#dfc078] rounded-xl bg-[#fef9ea] text-[#0d2247]">
                    <option value="trend">📈 Trend & Area Series (Toggleable)</option>
                    <option value="cohort_stack">🧱 Stacked Cohort Mix (By Month)</option>
                    <option value="service_compare">⚖️ Service-by-Service Comparison</option>
                    <option value="location_split">📍 Location Comparison</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">2. Summary Metric</label>
                  <select value={analyticsMetric} onChange={(e) => setAnalyticsMetric(e.target.value)} className="w-full px-3 py-2 text-sm font-semibold border border-slate-300 rounded-xl bg-[#f8fafd] text-[#0d2247]">
                    <option value="total">Total Attendance</option>
                    <option value="maleTotal">All Male</option>
                    <option value="femaleTotal">All Female</option>
                    <option value="adults">Adults</option>
                    <option value="adultMale">Adult Male</option>
                    <option value="adultFemale">Adult Female</option>
                    <option value="youths">Youth</option>
                    <option value="youthBoys">Youth Boys</option>
                    <option value="youthGirls">Youth Girls</option>
                    <option value="children">Children</option>
                    <option value="childrenBoys">Children Boys</option>
                    <option value="childrenGirls">Children Girls</option>
                    <option value="visitors">Visitors</option>
                    <option value="visitorMale">Visitor Male</option>
                    <option value="visitorFemale">Visitor Female</option>
                    {canViewOfferings && <option value="offeringPln">Offering (PLN)</option>}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">3. Service Type Filter</label>
                  <input type="text" list="dlbc-service-types-list" autoComplete="off" placeholder="Type service to filter..." value={analyticsServiceFilter} onChange={(e) => setAnalyticsServiceFilter(e.target.value)} className="w-full px-3 py-2 text-sm font-semibold border border-slate-300 rounded-xl bg-[#f8fafd] text-[#0d2247]" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">4. Location Filter</label>
                  <input type="text" list="dlbc-locations-list" autoComplete="off" placeholder="Type location to filter..." value={analyticsLocation} onChange={(e) => setAnalyticsLocation(e.target.value)} className="w-full px-3 py-2 text-sm font-semibold border border-slate-300 rounded-xl bg-[#f8fafd] text-[#0d2247]" />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#f8fafd] border border-[#dce3f0]"><div className="text-xs text-slate-500">Matching Sessions</div><div className="text-xl font-extrabold text-[#0d2247]">{filteredAttendance.length}</div></div>
                <div className="p-3 rounded-xl bg-[#f8fafd] border border-[#dce3f0]"><div className="text-xs text-slate-500">Average per Service</div><div className="text-xl font-extrabold text-[#0d2247]">{avgSelectedMetric} {analyticsMetric === 'offeringPln' ? 'PLN' : ''}</div></div>
                <div className="p-3 rounded-xl bg-[#f8fafd] border border-[#dce3f0]"><div className="text-xs text-slate-500">Highest Recorded Peak</div><div className="text-xl font-extrabold text-[#9a6b06]">{peakSelectedMetric} {analyticsMetric === 'offeringPln' ? 'PLN' : ''}</div></div>
                <div className="p-3 rounded-xl bg-[#f8fafd] border border-[#dce3f0]"><div className="text-xs text-slate-500">First-to-Latest Change</div><div className={`text-xl font-extrabold ${overallGrowthPct >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>{overallGrowthPct >= 0 ? `+${overallGrowthPct}%` : `${overallGrowthPct}%`}</div></div>
              </div>
            </div>

            {filteredAttendance.length === 0 ? (
              <div className="bg-white border border-dashed border-[#cdd7e8] rounded-2xl p-12 text-center">
                <BarChart3 className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h4 className="font-bold text-[#0d2247] text-base">No attendance data matches this filter yet</h4>
              </div>
            ) : (
              <div className="bg-white border border-[#dce3f0] rounded-2xl p-6 shadow-xs">
                {analyticsChartType === 'trend' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-[#0d2247] text-base">Interactive Trend & Area Lines — Click what you want to see</h4>
                        <p className="text-sm text-slate-500">{analyticsLocation.trim() || 'All Locations'} • {analyticsServiceFilter.trim() || 'All Services'}</p>
                      </div>
                      <button type="button" onClick={() => setShowAreaFill(prev => !prev)} className={`px-3.5 py-1.5 rounded-lg text-sm font-bold border self-start transition ${showAreaFill ? 'bg-[#0d2247] text-[#fde047] border-[#0d2247]' : 'bg-[#f4f6fa] text-[#0d2247] border-[#cbd5e6]'}`}>
                        {showAreaFill ? 'Area Shading: ON' : 'Line Only (Area OFF)'}
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-[#f8fafd] border border-[#dce3f0]">
                      <span className="text-xs font-bold text-slate-500 mr-1">Show on Chart:</span>
                      {TREND_SERIES_OPTIONS.map(opt => {
                        const active = selectedTrendSeries.includes(opt.key);
                        return (
                          <button key={opt.key} type="button" onClick={() => toggleTrendSeries(opt.key)} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition ${active ? 'bg-white text-[#0d2247] border-[#0d2247] shadow-2xs' : 'bg-transparent text-slate-500 border-slate-300'}`}>
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: opt.color, opacity: active ? 1 : 0.35 }} />
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>

                    {chronologicalTrendData.length === 1 ? (
                      <div className="p-6 rounded-xl bg-[#fef9ea] border border-[#f2d488] text-center space-y-2">
                        <div className="text-sm text-[#8a5d05] font-semibold">1 Session Logged ({chronologicalTrendData[0].label})</div>
                        <div className="flex flex-wrap justify-center gap-4 pt-1">
                          {selectedTrendSeries.map(key => {
                            const opt = TREND_SERIES_OPTIONS.find(o => o.key === key);
                            return <div key={key} className="bg-white border border-[#e6ecf6] rounded-xl px-4 py-2"><div className="text-xs text-slate-500">{opt?.label}</div><div className="text-lg font-extrabold text-[#0d2247]">{chronologicalTrendData[0][key]}</div></div>;
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="w-full overflow-x-auto">
                        {(() => {
                          const pts = chronologicalTrendData;
                          const activeSeriesObjs = TREND_SERIES_OPTIONS.filter(o => selectedTrendSeries.includes(o.key));
                          const maxV = Math.max(...pts.flatMap(p => activeSeriesObjs.map(s => p[s.key] || 0)), 1);
                          const width = Math.max(660, pts.length * 95);
                          const height = 260; const padX = 48; const padY = 32;
                          const plotW = width - padX * 2; const plotH = height - padY * 2;

                          return (
                            <svg width={width} height={height + 38} className="mx-auto">
                              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                                const gy = padY + plotH - ratio * plotH;
                                return (
                                  <g key={i}>
                                    <line x1={padX} y1={gy} x2={width - padX} y2={gy} stroke="#e2e8f0" strokeDasharray="3 3" />
                                    <text x={padX - 10} y={gy + 4} textAnchor="end" fontSize="11" fill="#64748b">{Math.round(ratio * maxV)}</text>
                                  </g>
                                );
                              })}
                              {activeSeriesObjs.map(series => {
                                const coords = pts.map((p, idx) => ({ ...p, val: p[series.key] || 0, x: padX + (idx / (pts.length - 1)) * plotW, y: padY + plotH - ((p[series.key] || 0) / maxV) * plotH }));
                                const linePts = coords.map(c => `${c.x},${c.y}`).join(' ');
                                const areaPts = `${coords[0].x},${padY + plotH} ${linePts} ${coords[coords.length - 1].x},${padY + plotH}`;
                                return (
                                  <g key={series.key}>
                                    {showAreaFill && <polygon points={areaPts} fill={series.fill} />}
                                    <polyline fill="none" stroke={series.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={linePts} />
                                    {coords.map((c, idx) => (
                                      <g key={idx}>
                                        <circle cx={c.x} cy={c.y} r="5" fill="#ffffff" stroke={series.color} strokeWidth="2.5" />
                                        <text x={c.x} y={c.y - 10} textAnchor="middle" fontSize="11" fontWeight="bold" fill={series.color}>{c.val}</text>
                                      </g>
                                    ))}
                                  </g>
                                );
                              })}
                              {pts.map((p, idx) => <text key={idx} x={padX + (idx / (pts.length - 1)) * plotW} y={padY + plotH + 20} textAnchor="middle" fontSize="11" fill="#475569">{p.shortDate}</text>)}
                            </svg>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                )}

                {analyticsChartType === 'cohort_stack' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-[#0d2247] text-base flex items-center gap-2"><Layers className="w-4 h-4 text-[#b47b08]" />Monthly Cohort & Visitor Mix — Click a Month</h4>
                        <p className="text-sm text-slate-500">Select a month below to view its stacked cohort summary and sessions cleanly</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-[#0d2247] inline-block" /> Adults</span>
                        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-emerald-500 inline-block" /> Youth</span>
                        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-blue-500 inline-block" /> Children</span>
                        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-purple-500 inline-block" /> Visitors</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">Month:</span>
                      {cohortMonths.map(mo => (
                        <button key={mo} type="button" onClick={() => setSelectedCohortMonth(mo)} className={`px-3.5 py-1.5 rounded-xl text-sm font-bold border transition ${mo === activeCohortMonth ? 'bg-[#0d2247] text-[#fde047] border-[#0d2247]' : 'bg-[#f8fafd] text-[#0d2247] border-[#dce3f0]'}`}>
                          {mo} <span className="text-xs opacity-75">({filteredAttendance.filter(a => a.date && a.date.startsWith(mo)).length})</span>
                        </button>
                      ))}
                    </div>

                    {(() => {
                      const safeTotal = Math.max(cohortMonthSummary.total, 1);
                      const aPct = Math.round((cohortMonthSummary.adults / safeTotal) * 100);
                      const yPct = Math.round((cohortMonthSummary.youths / safeTotal) * 100);
                      const cPct = Math.round((cohortMonthSummary.children / safeTotal) * 100);
                      const vPct = Math.max(0, 100 - aPct - yPct - cPct);
                      return (
                        <div className="p-4 rounded-2xl bg-[#f8fafd] border border-[#dce3f0] space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="text-sm font-extrabold text-[#0d2247]">{activeCohortMonth} Cohort Total ({cohortMonthSessions.length} session{cohortMonthSessions.length === 1 ? '' : 's'})</div>
                            <span className="px-3 py-1 rounded-lg bg-[#fef6df] text-[#8a5d05] text-sm font-extrabold">{cohortMonthSummary.total} Total</span>
                          </div>
                          <div className="w-full h-5 rounded-full overflow-hidden flex bg-slate-200">
                            {cohortMonthSummary.adults > 0 && <div className="bg-[#0d2247] h-full" style={{ width: `${aPct}%` }} />}
                            {cohortMonthSummary.youths > 0 && <div className="bg-emerald-500 h-full" style={{ width: `${yPct}%` }} />}
                            {cohortMonthSummary.children > 0 && <div className="bg-blue-500 h-full" style={{ width: `${cPct}%` }} />}
                            {cohortMonthSummary.visitors > 0 && <div className="bg-purple-500 h-full" style={{ width: `${vPct}%` }} />}
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                            <div className="bg-white rounded-xl p-2.5 border border-[#e3e9f3]"><div className="text-slate-500 text-xs">Adults</div><div className="font-extrabold text-[#0d2247]">{cohortMonthSummary.adults} ({aPct}%)</div></div>
                            <div className="bg-white rounded-xl p-2.5 border border-[#e3e9f3]"><div className="text-emerald-700 text-xs">Youth</div><div className="font-extrabold text-emerald-900">{cohortMonthSummary.youths} ({yPct}%)</div></div>
                            <div className="bg-white rounded-xl p-2.5 border border-[#e3e9f3]"><div className="text-blue-700 text-xs">Children</div><div className="font-extrabold text-blue-900">{cohortMonthSummary.children} ({cPct}%)</div></div>
                            <div className="bg-white rounded-xl p-2.5 border border-[#e3e9f3]"><div className="text-purple-700 text-xs">Visitors</div><div className="font-extrabold text-purple-900">{cohortMonthSummary.visitors} ({vPct}%)</div></div>
                          </div>
                        </div>
                      );
                    })()}

                    <div className="overflow-x-auto border border-[#dce3f0] rounded-xl">
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="border-b border-[#dce3f0] text-slate-500 bg-[#f8fafd]">
                            <th className="py-2.5 px-3">Date</th><th className="py-2.5 px-3">Location</th><th className="py-2.5 px-3">Service</th>
                            <th className="py-2.5 px-3">Adults</th><th className="py-2.5 px-3">Youth</th><th className="py-2.5 px-3">Children</th>
                            <th className="py-2.5 px-3">Visitors</th><th className="py-2.5 px-3 font-bold text-[#0d2247]">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {cohortMonthSessions.map(s => (
                            <tr key={s.id} className="hover:bg-[#f8fafd]">
                              <td className="py-2.5 px-3 font-semibold text-[#0d2247]">{s.date}</td>
                              <td className="py-2.5 px-3">{s.location}</td><td className="py-2.5 px-3">{s.serviceType}</td>
                              <td className="py-2.5 px-3 font-bold text-[#0d2247]">{s.adults}</td>
                              <td className="py-2.5 px-3 font-bold text-emerald-800">{s.youths}</td>
                              <td className="py-2.5 px-3 font-bold text-blue-800">{s.children}</td>
                              <td className="py-2.5 px-3 font-bold text-purple-800">{s.visitors}</td>
                              <td className="py-2.5 px-3 font-extrabold text-[#0d2247]">{s.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {analyticsChartType === 'service_compare' && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-[#0d2247] text-base">Service-by-Service Average Comparison</h4>
                    {(() => {
                      const maxAvg = Math.max(...serviceComparisonData.map(s => s.avg), 1);
                      return serviceComparisonData.map(s => (
                        <div key={s.type} className="p-3.5 rounded-xl bg-[#f8fafd] border border-[#dce3f0] space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div><span className="font-bold text-[#0d2247]">{s.type}</span><span className="text-slate-400 ml-2">({s.sessions} sessions)</span></div>
                            <span className="font-extrabold text-[#0d2247]">{s.avg} avg {analyticsMetric === 'offeringPln' ? 'PLN' : ''}</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden"><div className="h-2.5 rounded-full bg-[#0d2247]" style={{ width: `${Math.round((s.avg / maxAvg) * 100)}%` }} /></div>
                        </div>
                      ));
                    })()}
                  </div>
                )}

                {analyticsChartType === 'location_split' && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-[#0d2247] text-base">Location Comparison</h4>
                    {(() => {
                      const maxLocAvg = Math.max(...locationBreakdownData.map(l => l.avg), 1);
                      return locationBreakdownData.map(loc => (
                        <div key={loc.location} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-bold text-[#0d2247]">{loc.location} <span className="font-normal text-slate-400">({loc.sessions} sessions)</span></span>
                            <span className="font-extrabold text-[#0d2247]">{loc.avg} avg {analyticsMetric === 'offeringPln' ? 'PLN' : ''}</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden"><div className="bg-[#0d2247] h-3 rounded-full" style={{ width: `${Math.round((loc.avg / maxLocAvg) * 100)}%` }} /></div>
                        </div>
                      ));
                    })()}
                  </div>
                )}
              </div>
            )}
          </div>
        )}   
{/* TAB 7: DIRECTORY, HP FA PERMISSIONS & HP ACTIVITY LOG */}
        {activeTab === 'directory' && hasOversightView && (
          <div className="space-y-6">
            {isHeadPastor && (
              <div className="bg-white border-2 border-[#dfc078] rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-[#0d2247] text-lg flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-[#9a6b06]" />
                      Head Pastor Control: Full Access (FA) Permissions & Restrictions
                    </h3>
                    <p className="text-sm text-slate-500">
                      FA always has full view access and can click <strong>Executed / Not Executed</strong>. Toggle whether FA can edit records and restrict specific areas when needed.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={toggleFaEditPermission}
                    className={`px-4 py-2 rounded-xl text-sm font-extrabold border transition shrink-0 ${
                      faPolicy.canEdit
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600'
                        : 'bg-[#fef9ea] hover:bg-[#fef0c7] text-[#8a5d05] border-[#f2d488]'
                    }`}
                  >
                    {faPolicy.canEdit ? 'FA Edit Permission: ENABLED (Click to Restrict)' : 'FA Edit Permission: VIEW & EXECUTE ONLY (Click to Grant)'}
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-3 border-t border-slate-100">
                  {[
                    { key: 'directory', label: 'Directory' },
                    { key: 'offerings', label: 'Offerings' },
                    { key: 'rosters', label: 'Rosters' },
                    { key: 'plansAndNotices', label: 'Plan & Notices' },
                    { key: 'attendance', label: 'Attendance' },
                    { key: 'newcomers', label: 'Newcomers' }
                  ].map(mod => {
                    const restricted = Boolean(faPolicy.restrictedModules?.[mod.key]);
                    return (
                      <button
                        key={mod.key}
                        type="button"
                        onClick={() => toggleFaModuleRestriction(mod.key, mod.label)}
                        className={`p-2.5 rounded-xl border text-left transition ${
                          restricted
                            ? 'bg-rose-50 border-rose-200 text-rose-800'
                            : 'bg-[#f8fafd] border-[#dce3f0] text-[#0d2247]'
                        }`}
                      >
                        <div className="text-xs font-extrabold">{mod.label}</div>
                        <div className="text-[11px] font-semibold mt-0.5">
                          {restricted ? 'Restricted' : 'Allowed'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {canEditModule('directory') && (
              <div className="bg-white border border-[#dce3f0] rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-[#0d2247] text-lg">Add Worker or Member Particulars</h3>
                    <p className="text-sm text-slate-500">Capture Full Name, Phone Number, Home Address, Emergency Contact, and Location</p>
                  </div>
                  <button onClick={exportDirectoryCsv} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-[#f4f6fa] hover:bg-[#e6ecf6] text-[#0d2247] border border-[#cbd5e6]">
                    <Download className="w-4 h-4" />Export CSV
                  </button>
                </div>

                <form onSubmit={handleAddPerson} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-[#0d2247] mb-1">Classification</label>
                    <select value={newPersonForm.category} onChange={(e) => setNewPersonForm({ ...newPersonForm, category: e.target.value })} className="w-full px-3 py-2 text-sm font-bold border border-[#dfc078] rounded-lg bg-[#fef9ea]">
                      <option value="Worker">Worker</option>
                      <option value="Member">Member</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0d2247] mb-1">Full Name</label>
                    <input type="text" placeholder="Type full name..." value={newPersonForm.fullName} onChange={(e) => setNewPersonForm({ ...newPersonForm, fullName: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0d2247] mb-1">Phone Number</label>
                    <input type="text" placeholder="Type phone number..." value={newPersonForm.phone} onChange={(e) => setNewPersonForm({ ...newPersonForm, phone: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0d2247] mb-1">Location (Type Yourself)</label>
                    <input type="text" list="dlbc-locations-list" autoComplete="off" placeholder="Type location..." value={newPersonForm.location} onChange={(e) => setNewPersonForm({ ...newPersonForm, location: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" required />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-[#0d2247] mb-1">Home Address</label>
                    <input type="text" placeholder="Type home address..." value={newPersonForm.address} onChange={(e) => setNewPersonForm({ ...newPersonForm, address: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0d2247] mb-1">Emergency Contact (Who to Contact)</label>
                    <input type="text" placeholder="Type emergency contact name..." value={newPersonForm.emergencyName} onChange={(e) => setNewPersonForm({ ...newPersonForm, emergencyName: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0d2247] mb-1">Emergency Contact Number</label>
                    <input type="text" placeholder="Type emergency phone..." value={newPersonForm.emergencyPhone} onChange={(e) => setNewPersonForm({ ...newPersonForm, emergencyPhone: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" required />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-semibold text-[#0d2247] mb-1">Ministry Units / Fellowship Group (comma-separated)</label>
                    <input type="text" placeholder="Type units or groups..." value={newPersonForm.unitsText} onChange={(e) => setNewPersonForm({ ...newPersonForm, unitsText: e.target.value })} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                  </div>
                  <div className="flex items-end">
                    <button type="submit" className="w-full px-4 py-2 bg-[#0d2247] hover:bg-[#163466] text-white text-sm font-semibold rounded-lg">Save to {newPersonForm.category}s</button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white border border-[#dce3f0] rounded-2xl p-5 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 pb-3 border-b border-[#e3e9f3]">
                <div className="flex items-center gap-2">
                  <button onClick={() => setDirectorySubTab('Worker')} className={`px-4 py-2 rounded-xl text-sm font-extrabold transition ${directorySubTab === 'Worker' ? 'bg-[#0d2247] text-[#fde047] shadow-xs' : 'bg-[#f4f6fa] text-[#0d2247] hover:bg-[#e6ecf6]'}`}>Workers Directory ({workersCount})</button>
                  <button onClick={() => setDirectorySubTab('Member')} className={`px-4 py-2 rounded-xl text-sm font-extrabold transition ${directorySubTab === 'Member' ? 'bg-[#0d2247] text-[#fde047] shadow-xs' : 'bg-[#f4f6fa] text-[#0d2247] hover:bg-[#e6ecf6]'}`}>Members Directory ({membersCount})</button>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={exportDirectoryCsv} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-[#f4f6fa] hover:bg-[#e6ecf6] text-[#0d2247] border border-[#cbd5e6]">
                    <Download className="w-4 h-4" />CSV
                  </button>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                    <input type="text" placeholder="Search name, phone, address..." value={dirSearch} onChange={(e) => setDirSearch(e.target.value)} className="pl-8 pr-3 py-1.5 text-sm border border-slate-300 rounded-lg w-52" />
                  </div>
                  <input type="text" list="dlbc-locations-list" autoComplete="off" placeholder="Filter location..." value={dirLocationFilter} onChange={(e) => setDirLocationFilter(e.target.value)} className="px-2.5 py-1.5 text-sm border border-slate-300 rounded-lg w-40" />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[#dce3f0] text-slate-500">
                      <th className="py-2.5">Full Name</th><th className="py-2.5">Phone Number</th><th className="py-2.5">Home Address</th>
                      <th className="py-2.5">Emergency Contact (Who to Contact)</th><th className="py-2.5">Location</th><th className="py-2.5">Classification</th>
                      {canEditModule('directory') && <th className="py-2.5 text-right">Actions</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredDirectory.map(person => {
                      const isEditing = canEditModule('directory') && editingPersonId === person.id;
                      return (
                        <tr key={person.id} className="hover:bg-[#f8fafd] align-top">
                          <td className="py-3 pr-2">
                            {isEditing ? (
                              <input type="text" value={editPersonDraft.fullName} onChange={(e) => setEditPersonDraft({ ...editPersonDraft, fullName: e.target.value })} className="px-2 py-1 border border-slate-300 rounded w-full" />
                            ) : (
                              <div><div className="font-bold text-[#0d2247]">{person.fullName}</div><div className="text-xs text-slate-500">{person.units.join(' • ')}</div></div>
                            )}
                          </td>
                          <td className="py-3 pr-2 font-mono">
                            {isEditing ? <input type="text" value={editPersonDraft.phone} onChange={(e) => setEditPersonDraft({ ...editPersonDraft, phone: e.target.value })} className="px-2 py-1 border border-slate-300 rounded w-32" /> : person.phone}
                          </td>
                          <td className="py-3 pr-2 text-slate-700">
                            {isEditing ? <input type="text" value={editPersonDraft.address} onChange={(e) => setEditPersonDraft({ ...editPersonDraft, address: e.target.value })} className="px-2 py-1 border border-slate-300 rounded w-44" /> : <span className="inline-flex items-start gap-1"><Home className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />{person.address || '—'}</span>}
                          </td>
                          <td className="py-3 pr-2">
                            {isEditing ? (
                              <div className="space-y-1">
                                <input type="text" placeholder="Contact name" value={editPersonDraft.emergencyName} onChange={(e) => setEditPersonDraft({ ...editPersonDraft, emergencyName: e.target.value })} className="px-2 py-1 border border-slate-300 rounded w-36 block" />
                                <input type="text" placeholder="Contact phone" value={editPersonDraft.emergencyPhone} onChange={(e) => setEditPersonDraft({ ...editPersonDraft, emergencyPhone: e.target.value })} className="px-2 py-1 border border-slate-300 rounded w-36 block" />
                              </div>
                            ) : (
                              <div><div className="font-semibold text-slate-800">{person.emergencyName || '—'}</div><div className="font-mono text-xs text-slate-500">{person.emergencyPhone || ''}</div></div>
                            )}
                          </td>
                          <td className="py-3 pr-2">
                            {isEditing ? <input type="text" list="dlbc-locations-list" autoComplete="off" value={editPersonDraft.location} onChange={(e) => setEditPersonDraft({ ...editPersonDraft, location: e.target.value })} className="px-2 py-1 border border-slate-300 rounded w-28" /> : (person.location || '—')}
                          </td>
                          <td className="py-3 pr-2">
                            {canEditModule('directory') ? (
                              <select value={person.category} onChange={(e) => handleToggleCategory(person.id, e.target.value)} className={`px-2.5 py-1 rounded text-xs font-bold border ${person.category === 'Worker' ? 'bg-[#fef9ea] text-[#8a5d05] border-[#f2d488]' : 'bg-[#eef2f9] text-[#0d2247] border-[#cbd5e6]'}`}>
                                <option value="Worker">Worker</option>
                                <option value="Member">Member</option>
                              </select>
                            ) : (
                              <span className={`px-2.5 py-1 rounded text-xs font-bold border inline-block ${person.category === 'Worker' ? 'bg-[#fef9ea] text-[#8a5d05] border-[#f2d488]' : 'bg-[#eef2f9] text-[#0d2247] border-[#cbd5e6]'}`}>{person.category}</span>
                            )}
                          </td>
                          {canEditModule('directory') && (
                            <td className="py-3 text-right whitespace-nowrap space-x-1.5">
                              {isEditing ? (
                                <>
                                  <button type="button" onClick={saveEditedPerson} className="px-2.5 py-1 bg-emerald-600 text-white rounded text-xs font-semibold">Save</button>
                                  <button type="button" onClick={() => setEditingPersonId(null)} className="px-2.5 py-1 bg-slate-200 text-slate-700 rounded text-xs font-semibold">Cancel</button>
                                </>
                              ) : (
                                <>
                                  <button type="button" onClick={() => { setEditingPersonId(person.id); setEditPersonDraft({ ...person }); }} className="px-2.5 py-1 bg-[#f4f6fa] hover:bg-[#e6ecf6] text-[#0d2247] border border-[#cbd5e6] rounded text-xs font-semibold">Edit</button>
                                  <button type="button" onClick={() => handleDeletePerson(person)} className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded text-xs font-semibold">Delete</button>
                                </>
                              )}
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {isHeadPastor && (
              <div className="bg-white border border-[#dce3f0] rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-[#e3e9f3]">
                  <div>
                    <h3 className="font-bold text-[#0d2247] text-lg flex items-center gap-2">
                      <History className="w-5 h-5 text-[#0d2247]" />
                      Head Pastor Change Activity Log ({activityLog.length})
                    </h3>
                    <p className="text-sm text-slate-500">Shows who made changes, when, what changed, and on which record</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <select value={logActionFilter} onChange={(e) => setLogActionFilter(e.target.value)} className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg bg-[#f8fafd]">
                      <option value="ALL">All Actions</option>
                      <option value="Created">Created</option>
                      <option value="Edited">Edited</option>
                      <option value="Deleted">Deleted</option>
                      <option value="Marked Executed">Marked Executed</option>
                      <option value="Marked Not Executed">Marked Not Executed</option>
                      <option value="Permission Changed">Permission Changed</option>
                    </select>
                    <select value={logActorFilter} onChange={(e) => setLogActorFilter(e.target.value)} className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg bg-[#f8fafd]">
                      <option value="ALL">All Roles</option>
                      <option value="head_pastor">Head Pastor (HP)</option>
                      <option value="full_access">Full Access (FA)</option>
                      <option value="usher_entry">Usher / Data Entry</option>
                    </select>
                    {activityLog.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Clear the HP activity audit log?')) setActivityLog([]);
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 hover:bg-red-100 text-red-700 border border-red-200"
                      >
                        Clear Log
                      </button>
                    )}
                  </div>
                </div>

                {(() => {
                  const visibleLogs = activityLog.filter(entry => {
                    const actionOk = logActionFilter === 'ALL' || entry.action === logActionFilter;
                    const actorOk = logActorFilter === 'ALL' || entry.actorRole === logActorFilter;
                    return actionOk && actorOk;
                  });

                  if (visibleLogs.length === 0) {
                    return <p className="text-sm text-slate-500 py-6 text-center">No recorded changes match the current filter.</p>;
                  }

                  return (
                    <div className="overflow-x-auto border border-[#dce3f0] rounded-xl">
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="border-b border-[#dce3f0] text-slate-500 bg-[#f8fafd]">
                            <th className="py-2.5 px-3">When</th>
                            <th className="py-2.5 px-3">Who</th>
                            <th className="py-2.5 px-3">Action</th>
                            <th className="py-2.5 px-3">Area & Target</th>
                            <th className="py-2.5 px-3">What Changed</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {visibleLogs.map(entry => (
                            <tr key={entry.id} className="hover:bg-[#f8fafd] align-top">
                              <td className="py-2.5 px-3 text-xs font-mono text-slate-500 whitespace-nowrap">{entry.timestamp}</td>
                              <td className="py-2.5 px-3 whitespace-nowrap">
                                <div className="font-bold text-[#0d2247]">{entry.actorName}</div>
                                <div className="text-xs text-slate-500">{entry.actorRoleLabel}</div>
                              </td>
                              <td className="py-2.5 px-3 whitespace-nowrap">
                                <span className="px-2 py-0.5 rounded bg-[#eef2f9] text-[#0d2247] text-xs font-bold">{entry.action}</span>
                              </td>
                              <td className="py-2.5 px-3">
                                <div className="font-bold text-[#0d2247]">{entry.targetLabel}</div>
                                <div className="text-xs text-slate-500">{entry.moduleName}</div>
                              </td>
                              <td className="py-2.5 px-3 text-slate-700">{entry.details}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
