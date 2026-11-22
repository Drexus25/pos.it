/**
 * companyProfile.js
 * Centralized data and utilities for Company / Business Profile
 */

const COMPANY_PROFILE_KEY = 'posit_business_profile';

const DEFAULT_COMPANY_PROFILE = {
    name: '',
    type: '',
    address: '',
    phone: '',
    email: '',
    logo: null
};

function getCompanyProfile() {
    try {
        const saved = localStorage.getItem(COMPANY_PROFILE_KEY);
        if (saved) {
            return { ...DEFAULT_COMPANY_PROFILE, ...JSON.parse(saved) };
        }
    } catch (e) {}
    return { ...DEFAULT_COMPANY_PROFILE };
}

function saveCompanyProfile(profile) {
    try {
        localStorage.setItem(COMPANY_PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {}
    updateSidebarBusiness();
}

function clearCompanyProfile() {
    try {
        localStorage.removeItem(COMPANY_PROFILE_KEY);
    } catch (e) {}
    updateSidebarBusiness();
}

function updateSidebarBusiness() {
    const profile = getCompanyProfile();

    const nameElements = document.querySelectorAll('.sidebar-business-name, #sidebarBusinessName');
    nameElements.forEach(el => {
        el.textContent = profile.name || '';
    });

    const typeElements = document.querySelectorAll('.sidebar-business-type, #sidebarBusinessType');
    typeElements.forEach(el => {
        const typeStr = profile.type ? `Usaha ${profile.type.toLowerCase()}` : '';
        el.textContent = typeStr;
    });

    const iconElements = document.querySelectorAll('.sidebar-business-icon');
    iconElements.forEach(el => {
        if (profile.logo) {
            el.innerHTML = `<img src="${profile.logo}" alt="Logo" style="width: 100%; height: 100%; border-radius: 7px; object-fit: cover;" />`;
        } else {
            el.innerHTML = `<i class="bi bi-shop"></i>`;
        }
    });
}

// Backward compatibility aliases
function loadProfile() {
    return getCompanyProfile();
}

function saveProfile(data) {
    saveCompanyProfile(data);
}

// Automatically update sidebar when DOM is loaded
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateSidebarBusiness);
    } else {
        updateSidebarBusiness();
    }
}
