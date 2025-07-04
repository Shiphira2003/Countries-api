import React, { useState, useEffect } from 'react';
import { Search, ChevronDown,Sun, Moon, ArrowLeft } from 'lucide-react';
import countryData from "../assets/data.json";
import { type Country } from '../types/Types';


const CountriesApp: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  useEffect(() => {
    const formattedData: Country[] = countryData.map((country: any) => ({
      name: country.name,
      nativeName: country.nativeName || country.name,
      population: country.population,
      region: country.region,
      subregion: country.subregion,
      capital: country.capital,
      flag: country.flags?.svg || country.flag, 
      tld: country.topLevelDomain?.[0] || '',
      currencies: country.currencies ? country.currencies.map((c: any) => c.name).join(', ') : 'N/A',
      languages: country.languages ? country.languages.map((l: any) => l.name).join(', ') : 'N/A',
      borders: country.borders || [],
      cca3: country.alpha3Code
    }));

    setCountries(formattedData);
    setFilteredCountries(formattedData);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = countries;

    if (searchTerm) {
      filtered = filtered.filter((country: Country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedRegion) {
      filtered = filtered.filter(country => country.region === selectedRegion);
    }

    setFilteredCountries(filtered);
  }, [searchTerm, selectedRegion, countries]);

  const formatPopulation = (population: number): string => {
    return population.toLocaleString();
  };

  const getBorderCountryNames = (borders: string[]): string[] => {
    return borders.map(borderCode => {
      const country = countries.find(c => c.cca3 === borderCode);
      return country ? country.name : borderCode;
    });
  };

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
  };

  const handleBackClick = () => {
    setSelectedCountry(null);
  };

  const handleBorderCountryClick = (borderName: string) => {
    const country = countries.find(c => c.name === borderName);
    if (country) {
      setSelectedCountry(country);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const themeClasses = darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900';
  const cardClasses = darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900';
  const inputClasses = darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300';

  if (loading) {
    return (
      <div className={`min-h-screen ${themeClasses} flex items-center justify-center`}>
        <div className="text-xl">Loading countries...</div>
      </div>
    );
  }

  if (selectedCountry) {
    return (
      <div className={`min-h-screen ${themeClasses}`}>
        <header className={`${cardClasses} shadow-sm`}>
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Where in the world?</h1>
            <button onClick={toggleDarkMode} className="flex items-center space-x-2 hover:opacity-75">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span>Dark Mode</span>
            </button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <button onClick={handleBackClick} className={`${cardClasses} px-8 py-2 rounded shadow flex items-center space-x-2 mb-16`}>
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img src={selectedCountry.flag} alt={`Flag of ${selectedCountry.name}`} className="w-full h-auto max-w-md mx-auto shadow-lg" />
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">{selectedCountry.name}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 mb-12">
                <div className="space-y-2">
                  <p><span className="font-semibold">Native :</span> {selectedCountry.nativeName}</p>
                  <p><span className="font-semibold">Population:</span> {formatPopulation(selectedCountry.population)}</p>
                  <p><span className="font-semibold">Region:</span> {selectedCountry.region}</p>
                  <p><span className="font-semibold">Sub-Region:</span> {selectedCountry.subregion}</p>
                  <p><span className="font-semibold">Capital:</span> {selectedCountry.capital}</p>
                </div>

                <div className="space-y-2">
                  <p><span className="font-semibold">Top-Level-Domain:</span> {selectedCountry.tld}</p>
                  <p><span className="font-semibold">Currency:</span> {selectedCountry.currencies}</p>
                  <p><span className="font-semibold">Language:</span> {selectedCountry.languages}</p>
                </div>
              </div>

              {selectedCountry.borders.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Border Countries:</h3>
                  <div className="flex flex-wrap gap-2">
                    {getBorderCountryNames(selectedCountry.borders).map((borderName, index) => (
                      <button
                        key={index}
                        onClick={() => handleBorderCountryClick(borderName)}
                        className={`${cardClasses} px-4 py-1 rounded shadow text-sm`}
                      >
                        {borderName}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeClasses}`}>
      <header className={`${cardClasses} shadow-sm`}>
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Where it is in the world?</h1>
          <button onClick={toggleDarkMode} className="flex items-center space-x-2 hover:opacity-75">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span>Dark Mode</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 gap-4">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for a country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`${inputClasses} pl-16 pr-4 py-4 rounded-lg shadow-sm w-full md:w-96`}
            />
          </div>

          <div className="relative">
            <select
              aria-label="Filter by Region"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className={`${inputClasses} px-6 py-4 rounded-lg shadow-sm appearance-none cursor-pointer w-full md:w-48`}
            >
              <option value="">Filter by Region</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCountries.map((country) => (
            <div
              key={country.name}
              onClick={() => handleCountryClick(country)}
              className={`${cardClasses} rounded-lg shadow-sm hover:shadow-lg cursor-pointer overflow-hidden`}
            >
              <img src={country.flag} alt={`Flag of ${country.name}`} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">{country.name}</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="font-semibold">Population:</span> {formatPopulation(country.population)}</p>
                  <p><span className="font-semibold">Region:</span> {country.region}</p>
                  <p><span className="font-semibold">Capital:</span> {country.capital}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCountries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No countries found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CountriesApp;
