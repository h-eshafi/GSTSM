import megaMenuDataRaw from '../data/menus.json';

const MENU_STORAGE_KEY = 'gst_mega_menu_data';

export function getMenuData(): Record<string, any> {
  if (typeof window === 'undefined') return megaMenuDataRaw;
  try {
    const saved = localStorage.getItem(MENU_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading menu data from localStorage:', e);
  }
  return megaMenuDataRaw;
}

export function saveMenuData(data: Record<string, any>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event('gst_menu_updated'));
  } catch (e) {
    console.error('Error saving menu data to localStorage:', e);
  }
}

export function addPageToNavbarMenu(pageTitle: string, pageSlug: string, categoryKey: string): void {
  if (!categoryKey || !pageSlug) return;
  
  const currentMenu = getMenuData();
  const catData = currentMenu[categoryKey];
  
  if (!catData || !catData.columns || catData.columns.length === 0) return;

  const targetHref = `/pages/${pageSlug}`;
  
  // Check if link already exists in any column
  let exists = false;
  catData.columns.forEach((col: any) => {
    col.links.forEach((l: any) => {
      if (l.href === targetHref || l.href.endsWith(`/${pageSlug}`)) {
        exists = true;
      }
    });
  });

  if (!exists) {
    // Add to the first column by default
    catData.columns[0].links.push({
      label: pageTitle,
      href: targetHref
    });
    saveMenuData(currentMenu);
  }
}
