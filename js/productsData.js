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

function resetProducts() {
    localStorage.setItem(POSIT_STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
}
