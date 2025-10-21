export interface CountryData {
  code: string
  dialCode: string
  name: string
}

// Manual list of Spanish and English speaking countries
const COUNTRIES_DATA: CountryData[] = [
  // Spanish speaking countries
  { code: "AR", dialCode: "+54", name: "Argentina" },
  { code: "BO", dialCode: "+591", name: "Bolivia" },
  { code: "CL", dialCode: "+56", name: "Chile" },
  { code: "CO", dialCode: "+57", name: "Colombia" },
  { code: "CR", dialCode: "+506", name: "Costa Rica" },
  { code: "CU", dialCode: "+53", name: "Cuba" },
  { code: "DO", dialCode: "+1", name: "República Dominicana" },
  { code: "EC", dialCode: "+593", name: "Ecuador" },
  { code: "SV", dialCode: "+503", name: "El Salvador" },
  { code: "ES", dialCode: "+34", name: "España" },
  { code: "GT", dialCode: "+502", name: "Guatemala" },
  { code: "HN", dialCode: "+504", name: "Honduras" },
  { code: "MX", dialCode: "+52", name: "México" },
  { code: "NI", dialCode: "+505", name: "Nicaragua" },
  { code: "PA", dialCode: "+507", name: "Panamá" },
  { code: "PY", dialCode: "+595", name: "Paraguay" },
  { code: "PE", dialCode: "+51", name: "Perú" },
  { code: "PR", dialCode: "+1", name: "Puerto Rico" },
  { code: "UY", dialCode: "+598", name: "Uruguay" },
  { code: "VE", dialCode: "+58", name: "Venezuela" },

  // English speaking countries
  { code: "AU", dialCode: "+61", name: "Australia" },
  { code: "BS", dialCode: "+1", name: "Bahamas" },
  { code: "BB", dialCode: "+1", name: "Barbados" },
  { code: "BZ", dialCode: "+501", name: "Belice" },
  { code: "CA", dialCode: "+1", name: "Canadá" },
  { code: "GB", dialCode: "+44", name: "Reino Unido" },
  { code: "IE", dialCode: "+353", name: "Irlanda" },
  { code: "JM", dialCode: "+1", name: "Jamaica" },
  { code: "NZ", dialCode: "+64", name: "Nueva Zelanda" },
  { code: "SG", dialCode: "+65", name: "Singapur" },
  { code: "ZA", dialCode: "+27", name: "Sudáfrica" },
  { code: "US", dialCode: "+1", name: "Estados Unidos" },
]

const SORTED_COUNTRIES = [...COUNTRIES_DATA].sort((a, b) => a.name.localeCompare(b.name, "es"))

export const getCountries = (): CountryData[] => {
  return SORTED_COUNTRIES
}

export const getCountryByCode = (code: string): CountryData | undefined => {
  return COUNTRIES_DATA.find((c) => c.code === code.toUpperCase())
}

export const getDialCode = (countryCode: string): string => {
  return getCountryByCode(countryCode)?.dialCode || "+51" // Default to Peru
}

export const filterCountries = (searchTerm: string): CountryData[] => {
  if (!searchTerm.trim()) return SORTED_COUNTRIES

  const term = searchTerm.toLowerCase()
  return SORTED_COUNTRIES.filter(
    (country) =>
      country.name.toLowerCase().includes(term) ||
      country.code.toLowerCase().includes(term) ||
      country.dialCode.includes(term),
  )
}
