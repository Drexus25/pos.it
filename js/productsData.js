const POSIT_STORAGE_KEY = 'posit_products_v2';

const DEFAULT_PRODUCTS = [];

function getProducts() {
    const stored = localStorage.getItem(POSIT_STORAGE_KEY);
    if (stored !== null) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return [];
        }
    }
    localStorage.setItem(POSIT_STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
}

function saveProducts(products) {
    localStorage.setItem(POSIT_STORAGE_KEY, JSON.stringify(products));
}

function getProductById(id) {
    return getProducts().find(p => p.id === id) ?? null;
}

function addProduct(product) {
    const products = getProducts();
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = { id: newId, ...product };
    products.push(newProduct);
    saveProducts(products);
    return newProduct;
}

function updateProduct(id, updates) {
    const products = getProducts();
    const idx = products.findIndex(p => p.id === id);
    if (idx !== -1) {
        products[idx] = { ...products[idx], ...updates };
        saveProducts(products);
        return products[idx];
    }
    return null;
}

function deleteProduct(id) {
    const products = getProducts().filter(p => p.id !== id);
    saveProducts(products);
}

function formatHarga(angka) {
    return 'Rp' + Number(angka).toLocaleString('id-ID');
}

function getProductIconSvg(p, size = 44) {
    if (p && p.image) {
        return `<img src="${p.image}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;" alt="${p.nama || ''}" />`;
    }
    const name = ((p && p.nama) || '').toLowerCase();
    const kat = ((p && p.kategori) || '').toLowerCase();
    const isGreen = (p && p.iconGreen) || name.includes('matcha');

    if (isGreen) {
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`;
    }
    if (name.includes('croissant') || name.includes('pastry')) {
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m4.6 13.4 3-3a6.5 6.5 0 0 1 9.2 0l3 3a2 2 0 0 1-2.8 2.8l-1.4-1.4a8 8 0 0 0-3.6-1.8 8 8 0 0 0-3.6 1.8l-1.4 1.4a2 2 0 0 1-2.4-2.8z"/><path d="m8.5 7.5 1.5 2.5"/><path d="m15.5 7.5-1.5 2.5"/></svg>`;
    }
    if (name.includes('roti') || name.includes('sandwich') || name.includes('toast') || kat === 'makanan' || (p && p.icon === 'bi-bookmark')) {
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 9-7 9 7v2H3z"/><path d="M3 13h18v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="M7 13v2"/><path d="M17 13v2"/></svg>`;
    }
    if (name.includes('teh') || name.includes('lemon') || name.includes('jus') || name.includes('straw') || name.includes('juice')) {
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m19 8-1.5 12.5a2 2 0 0 1-2 1.5H8.5a2 2 0 0 1-2-1.5L5 8"/><line x1="4" y1="8" x2="20" y2="8"/><line x1="14" y1="2" x2="11" y2="8"/></svg>`;
    }
    if (kat === 'minuman' || name.includes('kopi') || name.includes('coffee') || name.includes('latte') || name.includes('espresso') || name.includes('cappuccino')) {
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="2" x2="6" y2="4"></line><line x1="10" y1="2" x2="10" y2="4"></line><line x1="14" y1="2" x2="14" y2="4"></line></svg>`;
    }
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`;
}

function resetProducts() {
    localStorage.setItem(POSIT_STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
}
