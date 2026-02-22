// ═══════════════════════════════════════════
// Product Catalog — School Supplies for Malaysian Kids
// ═══════════════════════════════════════════

export const PRODUCT_CATEGORIES = [
    { id: 'all', label: '🌟 Semua', icon: 'Star' },
    { id: 'uniform', label: '🎽 Pakaian', icon: 'Shirt' },
    { id: 'stationery', label: '✏️ Alat Tulis', icon: 'Pencil' },
    { id: 'bags', label: '🎒 Beg', icon: 'Backpack' },
    { id: 'books', label: '📚 Buku', icon: 'Book' },
    { id: 'shoes', label: '👟 Kasut', icon: 'Footprints' },
    { id: 'tech', label: '💻 Teknologi', icon: 'Laptop' },
]

export const PRODUCTS = [
    // UNIFORMS
    {
        id: 'prod-1',
        name: 'Set Lengkap Baju Sekolah Rendah',
        description: 'Baju putih + seluar/kain biru gelap. Kain berkualiti, tahan lama.',
        category: 'uniform',
        price: 45.90,
        originalPrice: 59.90,
        rating: 4.5,
        reviews: 2341,
        image: '🎽',
        link: 'https://www.lazada.com.my/catalog/?q=set+baju+sekolah+rendah',
        tags: ['Popular', 'Jimat'],
        darjah: [1, 2, 3, 4, 5, 6],
    },
    {
        id: 'prod-2',
        name: 'Baju Sukan Sekolah (Set)',
        description: 'T-shirt + seluar track sukan sekolah. Kain sejuk, mudah kering.',
        category: 'uniform',
        price: 29.90,
        originalPrice: 39.90,
        rating: 4.3,
        reviews: 1205,
        image: '👕',
        link: 'https://www.lazada.com.my/catalog/?q=baju+sukan+sekolah',
        tags: ['Best Seller'],
        darjah: [1, 2, 3, 4, 5, 6],
    },
    // STATIONERY
    {
        id: 'prod-3',
        name: 'Set Alat Tulis Lengkap Darjah 1',
        description: 'Pensel 2B, pemadam, pengasah, pembaris, pensel warna 12 warna, gunting, gam — semua dalam 1 set!',
        category: 'stationery',
        price: 19.90,
        originalPrice: 35.00,
        rating: 4.7,
        reviews: 5621,
        image: '✏️',
        link: 'https://www.lazada.com.my/catalog/?q=set+alat+tulis+sekolah',
        tags: ['Top Pick', 'Jimat'],
        darjah: [1, 2, 3],
    },
    {
        id: 'prod-4',
        name: 'Faber-Castell Pensel 2B (12pcs)',
        description: 'Pensel 2B original Faber-Castell. Tulis licin, tahan lama.',
        category: 'stationery',
        price: 8.50,
        rating: 4.8,
        reviews: 8932,
        image: '✏️',
        link: 'https://www.lazada.com.my/catalog/?q=faber+castell+2b',
        tags: ['Best Seller'],
        darjah: [1, 2, 3, 4, 5, 6],
    },
    {
        id: 'prod-5',
        name: 'Set Geometri Matematik (7-in-1)',
        description: 'Jangka lukis, protraktor, sesiku, pembaris T — lengkap untuk matematik.',
        category: 'stationery',
        price: 12.90,
        originalPrice: 18.90,
        rating: 4.4,
        reviews: 1834,
        image: '📐',
        link: 'https://www.lazada.com.my/catalog/?q=set+geometri+sekolah',
        tags: ['Darjah 4-6'],
        darjah: [4, 5, 6],
    },
    {
        id: 'prod-6',
        name: 'Kalkulator Saintifik Casio FX-350MS',
        description: 'Kalkulator saintifik original. Diluluskan untuk peperiksaan.',
        category: 'stationery',
        price: 45.00,
        originalPrice: 55.00,
        rating: 4.9,
        reviews: 12431,
        image: '🧮',
        link: 'https://www.lazada.com.my/catalog/?q=kalkulator+saintifik+casio',
        tags: ['Darjah 4-6', 'Original'],
        darjah: [4, 5, 6],
    },
    // BAGS
    {
        id: 'prod-7',
        name: 'Beg Sekolah Ergonomik Kanak-Kanak',
        description: 'Ringan, tahan air, padding belakang selesa. Pelbagai warna & corak.',
        category: 'bags',
        price: 49.90,
        originalPrice: 79.90,
        rating: 4.6,
        reviews: 3456,
        image: '🎒',
        link: 'https://www.lazada.com.my/catalog/?q=beg+sekolah+ergonomik',
        tags: ['Popular', 'Jimat'],
        darjah: [1, 2, 3, 4, 5, 6],
    },
    {
        id: 'prod-8',
        name: 'Botol Air BPA-Free 750ml',
        description: 'Botol air tahan bocor, BPA-free. Ada straw, senang minum.',
        category: 'bags',
        price: 15.90,
        originalPrice: 22.90,
        rating: 4.5,
        reviews: 6789,
        image: '🥤',
        link: 'https://www.lazada.com.my/catalog/?q=botol+air+sekolah+bpa+free',
        tags: ['Best Seller'],
        darjah: [1, 2, 3, 4, 5, 6],
    },
    {
        id: 'prod-9',
        name: 'Lunch Box Stainless Steel 3-Layer',
        description: 'Bekas makanan tahan panas, 3 bahagian. Mudah cuci.',
        category: 'bags',
        price: 25.90,
        originalPrice: 39.90,
        rating: 4.4,
        reviews: 2345,
        image: '🍱',
        link: 'https://www.lazada.com.my/catalog/?q=lunch+box+stainless+steel',
        tags: ['Jimat'],
        darjah: [1, 2, 3, 4, 5, 6],
    },
    // BOOKS
    {
        id: 'prod-10',
        name: 'Set Buku Latihan Sekolah (20 buku)',
        description: 'Buku latihan 80 muka surat. Untuk latihan harian semua subjek.',
        category: 'books',
        price: 15.90,
        originalPrice: 24.00,
        rating: 4.3,
        reviews: 4567,
        image: '📓',
        link: 'https://www.lazada.com.my/catalog/?q=buku+latihan+sekolah',
        tags: ['Best Seller'],
        darjah: [1, 2, 3, 4, 5, 6],
    },
    {
        id: 'prod-11',
        name: 'Buku Rujukan UPSR - Bahasa Melayu',
        description: 'Nota ringkas + latihan format UPSR. Dengan jawapan.',
        category: 'books',
        price: 18.90,
        rating: 4.6,
        reviews: 3210,
        image: '📖',
        link: 'https://www.lazada.com.my/catalog/?q=buku+rujukan+upsr+bm',
        tags: ['Darjah 4-6', 'UPSR'],
        darjah: [4, 5, 6],
    },
    // SHOES
    {
        id: 'prod-12',
        name: 'Kasut Sekolah Putih PALLAS',
        description: 'Kasut sekolah putih original PALLAS. Tahan lama, selesa.',
        category: 'shoes',
        price: 35.90,
        originalPrice: 45.90,
        rating: 4.7,
        reviews: 15678,
        image: '👟',
        link: 'https://www.lazada.com.my/catalog/?q=kasut+sekolah+pallas',
        tags: ['Top Pick', 'Original'],
        darjah: [1, 2, 3, 4, 5, 6],
    },
    {
        id: 'prod-13',
        name: 'Kasut Sukan Budak (Velcro)',
        description: 'Kasut sukan ringan dengan velcro — senang pakai sendiri.',
        category: 'shoes',
        price: 29.90,
        originalPrice: 49.90,
        rating: 4.4,
        reviews: 5432,
        image: '👟',
        link: 'https://www.lazada.com.my/catalog/?q=kasut+sukan+budak+velcro',
        tags: ['Popular', 'Jimat'],
        darjah: [1, 2, 3],
    },
    {
        id: 'prod-14',
        name: 'Stokin Sekolah Putih (6 pasang)',
        description: 'Stokin cotton putih, anti-bakteria. Set jimat 6 pasang.',
        category: 'shoes',
        price: 12.90,
        originalPrice: 18.00,
        rating: 4.2,
        reviews: 8765,
        image: '🧦',
        link: 'https://www.lazada.com.my/catalog/?q=stokin+sekolah+putih',
        tags: ['Jimat'],
        darjah: [1, 2, 3, 4, 5, 6],
    },
    // TECH
    {
        id: 'prod-15',
        name: 'Tablet Pendidikan Kanak-Kanak',
        description: 'Tablet 7" dengan apps pendidikan BM, BI, Matematik. Kawalan ibu bapa.',
        category: 'tech',
        price: 199.00,
        originalPrice: 299.00,
        rating: 4.1,
        reviews: 1234,
        image: '📱',
        link: 'https://www.lazada.com.my/catalog/?q=tablet+pendidikan+kanak',
        tags: ['Premium'],
        darjah: [1, 2, 3, 4, 5, 6],
    },
    {
        id: 'prod-16',
        name: 'Pensel Warna Faber-Castell (24 Warna)',
        description: 'Warna terang, mudah diguna. Sesuai untuk PSV dan lukisan.',
        category: 'stationery',
        price: 14.90,
        originalPrice: 19.90,
        rating: 4.8,
        reviews: 9876,
        image: '🖍️',
        link: 'https://www.lazada.com.my/catalog/?q=pensel+warna+faber+castell+24',
        tags: ['Best Seller', 'Original'],
        darjah: [1, 2, 3, 4, 5, 6],
    },
]

export function getProductsByCategory(categoryId) {
    if (categoryId === 'all') return PRODUCTS
    return PRODUCTS.filter(p => p.category === categoryId)
}

export function getProductsByDarjah(darjah) {
    return PRODUCTS.filter(p => p.darjah.includes(darjah))
}

export function getProductsBySearch(query) {
    const q = query.toLowerCase()
    return PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
    )
}

export function formatPrice(price) {
    return `RM ${price.toFixed(2)}`
}

export function getDiscount(originalPrice, price) {
    if (!originalPrice) return 0
    return Math.round(((originalPrice - price) / originalPrice) * 100)
}
