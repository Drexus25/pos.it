const POSIT_TRX_STORAGE_KEY = 'posit_transactions_v2';

const DEFAULT_TRANSACTIONS = [];

function getTransactions() {
    const stored = localStorage.getItem(POSIT_TRX_STORAGE_KEY);
    if (stored !== null) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return DEFAULT_TRANSACTIONS;
        }
    }
    localStorage.setItem(POSIT_TRX_STORAGE_KEY, JSON.stringify(DEFAULT_TRANSACTIONS));
    return DEFAULT_TRANSACTIONS;
}

function saveTransactions(transactions) {
    localStorage.setItem(POSIT_TRX_STORAGE_KEY, JSON.stringify(transactions));
}

function getTransactionById(id) {
    const list = getTransactions();
    return list.find(t => t.id === id) ?? null;
}

function getNextTransactionNumber() {
    const list = getTransactions();
    if (list.length === 0) return 1;
    let maxSeq = 0;
    list.forEach(t => {
        if (t.orderSeq && Number(t.orderSeq) > maxSeq) {
            maxSeq = Number(t.orderSeq);
        } else if (t.id && t.id.includes('-')) {
            const parts = t.id.split('-');
            const lastNum = parseInt(parts[parts.length - 1], 10);
            if (!isNaN(lastNum) && lastNum > maxSeq) {
                maxSeq = lastNum;
            }
        }
    });
    return maxSeq + 1;
}

function getNextTransactionId() {
    const nextSeq = getNextTransactionNumber();
    const padded = String(nextSeq).padStart(4, '0');
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear()).slice(-2);
    const dateCode = `${day}${month}${year}`;
    return {
        id: `SJ-${dateCode}-${padded}`,
        order: `Pesanan #${padded}`,
        orderSeq: nextSeq
    };
}

function addTransaction(trxData) {
    const list = getTransactions();
    const nextInfo = getNextTransactionId();
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const defaultIso = `${yyyy}-${mm}-${dd}`;

    const newTrx = {
        id: trxData.id || trxData.trxId || nextInfo.id,
        order: trxData.order || nextInfo.order,
        orderSeq: trxData.orderSeq || nextInfo.orderSeq,
        date: trxData.date || today.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        isoDate: trxData.isoDate || defaultIso,
        time: trxData.time || today.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace(':', '.') + ' WIB',
        timeHour: trxData.timeHour || (String(today.getHours()).padStart(2, '0') + '.00'),
        cashier: trxData.cashier || 'Damar',
        status: trxData.status || 'Berhasil',
        method: trxData.method || 'Tunai',
        items: (trxData.items || []).map(i => ({
            id: i.id,
            name: i.name || i.nama,
            qty: Number(i.qty) || 1,
            unit: i.unit || i.satuan || 'pcs',
            price: Number(i.price || i.harga) || 0,
            subtotal: Number(i.subtotal) || ((Number(i.qty) || 1) * (Number(i.price || i.harga) || 0))
        })),
        subtotal: Number(trxData.subtotal) || 0,
        tax: Number(trxData.tax) || 0,
        total: Number(trxData.total) || 0,
        received: Number(trxData.received) || Number(trxData.total) || 0,
        change: Number(trxData.change) || 0,
        notes: trxData.notes || ''
    };

    list.unshift(newTrx);
    saveTransactions(list);
    return newTrx;
}

function getTransactionStats(customList) {
    const list = customList !== undefined ? customList : getTransactions();

    let totalPenjualan = 0;
    let totalItem = 0;
    let tunaiTotal = 0;
    let tunaiCount = 0;
    let qrisTotal = 0;
    let qrisCount = 0;

    const productMap = {};
    const hourlyMap = {};

    list.forEach(trx => {
        const amt = Number(trx.total) || 0;
        totalPenjualan += amt;

        if (trx.method === 'Tunai') {
            tunaiTotal += amt;
            tunaiCount++;
        } else if (trx.method === 'QRIS') {
            qrisTotal += amt;
            qrisCount++;
        }

        let hr = trx.timeHour;
        if (!hr && trx.time) {
            const match = trx.time.match(/^(\d{1,2})/);
            if (match) hr = match[1].padStart(2, '0') + '.00';
        }
        if (!hr) hr = '00.00';
        hourlyMap[hr] = (hourlyMap[hr] || 0) + amt;

        (trx.items || []).forEach(item => {
            const qty = Number(item.qty) || 1;
            const itemTotal = Number(item.subtotal) || (qty * (Number(item.price) || 0));
            totalItem += qty;

            const key = item.name || 'Produk';
            if (!productMap[key]) {
                productMap[key] = {
                    name: key,
                    qty: 0,
                    unit: item.unit || 'pcs',
                    revenue: 0
                };
            }
            productMap[key].qty += qty;
            productMap[key].revenue += itemTotal;
        });
    });

    const topProducts = Object.values(productMap).sort((a, b) => b.qty - a.qty || b.revenue - a.revenue);

    let peakHour = '09.00';
    let peakAmount = 0;
    Object.keys(hourlyMap).forEach(hr => {
        if (hourlyMap[hr] > peakAmount) {
            peakAmount = hourlyMap[hr];
            peakHour = hr;
        }
    });

    const peakPct = totalPenjualan > 0 ? ((peakAmount / totalPenjualan) * 100).toFixed(1) : 0;
    const avgPerTrx = list.length > 0 ? Math.round(totalPenjualan / list.length) : 0;
    const avgItemsPerTrx = list.length > 0 ? (totalItem / list.length).toFixed(2) : 0;

    return {
        totalPenjualan,
        totalTransaksi: list.length,
        totalItem,
        tunaiTotal,
        tunaiCount,
        qrisTotal,
        qrisCount,
        avgPerTrx,
        avgItemsPerTrx,
        topProducts,
        hourlyMap,
        peakHour,
        peakAmount,
        peakPct
    };
}

function formatHarga(angka) {
    return 'Rp' + Number(angka).toLocaleString('id-ID');
}
