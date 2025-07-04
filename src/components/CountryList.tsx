import { Search, ChevronDown } from 'lucide-react';

interface Country {
  name: string;
  population: number;
  region: string;
  capital?: string;
  flag: string; 
}

interface CountryListProps {
  countries: Country[];
  searchTerm: string;
  selectedRegion: string;
  setSearchTerm: (term: string) => void;
  setSelectedRegion: (region: string) => void;
  onCountryClick: (country: Country) => void;
  darkMode: boolean;
}

const CountryList: React.FC<CountryListProps> = ({
  countries,
  searchTerm,
  selectedRegion,
  setSearchTerm,
  setSelectedRegion,
  onCountryClick,
  darkMode
}) => {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

 
  const formatPopulation = (num: number) => num.toLocaleString();

  return (
    <main className="container mx-auto px-4 py-8">
      
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 gap-4">
      
        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search  country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            
            className={`
              pl-16 pr-4 py-4 rounded-lg shadow-sm w-full md:w-96
              ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}
            `}
          />
        </div>

       
        <div className="relative">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
           
            className={`
              px-6 py-4 rounded-lg shadow-sm appearance-none cursor-pointer w-full md:w-48
              ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}
            `}
          >
            <option value="">Filter by Region</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
        </div>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {countries.map(country => (
          <div
            key={country.name}
            onClick={() => onCountryClick(country)}
           
            className={`
              rounded-lg shadow-sm hover:shadow-lg cursor-pointer overflow-hidden
              ${darkMode ? 'bg-gray-700 text-white' : 'bg-brown text-gray-900'}
            `}
          >
            <img src={country.flag} alt={`Flag of ${country.name}`} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">{country.name}</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Population:</strong> {formatPopulation(country.population)}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Capital:</strong> {country.capital ?? 'N/A'}</p> 
              </div>
            </div>
          </div>
        ))}
      </div>

      
      {countries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No countries found .</p>
        </div>
      )}
    </main>
  );
};

export default CountryList;