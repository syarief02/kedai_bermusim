// ═══════════════════════════════════════════
// Malaysian School Calendar & Seasonal Reminders
// ═══════════════════════════════════════════

export const REMINDER_TYPES = {
    registration: { label: 'Pendaftaran', icon: '📝', color: 'magenta' },
    shopping: { label: 'Belanja', icon: '🛒', color: 'cyan' },
    deadline: { label: 'Tarikh Akhir', icon: '⏰', color: 'warning' },
    school: { label: 'Sekolah', icon: '🏫', color: 'success' },
    exam: { label: 'Peperiksaan', icon: '📝', color: 'danger' },
}

// Malaysian school year typically: Jan – Nov
// Key dates for parents to remember
export function getRemindersForYear(year) {
    return [
        // OCTOBER (previous year) — Registration season
        {
            id: `reg-darjah1-${year}`,
            title: 'Pendaftaran Darjah 1',
            description: 'Daftar anak ke sekolah rendah untuk tahun depan. Bawa sijil lahir, kad pengenalan ibu bapa, dan bukti alamat.',
            type: 'registration',
            date: `${year - 1}-10-01`,
            endDate: `${year - 1}-10-31`,
            priority: 'high',
        },
        // NOVEMBER — Back-to-school shopping starts
        {
            id: `shop-early-${year}`,
            title: 'Musim Beli Barang Sekolah Bermula',
            description: 'Mula beli seragam sekolah, kasut, beg dan alat tulis. Beli awal untuk elak kehabisan stok!',
            type: 'shopping',
            date: `${year - 1}-11-15`,
            endDate: `${year}-01-01`,
            priority: 'high',
        },
        // DECEMBER — Last chance shopping
        {
            id: `shop-lastchance-${year}`,
            title: '⚡ Last Chance! Beli Barang Sekolah',
            description: 'Semak senarai semula. Pastikan semua barang sekolah sudah dibeli sebelum sesi persekolahan bermula.',
            type: 'shopping',
            date: `${year - 1}-12-15`,
            endDate: `${year - 1}-12-31`,
            priority: 'high',
        },
        // JANUARY — School starts
        {
            id: `school-start-${year}`,
            title: 'Hari Pertama Persekolahan',
            description: 'Sesi persekolahan bermula. Pastikan anak bersedia dengan semua kelengkapan.',
            type: 'school',
            date: `${year}-01-02`,
            priority: 'high',
        },
        // MARCH — Mid-term break
        {
            id: `break-mid1-${year}`,
            title: 'Cuti Pertengahan Penggal 1',
            description: 'Semak barang sekolah yang perlu diganti — pensel, pemadam, stokin.',
            type: 'shopping',
            date: `${year}-03-15`,
            endDate: `${year}-03-23`,
            priority: 'medium',
        },
        // MARCH/APRIL — Exam season
        {
            id: `exam-mid1-${year}`,
            title: 'Peperiksaan Pertengahan Tahun',
            description: 'Beli buku latihan tambahan dan alat tulis untuk persediaan peperiksaan.',
            type: 'exam',
            date: `${year}-04-01`,
            endDate: `${year}-04-15`,
            priority: 'medium',
        },
        // MAY/JUNE — Mid-year break
        {
            id: `break-mid-${year}`,
            title: 'Cuti Pertengahan Tahun',
            description: 'Cuti panjang pertengahan tahun. Masa yang baik untuk ganti barang sekolah yang rosak.',
            type: 'school',
            date: `${year}-05-24`,
            endDate: `${year}-06-09`,
            priority: 'low',
        },
        {
            id: `shop-midyear-${year}`,
            title: 'Ganti Barang Sekolah Separuh Tahun',
            description: 'Semak kasut, stokin, beg — mungkin perlu ganti. Anak membesar!',
            type: 'shopping',
            date: `${year}-06-01`,
            endDate: `${year}-06-09`,
            priority: 'medium',
        },
        // AUGUST — Mid-term break 2
        {
            id: `break-mid2-${year}`,
            title: 'Cuti Pertengahan Penggal 2',
            description: 'Cuti pendek. Persediaan untuk peperiksaan akhir tahun.',
            type: 'school',
            date: `${year}-08-17`,
            endDate: `${year}-08-25`,
            priority: 'low',
        },
        // SEPTEMBER/OCTOBER — Final exams
        {
            id: `exam-final-${year}`,
            title: 'Peperiksaan Akhir Tahun',
            description: 'Musim peperiksaan akhir tahun. Beli buku latihan, flash card, dan alat tulis tambahan.',
            type: 'exam',
            date: `${year}-09-15`,
            endDate: `${year}-10-15`,
            priority: 'high',
        },
        // OCTOBER — Registration for NEXT year
        {
            id: `reg-nextyear-${year}`,
            title: 'Pendaftaran Tahun Depan',
            description: 'Daftar anak untuk darjah seterusnya. Semak dengan sekolah untuk tarikh tepat.',
            type: 'registration',
            date: `${year}-10-01`,
            endDate: `${year}-10-31`,
            priority: 'high',
        },
        // NOVEMBER — Year-end break + next year shopping
        {
            id: `break-yearend-${year}`,
            title: 'Cuti Akhir Tahun',
            description: 'Cuti panjang akhir tahun. Mula rancang belanja untuk tahun depan!',
            type: 'school',
            date: `${year}-11-23`,
            endDate: `${year}-12-31`,
            priority: 'low',
        },
    ]
}

export function getUpcomingReminders(reminders, currentDate = new Date()) {
    const now = currentDate.getTime()
    return reminders
        .filter(r => {
            const endDate = r.endDate ? new Date(r.endDate) : new Date(r.date)
            return endDate.getTime() >= now
        })
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function isActiveReminder(reminder, currentDate = new Date()) {
    const now = currentDate.getTime()
    const start = new Date(reminder.date).getTime()
    const end = reminder.endDate ? new Date(reminder.endDate).getTime() : start + 86400000
    return now >= start && now <= end
}

export function formatDateMY(dateStr) {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ms-MY', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}

export function getRelativeTime(dateStr) {
    const now = new Date()
    const target = new Date(dateStr)
    const diffMs = target.getTime() - now.getTime()
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return `${Math.abs(diffDays)} hari lepas`
    if (diffDays === 0) return 'Hari ini!'
    if (diffDays === 1) return 'Esok'
    if (diffDays <= 7) return `${diffDays} hari lagi`
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} minggu lagi`
    return `${Math.ceil(diffDays / 30)} bulan lagi`
}
