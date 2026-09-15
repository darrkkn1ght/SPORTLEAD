export interface AfricanCountry {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

export const AFRICAN_COUNTRIES: AfricanCountry[] = [
  { name: 'Algeria', code: 'DZ', dialCode: '+213', flag: '🇩🇿' },
  { name: 'Angola', code: 'AO', dialCode: '+244', flag: '🇦🇴' },
  { name: 'Benin', code: 'BJ', dialCode: '+229', flag: '🇧🇯' },
  { name: 'Botswana', code: 'BW', dialCode: '+267', flag: '🇧🇼' },
  { name: 'Burkina Faso', code: 'BF', dialCode: '+226', flag: '🇧🇫' },
  { name: 'Burundi', code: 'BI', dialCode: '+257', flag: '🇧🇮' },
  { name: 'Cabo Verde', code: 'CV', dialCode: '+238', flag: '🇨🇻' },
  { name: 'Cameroon', code: 'CM', dialCode: '+237', flag: '🇨🇲' },
  { name: 'Central African Republic', code: 'CF', dialCode: '+236', flag: '🇨🇫' },
  { name: 'Chad', code: 'TD', dialCode: '+235', flag: '🇹🇩' },
  { name: 'Comoros', code: 'KM', dialCode: '+269', flag: '🇰🇲' },
  { name: 'Congo', code: 'CG', dialCode: '+242', flag: '🇨🇬' },
  { name: "Côte d'Ivoire", code: 'CI', dialCode: '+225', flag: '🇨🇮' },
  { name: 'DR Congo', code: 'CD', dialCode: '+243', flag: '🇨🇩' },
  { name: 'Djibouti', code: 'DJ', dialCode: '+253', flag: '🇩🇯' },
  { name: 'Egypt', code: 'EG', dialCode: '+20', flag: '🇪🇬' },
  { name: 'Equatorial Guinea', code: 'GQ', dialCode: '+240', flag: '🇬🇶' },
  { name: 'Eritrea', code: 'ER', dialCode: '+291', flag: '🇪🇷' },
  { name: 'Eswatini', code: 'SZ', dialCode: '+268', flag: '🇸🇿' },
  { name: 'Ethiopia', code: 'ET', dialCode: '+251', flag: '🇪🇹' },
  { name: 'Gabon', code: 'GA', dialCode: '+241', flag: '🇬🇦' },
  { name: 'Gambia', code: 'GM', dialCode: '+220', flag: '🇬🇲' },
  { name: 'Ghana', code: 'GH', dialCode: '+233', flag: '🇬🇭' },
  { name: 'Guinea', code: 'GN', dialCode: '+224', flag: '🇬🇳' },
  { name: 'Guinea-Bissau', code: 'GW', dialCode: '+245', flag: '🇬🇼' },
  { name: 'Kenya', code: 'KE', dialCode: '+254', flag: '🇰🇪' },
  { name: 'Lesotho', code: 'LS', dialCode: '+266', flag: '🇱🇸' },
  { name: 'Liberia', code: 'LR', dialCode: '+231', flag: '🇱🇷' },
  { name: 'Libya', code: 'LY', dialCode: '+218', flag: '🇱🇾' },
  { name: 'Madagascar', code: 'MG', dialCode: '+261', flag: '🇲🇬' },
  { name: 'Malawi', code: 'MW', dialCode: '+265', flag: '🇲🇼' },
  { name: 'Mali', code: 'ML', dialCode: '+223', flag: '🇲🇱' },
  { name: 'Mauritania', code: 'MR', dialCode: '+222', flag: '🇲🇷' },
  { name: 'Mauritius', code: 'MU', dialCode: '+230', flag: '🇲🇺' },
  { name: 'Morocco', code: 'MA', dialCode: '+212', flag: '🇲🇦' },
  { name: 'Mozambique', code: 'MZ', dialCode: '+258', flag: '🇲🇿' },
  { name: 'Namibia', code: 'NA', dialCode: '+264', flag: '🇳🇦' },
  { name: 'Niger', code: 'NE', dialCode: '+227', flag: '🇳🇪' },
  { name: 'Nigeria', code: 'NG', dialCode: '+234', flag: '🇳🇬' },
  { name: 'Rwanda', code: 'RW', dialCode: '+250', flag: '🇷🇼' },
  { name: 'São Tomé and Príncipe', code: 'ST', dialCode: '+239', flag: '🇸🇹' },
  { name: 'Senegal', code: 'SN', dialCode: '+221', flag: '🇸🇳' },
  { name: 'Seychelles', code: 'SC', dialCode: '+248', flag: '🇸🇨' },
  { name: 'Sierra Leone', code: 'SL', dialCode: '+232', flag: '🇸🇱' },
  { name: 'Somalia', code: 'SO', dialCode: '+252', flag: '🇸🇴' },
  { name: 'South Africa', code: 'ZA', dialCode: '+27', flag: '🇿🇦' },
  { name: 'South Sudan', code: 'SS', dialCode: '+211', flag: '🇸🇸' },
  { name: 'Sudan', code: 'SD', dialCode: '+249', flag: '🇸🇩' },
  { name: 'Tanzania', code: 'TZ', dialCode: '+255', flag: '🇹🇿' },
  { name: 'Togo', code: 'TG', dialCode: '+228', flag: '🇹🇬' },
  { name: 'Tunisia', code: 'TN', dialCode: '+216', flag: '🇹🇳' },
  { name: 'Uganda', code: 'UG', dialCode: '+256', flag: '🇺🇬' },
  { name: 'Zambia', code: 'ZM', dialCode: '+260', flag: '🇿🇲' },
  { name: 'Zimbabwe', code: 'ZW', dialCode: '+263', flag: '🇿🇼' },
];

export const COUNTRIES = AFRICAN_COUNTRIES;

export const COUNTRY_OPTIONS = AFRICAN_COUNTRIES.map((c) => ({
  label: `${c.flag} ${c.name} (${c.dialCode})`,
  value: c.name,
}));

export const DIAL_CODE_OPTIONS = AFRICAN_COUNTRIES.map((c) => ({
  label: `${c.flag} ${c.code} (${c.dialCode})`,
  value: c.dialCode,
  country: c.name,
}));

export function getCountryDialCode(countryName: string): string | undefined {
  if (!countryName) return undefined;
  const match = AFRICAN_COUNTRIES.find(
    (c) => c.name.toLowerCase() === countryName.trim().toLowerCase()
  );
  return match?.dialCode;
}

export function getCountryByDialCode(dialCode: string): AfricanCountry | undefined {
  if (!dialCode) return undefined;
  return AFRICAN_COUNTRIES.find((c) => c.dialCode === dialCode.trim());
}

export function updatePhoneWithCountry(
  currentPhone: string,
  newCountryName: string,
  previousCountryName?: string
): string {
  const newDialCode = getCountryDialCode(newCountryName);
  if (!newDialCode) return currentPhone;

  const prevDialCode = previousCountryName ? getCountryDialCode(previousCountryName) : undefined;
  const trimmedPhone = (currentPhone || '').trim();

  if (!trimmedPhone) {
    return `${newDialCode} `;
  }

  if (prevDialCode && trimmedPhone.startsWith(prevDialCode)) {
    const remainder = trimmedPhone.slice(prevDialCode.length).trim();
    return remainder ? `${newDialCode} ${remainder}` : `${newDialCode} `;
  }

  // Sort dial codes by length descending
  const sortedDialCodes = Array.from(new Set(AFRICAN_COUNTRIES.map((c) => c.dialCode))).sort(
    (a, b) => b.length - a.length
  );

  for (const code of sortedDialCodes) {
    if (trimmedPhone.startsWith(code)) {
      const remainder = trimmedPhone.slice(code.length).trim();
      return remainder ? `${newDialCode} ${remainder}` : `${newDialCode} `;
    }
  }

  const cleanLocal = trimmedPhone.replace(/^0+/, '');
  return `${newDialCode} ${cleanLocal}`;
}
