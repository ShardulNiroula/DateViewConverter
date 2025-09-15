import ct from 'countries-and-timezones';
import moment from 'moment-timezone';

// Get all countries and their timezones
const getAllCountriesData = () => {
  const countries = ct.getAllCountries();
  const timezones = ct.getAllTimezones();

  const countryTimezoneMap = {};

  // Map timezones to countries
  Object.values(timezones).forEach(timezone => {
    if (timezone.countries && timezone.countries.length > 0) {
      timezone.countries.forEach(countryCode => {
        if (!countryTimezoneMap[countryCode]) {
          countryTimezoneMap[countryCode] = {
            code: countryCode,
            name: countries[countryCode]?.name || countryCode,
            timezones: []
          };
        }
        countryTimezoneMap[countryCode].timezones.push({
          name: timezone.name,
          offset: timezone.utcOffset,
          abbreviation: timezone.abbreviation || timezone.name.split('/')[1] || timezone.name
        });
      });
    }
  });

  return Object.values(countryTimezoneMap);
};

// Major cities for each timezone
const MAJOR_CITIES = {
  'America/New_York': ['New York', 'Washington DC', 'Boston'],
  'America/Los_Angeles': ['Los Angeles', 'San Francisco', 'Seattle'],
  'America/Chicago': ['Chicago', 'Dallas', 'Houston'],
  'America/Denver': ['Denver', 'Phoenix'],
  'America/Toronto': ['Toronto', 'Montreal', 'Vancouver'],
  'America/Mexico_City': ['Mexico City', 'Guadalajara'],
  'America/Sao_Paulo': ['São Paulo', 'Rio de Janeiro', 'Brasília'],
  'America/Buenos_Aires': ['Buenos Aires', 'Córdoba'],
  'Europe/London': ['London', 'Manchester', 'Birmingham'],
  'Europe/Paris': ['Paris', 'Lyon', 'Marseille'],
  'Europe/Berlin': ['Berlin', 'Munich', 'Frankfurt'],
  'Europe/Rome': ['Rome', 'Milan', 'Venice'],
  'Europe/Madrid': ['Madrid', 'Barcelona', 'Valencia'],
  'Europe/Amsterdam': ['Amsterdam', 'Rotterdam'],
  'Europe/Stockholm': ['Stockholm', 'Gothenburg'],
  'Europe/Moscow': ['Moscow', 'Saint Petersburg', 'Kazan'],
  'Asia/Tokyo': ['Tokyo', 'Osaka', 'Kyoto'],
  'Asia/Shanghai': ['Shanghai', 'Beijing', 'Shenzhen'],
  'Asia/Kolkata': ['Mumbai', 'Delhi', 'Bangalore'],
  'Asia/Dubai': ['Dubai', 'Abu Dhabi', 'Sharjah'],
  'Asia/Singapore': ['Singapore'],
  'Asia/Seoul': ['Seoul', 'Busan'],
  'Asia/Bangkok': ['Bangkok', 'Phuket'],
  'Asia/Hong_Kong': ['Hong Kong'],
  'Australia/Sydney': ['Sydney', 'Melbourne', 'Brisbane'],
  'Australia/Perth': ['Perth', 'Adelaide'],
  'Pacific/Auckland': ['Auckland', 'Wellington'],
  'Africa/Cairo': ['Cairo', 'Alexandria'],
  'Africa/Johannesburg': ['Johannesburg', 'Cape Town', 'Durban'],
  'Africa/Lagos': ['Lagos', 'Abuja'],
  'Africa/Nairobi': ['Nairobi', 'Mombasa']
};

class TimezoneService {
  static getAllCountries() {
    return getAllCountriesData();
  }

  static getCountryByCode(code) {
    const countries = this.getAllCountries();
    return countries.find(country => country.code === code);
  }

  static getTimezoneByName(timezoneName) {
    return ct.getTimezone(timezoneName);
  }

  static getAllTimezones() {
    return ct.getAllTimezones();
  }

  static searchCountries(query) {
    const countries = this.getAllCountries();
    const lowercaseQuery = query.toLowerCase();

    return countries.filter(country =>
      country.name.toLowerCase().includes(lowercaseQuery) ||
      country.code.toLowerCase().includes(lowercaseQuery)
    );
  }

  static searchTimezones(query) {
    const timezones = Object.values(this.getAllTimezones());
    const lowercaseQuery = query.toLowerCase();

    return timezones.filter(timezone =>
      timezone.name.toLowerCase().includes(lowercaseQuery) ||
      timezone.abbreviation?.toLowerCase().includes(lowercaseQuery) ||
      MAJOR_CITIES[timezone.name]?.some(city =>
        city.toLowerCase().includes(lowercaseQuery)
      )
    );
  }

  static getTimezoneOffset(timezoneName) {
    const timezone = this.getTimezoneByName(timezoneName);
    return timezone ? timezone.utcOffset / 60 : 0; // Convert minutes to hours
  }

  static getCurrentTimeInTimezone(timezoneName) {
    return moment().tz(timezoneName);
  }

  static formatTimezoneOffset(offsetHours) {
    const sign = offsetHours >= 0 ? '+' : '-';
    const hours = Math.abs(Math.floor(offsetHours));
    const minutes = Math.abs((offsetHours % 1) * 60);
    return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  static getCountryOptions() {
    const countries = this.getAllCountries();
    const options = [];

    countries.forEach(country => {
      country.timezones.forEach(timezone => {
        const cities = MAJOR_CITIES[timezone.name] || [timezone.abbreviation];
        cities.forEach(city => {
          options.push({
            value: timezone.name,
            label: `${country.name} - ${city} (${this.formatTimezoneOffset(timezone.offset / 60)})`,
            country: country.name,
            city: city,
            timezone: timezone.name,
            offset: timezone.offset
          });
        });
      });
    });

    // Sort by country name
    return options.sort((a, b) => a.country.localeCompare(b.country));
  }

  static getPopularTimezones() {
    const popular = [
      'America/New_York',
      'America/Los_Angeles',
      'America/Chicago',
      'America/Toronto',
      'Europe/London',
      'Europe/Paris',
      'Europe/Berlin',
      'Europe/Rome',
      'Europe/Madrid',
      'Asia/Tokyo',
      'Asia/Shanghai',
      'Asia/Kolkata',
      'Asia/Dubai',
      'Asia/Singapore',
      'Australia/Sydney',
      'Pacific/Auckland',
      'Africa/Johannesburg',
      'America/Sao_Paulo'
    ];

    return popular.map(timezone => {
      const tz = this.getTimezoneByName(timezone);
      const countries = this.getAllCountries();
      const country = countries.find(c =>
        c.timezones.some(t => t.name === timezone)
      );

      const cities = MAJOR_CITIES[timezone] || [tz?.abbreviation || timezone.split('/')[1]];

      return {
        value: timezone,
        label: `${country?.name || 'Unknown'} - ${cities[0]} (${this.formatTimezoneOffset(tz?.utcOffset / 60 || 0)})`,
        country: country?.name || 'Unknown',
        city: cities[0],
        timezone: timezone,
        offset: tz?.utcOffset || 0
      };
    });
  }

  static getTimezonesByCountry(countryCode) {
    const country = this.getCountryByCode(countryCode);
    return country ? country.timezones : [];
  }

  static getTimeDifference(timezone1, timezone2) {
    const offset1 = this.getTimezoneOffset(timezone1);
    const offset2 = this.getTimezoneOffset(timezone2);
    return offset2 - offset1;
  }
}

export default TimezoneService;