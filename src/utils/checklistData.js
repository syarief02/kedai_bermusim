// ═══════════════════════════════════════════
// School Supply Checklists by Darjah Level
// ═══════════════════════════════════════════

export const DARJAH_LEVELS = [
    { value: 1, label: 'Darjah 1' },
    { value: 2, label: 'Darjah 2' },
    { value: 3, label: 'Darjah 3' },
    { value: 4, label: 'Darjah 4' },
    { value: 5, label: 'Darjah 5' },
    { value: 6, label: 'Darjah 6' },
]

export const SUPPLY_CATEGORIES = {
    uniform: '🎽 Pakaian Sekolah',
    stationery: '✏️ Alat Tulis',
    bags: '🎒 Beg & Aksesori',
    books: '📚 Buku',
    shoes: '👟 Kasut & Stokin',
    extras: '🎨 Tambahan',
}

// Items common across all darjah levels
const COMMON_ITEMS = [
    { id: 'uniform-shirt', name: 'Baju Sekolah (2-3 helai)', category: 'uniform', price: 25, link: 'https://www.lazada.com.my/catalog/?q=baju+sekolah+rendah' },
    { id: 'uniform-pants', name: 'Seluar/Kain Sekolah (2-3 helai)', category: 'uniform', price: 20, link: 'https://www.lazada.com.my/catalog/?q=seluar+sekolah+rendah' },
    { id: 'uniform-pe', name: 'Baju Sukan (T-shirt + Seluar)', category: 'uniform', price: 30, link: 'https://www.lazada.com.my/catalog/?q=baju+sukan+sekolah' },
    { id: 'shoes-white', name: 'Kasut Sekolah Putih', category: 'shoes', price: 35, link: 'https://www.lazada.com.my/catalog/?q=kasut+sekolah+putih' },
    { id: 'shoes-socks', name: 'Stokin Sekolah Putih (3 pasang)', category: 'shoes', price: 8, link: 'https://www.lazada.com.my/catalog/?q=stokin+sekolah+putih' },
    { id: 'shoes-sport', name: 'Kasut Sukan', category: 'shoes', price: 40, link: 'https://www.lazada.com.my/catalog/?q=kasut+sukan+budak' },
    { id: 'bag-school', name: 'Beg Sekolah', category: 'bags', price: 50, link: 'https://www.lazada.com.my/catalog/?q=beg+sekolah+rendah' },
    { id: 'bag-water', name: 'Botol Air', category: 'bags', price: 15, link: 'https://www.lazada.com.my/catalog/?q=botol+air+sekolah' },
    { id: 'bag-lunchbox', name: 'Bekas Makanan / Lunch Box', category: 'bags', price: 12, link: 'https://www.lazada.com.my/catalog/?q=lunch+box+budak' },
    { id: 'stat-pencil', name: 'Pensel 2B (1 kotak)', category: 'stationery', price: 5, link: 'https://www.lazada.com.my/catalog/?q=pensel+2b' },
    { id: 'stat-eraser', name: 'Pemadam', category: 'stationery', price: 2, link: 'https://www.lazada.com.my/catalog/?q=pemadam' },
    { id: 'stat-sharpener', name: 'Pengasah Pensel', category: 'stationery', price: 3, link: 'https://www.lazada.com.my/catalog/?q=pengasah+pensel' },
    { id: 'stat-ruler', name: 'Pembaris 30cm', category: 'stationery', price: 3, link: 'https://www.lazada.com.my/catalog/?q=pembaris+30cm' },
    { id: 'stat-color', name: 'Pensel Warna (12 warna)', category: 'stationery', price: 8, link: 'https://www.lazada.com.my/catalog/?q=pensel+warna+12' },
    { id: 'stat-glue', name: 'Gam', category: 'stationery', price: 3, link: 'https://www.lazada.com.my/catalog/?q=gam+sekolah' },
    { id: 'stat-scissors', name: 'Gunting Kecil', category: 'stationery', price: 4, link: 'https://www.lazada.com.my/catalog/?q=gunting+sekolah' },
    { id: 'book-exercise', name: 'Buku Latihan Bertulisan (10 buku)', category: 'books', price: 10, link: 'https://www.lazada.com.my/catalog/?q=buku+latihan+sekolah' },
    { id: 'book-draw', name: 'Buku Lukisan', category: 'books', price: 5, link: 'https://www.lazada.com.my/catalog/?q=buku+lukisan' },
]

// Extra items by darjah groups
const LOWER_PRIMARY_EXTRAS = [
    { id: 'extra-nametag', name: 'Name Tag / Label Nama', category: 'extras', price: 10, link: 'https://www.lazada.com.my/catalog/?q=name+tag+sekolah' },
    { id: 'extra-raincoat', name: 'Payung / Baju Hujan Kecil', category: 'extras', price: 15, link: 'https://www.lazada.com.my/catalog/?q=payung+budak' },
]

const UPPER_PRIMARY_EXTRAS = [
    { id: 'stat-pen', name: 'Pen Biru & Merah', category: 'stationery', price: 5, link: 'https://www.lazada.com.my/catalog/?q=pen+biru+sekolah' },
    { id: 'stat-geometry', name: 'Set Geometri (Jangka Lukis, Protraktor)', category: 'stationery', price: 12, link: 'https://www.lazada.com.my/catalog/?q=set+geometri' },
    { id: 'stat-calculator', name: 'Kalkulator Saintifik', category: 'stationery', price: 25, link: 'https://www.lazada.com.my/catalog/?q=kalkulator+saintifik' },
    { id: 'book-reference', name: 'Buku Rujukan UPSR', category: 'books', price: 20, link: 'https://www.lazada.com.my/catalog/?q=buku+rujukan+upsr' },
]

export function getChecklistForDarjah(darjah) {
    const items = [...COMMON_ITEMS]

    if (darjah <= 3) {
        items.push(...LOWER_PRIMARY_EXTRAS)
    } else {
        items.push(...UPPER_PRIMARY_EXTRAS)
    }

    // Add darjah-specific textbooks
    items.push({
        id: `book-text-${darjah}`,
        name: `Buku Teks Darjah ${darjah} (set lengkap)`,
        category: 'books',
        price: 0,
        link: 'https://www.lazada.com.my/catalog/?q=buku+teks+darjah+' + darjah,
        note: 'Biasanya diberikan percuma oleh sekolah (SPBT)',
    })

    return items.map((item, idx) => ({
        ...item,
        darjah,
        sortOrder: idx,
    }))
}

export function getTotalEstimate(items) {
    return items.reduce((sum, item) => sum + (item.price || 0), 0)
}
