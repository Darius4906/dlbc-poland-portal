import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard, Users, Calendar, ClipboardList, BarChart3,
  Plus, Search, CheckCircle2, AlertTriangle, Trash2, Edit3,
  Archive, RotateCcw, Download, Upload, Shield, MapPin,
  Bell, Clock, BookOpen, Phone, UserPlus, Sparkles, Check, X, Copy
} from 'lucide-react';

// --- INITIAL NORMALIZED DATA FROM DLBC POLAND WORKBOOKS ---
const INITIAL_WORKERS = [
  { id: 'w1', title: 'Pastor', fullName: 'Pastor Dare', aliases: ['Bro Dare'], phone: '+48 500 100 001', location: 'Warsaw', role: 'super_admin', units: ['Pastoral', 'Bible Study', 'Vigils'], status: 'Active' },
  { id: 'w2', title: 'Pastor', fullName: 'Pastor William', aliases: ['Pastor Willam', 'Pastor Wiliam', 'Pastor Willaims', 'Pastor Williams', 'Pst. William', 'Bro William'], phone: '+48 500 100 002', location: 'Gliwice', role: 'location_admin', units: ['Pastoral', 'STS', 'Bible Study'], status: 'Active' },
  { id: 'w3', title: 'Pastor', fullName: 'Pastor Nuhu', aliases: [], phone: '+48 500 100 003', location: 'Warsaw', role: 'location_admin', units: ['Pastoral'], status: 'Active' },
  { id: 'w4', title: 'Pastor', fullName: 'Pastor Jide', aliases: ['Bro Jide'], phone: '+48 500 100 004', location: 'Warsaw', role: 'location_admin', units: ['Message', 'Bible Study'], status: 'Active' },
  { id: 'w5', title: 'Mummy', fullName: 'Mummy IBK', aliases: ['Sister Ibukun'], phone: '+48 500 100 005', location: 'Warsaw', role: 'member_readonly', units: ['Welfare', 'STS'], status: 'Active' },
  { id: 'w6', title: 'Bro', fullName: 'Bro Pelumi', aliases: ['Brother Pelumi'], phone: '+48 500 100 006', location: 'Warsaw', role: 'usher_entry', units: ['STS', 'Moderation', 'Vigils'], status: 'Active' },
  { id: 'w7', title: 'Bro', fullName: 'Bro Matthew', aliases: ['Bro Mathew', 'Brother Matthew'], phone: '+48 500 100 007', location: 'Warsaw', role: 'usher_entry', units: ['Prayers', 'Bible Study'], status: 'Active' },
  { id: 'w8', title: 'Bro', fullName: 'Bro Tobi', aliases: ['Bro David Tobi', 'Bro Tobi David', 'Bro David', 'Brother David'], phone: '+48 500 100 008', location: 'Gliwice', role: 'usher_entry', units: ['Moderation', 'Prayers'], status: 'Active' },
  { id: 'w9', title: 'Bro', fullName: 'Bro Joel', aliases: [], phone: '+48 500 100 009', location: 'Warsaw', role: 'usher_entry', units: ['Moderation', 'Prayers'], status: 'Active' },
  { id: 'w10', title: 'Bro', fullName: 'Bro Samuel', aliases: [], phone: '+48 500 100 010', location: 'Gliwice', role: 'member_readonly', units: ['Prayers', 'Moderation'], status: 'Active' },
  { id: 'w11', title: 'Bro', fullName: 'Bro Semilore', aliases: ['Bro Smilore'], phone: '+48 500 100 011', location: 'Warsaw', role: 'member_readonly', units: ['Prayers'], status: 'Active' },
  { id: 'w12', title: 'Bro', fullName: 'Bro Ebenezer', aliases: [], phone: '+48 500 100 012', location: 'Gliwice', role: 'member_readonly', units: ['Fellowship'], status: 'Active' },
  { id: 'w13', title: 'Bro', fullName: 'Bro Olamide', aliases: [], phone: '+48 500 100 013', location: 'Warsaw', role: 'member_readonly', units: ['Moderation'], status: 'Active' },
  { id: 'w14', title: 'Bro', fullName: 'Bro Eron', aliases: [], phone: '+48 500 100 014', location: 'Gliwice', role: 'member_readonly', units: ['Fellowship'], status: 'Active' },
  { id: 'w15', title: 'Bro', fullName: 'Bro Yinka', aliases: [], phone: '+48 500 100 015', location: 'Warsaw', role: 'member_readonly', units: ['General'], status: 'Active' },
  { id: 'w16', title: 'Bro', fullName: 'Bro Femi', aliases: [], phone: '+48 500 100 016', location: 'Warsaw', role: 'member_readonly', units: ['General'], status: 'Active' },
  { id: 'w17', title: 'Sis', fullName: 'Sis Abigail', aliases: ['Sis Abigial', 'Sister Abigail'], phone: '+48 500 100 017', location: 'Gliwice', role: 'member_readonly', units: ['Choir', 'Moderation', 'Vigils'], status: 'Active' },
  { id: 'w18', title: 'Sis', fullName: 'Sis Bisola', aliases: ['Sis Abisola', 'Sister Bisola'], phone: '+48 500 100 018', location: 'Warsaw', role: 'usher_entry', units: ['Prayers', 'Moderation', 'Choir'], status: 'Active' },
  { id: 'w19', title: 'Sis', fullName: 'Sis Peace', aliases: ['Sis  Peace', 'Sister Peace'], phone: '+48 500 100 019', location: 'Warsaw', role: 'member_readonly', units: ['Prayers', 'Bible Study'], status: 'Active' },
  { id: 'w20', title: 'Sis', fullName: 'Sis Elizabeth', aliases: ['Sister Elizabeth'], phone: '+48 500 100 020', location: 'Warsaw', role: 'member_readonly', units: ['STS', 'Bible Study', 'Vigils'], status: 'Active' },
  { id: 'w21', title: 'Sis', fullName: 'Sis Jane', aliases: ['Sister Jane', 'Sister Janefrancis'], phone: '+48 500 100 021', location: 'Gliwice', role: 'member_readonly', units: ['STS', 'Prayers', 'Vigils'], status: 'Active' },
  { id: 'w22', title: 'Sis', fullName: 'Sis Victoria', aliases: ['Sister Victoria'], phone: '+48 500 100 022', location: 'Gliwice', role: 'member_readonly', units: ['STS', 'Prayers'], status: 'Active' },
  { id: 'w23', title: 'Sis', fullName: 'Sis Juliet', aliases: [], phone: '+48 500 100 023', location: 'Warsaw', role: 'member_readonly', units: ['Prayers', 'Fellowship'], status: 'Active' },
  { id: 'w24', title: 'Sis', fullName: 'Sis Tosin', aliases: [], phone: '+48 500 100 024', location: 'Warsaw', role: 'member_readonly', units: ['Prayers', 'Vigils'], status: 'Active' },
  { id: 'w25', title: 'Sis', fullName: 'Sis Bimpe', aliases: [], phone: '+48 500 100 025', location: 'Gliwice', role: 'member_readonly', units: ['Prayers', 'Fellowship'], status: 'Active' },
  { id: 'w26', title: 'Sis', fullName: 'Sister Esther', aliases: [], phone: '+48 500 100 026', location: 'Warsaw', role: 'member_readonly', units: ['Prayers', 'Bible Study'], status: 'Active' }
];

const INITIAL_ATTENDANCE = [
  { id: 'a1', date: '2026-10-18', serviceType: 'Sunday Morning Worship', location: 'Combined', session: 'Full Service', status: 'Held', counts: { Male: 16, Female: 9, Youth: 4, Boys: 2, Girls: 3, Children: 5, Visitors: 2 }, notes: 'Regular Sunday Service' },
  { id: 'a2', date: '2026-10-11', serviceType: 'Sunday Morning Worship', location: 'Combined', session: 'Full Service', status: 'Held', counts: { Male: 15, Female: 10, Youth: 4, Boys: 3, Girls: 2, Children: 5, Visitors: 0 }, notes: '' },
  { id: 'a3', date: '2026-10-04', serviceType: 'Sunday Morning Worship', location: 'Combined', session: 'Full Service', status: 'Held', counts: { Male: 17, Female: 10, Youth: 5, Boys: 2, Girls: 3, Children: 5, Visitors: 3 }, notes: 'First Sunday Thanksgiving' },
  { id: 'a4', date: '2026-04-04', serviceType: 'Easter Retreat 2026', location: 'Combined', session: 'Morning Session', status: 'Held', counts: { Male: 11, Female: 8, Youth: 4, Boys: 4, Girls: 4, Children: 8, Visitors: 1 }, notes: 'Day 2 Morning' },
  { id: 'a5', date: '2026-03-22', serviceType: 'Sunday Morning Worship', location: 'Combined', session: 'Full Service', status: 'Held', counts: { Male: 20, Female: 14, Youth: 6, Boys: 3, Girls: 3, Children: 6, Visitors: 4 }, notes: 'LIFTED Sunday Special' },
  { id: 'a6', date: '2026-02-21', serviceType: 'LIFTED 2026 Special Program', location: 'Warsaw', session: 'Evening Session', status: 'Held', counts: { Male: 20, Female: 13, Youth: 7, Boys: 3, Girls: 3, Children: 6, Visitors: 8 }, notes: 'LIFTED Day 1 Evening' }
];

const INITIAL_VISITORS = [
  { id: 'v1', name: 'Cephas', phone: '+2348107050319', program: 'LIFTED 2026', location: 'Online', invitedBy: 'Bro Pelumi', status: 'Contacted' },
  { id: 'v2', name: 'Chinaza', phone: '+2349035908199', program: 'LIFTED 2026', location: 'Online', invitedBy: 'Sis Peace', status: 'New' },
  { id: 'v3', name: 'Promise', phone: '+2348176080438', program: 'LIFTED 2026', location: 'Online', invitedBy: 'Pastor Dare', status: 'Contacted' },
  { id: 'v4', name: 'Agnieszka', phone: '+48667931174', program: 'LIFTED 2026', location: 'Warsaw', invitedBy: 'Sis Bisola', status: 'Integrated' },
  { id: 'v5', name: 'Dawid', phone: '+48731041335', program: 'LIFTED 2026', location: 'Warsaw', invitedBy: 'Bro Matthew', status: 'Contacted' }
];

const SERVICE_TEMPLATES = {
  'Sunday Morning (9:45–12:00)': [
    { slot: 'Pre-Service Prayers', time: '09:45–10:00' },
    { slot: 'GHS 1 (Hymns)', time: '10:00–10:10' },
    { slot: 'Search The Scripture (STS)', time: '10:10–10:35' },
    { slot: 'STS Summary', time: '10:35–10:45' },
    { slot: 'Moderation & Announcements', time: '10:45–10:55' },
    { slot: 'Bible Reading', time: '10:55–11:00' },
    { slot: 'Worship & Choir Ministration', time: '11:00–11:15' },
    { slot: 'Sermon / Message', time: '11:15–12:00' }
  ],
  'Sunday Evening Fellowship (7:00–8:00)': [
    { slot: 'Opening Prayers & Worship', time: '19:00–19:10' },
    { slot: 'Testimonies & Intercession', time: '19:10–19:25' },
    { slot: 'Interactive Discussion', time: '19:25–19:45' },
    { slot: 'Summary & Closing Prayers', time: '19:45–20:00' }
  ],
  'Tuesday Bible Study (7:30–8:30)': [
    { slot: 'Opening Prayers & Worship', time: '19:30–19:35' },
    { slot: 'Bible Study Summary', time: '19:35–20:00' },
    { slot: 'Questions & Discussion', time: '20:00–20:15' },
    { slot: 'Closing Prayers', time: '20:15–20:30' }
  ],
  'Saturday Morning Prayer (7:00–8:00)': [
    { slot: 'Opening Prayers & Worship', time: '07:00–07:10' },
    { slot: 'Prayer 1: Self (Personal Revival)', time: '07:10–07:20' },
    { slot: 'Prayer 2: Charge (Spiritual Awakening)', time: '07:20–07:35' },
    { slot: 'Prayer 3: Church (Vision for Souls)', time: '07:35–07:45' },
    { slot: 'Testimony & Prayer Requests', time: '07:45–08:00' }
  ],
  'Monthly Vigil (10:00 PM–12:00 AM)': [
    { slot: 'Worship & Praises', time: '22:00–22:30' },
    { slot: 'Exhortation', time: '22:30–23:00' },
    { slot: 'Prevailing Prayers', time: '23:00–23:30' },
    { slot: 'Spiritual Warfare', time: '23:30–00:00' }
  ]
};

const INITIAL_ROSTERS = [
  {
    id: 'r1',
    date: '2026-11-29',
    serviceType: 'Sunday Morning (9:45–12:00)',
    location: 'Combined',
    theme: 'Preach The Word, Brighten Your Corner! (Acts 8:4)',
    assignments: [
      { slot: 'Pre-Service Prayers', time: '09:45–10:00', worker: 'Bro Tobi' },
      { slot: 'GHS 1 (Hymns)', time: '10:00–10:10', worker: 'Pastor William' },
      { slot: 'Search The Scripture (STS)', time: '10:10–10:35', worker: 'Mummy IBK' },
      { slot: 'STS Summary', time: '10:35–10:45', worker: 'Pastor William' },
      { slot: 'Moderation & Announcements', time: '10:45–10:55', worker: 'Bro Samuel' },
      { slot: 'Bible Reading', time: '10:55–11:00', worker: 'Sis Abigail' },
      { slot: 'Worship & Choir Ministration', time: '11:00–11:15', worker: 'Sis Bisola' },
      { slot: 'Sermon / Message', time: '11:15–12:00', worker: 'Pastor Dare' }
    ]
  },
  {
    id: 'r2',
    date: '2026-11-29',
    serviceType: 'Sunday Evening Fellowship (7:00–8:00)',
    location: 'Warsaw',
    theme: 'Managing Healthy Lifestyle & Living During Winter',
    assignments: [
      { slot: 'Opening Prayers & Worship', time: '19:00–19:10', worker: 'Sis Juliet' },
      { slot: 'Testimonies & Intercession', time: '19:10–19:25', worker: 'Bro Semilore' },
      { slot: 'Interactive Discussion', time: '19:25–19:45', worker: 'Bro Pelumi' },
      { slot: 'Summary & Closing Prayers', time: '19:45–20:00', worker: 'Sis Bisola' }
    ]
  },
  {
    id: 'r3',
    date: '2026-11-29',
    serviceType: 'Sunday Evening Fellowship (7:00–8:00)',
    location: 'Gliwice',
    theme: 'Managing Healthy Lifestyle & Living During Winter',
    assignments: [
      { slot: 'Opening Prayers & Worship', time: '19:00–19:10', worker: 'Sis Jane' },
      { slot: 'Testimonies & Intercession', time: '19:10–19:25', worker: 'Bro Ebenezer' },
      { slot: 'Interactive Discussion', time: '19:25–19:45', worker: 'Sis Victoria' },
      { slot: 'Summary & Closing Prayers', time: '19:45–20:00', worker: 'Pastor William' }
    ]
  },
  {
    id: 'r4',
    date: '2026-12-01',
    serviceType: 'Tuesday Bible Study (7:30–8:30)',
    location: 'Online',
    theme: 'Systematic Expository Study',
    assignments: [
      { slot: 'Opening Prayers & Worship', time: '19:30–19:35', worker: 'Sis Peace' },
      { slot: 'Bible Study Summary', time: '19:35–20:00', worker: 'Pastor William' },
      { slot: 'Questions & Discussion', time: '20:00–20:15', worker: 'Pastor William' },
      { slot: 'Closing Prayers', time: '20:15–20:30', worker: 'Pastor Jide' }
    ]
  }
];

const INITIAL_PLANS = [
  { id: 'p1', quarter: 'Q1', title: 'Monthly Fasting & Prayers', dateLabel: '1–3 Jan, 5–7 Feb & Mar', isTba: false, leader: 'Pastor Dare', team: ['Pastor William', 'Bro Tobi', 'Sis Peace', 'Bro Joel'], status: 'Completed' },
  { id: 'p2', quarter: 'Q1', title: 'Special Program: LIFTED 2026', dateLabel: '21 & 22 Mar 2026', isTba: false, leader: 'Pastor Dare', team: ['Pastor William', 'Bro Pelumi', 'Sis Bisola'], status: 'Completed' },
  { id: 'p3', quarter: 'Q2', title: 'Evangelism Strategy That Works in Your Jerusalem', dateLabel: '21 Jun 2026', isTba: false, leader: 'Pastor William', team: ['Pastor Dare', 'Bro Joel', 'Sis Abigail', 'Sis Elizabeth'], status: 'Completed' },
  { id: 'p4', quarter: 'Q3', title: 'Skill Development in the Digital World', dateLabel: '19 Sep 2026', isTba: false, leader: 'Pastor Dare', team: ['Bro Pelumi', 'Sis Victoria', 'Bro Matthew'], status: 'Completed' },
  { id: 'p5', quarter: 'Q4', title: 'Q4 Fasting & Prayers + STS Quiz', dateLabel: '1–3 Oct, 5–7 Nov & 3–5 Dec', isTba: false, leader: 'Sis Elizabeth', team: ['Bro Matthew', 'Sis Abigail', 'Sis Jane', 'Sis Bisola'], status: 'In Progress' },
  { id: 'p6', quarter: 'Q4', title: 'Combined Service: Warsaw / Gliwice (Variety Night)', dateLabel: '19 & 20 Dec 2026', isTba: false, leader: 'Pastor Dare', team: ['Pastor William', 'Sis Bisola', 'Bro Pelumi', 'Sis Victoria'], status: 'Upcoming' }
];

const INITIAL_NOTICES = [
  { id: 'n1', category: 'Within-the-Week Program', location: 'All Locations', title: 'December 3-Day Fasting & Prayers (Dec 3–5)', body: 'Join daily evening prayer convergence on Zoom at 19:30 CET. Fasting breaks at 18:00 CET.', urgent: true, expires: '2026-12-06' },
  { id: 'n2', category: 'General Church Info', location: 'Warsaw & Gliwice', title: 'Combined Year-End Variety Night (Dec 19–20)', body: 'All choir groups, youth drama teams, and location coordinators should submit presentation slots by Dec 6.', urgent: false, expires: '2026-12-21' }
];

const ALL_CATEGORIES = ['Male', 'Female', 'Youth', 'Boys', 'Girls', 'Children', 'Visitors'];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentUserRole, setCurrentUserRole] = useState('super_admin'); // super_admin | location_admin | usher_entry | member_readonly

  // State Stores
  const [workers, setWorkers] = useState(INITIAL_WORKERS);
  const [attendance, setAttendance] = useState(INITIAL_ATTENDANCE);
  const [visitors, setVisitors] = useState(INITIAL_VISITORS);
  const [rosters, setRosters] = useState(INITIAL_ROSTERS);
  const [plans, setPlans] = useState(INITIAL_PLANS);
  const [notices, setNotices] = useState(INITIAL_NOTICES);

  // Toast Notification
  const [toast, setToast] = useState('');
  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  // --- ATTENDANCE FORM STATE ---
  const [attForm, setAttForm] = useState({
    date: '2026-11-29',
    serviceType: 'Sunday Morning Worship',
    location: 'Warsaw',
    session: 'Full Service',
    status: 'Held',
    notes: '',
    activeCats: ['Male', 'Female', 'Youth', 'Children', 'Visitors'],
    counts: { Male: 0, Female: 0, Youth: 0, Boys: 0, Girls: 0, Children: 0, Visitors: 0 }
  });

  const [visitorForm, setVisitorForm] = useState({ name: '', phone: '', program: 'Sunday Service', location: 'Warsaw', invitedBy: 'Pastor Dare' });

  // --- ROSTER BUILDER STATE ---
  const [selectedRosterId, setSelectedRosterId] = useState(INITIAL_ROSTERS[0].id);
  const [newRosterMeta, setNewRosterMeta] = useState({
    date: '2026-12-06',
    serviceType: 'Sunday Morning (9:45–12:00)',
    location: 'Combined',
    theme: 'Preach The Word, Brighten Your Corner!'
  });

  // --- WORKERS ADMIN STATE ---
  const [workerSearch, setWorkerSearch] = useState('');
  const [workerStatusFilter, setWorkerStatusFilter] = useState('All');
  const [newWorker, setNewWorker] = useState({ title: 'Bro', fullName: '', location: 'Warsaw', role: 'member_readonly', phone: '', units: 'Prayers', aliases: '' });
  const [editingWorkerId, setEditingWorkerId] = useState(null);
  const [editWorkerDraft, setEditWorkerDraft] = useState(null);
  const [bulkPasteOpen, setBulkPasteOpen] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [mergeSourceId, setMergeSourceId] = useState('');
  const [mergeTargetId, setMergeTargetId] = useState('');
  const [deleteTargetWorker, setDeleteTargetWorker] = useState(null);

  // --- NOTICEBOARD FORM ---
  const [noticeForm, setNoticeForm] = useState({ category: 'Within-the-Week Program', location: 'All Locations', title: '', body: '', urgent: true, expires: '2026-12-15' });

  const canEditSchedules = currentUserRole === 'super_admin' || currentUserRole === 'location_admin';
  const canEnterAttendance = canEditSchedules || currentUserRole === 'usher_entry';

  // Active workers for roster dropdowns
  const activeWorkersList = useMemo(() => workers.filter(w => w.status === 'Active'), [workers]);

  // Conflict detection across rosters on same date
  const scheduleConflicts = useMemo(() => {
    const conflicts = [];
    rosters.forEach((r1, i) => {
      rosters.forEach((r2, j) => {
        if (i < j && r1.date === r2.date && r1.location !== r2.location && r1.location !== 'Online' && r2.location !== 'Online') {
          const w1 = r1.assignments.map(a => a.worker);
          const w2 = r2.assignments.map(a => a.worker);
          w1.forEach(person => {
            if (person && person !== 'Unassigned' && w2.includes(person)) {
              conflicts.push(`${person} is scheduled in both ${r1.location} and ${r2.location} on ${r1.date}`);
            }
          });
        }
      });
    });
    return [...new Set(conflicts)];
  }, [rosters]);

  // Handlers
  const handleAddAttendance = (e) => {
    e.preventDefault();
    const cleanCounts = {};
    attForm.activeCats.forEach(c => {
      cleanCounts[c] = attForm.status === 'Held' ? Number(attForm.counts[c] || 0) : 0;
    });
    setAttendance([{ id: 'a' + Date.now(), ...attForm, counts: cleanCounts }, ...attendance]);
    notify('Attendance record saved cleanly.');
  };

  const handleAddVisitor = (e) => {
    e.preventDefault();
    if (!visitorForm.name.trim()) return;
    setVisitors([{ id: 'v' + Date.now(), ...visitorForm, status: 'New' }, ...visitors]);
    setVisitorForm({ ...visitorForm, name: '', phone: '' });
    notify('First-timer added to follow-up directory.');
  };

  const handleCreateRoster = (e) => {
    e.preventDefault();
    const templateSlots = SERVICE_TEMPLATES[newRosterMeta.serviceType] || [];
    const created = {
      id: 'r' + Date.now(),
      ...newRosterMeta,
      assignments: templateSlots.map(s => ({ ...s, worker: activeWorkersList[0]?.fullName || 'Unassigned' }))
    };
    setRosters([created, ...rosters]);
    setSelectedRosterId(created.id);
    notify(`Created ${newRosterMeta.serviceType} schedule.`);
  };

  const handleUpdateSlotWorker = (rosterId, slotIdx, newName) => {
    setRosters(rosters.map(r => {
      if (r.id !== rosterId) return r;
      const updated = [...r.assignments];
      updated[slotIdx] = { ...updated[slotIdx], worker: newName };
      return { ...r, assignments: updated };
    }));
  };

  // --- WORKERS ADMIN HANDLERS ---
  const handleAddWorker = (e) => {
    e.preventDefault();
    if (!newWorker.fullName.trim()) return;
    const formattedName = newWorker.fullName.trim();
    if (workers.some(w => w.fullName.toLowerCase() === formattedName.toLowerCase())) {
      notify('Worker already exists in directory.');
      return;
    }
    const created = {
      id: 'w' + Date.now(),
      title: newWorker.title,
      fullName: formattedName,
      location: newWorker.location,
      role: newWorker.role,
      phone: newWorker.phone || '+48 500 000 000',
      units: newWorker.units.split(',').map(u => u.trim()).filter(Boolean),
      aliases: newWorker.aliases.split(',').map(a => a.trim()).filter(Boolean),
      status: 'Active'
    };
    setWorkers([created, ...workers]);
    setNewWorker({ title: 'Bro', fullName: '', location: 'Warsaw', role: 'member_readonly', phone: '', units: 'Prayers', aliases: '' });
    notify(`Added ${formattedName} to Master Directory.`);
  };

  const handleBulkPaste = () => {
    const lines = bulkText.split('
').map(l => l.trim()).filter(Boolean);
    let addedCount = 0;
    const nextWorkers = [...workers];
    lines.forEach((line, idx) => {
      if (!nextWorkers.some(w => w.fullName.toLowerCase() === line.toLowerCase())) {
        const title = line.startsWith('Pastor') ? 'Pastor' : line.startsWith('Sis') || line.startsWith('Sister') ? 'Sis' : 'Bro';
        nextWorkers.push({
          id: 'wb' + Date.now() + idx,
          title,
          fullName: line,
          aliases: [],
          phone: '+48 500 000 000',
          location: 'Warsaw',
          role: 'member_readonly',
          units: ['General'],
          status: 'Active'
        });
        addedCount++;
      }
    });
    setWorkers(nextWorkers);
    setBulkText('');
    setBulkPasteOpen(false);
    notify(`Imported ${addedCount} new worker(s); skipped duplicates.`);
  };

  const handleSaveWorkerEdit = () => {
    if (!editWorkerDraft) return;
    const oldWorker = workers.find(w => w.id === editWorkerDraft.id);
    const oldName = oldWorker.fullName;
    const updatedName = editWorkerDraft.fullName.trim();

    setWorkers(workers.map(w => w.id === editWorkerDraft.id ? {
      ...editWorkerDraft,
      fullName: updatedName,
      aliases: typeof editWorkerDraft.aliases === 'string' ? editWorkerDraft.aliases.split(',').map(a => a.trim()).filter(Boolean) : editWorkerDraft.aliases,
      units: typeof editWorkerDraft.units === 'string' ? editWorkerDraft.units.split(',').map(u => u.trim()).filter(Boolean) : editWorkerDraft.units
    } : w));

    // Cascade name fix across rosters, plans, and visitors
    if (oldName !== updatedName) {
      setRosters(rosters.map(r => ({
        ...r,
        assignments: r.assignments.map(a => a.worker === oldName ? { ...a, worker: updatedName } : a)
      })));
      setPlans(plans.map(p => ({
        ...p,
        leader: p.leader === oldName ? updatedName : p.leader,
        team: p.team.map(t => t === oldName ? updatedName : t)
      })));
      setVisitors(visitors.map(v => v.invitedBy === oldName ? { ...v, invitedBy: updatedName } : v));
    }

    setEditingWorkerId(null);
    setEditWorkerDraft(null);
    notify(`Updated ${updatedName} across all schedules and plans.`);
  };

  const handleMergeWorkers = () => {
    if (!mergeSourceId || !mergeTargetId || mergeSourceId === mergeTargetId) return;
    const src = workers.find(w => w.id === mergeSourceId);
    const tgt = workers.find(w => w.id === mergeTargetId);
    if (!src || !tgt) return;

    const mergedAliases = [...new Set([...tgt.aliases, src.fullName, ...src.aliases])];
    setWorkers(workers
      .map(w => w.id === tgt.id ? { ...w, aliases: mergedAliases } : w)
      .filter(w => w.id !== src.id)
    );

    // Replace src.fullName everywhere with tgt.fullName
    setRosters(rosters.map(r => ({
      ...r,
      assignments: r.assignments.map(a => a.worker === src.fullName ? { ...a, worker: tgt.fullName } : a)
    })));
    setPlans(plans.map(p => ({
      ...p,
      leader: p.leader === src.fullName ? tgt.fullName : p.leader,
      team: p.team.map(t => t === src.fullName ? tgt.fullName : t)
    })));

    setMergeSourceId('');
    setMergeTargetId('');
    notify(`Merged "${src.fullName}" into "${tgt.fullName}" everywhere.`);
  };

  const getWorkerUsageStats = (workerName) => {
    let rosterCount = 0;
    rosters.forEach(r => r.assignments.forEach(a => { if (a.worker === workerName) rosterCount++; }));
    const planCount = plans.filter(p => p.leader === workerName || p.team.includes(workerName)).length;
    const visitorCount = visitors.filter(v => v.invitedBy === workerName).length;
    return { rosterCount, planCount, visitorCount };
  };

  const handleConfirmPermanentDelete = () => {
    if (!deleteTargetWorker) return;
    const name = deleteTargetWorker.fullName;
    setWorkers(workers.filter(w => w.id !== deleteTargetWorker.id));
    setRosters(rosters.map(r => ({
      ...r,
      assignments: r.assignments.map(a => a.worker === name ? { ...a, worker: 'Unassigned' } : a)
    })));
    setPlans(plans.map(p => ({
      ...p,
      leader: p.leader === name ? 'Unassigned' : p.leader,
      team: p.team.filter(t => t !== name)
    })));
    setDeleteTargetWorker(null);
    notify(`Permanently deleted ${name} and unassigned active slots.`);
  };

  const handleArchiveWorker = (worker) => {
    const nextStatus = worker.status === 'Active' ? 'Inactive' : 'Active';
    setWorkers(workers.map(w => w.id === worker.id ? { ...w, status: nextStatus } : w));
    setDeleteTargetWorker(null);
    notify(`${worker.fullName} marked as ${nextStatus}.`);
  };

  const filteredWorkers = workers.filter(w => {
    const matchesSearch = w.fullName.toLowerCase().includes(workerSearch.toLowerCase()) ||
      w.aliases.some(a => a.toLowerCase().includes(workerSearch.toLowerCase())) ||
      w.location.toLowerCase().includes(workerSearch.toLowerCase());
    const matchesStatus = workerStatusFilter === 'All' || w.status === workerStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedRoster = rosters.find(r => r.id === selectedRosterId) || rosters[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-indigo-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {toast}
        </div>
      )}

      {/* Top Header & Role Switcher */}
      <header className="bg-indigo-950 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-indigo-950 text-xs font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">DLBC Poland</span>
              <span className="text-indigo-200 text-xs">Warsaw • Gliwice • Online</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold mt-1">Church Operations & Ministry Platform</h1>
          </div>

          <div className="flex items-center gap-3 bg-indigo-900/80 px-3 py-2 rounded-xl border border-indigo-800">
            <Shield className="w-4 h-4 text-amber-400" />
            <div className="text-xs">
              <div className="text-indigo-300">Active Role Preview</div>
              <select
                value={currentUserRole}
                onChange={(e) => setCurrentUserRole(e.target.value)}
                className="bg-transparent font-semibold text-white focus:outline-none cursor-pointer"
              >
                <option value="super_admin" className="text-slate-900">Pastor Dare (Super Admin)</option>
                <option value="location_admin" className="text-slate-900">Pastor William (Location Admin)</option>
                <option value="usher_entry" className="text-slate-900">Bro Pelumi (Usher / Data Entry)</option>
                <option value="member_readonly" className="text-slate-900">Sis Abigail (Member View)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="max-w-7xl mx-auto px-4 flex overflow-x-auto gap-1 border-t border-indigo-900/80">
          {[
            { id: 'dashboard', label: 'Command Dashboard', icon: LayoutDashboard },
            { id: 'attendance', label: 'Attendance & First-Timers', icon: Users },
            { id: 'rosters', label: 'Ministering Rosters', icon: Calendar },
            { id: 'workers_admin', label: 'Members & Workers Admin', icon: UserPlus },
            { id: 'plans', label: '2026 Plan & Noticeboard', icon: ClipboardList },
            { id: 'analytics', label: 'Analytics & GitHub Setup', icon: BarChart3 }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition ${
                  active
                    ? 'border-amber-400 text-amber-300 bg-indigo-900/40'
                    : 'border-transparent text-indigo-200 hover:text-white hover:bg-indigo-900/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* 2026 Vision Banner */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 text-white rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-300 font-semibold">2026 Theme • Acts 8:4</div>
            <h2 className="text-lg md:text-xl font-bold mt-0.5">“Preach The Word, Brighten Your Corner!”</h2>
            <p className="text-sm text-indigo-100 mt-1">Goal: As an evangelist, in every city, we will preach the word and raise disciples for God.</p>
          </div>
          <div className="flex gap-3 text-center">
            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-xl">
              <div className="text-2xl font-bold text-amber-300">{activeWorkersList.length}</div>
              <div className="text-xs text-indigo-100">Active Workers</div>
            </div>
            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-xl">
              <div className="text-2xl font-bold text-emerald-300">25.5</div>
              <div className="text-xs text-indigo-100">2026 Avg Sun</div>
            </div>
          </div>
        </div>

        {/* ================= TAB 1: DASHBOARD ================= */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-700" />
                    This Week’s Ministering Timetable
                  </h3>
                  <button onClick={() => setActiveTab('rosters')} className="text-xs font-semibold text-indigo-700 hover:underline">
                    Open Full Roster Builder →
                  </button>
                </div>
                <div className="space-y-4">
                  {rosters.slice(0, 3).map(r => (
                    <div key={r.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/70">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div>
                          <span className="font-bold text-slate-900">{r.serviceType}</span>
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-medium">{r.location}</span>
                        </div>
                        <span className="text-xs font-semibold text-slate-500">{r.date}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mt-3">
                        {r.assignments.map((a, idx) => (
                          <div key={idx} className="flex justify-between bg-white px-3 py-1.5 rounded-lg border border-slate-100">
                            <span className="text-slate-500">{a.slot}</span>
                            <span className="font-semibold text-slate-800">{a.worker}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                <h3 className="font-bold text-lg flex items-center gap-2 mb-3">
                  <Bell className="w-5 h-5 text-amber-600" />
                  Urgent Weekly Updates
                </h3>
                <div className="space-y-3">
                  {notices.map(n => (
                    <div key={n.id} className={`p-3.5 rounded-xl border ${n.urgent ? 'bg-amber-50/80 border-amber-200' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-amber-800">{n.category}</span>
                        <span className="text-slate-500">{n.location}</span>
                      </div>
                      <div className="font-semibold text-sm text-slate-900">{n.title}</div>
                      <p className="text-xs text-slate-600 mt-1">{n.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                <h3 className="font-bold text-base mb-3">Recent First-Timers Follow-Up</h3>
                <div className="space-y-2">
                  {visitors.slice(0, 4).map(v => (
                    <div key={v.id} className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <div>
                        <div className="font-bold text-slate-900">{v.name} <span className="text-slate-400 font-normal">({v.location})</span></div>
                        <div className="text-slate-500">{v.phone}</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full font-semibold ${
                        v.status === 'Integrated' ? 'bg-emerald-100 text-emerald-800' :
                        v.status === 'Contacted' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                      }`}>{v.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: ATTENDANCE & FIRST-TIMERS ================= */}
        {activeTab === 'attendance' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {canEnterAttendance && (
                <form onSubmit={handleAddAttendance} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
                  <h3 className="font-bold text-lg">Record Service / Event Attendance</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Date</label>
                      <input type="date" value={attForm.date} onChange={e => setAttForm({ ...attForm, date: e.target.value })} className="w-full border rounded-lg px-3 py-2" required />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Service / Program</label>
                      <select value={attForm.serviceType} onChange={e => setAttForm({ ...attForm, serviceType: e.target.value })} className="w-full border rounded-lg px-3 py-2">
                        <option>Sunday Morning Worship</option>
                        <option>Sunday Koinonia</option>
                        <option>Tuesday Bible Study</option>
                        <option>Saturday Morning Prayer</option>
                        <option>Monthly Vigil</option>
                        <option>Easter Retreat</option>
                        <option>Special Program (LIFTED / Congress)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Location</label>
                      <select value={attForm.location} onChange={e => setAttForm({ ...attForm, location: e.target.value })} className="w-full border rounded-lg px-3 py-2">
                        <option>Warsaw</option>
                        <option>Gliwice</option>
                        <option>Online</option>
                        <option>Combined</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Session / Status</label>
                      <select value={attForm.status} onChange={e => setAttForm({ ...attForm, status: e.target.value })} className="w-full border rounded-lg px-3 py-2">
                        <option value="Held">Held (Regular Count)</option>
                        <option value="GCK Broadcast">GCK Broadcast</option>
                        <option value="Combined Service">Combined Service</option>
                        <option value="No Service">No Service</option>
                      </select>
                    </div>
                  </div>

                  {/* Toggleable Demographic Fields */}
                  <div>
                    <div className="text-xs font-semibold text-slate-600 mb-2">Choose Demographic Fields to Track for This Service:</div>
                    <div className="flex flex-wrap gap-2">
                      {ALL_CATEGORIES.map(cat => {
                        const selected = attForm.activeCats.includes(cat);
                        return (
                          <button
                            type="button"
                            key={cat}
                            onClick={() => {
                              const next = selected ? attForm.activeCats.filter(c => c !== cat) : [...attForm.activeCats, cat];
                              setAttForm({ ...attForm, activeCats: next });
                            }}
                            className={`px-3 py-1 rounded-full text-xs font-semibold border transition ${
                              selected ? 'bg-indigo-900 text-white border-indigo-900' : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                          >
                            {selected ? '✓ ' : '+ '}{cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {attForm.status === 'Held' && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      {attForm.activeCats.map(cat => (
                        <div key={cat} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                          <label className="block text-xs font-bold text-slate-700 mb-1">{cat}</label>
                          <input
                            type="number"
                            min="0"
                            value={attForm.counts[cat] || 0}
                            onChange={e => setAttForm({ ...attForm, counts: { ...attForm.counts, [cat]: e.target.value } })}
                            className="w-full border rounded-lg px-2.5 py-1.5 text-sm font-bold bg-white"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2">
                    <div className="text-sm font-bold text-indigo-950">
                      Calculated Total: {attForm.status === 'Held'
                        ? attForm.activeCats.filter(c => c !== 'Visitors').reduce((sum, c) => sum + Number(attForm.counts[c] || 0), 0)
                        : 0}
                    </div>
                    <button type="submit" className="bg-indigo-900 hover:bg-indigo-800 text-white px-5 py-2 rounded-xl text-sm font-semibold">
                      Save Attendance Entry
                    </button>
                  </div>
                </form>
              )}

              {/* Attendance History Log */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 overflow-x-auto">
                <h3 className="font-bold text-lg mb-3">Attendance Register</h3>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b text-xs text-slate-500 uppercase">
                      <th className="py-2">Date</th>
                      <th className="py-2">Service</th>
                      <th className="py-2">Location</th>
                      <th className="py-2">Breakdown</th>
                      <th className="py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {attendance.map(row => {
                      const total = Object.entries(row.counts)
                        .filter(([k]) => k !== 'Visitors')
                        .reduce((s, [, v]) => s + Number(v || 0), 0);
                      return (
                        <tr key={row.id}>
                          <td className="py-2.5 font-medium">{row.date}</td>
                          <td className="py-2.5">{row.serviceType}</td>
                          <td className="py-2.5"><span className="px-2 py-0.5 bg-slate-100 rounded text-xs font-medium">{row.location}</span></td>
                          <td className="py-2.5 text-xs text-slate-600">
                            {Object.entries(row.counts).map(([k, v]) => `${k}: ${v}`).join(' • ')}
                          </td>
                          <td className="py-2.5 font-bold text-indigo-900">{total}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* First-Timers & Invitees Directory */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
              <h3 className="font-bold text-lg">First-Timers & Invitees CRM</h3>
              {canEnterAttendance && (
                <form onSubmit={handleAddVisitor} className="space-y-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-sm">
                  <input
                    type="text"
                    placeholder="Invitee / Visitor Name"
                    value={visitorForm.name}
                    onChange={e => setVisitorForm({ ...visitorForm, name: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 bg-white"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Phone (+48... or +234...)"
                    value={visitorForm.phone}
                    onChange={e => setVisitorForm({ ...visitorForm, phone: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 bg-white"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <select value={visitorForm.location} onChange={e => setVisitorForm({ ...visitorForm, location: e.target.value })} className="border rounded-lg px-2 py-2 bg-white text-xs">
                      <option>Warsaw</option>
                      <option>Gliwice</option>
                      <option>Online</option>
                    </select>
                    <select value={visitorForm.invitedBy} onChange={e => setVisitorForm({ ...visitorForm, invitedBy: e.target.value })} className="border rounded-lg px-2 py-2 bg-white text-xs">
                      {activeWorkersList.map(w => <option key={w.id}>{w.fullName}</option>)}
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-indigo-900 text-white py-2 rounded-lg font-semibold text-xs">
                    + Log First-Timer
                  </button>
                </form>
              )}

              <div className="space-y-2.5">
                {visitors.map(v => (
                  <div key={v.id} className="p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-slate-900">{v.name}</span>
                      <select
                        value={v.status}
                        onChange={e => setVisitors(visitors.map(item => item.id === v.id ? { ...item, status: e.target.value } : item))}
                        className="border rounded px-2 py-0.5 text-xs font-semibold bg-slate-50"
                      >
                        <option>New</option>
                        <option>Contacted</option>
                        <option>Integrated</option>
                      </select>
                    </div>
                    <div className="text-slate-600">{v.phone} • {v.location}</div>
                    <div className="text-slate-400">Source: {v.program} • Invited by {v.invitedBy}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: MINISTERING ROSTERS ================= */}
        {activeTab === 'rosters' && (
          <div className="space-y-6">
            {scheduleConflicts.length > 0 && (
              <div className="bg-rose-50 border border-rose-200 text-rose-900 p-4 rounded-2xl flex items-start gap-3 text-sm">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Double-Booking Conflict Detected:</div>
                  {scheduleConflicts.map((c, idx) => <div key={idx}>{c}</div>)}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                {canEditSchedules && (
                  <form onSubmit={handleCreateRoster} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-3 text-sm">
                    <h3 className="font-bold text-base">Generate Service Roster</h3>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Service Template</label>
                      <select value={newRosterMeta.serviceType} onChange={e => setNewRosterMeta({ ...newRosterMeta, serviceType: e.target.value })} className="w-full border rounded-lg px-3 py-2">
                        {Object.keys(SERVICE_TEMPLATES).map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Date</label>
                        <input type="date" value={newRosterMeta.date} onChange={e => setNewRosterMeta({ ...newRosterMeta, date: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Campus</label>
                        <select value={newRosterMeta.location} onChange={e => setNewRosterMeta({ ...newRosterMeta, location: e.target.value })} className="w-full border rounded-lg px-3 py-2">
                          <option>Combined</option>
                          <option>Warsaw</option>
                          <option>Gliwice</option>
                          <option>Online</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-indigo-900 text-white py-2 rounded-xl font-semibold">
                      Create Time-Slotted Roster
                    </button>
                  </form>
                )}

                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">Scheduled Services</span>
                    <button onClick={() => setActiveTab('workers_admin')} className="text-xs font-semibold text-indigo-700 hover:underline">
                      Manage / Fix Names →
                    </button>
                  </div>
                  {rosters.map(r => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRosterId(r.id)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition ${
                        selectedRoster?.id === r.id ? 'bg-indigo-50 border-indigo-400' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="font-bold text-slate-900">{r.serviceType}</div>
                      <div className="text-slate-500 mt-0.5">{r.date} • {r.location}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Roster Editor */}
              {selectedRoster && (
                <div className="lg:col-span-2 bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
                    <div>
                      <h3 className="font-bold text-lg">{selectedRoster.serviceType}</h3>
                      <p className="text-xs text-slate-500">{selectedRoster.date} • {selectedRoster.location} • Theme: {selectedRoster.theme}</p>
                    </div>
                    <button
                      onClick={() => {
                        const msg = `*DLBC Poland Roster (${selectedRoster.date} - ${selectedRoster.location})*
${selectedRoster.serviceType}
` +
                          selectedRoster.assignments.map(a => `• ${a.time} ${a.slot}: *${a.worker}*`).join('
');
                        navigator.clipboard?.writeText(msg);
                        notify('WhatsApp/Email reminder copied to clipboard!');
                      }}
                      className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-semibold"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy WhatsApp Reminder
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {selectedRoster.assignments.map((slot, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div>
                          <div className="text-xs font-semibold text-indigo-700">{slot.time}</div>
                          <div className="font-bold text-sm text-slate-900">{slot.slot}</div>
                        </div>
                        {canEditSchedules ? (
                          <select
                            value={slot.worker}
                            onChange={e => handleUpdateSlotWorker(selectedRoster.id, idx, e.target.value)}
                            className="border rounded-lg px-3 py-2 text-sm font-semibold bg-white min-w-[210px]"
                          >
                            <option value="Unassigned">-- Unassigned --</option>
                            {activeWorkersList.map(w => (
                              <option key={w.id} value={w.fullName}>{w.fullName} ({w.location})</option>
                            ))}
                          </select>
                        ) : (
                          <span className="font-bold text-sm text-slate-800">{slot.worker}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 4: MEMBERS & WORKERS ADMIN BACKEND ================= */}
        {activeTab === 'workers_admin' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Add Worker + Merge Duplicate Names */}
              <div className="space-y-6">
                {canEditSchedules && (
                  <form onSubmit={handleAddWorker} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base">Add Worker / Member</h3>
                      <button
                        type="button"
                        onClick={() => setBulkPasteOpen(!bulkPasteOpen)}
                        className="text-xs font-semibold text-indigo-700 hover:underline"
                      >
                        {bulkPasteOpen ? 'Close Bulk Paste' : '+ Bulk Paste List'}
                      </button>
                    </div>

                    {bulkPasteOpen ? (
                      <div className="space-y-2">
                        <textarea
                          rows="5"
                          placeholder={"Paste names (one per line):
Bro David
Sister Esther
Bro Samuel"}
                          value={bulkText}
                          onChange={e => setBulkText(e.target.value)}
                          className="w-full border rounded-xl p-2.5 text-xs"
                        />
                        <button type="button" onClick={handleBulkPaste} className="w-full bg-indigo-900 text-white py-2 rounded-xl text-xs font-semibold">
                          Import All Names
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-3 gap-2">
                          <select value={newWorker.title} onChange={e => setNewWorker({ ...newWorker, title: e.target.value })} className="border rounded-lg px-2 py-2">
                            <option>Pastor</option>
                            <option>Bro</option>
                            <option>Sis</option>
                            <option>Mummy</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Full Name (e.g. Bro Daniel)"
                            value={newWorker.fullName}
                            onChange={e => setNewWorker({ ...newWorker, fullName: e.target.value })}
                            className="col-span-2 border rounded-lg px-3 py-2"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <select value={newWorker.location} onChange={e => setNewWorker({ ...newWorker, location: e.target.value })} className="border rounded-lg px-2 py-2">
                            <option>Warsaw</option>
                            <option>Gliwice</option>
                            <option>Online</option>
                          </select>
                          <select value={newWorker.role} onChange={e => setNewWorker({ ...newWorker, role: e.target.value })} className="border rounded-lg px-2 py-2">
                            <option value="member_readonly">Member</option>
                            <option value="usher_entry">Usher / Data</option>
                            <option value="location_admin">Location Admin</option>
                            <option value="super_admin">Super Admin</option>
                          </select>
                        </div>
                        <input
                          type="text"
                          placeholder="Ministry Units (e.g. Choir, STS, Prayers)"
                          value={newWorker.units}
                          onChange={e => setNewWorker({ ...newWorker, units: e.target.value })}
                          className="w-full border rounded-lg px-3 py-2"
                        />
                        <input
                          type="text"
                          placeholder="Spelling Aliases (comma separated)"
                          value={newWorker.aliases}
                          onChange={e => setNewWorker({ ...newWorker, aliases: e.target.value })}
                          className="w-full border rounded-lg px-3 py-2"
                        />
                        <button type="submit" className="w-full bg-indigo-900 hover:bg-indigo-800 text-white py-2 rounded-xl font-semibold">
                          + Save to Directory
                        </button>
                      </>
                    )}
                  </form>
                )}

                {/* Merge Duplicate / Misspelled Names Tool */}
                {canEditSchedules && (
                  <div className="bg-amber-50/80 border border-amber-200 p-5 rounded-2xl space-y-3 text-sm">
                    <h3 className="font-bold text-base text-amber-950">Merge Duplicate Spellings</h3>
                    <p className="text-xs text-amber-800">
                      Combine a duplicate entry into the canonical worker name and automatically update every schedule across the platform.
                    </p>
                    <select value={mergeSourceId} onChange={e => setMergeSourceId(e.target.value)} className="w-full border rounded-lg px-3 py-2 bg-white text-xs">
                      <option value="">Select duplicate to remove...</option>
                      {workers.map(w => <option key={w.id} value={w.id}>{w.fullName}</option>)}
                    </select>
                    <select value={mergeTargetId} onChange={e => setMergeTargetId(e.target.value)} className="w-full border rounded-lg px-3 py-2 bg-white text-xs">
                      <option value="">Select official target name...</option>
                      {workers.map(w => <option key={w.id} value={w.id}>{w.fullName}</option>)}
                    </select>
                    <button
                      type="button"
                      onClick={handleMergeWorkers}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-xl font-semibold text-xs"
                    >
                      Merge & Fix Everywhere
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column: Master Workers & Members Table */}
              <div className="lg:col-span-2 bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-lg">Master Members & Workers Directory ({filteredWorkers.length})</h3>
                    <p className="text-xs text-slate-500">Editing or deleting a worker safely updates linked schedules.</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search name or alias..."
                        value={workerSearch}
                        onChange={e => setWorkerSearch(e.target.value)}
                        className="pl-9 pr-3 py-1.5 border rounded-xl text-xs"
                      />
                    </div>
                    <select
                      value={workerStatusFilter}
                      onChange={e => setWorkerStatusFilter(e.target.value)}
                      className="border rounded-xl px-2.5 py-1.5 text-xs bg-white"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive (Archived)</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b text-slate-500 uppercase">
                        <th className="py-2.5">Canonical Name & Aliases</th>
                        <th className="py-2.5">Campus</th>
                        <th className="py-2.5">Units</th>
                        <th className="py-2.5">Status</th>
                        {canEditSchedules && <th className="py-2.5 text-right">Actions</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredWorkers.map(w => {
                        const isEditing = editingWorkerId === w.id;
                        return (
                          <tr key={w.id} className={w.status === 'Inactive' ? 'bg-slate-50 opacity-70' : ''}>
                            <td className="py-3 pr-2">
                              {isEditing ? (
                                <div className="space-y-1">
                                  <input
                                    type="text"
                                    value={editWorkerDraft.fullName}
                                    onChange={e => setEditWorkerDraft({ ...editWorkerDraft, fullName: e.target.value })}
                                    className="border rounded px-2 py-1 font-bold w-full"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Aliases (comma separated)"
                                    value={Array.isArray(editWorkerDraft.aliases) ? editWorkerDraft.aliases.join(', ') : editWorkerDraft.aliases}
                                    onChange={e => setEditWorkerDraft({ ...editWorkerDraft, aliases: e.target.value })}
                                    className="border rounded px-2 py-1 text-xs w-full"
                                  />
                                </div>
                              ) : (
                                <>
                                  <div className="font-bold text-sm text-slate-900">{w.fullName}</div>
                                  {w.aliases.length > 0 && (
                                    <div className="text-slate-400 mt-0.5">Aliases: {w.aliases.join(', ')}</div>
                                  )}
                                </>
                              )}
                            </td>
                            <td className="py-3">
                              {isEditing ? (
                                <select
                                  value={editWorkerDraft.location}
                                  onChange={e => setEditWorkerDraft({ ...editWorkerDraft, location: e.target.value })}
                                  className="border rounded px-2 py-1"
                                >
                                  <option>Warsaw</option>
                                  <option>Gliwice</option>
                                  <option>Online</option>
                                </select>
                              ) : (
                                <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 font-semibold">{w.location}</span>
                              )}
                            </td>
                            <td className="py-3 text-slate-600">{w.units.join(', ')}</td>
                            <td className="py-3">
                              <button
                                onClick={() => canEditSchedules && handleArchiveWorker(w)}
                                className={`px-2 py-0.5 rounded-full font-semibold ${
                                  w.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                                }`}
                              >
                                {w.status}
                              </button>
                            </td>
                            {canEditSchedules && (
                              <td className="py-3 text-right">
                                {isEditing ? (
                                  <div className="inline-flex gap-1">
                                    <button onClick={handleSaveWorkerEdit} className="p-1.5 bg-emerald-600 text-white rounded-lg" title="Save">
                                      <Check className="w-3.5 h-3.5" />
                                    </button>
                                    <button onClick={() => setEditingWorkerId(null)} className="p-1.5 bg-slate-200 text-slate-700 rounded-lg" title="Cancel">
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="inline-flex gap-1.5">
                                    <button
                                      onClick={() => {
                                        setEditingWorkerId(w.id);
                                        setEditWorkerDraft({ ...w });
                                      }}
                                      className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                                      title="Edit Name / Aliases"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => setDeleteTargetWorker(w)}
                                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                                      title="Delete or Archive Worker"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
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
            </div>
          </div>
        )}

        {/* ================= TAB 5: 2026 PLAN & NOTICEBOARD ================= */}
        {activeTab === 'plans' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <h3 className="font-bold text-lg">2026 Operational Plan (Q1–Q4)</h3>
              <div className="space-y-3">
                {plans.map(p => (
                  <div key={p.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-indigo-900 text-white text-xs font-bold rounded">{p.quarter}</span>
                        <span className="font-bold text-slate-900">{p.title}</span>
                      </div>
                      <div className="text-xs text-slate-600 mt-1">Date: {p.dateLabel} • Lead: <strong>{p.leader}</strong></div>
                      <div className="text-xs text-slate-500 mt-0.5">Team: {p.team.join(', ')}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold self-start ${
                      p.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                      p.status === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                    }`}>{p.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <h3 className="font-bold text-lg">Church Noticeboard</h3>
              {canEditSchedules && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!noticeForm.title.trim()) return;
                    setNotices([{ id: 'n' + Date.now(), ...noticeForm }, ...notices]);
                    setNoticeForm({ ...noticeForm, title: '', body: '' });
                    notify('Announcement published to noticeboard.');
                  }}
                  className="space-y-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs"
                >
                  <select value={noticeForm.category} onChange={e => setNoticeForm({ ...noticeForm, category: e.target.value })} className="w-full border rounded-lg px-2.5 py-2 bg-white">
                    <option>Within-the-Week Program</option>
                    <option>General Church Info</option>
                    <option>Workers Notice</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Announcement Title"
                    value={noticeForm.title}
                    onChange={e => setNoticeForm({ ...noticeForm, title: e.target.value })}
                    className="w-full border rounded-lg px-2.5 py-2 bg-white"
                    required
                  />
                  <textarea
                    rows="3"
                    placeholder="Details, time, Zoom link, or instructions..."
                    value={noticeForm.body}
                    onChange={e => setNoticeForm({ ...noticeForm, body: e.target.value })}
                    className="w-full border rounded-lg px-2.5 py-2 bg-white"
                    required
                  />
                  <button type="submit" className="w-full bg-indigo-900 text-white py-2 rounded-lg font-semibold">
                    Post Update
                  </button>
                </form>
              )}
              <div className="space-y-3">
                {notices.map(n => (
                  <div key={n.id} className="p-3.5 rounded-xl border border-slate-200 text-xs">
                    <div className="font-bold text-indigo-800">{n.category} • {n.location}</div>
                    <div className="font-bold text-sm text-slate-900 mt-0.5">{n.title}</div>
                    <p className="text-slate-600 mt-1">{n.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 6: ANALYTICS & GITHUB SETUP ================= */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <h3 className="font-bold text-lg">Sunday Average Attendance Trend (2023–2026)</h3>
              <div className="space-y-3">
                {[
                  { period: '2023 H2', avg: 17.2, pct: 43 },
                  { period: '2024 Full Year', avg: 15.6, pct: 39 },
                  { period: '2025 H1', avg: 20.1, pct: 50 },
                  { period: '2025 H2', avg: 23.6, pct: 59 },
                  { period: '2026 YTD (+48% vs 2023)', avg: 25.5, pct: 64 }
                ].map(item => (
                  <div key={item.period} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{item.period}</span>
                      <span className="text-indigo-900">{item.avg} avg</span>
                    </div>
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                      <div className="bg-indigo-700 h-full rounded-full" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl shadow-sm space-y-3 text-xs">
              <h3 className="font-bold text-base text-amber-300">GitHub Pages + Supabase Architecture</h3>
              <p className="text-slate-300">
                This repository includes <code>.github/workflows/deploy.yml</code> for automatic static deployment on GitHub Pages and <code>supabase/schema.sql</code> for live multi-user PostgreSQL storage.
              </p>
              <div className="bg-slate-950 p-3 rounded-xl font-mono text-[11px] text-emerald-300 overflow-x-auto">
                1. Push this folder to a Public GitHub repo<br />
                2. Settings → Pages → Source: GitHub Actions<br />
                3. Live at: https://&lt;username&gt;.github.io/dlbc-poland-portal/
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Safe Delete / Archive Confirmation Modal */}
      {deleteTargetWorker && (() => {
        const stats = getWorkerUsageStats(deleteTargetWorker.fullName);
        return (
          <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3 text-rose-600">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="font-bold text-lg text-slate-900">Remove {deleteTargetWorker.fullName}?</h3>
              </div>
              <p className="text-sm text-slate-600">
                This worker is currently referenced in <strong>{stats.rosterCount}</strong> ministering slot(s), <strong>{stats.planCount}</strong> annual plan team(s), and <strong>{stats.visitorCount}</strong> visitor log(s).
              </p>
              <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-600 space-y-1 border">
                <div>• <strong>Archive (Recommended):</strong> Hides them from future dropdowns while keeping past history intact.</div>
                <div>• <strong>Delete Permanently:</strong> Removes them from the directory and sets active roster slots to <em>Unassigned</em>.</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  onClick={() => handleArchiveWorker(deleteTargetWorker)}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-xl text-xs font-bold"
                >
                  Archive Instead
                </button>
                <button
                  onClick={handleConfirmPermanentDelete}
                  className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-xl text-xs font-bold"
                >
                  Delete Permanently
                </button>
                <button
                  onClick={() => setDeleteTargetWorker(null)}
                  className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
